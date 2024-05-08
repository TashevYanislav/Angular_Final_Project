import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRowComponent } from './games-row/games-row.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { PopularGamesLoaderComponent } from './popular-games-loader/popular-games-loader.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    GamesRowComponent,
    LoaderComponent,
    PopularGamesLoaderComponent,
    ModalComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [GamesRowComponent, PopularGamesLoaderComponent],
})
export class SharedModule {}
