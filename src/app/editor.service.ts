import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private items: any[] = [];
  private selectedItemSubject = new BehaviorSubject<any>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  constructor() {}

  getItems() {
    return this.items;
  }

  addItem(item: any) {
    this.items.push(item);
  }

  setSelectedItem(item: any) {
    this.selectedItemSubject.next(item);
  }

  updateItemPosition(item: any, x: number, y: number) {
    const index = this.items.findIndex(i => i === item);
    if (index !== -1) {
      this.items[index].x = x;
      this.items[index].y = y;
      this.setSelectedItem(this.items[index]);
    }
  }
}