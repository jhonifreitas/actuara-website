import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  sideBarOpen = false;

  constructor() { }

  ngOnInit(): void { }

  sideBarToggler(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
