import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleregisterComponent } from './sampleregister.component';
 
 
const routes: Routes = [
  {path:'',component:SampleregisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleregisterRoutingModule { }