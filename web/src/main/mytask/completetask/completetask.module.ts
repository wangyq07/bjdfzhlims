import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletetaskComponent } from './completetask.component';
import { NgNestModule } from 'src/share/ng-nest.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { ShareModule } from 'src/share/share.module';
import { CompletetaskRoutesModule } from './completetask-route';


const components = [
  CompletetaskComponent 
]
const modules=[CommonModule,NgNestModule,ShareModule,AuToolModule,AuAdaptionModule,CompletetaskRoutesModule
]
@NgModule({
  declarations: [...components],
  imports: [ ...modules],
  exports:[...components]
})
export class CompletetaskModule { }
