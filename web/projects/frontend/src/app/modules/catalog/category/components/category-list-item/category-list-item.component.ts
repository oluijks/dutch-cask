import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dcwa-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
