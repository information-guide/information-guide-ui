import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGuideComponent } from './view-guide/view-guide.component';
import { AddInformationComponent } from './add-information/add-information.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [{
    path: "",
    redirectTo: 'dashboard', 
    pathMatch: 'full'
}, {
  path: 'dashboard',
  component: MainDashboardComponent,
  children: [
    {
      path: 'view-guide',
      component: ViewGuideComponent
    }, {
      path: 'add-information',
      component: AddInformationComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
