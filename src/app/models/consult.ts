import { Base } from './base';
import { Company as HubDev } from '../interfaces/hub-dev';

export class Consult extends Base {
  company: Company;
  result!: HubDev;
  quantity: number;

  constructor() {
    super();
    this.quantity = 1;
    this.company = new Company();
  }
}

class Company {
  id!: string;
  name!: string;
}
