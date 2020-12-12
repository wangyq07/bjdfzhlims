import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from 'src/main/system/menus/menus.component';
import { WaittaskComponent } from './waittask.component';  
const routes: Routes = [
  { path: '', component:  WaittaskComponent  
}, 
{ path: 'menus', component:  MenusComponent  
}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaittaskRoutesModule {}