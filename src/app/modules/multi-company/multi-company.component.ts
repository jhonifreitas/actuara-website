import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Consult } from 'src/app/models/consult';
import { Company } from 'src/app/interfaces/hub-dev';

import { UtilService } from 'src/app/services/util.service';
import { StorageService } from 'src/app/services/storage.service';
import { CustomValidator } from 'src/app/services/validator.service';
import { HubDevService } from 'src/app/services/api/hub-dev.service';
import { ConsultService } from 'src/app/services/firebase/consult.service';
import { SubClassService } from 'src/app/services/firebase/subclass.service';

@Component({
  selector: 'app-multi-company',
  templateUrl: './multi-company.component.html',
  styleUrls: ['./multi-company.component.scss']
})
export class MultiCompanyComponent implements OnInit {

  maxCNPJ = 100; // 20.654.105/0001-71;05.346.462/0001-89;66.362.008/0001-06
  submitting = false;
  formGroup: FormGroup;
  cnpjs: {value: string; valid: boolean}[] = [];
  companies: (Company | {numero_de_inscricao: string; status: 'notFound'})[] = [];

  private consult = new Consult();

  constructor(
    private _util: UtilService,
    private _hubDev: HubDevService,
    private formBuilder: FormBuilder,
    private _consult: ConsultService,
    private _storage: StorageService,
    private _subclass: SubClassService,
  ) {
    this.formGroup = this.formBuilder.group({
      search: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void { }

  get controls() {
    return this.formGroup.controls as {search: FormControl};
  }

  async validatorCNPJ() {
    this.cnpjs = [];
    let value: string = this.controls.search.value;
    if (value) {
      value = CustomValidator.cleanCNPJ(value);
      const cnpjs = value.split(';');
      for (const cnpj of cnpjs)
        if (this.cnpjs.length < 100)
          this.cnpjs.push({value: cnpj, valid: CustomValidator.checkCNPJ(cnpj)});

      this.controls.search.setErrors(this.cnpjs.find(cnpj => !cnpj.valid) ? {invalid: true} : null);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      this.companies = [];
      this.submitting = true;

      for (const cnpj of this.cnpjs.filter(item => item.valid)) {
        let company: (Company | void);
        this.consult.company.id = this._storage.getUser.id;
        this.consult.company.name = this._storage.getUser.name;

        const consult = await this._consult.getByCNPJ(cnpj.value).catch(_ => {});
        if (consult) {
          this.consult = consult;
          const createdAt = new Date(consult.createdAt);
          createdAt.setMonth(createdAt.getMonth() + 1);
          if (createdAt > new Date()) company = this.consult.result;
          else company = await this.getHubDev(cnpj.value);
        } else company = await this.getHubDev(cnpj.value);

        if (company) this.companies.push(company);
        else this.companies.push({numero_de_inscricao: cnpj.value, status: 'notFound'});
      }

      this.submitting = false;
    } else this._util.message('Verifique os dados antes de continuar!', 'warn');

    this.submitting = false;
  }

  private async getHubDev(value: string) {
    return this._hubDev.getCNPJ(value).then(async company => {
      company.atividade_principal.code = this.clearCode(company.atividade_principal.code);

      // GET MAIN
      company.atividade_principal.type = 'depend';
      if (company.atividade_principal.code.length === 5) {
        const subclasses = await this._subclass.getByClassIdByType(company.atividade_principal.code, 'required');
        if (subclasses.length) company.atividade_principal.type = 'required';
      } else if (company.atividade_principal.code.length === 7)
        await this._subclass.getById(company.atividade_principal.code)
          .then(res => company.atividade_principal.type = res.type)
          .catch(_ => {});

      // GET SECONDARIES
      if (company.status !== 'required')
        for (const activity of company.atividades_secundarias) {
          activity.code = this.clearCode(activity.code);
          activity.type = 'depend';
          if (activity.code.length === 5) {
            const subclasses = await this._subclass.getByClassIdByType(activity.code, 'required');
            if (subclasses.length) activity.type = 'required';
          } else if (activity.code.length === 7)
            await this._subclass.getById(activity.code).then(res => activity.type = res.type).catch(_ => {});
        }

      company.status = company.atividade_principal.type;
      if (company.status !== 'required')
        if (company.atividades_secundarias.filter(activity => activity.type === 'required').length)
          company.status = 'required';
        else if (company.atividades_secundarias.filter(activity => activity.type === 'depend').length)
          company.status = 'depend';
        else if (company.atividades_secundarias.filter(activity => activity.type === 'notRequired').length)
          company.status = 'notRequired';

      this.consult.result = company;
      await this._consult.save(this.consult);
      return company;
    }).catch(_ => {});
  }

  private clearCode(code: string) {
    return code.replace(/\./g, '').replace(/\-/g, '');
  }
}
