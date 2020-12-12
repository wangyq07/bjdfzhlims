import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesupplementRoutingModule } from './samplesupplement-route';
import { SamplesupplementComponent } from './samplesupplement.component';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { XButtonModule, XLayoutModule } from '@ng-nest/ui';



@NgModule({
  declarations: [SamplesupplementComponent],
  imports: [
    CommonModule
    ,NgNestModule
    ,ShareModule
    ,XLayoutModule
    ,XButtonModule
    ,SamplesupplementRoutingModule
  ]
})
export class SamplesupplementModule { }
