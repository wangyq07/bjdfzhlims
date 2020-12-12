import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from 'src/main/system/menus/menus.component';
import { CompletetaskComponent } from './completetask.component';
  
const routes: Routes = [
  { path: '', component:  CompletetaskComponent  
  } 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletetaskRoutesModule {}