import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlownodeComponent } from './flownode.component';
 
 


const routes: Routes = [
  {path:'',component:FlownodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlownodeRoutingModule { }