import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Company } from 'src/app/interfaces/hub-dev';
import { Class, SubClass } from 'src/app/models/class';

import { UtilService } from 'src/app/services/util.service';
import { CustomValidator } from 'src/app/services/validator.service';
import { HubDevService } from 'src/app/services/api/hub-dev.service';
import { ClassService } from 'src/app/services/firebase/class.service';
import { SubClassService } from 'src/app/services/firebase/subclass.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  class?: Class;
  company?: Company;
  submitting = false;
  subClassId!: string;
  showContact = false;
  formGroup: FormGroup;
  subClassSelected?: SubClass;

  constructor(
    private _util: UtilService,
    private _class: ClassService,
    private _hubDev: HubDevService,
    private formBuilder: FormBuilder,
    private _subclass: SubClassService,
  ) {
    this.formGroup = this.formBuilder.group({
      search: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void { }

  get controls() {
    return this.formGroup.controls as {search: FormControl};
  }

  selectSubClass() {
    if (this.class && this.class._subclasses?.length)
      this.subClassSelected = this.class._subclasses.find(subclass => subclass.id === this.subClassId);
  }

  async checkCNPJ() {
    const value: string = this.controls.search.value;
    const validators = [Validators.required];
    if (value.length <= 5) validators.push(Validators.minLength(5));
    else if (value.length <= 7) validators.push(Validators.minLength(7));
    else if (value.length > 7) validators.push(CustomValidator.CNPJ);
    this.controls.search.setValidators(validators);
    this.controls.search.updateValueAndValidity();
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      this.class = undefined;
      this.submitting = true;
      this.company = undefined;
      this.showContact = false;
      this.subClassSelected = undefined;
      const value = this.formGroup.value.search;

      try {
        if (value.length === 5)
          await this._class.getById(value).then(async res => {
            this.class = res;
            this.class._subclasses = await this._subclass.getByClassId(this.class.id);
          }).catch(_ => {
            throw 'CNAE não localizado na nossa base de dados';
          });
        else if (value.length === 7)
          await this._subclass.getById(value).then(async res => {
            this.subClassSelected = res;
            if (res.type !== 'notRequired') this.showContact = true;
          }).catch(_ => {
            throw 'CNAE não localizado na nossa base de dados';
          });
        else if (value.length === 14)
          await this._hubDev.getCNPJ(value).then(async company => {
            const mainCode = this.clearCode(company.atividade_principal.code);

            // GET MAIN
            this._subclass.getById(mainCode)
              .then(res => company.atividade_principal.type = res.type)
              .catch(_ => company.atividade_principal.type = 'depend');
            if (company.atividade_principal.type !== 'notRequired') this.showContact = true;

            // GET SECONDARIES
            for (const activity of company.atividades_secundarias) {
              const code = this.clearCode(activity.code);
              this._subclass.getById(code)
                .then(res => activity.type = res.type)
                .catch(_ => activity.type = 'depend');
              if (activity.type !== 'notRequired') this.showContact = true;
            }

            this.company = company;
          }).catch(_ => {
            throw 'CNPJ Não Encontrado';
          });
      } catch (error) {
        this._util.message(`${error}, verifique os dados informados.`, 'warn');
      }
    } else this._util.message('Verifique os dados antes de continuar!', 'warn');

    this.submitting = false;
  }

  private clearCode(code: string) {
    return code.replace(/\./g, '').replace(/\-/g, '');
  }
}
