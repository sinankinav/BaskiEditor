import { Component } from '@angular/core';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent {
  paperType = 'A4';
  customWidth: number = 0;
  customHeight: number = 0;
  inputType = 'text';
  textInput: string = '';
  font = 'Arial';
  fontSize: number = 12;
  bold: boolean = false;
  italic: boolean = false;
  underline: boolean= false;
  selectedItem: any;
  customPaperWidth: number = 210;
  customPaperHeight: number = 297;

  constructor(private editorService: EditorService) {
    this.editorService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
      if (item) {
        this.customWidth = item.x;
        this.customHeight = item.y;
      }
    });
  }

  onPaperTypeChange() {
    switch (this.paperType) {
      case 'A3':
        this.customPaperWidth = 297;
        this.customPaperHeight = 420;
        break;
      case 'A4':
        this.customPaperWidth = 210;
        this.customPaperHeight = 297;
        break;
      case 'A5':
        this.customPaperWidth = 148;
        this.customPaperHeight = 210;
        break;
      case 'ozel':
        this.customPaperWidth = 0;
        this.customPaperHeight = 0;
        break;
    }
  }



 

  addText() {
    const newItem = {
      type: 'text',
      content: this.textInput,
      font: this.font,
      fontSize: this.fontSize,
      bold: this.bold,
      italic: this.italic,
      underline: this.underline,
      
      x: 0,
      y: 0
    };
    this.editorService.addItem(newItem);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const newItem = {
          type: 'image',
          src: e.target.result,
          width: 100,
          height: 100,
          x: 0,
          y: 0
        };
        this.editorService.addItem(newItem);
      };
      reader.readAsDataURL(file);
    }
  }
  

  updateSelectedItemPosition() {
    if (this.selectedItem) {
      this.editorService.updateItemPosition(this.selectedItem, this.customWidth, this.customHeight);
    }
  }
}