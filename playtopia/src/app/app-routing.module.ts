import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { StoreComponent } from './store/store.component';
import { AddGameComponent } from './add-game/add-game.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  // {path:"",pathMatch:"full" , redirectTo: "/home"},
  { path: 'home', component: MainComponent },
  { path: 'store', component: StoreComponent },
  { path: 'add_game', component: AddGameComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:"details",component:DetailComponent}
  // {path:"**",redirectTo"/404"},
  // {path:"404",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
