import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { StorageService } from 'src/app/services/storage.service';

interface MenuItem {
  title: string;
  url?: string;
  icon: string;
  hidden: boolean;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  menuItems: MenuItem[] = [
    { title: 'CNAE/Empresa', url: 'consulta', icon: 'business', hidden: false },
    { title: 'Empresas', url: 'empresas', icon: 'business', hidden: false },
  ];

  constructor(
    public _storage: StorageService
  ) { }

  ngOnInit(): void { }

  closeSideBar(): void {
    const width = window.innerWidth;
    if (width <= 960 && !this.toggleSideBarForMe.closed) {
      this.toggleSideBarForMe.emit();
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    }
  }
}
