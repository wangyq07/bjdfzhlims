import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { SamplebrowsetaskComponent } from './samplebrowsetask.component';
const routes: Routes = [
  {path:'',component:SamplebrowsetaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplebrowsetaskRoutingModule { }