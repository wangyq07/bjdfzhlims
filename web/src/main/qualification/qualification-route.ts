import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { QualificationComponent } from './qualification.component'; 
const routes: Routes = [
  { path: '', component: QualificationComponent  
}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualificationRoutesModule {}