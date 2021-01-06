import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactauditComponent } from './contactaudit.component';
import { ContactauditRoutingModule } from './contactaudit-routes.module';
import { ShareModule } from 'src/share/share.module';
import { XContainerModule } from '@ng-nest/ui/container';
import { XDatePickerModule, XInputModule } from '@ng-nest/ui';
import{XTextareaModule}  from '@ng-nest/ui/textarea'; 
import { NgNestModule } from 'src/share/ng-nest.module';
import { QualificationModule } from 'src/main/qualification/qualification.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { ScrolltableComponent } from './scrolltable/scrolltable.component';
import { OutputlistModule } from '../outputlist/outputlist.module';
@NgModule({
  declarations: [ContactauditComponent, ScrolltableComponent],
  imports: [
    CommonModule
    ,ContactauditRoutingModule 
    ,ShareModule 
    ,XInputModule
    ,XTextareaModule
    ,NgNestModule
    ,QualificationModule
    ,AuAdaptionModule
    ,AuToolModule
    ,OutputlistModule
  ]
})
export class ContactauditModule { }
