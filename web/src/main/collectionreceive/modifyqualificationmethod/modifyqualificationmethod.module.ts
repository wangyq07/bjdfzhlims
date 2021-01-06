import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyqualificationmethodComponent } from './modifyqualificationmethod.component';
import { ModifyqualificationmethodRoutingModule } from './modifyqualificationmethod-route';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { XButtonModule, XDialogModule, XInputModule, XLayoutModule, XSelectModule, XTableModule, XTreeModule } from '@ng-nest/ui';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { AddmethodqualificationComponent } from './addmethodqualification/addmethodqualification.component';
 



@NgModule({
  declarations: [ModifyqualificationmethodComponent, AddmethodqualificationComponent],
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    XButtonModule,
    XTreeModule,
    XLayoutModule,
    XTableModule,
    AuToolModule,
    AuAdaptionModule,
    XInputModule,
    XSelectModule,
    XDialogModule,
    ModifyqualificationmethodRoutingModule
  ]
})
export class ModifyqualificationmethodModule { }
