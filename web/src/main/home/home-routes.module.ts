import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import{HomedetailComponent} from "./homedetail/homedetail.component";
import { HomeprintComponent } from './homeprint/homeprint.component';
const routes: Routes = [
  
    {path: "", component: HomeComponent},
    {path:":type/:id",component: HomedetailComponent} ,
    {path:":key",component:HomeprintComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutesModule {}
