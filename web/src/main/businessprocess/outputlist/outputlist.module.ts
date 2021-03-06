import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputlistComponent } from './outputlist.component';
import { OutputlistRoutingModule } from './outputlist-route';
import { XCheckboxModule, XContainerModule, XLayoutModule } from '@ng-nest/ui';
import { NgNestModule } from 'src/share/ng-nest.module';
import { ShareModule } from 'src/share/share.module';



@NgModule({
  declarations: [OutputlistComponent],
  imports: [
    CommonModule,
    NgNestModule,
    ShareModule,
    XLayoutModule,
    XContainerModule,
    XCheckboxModule,
    OutputlistRoutingModule
  ],
  exports:[OutputlistComponent]
})
export class OutputlistModule { }
