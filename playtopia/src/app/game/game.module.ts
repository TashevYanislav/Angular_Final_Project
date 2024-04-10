import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DetailComponent } from './detail/detail.component';
import { StoreComponent } from './store/store.component';
import { GameRoutingModule } from './game-routing.module';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [AddGameComponent, DetailComponent, StoreComponent, EditComponent],
  imports: [CommonModule, GameRoutingModule, FormsModule],
})
export class GameModule {}
