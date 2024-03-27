import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DetailComponent } from './detail/detail.component';
import { StoreComponent } from './store/store.component';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
  declarations: [AddGameComponent, DetailComponent, StoreComponent],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
