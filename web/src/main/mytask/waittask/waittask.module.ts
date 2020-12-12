import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaittaskComponent } from './waittask.component';
import { WaittaskRoutesModule } from './waittask-routes.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
 

 
 
const components = [
  WaittaskComponent 
]
const modules=[CommonModule,NgNestModule,ShareModule,AuToolModule,AuAdaptionModule,
  WaittaskRoutesModule 
]
@NgModule({
  declarations: [...components],
  imports: [ ...modules],
  exports:[...components]
})
export class WaittaskModule { }
