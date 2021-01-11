import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SamplereceiveComponent } from './samplereceive.component';
 
const routes: Routes = [
  {path:'',component:SamplereceiveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplereceiveRoutingModule { }