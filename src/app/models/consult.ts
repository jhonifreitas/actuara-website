import { Base } from './base';
import { Company as HubDevResult } from '../interfaces/hub-dev';

export class Consult extends Base {
  company: Company;
  result!: HubDevResult;

  constructor() {
    super();
    this.company = new Company();
  }
}

class Company {
  id!: string;
  name!: string;
}
