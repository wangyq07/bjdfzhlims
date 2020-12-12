import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactauditComponent } from './contactaudit.component';


const routes: Routes = [
  {path:'',component:ContactauditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactauditRoutingModule { }
