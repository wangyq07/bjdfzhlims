import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplereceiveComponent } from './samplereceive.component';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';
import { SamplereceiveRoutingModule } from './samplereceive-route';
import { XButtonModule, XDatePickerModule, XInputModule, XInputNumberModule, XLayoutModule, XSelectModule, XTableModule, XTreeModule } from '@ng-nest/ui';
import { OutputtempleteModule } from 'src/main/outputtemplete/outputtemplete.module';



@NgModule({
  declarations: [SamplereceiveComponent],
  imports: [
    CommonModule
    ,SamplereceiveRoutingModule
    ,NgNestModule
    ,ShareModule
    ,XTableModule
    ,XLayoutModule
    ,XTreeModule
    ,XInputModule
    ,XButtonModule
    ,XDatePickerModule
    ,XSelectModule
    ,OutputtempleteModule
    ,XInputNumberModule
  ]
})
export class SamplereceiveModule { }
