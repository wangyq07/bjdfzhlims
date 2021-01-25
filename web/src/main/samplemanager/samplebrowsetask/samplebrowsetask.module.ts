import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplebrowsetaskComponent } from './samplebrowsetask.component';
import { SamplebrowsetaskRoutingModule } from './samplebrowsetask-route';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { XButtonModule, XLayoutModule } from '@ng-nest/ui';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module'; 
@NgModule({
  declarations: [SamplebrowsetaskComponent],
  imports: [
    CommonModule
    ,SamplebrowsetaskRoutingModule
    ,NgNestModule
    ,ShareModule  
    ,XLayoutModule
    ,XButtonModule
    ,AuToolModule
    ,AuAdaptionModule 
  ]
})
export class SamplebrowsetaskModule { }
