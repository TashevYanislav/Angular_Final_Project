import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:"",pathMatch:"full" , redirectTo: "/"},
  { path: '', component: MainComponent },
  { path: 'about', component: AboutComponent },
  {path:"**",redirectTo:"/404"},
  {path:"404",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
