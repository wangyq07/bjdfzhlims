import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { InputproductComponent } from './inputproduct.component';
 


const routes: Routes = [
  {path:'',component:InputproductComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputproductRoutingModule { }