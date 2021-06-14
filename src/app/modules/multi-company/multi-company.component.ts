import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Company } from 'src/app/interfaces/hub-dev';

import { UtilService } from 'src/app/services/util.service';
import { CustomValidator } from 'src/app/services/validator.service';
import { HubDevService } from 'src/app/services/api/hub-dev.service';
import { SubClassService } from 'src/app/services/firebase/subclass.service';

@Component({
  selector: 'app-multi-company',
  templateUrl: './multi-company.component.html',
  styleUrls: ['./multi-company.component.scss']
})
export class MultiCompanyComponent implements OnInit {

  maxCNPJ = 100; // 20.654.105/0001-71;87.704.807/0001-93;66.362.008/0001-06
  submitting = false;
  formGroup: FormGroup;
  cnpjs: {value: string; valid: boolean}[] = [];
  companies: (Company | {numero_de_inscricao: string; status: 'notFound'})[] = [];

  constructor(
    private _util: UtilService,
    private _hubDev: HubDevService,
    private formBuilder: FormBuilder,
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
      value = value.replace(/\ /g, '').replace(/\-/g, '');;
      const cnpjs = value.split(';');
      for (const cnpj of cnpjs) {
        if (this.cnpjs.length < 100)
          this.cnpjs.push({value: cnpj, valid: CustomValidator.checkCNPJ(CustomValidator.cleanCNPJ(cnpj))});
      }

      this.controls.search.setErrors(this.cnpjs.find(cnpj => !cnpj.valid) ? {invalid: true} : null);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      this.companies = [];
      this.submitting = true;
      
      for (const cnpj of this.cnpjs.filter(item => item.valid)) {
        await this._hubDev.getCNPJ(cnpj.value).then(async company => {
          const mainCode = this.clearCode(company.atividade_principal.code);

          // GET MAIN
          company.atividade_principal.type = 'depend';
          if (mainCode.length === 7)
            await this._subclass.getById(mainCode)
              .then(res => company.atividade_principal.type = res.type)
              .catch(_ => {});

          // GET SECONDARIES
          if (company.status !== 'required') {
            for (const activity of company.atividades_secundarias) {
              const code = this.clearCode(activity.code);
              activity.type = 'depend';
              if (code.length === 7)
                await this._subclass.getById(code).then(res => activity.type = res.type).catch(_ => {});
            }
          }

          company.status = company.atividade_principal.type;
          if (company.atividades_secundarias.filter(activity => activity.type === 'required').length)
            company.status = 'required';
          else if (company.atividades_secundarias.filter(activity => activity.type === 'depend').length)
            company.status = 'depend';
          else if (company.atividades_secundarias.filter(activity => activity.type === 'notRequired').length)
            company.status = 'notRequired';
          this.companies.push(company);
        }).catch(_ => this.companies.push({numero_de_inscricao: cnpj.value, status: 'notFound'}));
      }

      this.submitting = false;
    } else this._util.message('Verifique os dados antes de continuar!', 'warn');

    this.submitting = false;
  }

  private clearCode(code: string) {
    return code.replace(/\./g, '').replace(/\-/g, '');
  }
}
