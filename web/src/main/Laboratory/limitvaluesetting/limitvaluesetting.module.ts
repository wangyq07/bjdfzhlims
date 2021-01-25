import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitvaluesettingComponent } from './limitvaluesetting.component';
import { LimitvaluesettingRoutingModule } from './limitvaluesetting-route';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { XButtonModule, XInputModule, XLayoutModule } from '@ng-nest/ui'; 
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
@NgModule({
  declarations: [LimitvaluesettingComponent],
  imports: [
    CommonModule,
    LimitvaluesettingRoutingModule,
    ShareModule,
    NgNestModule,
    XButtonModule,
    XLayoutModule
    ,AuToolModule
    ,AuAdaptionModule 
    ,XInputModule
  ]
})
export class LimitvaluesettingModule { }
