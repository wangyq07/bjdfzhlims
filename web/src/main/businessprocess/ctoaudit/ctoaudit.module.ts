import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtoauditRoutingModule } from './ctoaudit-route.module';
import { CtoauditComponent } from './ctoaudit.component';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { XButtonModule, XDialogModule, XInputModule, XLinkModule, XTableModule } from '@ng-nest/ui';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { ModifyqualificationComponent } from './modifyqualification/modifyqualification.component';



@NgModule({
  declarations: [CtoauditComponent, ModifyqualificationComponent],
  imports: [
    CommonModule 
    ,NgNestModule
    ,ShareModule 
    ,XButtonModule
    ,AuToolModule
    ,AuAdaptionModule
    ,XTableModule
    ,XDialogModule
    ,XLinkModule
    ,XInputModule
    ,CtoauditRoutingModule
  ]
})
export class CtoauditModule { }
