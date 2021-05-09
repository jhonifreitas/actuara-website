import { Base } from './base';

export class Class extends Base {
  name!: string;

  _subclasses?: SubClass[];
}

export class SubClass extends Base {
  name!: string;
  classId!: string;
  required: boolean;
  consemaCodes: string[];

  constructor() {
    super();
    this.required = false;
    this.consemaCodes = [];
  }
}
