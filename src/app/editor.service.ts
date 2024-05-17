import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private selectedItemSource = new BehaviorSubject<any>(null);
  selectedItem$ = this.selectedItemSource.asObservable();

  private items: any[] = [];

  constructor(private http: HttpClient) { }

  addItem(item: any) {
    this.items.push(item);
  }

  updateItemPosition(item: any, x: number, y: number) {
    const index = this.items.findIndex(i => i === item);
    if (index !== -1) {
      this.items[index].x = x;
      this.items[index].y = y;
    }
  }

  postItems() {
    const url = 'https://pusulaweb.com.tr/api/editor';
    this.http.post(url, this.items).subscribe(
      response => {
        console.log('POST başarılı:', response);
      },
      error => {
        console.error('POST hatası:', error);
      }
    );
  }

  // Yeni işlevleri ekleyin
  getItems() {
    return this.items;
  }

  setSelectedItem(item: any) {
    this.selectedItemSource.next(item);
  }
}