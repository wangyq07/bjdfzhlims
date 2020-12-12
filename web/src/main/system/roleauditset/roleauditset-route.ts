import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { RoleauditsetComponent } from './roleauditset.component';
 
const routes: Routes = [
  { path: '', component:   RoleauditsetComponent  
} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  RoleauditsetRoutesModule {}