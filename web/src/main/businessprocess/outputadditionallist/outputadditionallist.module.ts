import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputadditionallistComponent } from './outputadditionallist.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';



@NgModule({
  declarations: [OutputadditionallistComponent],
  imports: [
    CommonModule
    ,ShareModule
    ,NgNestModule
  ],
  exports:[OutputadditionallistComponent]
})
export class OutputadditionallistModule { }
