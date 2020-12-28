import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputqualificationComponent } from './inputqualification.component';
import { InputQualificationRoutesModule } from './qualification-route';
import { QualificationModule } from 'src/main/qualification/qualification.module';



@NgModule({
  declarations: [InputqualificationComponent],
  imports: [
    CommonModule,
    QualificationModule,
    InputQualificationRoutesModule
  ]
})
export class InputqualificationModule { }
