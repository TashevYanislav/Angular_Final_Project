import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  // {path:"",pathMatch:"full" , redirectTo: "/home"},
  { path: '', component: MainComponent },
  { path: 'about', component: AboutComponent },
  // {path:"**",redirectTo"/404"},
  // {path:"404",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
