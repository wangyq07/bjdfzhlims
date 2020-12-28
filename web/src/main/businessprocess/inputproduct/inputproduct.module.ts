import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputproductComponent } from './inputproduct.component';
import { InputproductRoutingModule } from './inputproduct-routing';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { QualificationModule } from 'src/main/qualification/qualification.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { XButtonModule, XDialogModule, XInputModule, XLayoutModule, XTableModule, XTreeModule } from '@ng-nest/ui';



@NgModule({
  declarations: [InputproductComponent],
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
    XDialogModule,
    InputproductRoutingModule
  ]
})
export class InputproductModule { }
