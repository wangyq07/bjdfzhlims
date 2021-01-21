import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleregisterComponent } from './sampleregister.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { SampleregisterRoutingModule } from './sampleregister-route';
import { XButtonModule, XDatePickerModule, XInputNumberModule, XLayoutModule, XTableModule } from '@ng-nest/ui'; 
import { OutputtempleteModule } from 'src/main/outputtemplete/outputtemplete.module';
@NgModule({
  declarations: [SampleregisterComponent],
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    SampleregisterRoutingModule,
    XTableModule,
    XButtonModule
    ,XDatePickerModule 
    ,OutputtempleteModule
    ,XInputNumberModule
    ,OutputtempleteModule
  ]
})
export class SampleregisterModule { }
