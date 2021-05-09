import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
    const width = window.innerWidth;
    if (width <= 960 && !this.toggleSideBarForMe.closed) this.toggleSideBar();
  }

  toggleSideBar(): void {
    this.toggleSideBarForMe.emit();
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  }
}
