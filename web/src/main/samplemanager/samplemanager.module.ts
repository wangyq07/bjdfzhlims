import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplebrowsetaskModule } from './samplebrowsetask/samplebrowsetask.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { XButtonModule, XLayoutModule } from '@ng-nest/ui';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
    ,SamplebrowsetaskModule  
  ]
})
export class SamplemanagerModule { }
