import {Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryMenuItem} from '../../../../models/category-menu-item.model';

@Component({
  selector: 'dcwa-category-menu-item',
  templateUrl: './category-menu-item.html',
  styleUrls: ['./category-menu-item.scss'],
})
export class CategoryMenuItemComponent {
  @Input() items: CategoryMenuItem[];
  @ViewChild('childMenu') public childMenu;

  constructor(public router: Router) {}
}
