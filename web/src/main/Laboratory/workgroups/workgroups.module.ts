import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkgroupsComponent } from './workgroups.component';
import { WorkgroupsRoutingModule } from './workgroups-route';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { XButtonModule, XLayoutModule } from '@ng-nest/ui';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';



@NgModule({
  declarations: [WorkgroupsComponent],
  imports: [
    CommonModule,
    WorkgroupsRoutingModule,
    ShareModule,
    NgNestModule,
    XButtonModule
    ,XLayoutModule 
    ,AuToolModule
    ,AuAdaptionModule 
  ]
})
export class WorkgroupsModule { }
