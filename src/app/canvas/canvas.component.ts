import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  items: any[] = [];
  private selectedItem: any;
  private offsetX!: number;
  private offsetY!: number;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  constructor(private editorService: EditorService) {}

  ngOnInit() {
    this.items = this.editorService.getItems();
  }

  getItemStyle(item: any) {
    return {
      position: 'absolute',
      left: item.x + 'px',
      top: item.y + 'px',
      cursor: 'move'
    };
  }

  getTextStyle(item: any) {
    return {
      fontFamily: item.font,
      fontSize: item.fontSize + 'px',
      fontWeight: item.bold ? 'bold' : 'normal',
      fontStyle: item.italic ? 'italic' : 'normal',
      textDecoration: item.underline ? 'underline' :'normal',
      

    };
  }

  startDrag(event: MouseEvent, item: any) {
    this.selectedItem = item;
    this.offsetX = event.clientX - item.x;
    this.offsetY = event.clientY - item.y;
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.endDrag);
    this.editorService.setSelectedItem(item); // Seçilen öğeyi servise bildir
  }

  onDrag = (event: MouseEvent) => {
    if (this.selectedItem) {
      const newX = event.clientX - this.offsetX;
      const newY = event.clientY - this.offsetY;
      this.editorService.updateItemPosition(this.selectedItem, newX, newY); // Pozisyonu servise bildir
    }
  }

  endDrag = () => {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.endDrag);
    this.selectedItem = null;
  }
  onSelectItem(item: any) {
    this.editorService.setSelectedItem(item); // Seçilen öğeyi servise bildirin
  }
}