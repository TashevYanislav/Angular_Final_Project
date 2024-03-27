import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user-router.module';
import { GameModule } from './game/game.module';
import { GameRoutingModule } from './game/game-routing.module';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [AppComponent, MainComponent, AboutComponent, ErrorComponent],
  imports: [
    BrowserModule,
    UserModule,
    CoreModule,
    GameModule,
    UserRoutingModule,
    GameRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
