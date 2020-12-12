import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CtoauditComponent } from './ctoaudit.component';
 


const routes: Routes = [
  {path:'',component:CtoauditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CtoauditRoutingModule { }