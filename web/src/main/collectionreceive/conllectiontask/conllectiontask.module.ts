import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConllectiontaskComponent } from './conllectiontask.component';
import { XButtonModule, XInputModule, XLayoutModule } from '@ng-nest/ui';



@NgModule({
  declarations: [ConllectiontaskComponent],
  imports: [
    CommonModule
    ,XLayoutModule
    ,XButtonModule
    ,XInputModule
  ]
})
export class ConllectiontaskModule { }
