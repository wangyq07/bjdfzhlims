import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolediscountRoutesModule } from './rolediscount-route';
import { RolediscountComponent } from './rolediscount.component';
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { NgNestModule } from 'src/share/ng-nest.module';



@NgModule({
  declarations: [RolediscountComponent],
  imports: [
    CommonModule
    ,RolediscountRoutesModule
    ,ShareModule
    ,AuToolModule
    ,AuAdaptionModule
    ,NgNestModule
  ]
})
export class RolediscountModule { }
