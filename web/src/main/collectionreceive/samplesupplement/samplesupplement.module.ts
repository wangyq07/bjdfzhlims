import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesupplementRoutingModule } from './samplesupplement-route';
import { SamplesupplementComponent } from './samplesupplement.component';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { XButtonModule, XDialogModule, XInputModule, XLayoutModule, XSelectModule } from '@ng-nest/ui';
import { UpdatesampleComponent } from './updatesample/updatesample.component';



@NgModule({
  declarations: [SamplesupplementComponent, UpdatesampleComponent],
  imports: [
    CommonModule
    ,NgNestModule
    ,ShareModule
    ,XLayoutModule
    ,XButtonModule
    ,XDialogModule
    ,XInputModule
    ,XSelectModule
    ,SamplesupplementRoutingModule
  ]
})
export class SamplesupplementModule { }
