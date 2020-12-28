import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputpricecaculateComponent } from './inputpricecaculate.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { XButtonModule, XCheckboxModule, XDialogModule, XInputModule, XLayoutModule, XTableModule, XTreeModule } from '@ng-nest/ui';
import { InputpriceRoutingModule } from './inputprice-routing';
import { QualificationModule } from 'src/main/qualification/qualification.module';
@NgModule({
  declarations: [InputpricecaculateComponent],
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    QualificationModule,
    AuToolModule,
    AuAdaptionModule,
    XLayoutModule,
    XInputModule,
    XTreeModule,
    XButtonModule,
    XTableModule,
    InputpriceRoutingModule,
    XDialogModule,
    XCheckboxModule
  ]
})
export class InputpricecaculateModule { }
