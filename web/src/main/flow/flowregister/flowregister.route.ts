import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowregisterComponent } from './flowregister.component';
 


const routes: Routes = [
  {path:'',component:FlowregisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowregisterRoutingModule { }