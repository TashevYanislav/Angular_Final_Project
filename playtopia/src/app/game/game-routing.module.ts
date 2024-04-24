import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { AddGameComponent } from './add-game/add-game.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { CartComponent } from './cart/cart.component';
import { authGuardNotLogged } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'store', component: StoreComponent },
  { path: 'add_game', component: AddGameComponent },
  { path: 'details/:id', component: DetailComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuardNotLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
