import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [DialogBoxComponent],
  imports: [
    MaterialModule,
    CommonModule,
  ],
  entryComponents: [
    DialogBoxComponent
  ]
})
export class UtilsModule { }
