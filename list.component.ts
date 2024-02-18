import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('itemHover', [
      transition(':enter', [
        style({ transform: 'scale(1)' }),
        animate('0.2s', style({ transform: 'scale(1.05)' }))
      ]),
      transition(':leave', [
        animate('0.2s', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  items: Item[];
  itemForms: FormGroup[];

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataService.getItems().subscribe(items => {
      this.items = items;
      this.initForms();
    });
  }

  private initForms(): void {
    this.itemForms = this.items.map(item => {
      return this.fb.group({
        id: [item.id],
        name: [item.name],
        description: [item.description]
      });
    });
  }

  updateItem(index: number): void {
    const updatedItem = this.itemForms[index].value;
    this.dataService.updateItem(updatedItem).subscribe(() => {
      // Assuming success, update item in local list
      this.items[index] = updatedItem;
    });
  }
}
