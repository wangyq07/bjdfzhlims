import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LimitvalueauditComponent } from './limitvalueaudit.component';
 
 
const routes: Routes = [
  {path:'',component:LimitvalueauditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitvalueauditRoutingModule { }