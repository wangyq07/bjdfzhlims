import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { ModifyqualificationmethodComponent } from './modifyqualificationmethod.component';
 
const routes: Routes = [
  {path:'',component:ModifyqualificationmethodComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyqualificationmethodRoutingModule { }