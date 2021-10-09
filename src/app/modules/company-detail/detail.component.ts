import { Component, Input, OnChanges } from '@angular/core';

import { Company } from 'src/app/interfaces/hub-dev';

@Component({
  selector: 'app-company-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class CompanyDetailComponent implements OnChanges {

  @Input() matCard = true;
  @Input() company?: Company;

  showContact = false;

  constructor() { }

  ngOnChanges(): void {
    this.showContact = false;
    if (this.company)
      if (this.company.status !== 'notRequired') this.showContact = true;
  }
}
