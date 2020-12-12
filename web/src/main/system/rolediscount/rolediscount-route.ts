import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { RolediscountComponent } from './rolediscount.component'; 
const routes: Routes = [
  { path: '', component:   RolediscountComponent  
} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolediscountRoutesModule {}