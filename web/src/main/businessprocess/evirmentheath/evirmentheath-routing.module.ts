import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvirmentheathComponent } from './evirmentheath.component';


const routes: Routes = [
  {path:'',component:EvirmentheathComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvirmentheathRoutingModule { }
