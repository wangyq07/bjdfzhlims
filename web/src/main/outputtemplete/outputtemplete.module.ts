import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterfoodsampleComponent } from './registersample/registerfoodsample/registerfoodsample.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { XLayoutModule } from '@ng-nest/ui';



@NgModule({
  declarations: [RegisterfoodsampleComponent],
  imports: [
    CommonModule
    ,ShareModule
    ,NgNestModule
    ,XLayoutModule
  ],
  exports:[RegisterfoodsampleComponent]
})
export class OutputtempleteModule { }
