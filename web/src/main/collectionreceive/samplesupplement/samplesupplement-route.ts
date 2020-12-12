import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SamplesupplementComponent } from './samplesupplement.component';
 
 
 


const routes: Routes = [
  {path:'',component:SamplesupplementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplesupplementRoutingModule { }