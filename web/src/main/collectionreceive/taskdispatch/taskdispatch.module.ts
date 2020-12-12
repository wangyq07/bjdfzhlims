import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskdispatchRoutingModule } from './taskdispatch-route';
import { TaskdispatchComponent } from './taskdispatch.component';



@NgModule({
  declarations: [TaskdispatchComponent],
  imports: [
    CommonModule,TaskdispatchRoutingModule
  ]
})
export class TaskdispatchModule { }
