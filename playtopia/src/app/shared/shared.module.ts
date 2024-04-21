import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRowComponent } from './games-row/games-row.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [GamesRowComponent, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [GamesRowComponent],
})
export class SharedModule {}
