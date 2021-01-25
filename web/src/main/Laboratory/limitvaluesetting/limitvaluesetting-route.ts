import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LimitvaluesettingComponent } from './limitvaluesetting.component';
 
const routes: Routes = [
  {path:'',component:LimitvaluesettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitvaluesettingRoutingModule { }