import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddflownodeComponent } from './addflownode/addflownode.component';
import { FlownodeRoutingModule } from './flownode-route'; 
 
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { FlownodeComponent } from './flownode.component';
import { XButtonModule, XFindModule, XFindPrefix, XInputModule, XLayoutModule, XSelectModule, XTableModule } from '@ng-nest/ui';


@NgModule({
  declarations: [FlownodeComponent,AddflownodeComponent],
  imports: [
    CommonModule,
    FlownodeRoutingModule
    ,ShareModule
    ,AuToolModule
    ,AuAdaptionModule
    ,NgNestModule
    ,XTableModule
    ,XLayoutModule
    ,XButtonModule
    ,XInputModule
    ,XFindModule
    ,XSelectModule
  ]
})
export class FlownodeModule { }
