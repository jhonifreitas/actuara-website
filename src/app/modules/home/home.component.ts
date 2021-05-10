import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Class } from 'src/app/models/class';

import { UtilService } from 'src/app/services/util.service';
import { ClassService } from 'src/app/services/firebase/class.service';
import { SubClassService } from 'src/app/services/firebase/subclass.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  class?: Class;
  submitting = false;
  subClassId!: string;
  showSuccess = false;
  formGroup: FormGroup;
  showRequired = false;

  constructor(
    private _util: UtilService,
    private _class: ClassService,
    private formBuilder: FormBuilder,
    private _subclass: SubClassService,
  ) {
    this.formGroup = this.formBuilder.group({
      search: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  ngOnInit(): void { }

  get controls() {
    return this.formGroup.controls as {search: FormControl};
  }

  selectSubClass() {
    if (this.class && this.class._subclasses?.length) {
      const subClass = this.class._subclasses.find(subclass => subclass.id == this.subClassId);
      if (subClass) {
        this.showSuccess = !subClass.required;
        this.showRequired = subClass.required;
      }
    }
  }

  async onSubmit(): Promise<void> {
    this.showSuccess = false;
    this.showRequired = false;
    
    if (this.formGroup.valid) {
      this.submitting = true;
      const value = this.formGroup.value.search;
  
      try {
        if (value.length == 5) {
          await this._class.getById(value).then(async res => {
            this.class = res;
            this.class._subclasses = await this._subclass.getByClassIdRequired(this.class.id);
            if (!this.class._subclasses.find(subclass => subclass.required)) this.showSuccess = true;
          });
        } else if (value.length == 7) {
          await this._subclass.getById(value).then(async res => {
            this.showSuccess = !res.required;
            this.showRequired = res.required;
          });
        } else if (value.length == 11) {
          // await this._subclass.getById(value).then(async res => this.subclass = res);
        }
      } catch (error) {
        console.log(error);
        this._util.message('Infelizmente não encontramos nada!', 'warn')
      }
    } else this._util.message('Verifique os dados antes de continuar!', 'warn');

    this.submitting = false;
  }
}
