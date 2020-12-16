import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskdispatchRoutingModule } from './taskdispatch-route';
import { TaskdispatchComponent } from './taskdispatch.component';
import { XLayoutModule, XTreeModule } from '@ng-nest/ui';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';



@NgModule({
  declarations: [TaskdispatchComponent],
  imports: [
    CommonModule
    ,TaskdispatchRoutingModule
    ,NgNestModule
    ,ShareModule
    ,XTreeModule
    ,XLayoutModule
    ,AuToolModule
    ,AuAdaptionModule
  ]
})
export class TaskdispatchModule { }
