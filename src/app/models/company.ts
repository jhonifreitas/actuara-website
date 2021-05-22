import { Base } from './base';

export class Company extends Base {
  name!: string;
  cnpj!: string;
  image?: string;
  email!: string;
  phone!: string;
  partner: boolean;
  address: Address;

  constructor() {
    super();
    this.partner = false;
    this.address = new Address();
  }
}

class Address {
  city!: string;
  state!: string;
  street!: string;
  number!: string;
  zipcode!: string;
  district!: string;
  complement?: string;
}
