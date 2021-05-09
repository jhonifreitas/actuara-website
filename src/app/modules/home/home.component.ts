import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
  loading = false;
  subClassId!: string;
  showSuccess = false;
  showRequired = false;
  search = new FormControl('', Validators.required)

  constructor(
    private _util: UtilService,
    private _class: ClassService,
    private _subclass: SubClassService,
  ) { }

  ngOnInit(): void { }

  selectSubClass() {
    if (this.class && this.class._subclasses) {
      const subClass = this.class._subclasses.find(subclass => subclass.id == this.subClassId);
      if (subClass) {
        this.showSuccess = !subClass.required;
        this.showRequired = subClass.required;
      }
    }
  }

  async consult(): Promise<void> {
    this.loading = true;
    this.showSuccess = false;
    this.showRequired = false;

    const value: string = this.search.value;

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

    this.loading = false;
  }
}
