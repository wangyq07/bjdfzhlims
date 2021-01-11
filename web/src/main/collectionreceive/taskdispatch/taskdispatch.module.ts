import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskdispatchRoutingModule } from './taskdispatch-route';
import { TaskdispatchComponent } from './taskdispatch.component';
import { XDatePickerModule, XDialogModule, XInputModule, XLayoutModule, XSelectModule, XTableModule, XTreeModule } from '@ng-nest/ui';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { ModifytaskdispatchComponent } from './modifytaskdispatch/modifytaskdispatch.component';
import { ModifyqualificationmethodModule } from '../modifyqualificationmethod/modifyqualificationmethod.module';



@NgModule({
  declarations: [TaskdispatchComponent, ModifytaskdispatchComponent],
  imports: [
    CommonModule
    ,TaskdispatchRoutingModule
    ,NgNestModule
    ,ShareModule
    ,XTreeModule
    ,XDialogModule
    ,XInputModule
    ,XTableModule
    ,ModifyqualificationmethodModule
    ,XLayoutModule
    ,XSelectModule
    ,AuToolModule
    ,AuAdaptionModule
    ,XDatePickerModule
  ]
})
export class TaskdispatchModule { }
