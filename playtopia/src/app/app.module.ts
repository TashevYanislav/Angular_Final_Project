import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { StoreComponent } from './store/store.component';
import { AddGameComponent } from './add-game/add-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StoreComponent,
    AddGameComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
