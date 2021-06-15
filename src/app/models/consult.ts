import { Base } from './base';
import { Company as HubDev } from '../interfaces/hub-dev';

export class Consult extends Base {
  company: Company;
  result!: HubDev;

  constructor() {
    super();
    this.company = new Company();
  }
}

class Company {
  id!: string;
  name!: string;
}
