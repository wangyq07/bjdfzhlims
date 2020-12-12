import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutesModule } from './home-routes.module';
import { HomeComponent } from './home.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XButtonModule } from '@ng-nest/ui/button';
import { HomedetailComponent } from './homedetail/homedetail.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { HomeprintComponent } from './homeprint/homeprint.component';
@NgModule({
  imports: [CommonModule, ShareModule
            ,NgNestModule, AuAdaptionModule
                ,HomeRoutesModule
                ,XDatePickerModule
                ,XButtonModule
                ,XInputModule
              ,XCheckboxModule],
  declarations: [HomeComponent, HomedetailComponent, HomeprintComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
