import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationComponent } from './qualification.component';
import { ShareModule } from 'src/share/share.module';
import { XButtonModule, XDialogModule, XIconModule, XInputModule, XSelectModule, XTagModule, XTreeModule } from '@ng-nest/ui';
import { NgNestModule } from 'src/share/ng-nest.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module'; 
import { QualificationRoutesModule } from './qualification-route';
import { AddqualificaitonComponent } from './addqualificaiton/addqualificaiton.component';
@NgModule({
  declarations: [QualificationComponent, AddqualificaitonComponent],
  imports: [
    CommonModule,
    ShareModule,
    XButtonModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule, 
    XSelectModule,
    XTreeModule,
    XDialogModule
    ,XIconModule
    ,XTagModule
    ,XInputModule
    ,QualificationRoutesModule
  ],
  exports:[CommonModule,QualificationComponent]
})
export class QualificationModule { }
