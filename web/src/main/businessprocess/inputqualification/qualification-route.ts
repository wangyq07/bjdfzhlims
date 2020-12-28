import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { InputqualificationComponent } from './inputqualification.component';

const routes: Routes = [
  { path: '', component: InputqualificationComponent  
}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputQualificationRoutesModule {}