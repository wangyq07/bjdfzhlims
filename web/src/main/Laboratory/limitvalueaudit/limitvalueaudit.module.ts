import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitvalueauditComponent } from './limitvalueaudit.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { LimitvalueauditRoutingModule } from './limitvalueaudit-route';
import { XLayoutModule } from '@ng-nest/ui';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';



@NgModule({
  declarations: [LimitvalueauditComponent],
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    LimitvalueauditRoutingModule,
    XLayoutModule 
    ,AuToolModule
    ,AuAdaptionModule 
  ]
})
export class LimitvalueauditModule { }
