import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputpricecaculateComponent } from './inputpricecaculate.component';
 


const routes: Routes = [
  {path:'',component:InputpricecaculateComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputpriceRoutingModule { }