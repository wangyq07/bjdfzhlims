import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { OutputlistComponent } from './outputlist.component';
 


const routes: Routes = [
  {path:'',component:OutputlistComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputlistRoutingModule { }