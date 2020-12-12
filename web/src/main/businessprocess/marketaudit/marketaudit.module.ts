import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketauditComponent } from './marketaudit.component';
import { MarketauditRoutingModule } from './marketaudit-route';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { XButtonModule, XInputModule, XTableModule } from '@ng-nest/ui';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';



@NgModule({
  declarations: [MarketauditComponent],
  imports: [
    CommonModule
    ,NgNestModule
    ,ShareModule 
    ,XButtonModule
    ,AuToolModule
    ,AuAdaptionModule
    ,XTableModule
    ,MarketauditRoutingModule
  ]
})
export class MarketauditModule { }
