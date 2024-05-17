import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { CanvasComponent } from './canvas/canvas.component';
import {MatIconModule} from '@angular/material/icon'
@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, NgIconsModule.withIcons({  heroUsers }),
    ReactiveFormsModule ,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }