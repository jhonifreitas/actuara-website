import { Base } from './base';

export class Class extends Base {
  description!: string;

  _subclasses?: SubClass[];
}

export class SubClass extends Base {
  classId!: string;
  description!: string;
  consemaCodes: string[];
  type!: 'notRequired' | 'required' | 'depend';

  constructor() {
    super();
    this.consemaCodes = [];
  }
}
