import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskdispatchComponent } from './taskdispatch.component';
 
 
 
 


const routes: Routes = [
  {path:'',component:TaskdispatchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskdispatchRoutingModule { }