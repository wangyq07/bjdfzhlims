import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleauditsetComponent } from './roleauditset.component';
import { RoleauditsetRoutesModule } from './roleauditset-route';
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { NgNestModule } from 'src/share/ng-nest.module'; 
import { XFormModule } from '@ng-nest/ui';
@NgModule({
  declarations: [RoleauditsetComponent],
  imports: [
    CommonModule,RoleauditsetRoutesModule
    ,ShareModule
    ,AuToolModule
    ,AuAdaptionModule
    ,XFormModule
    ,NgNestModule
  ]
})
export class RoleauditsetModule { }
