import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { mainStoreKey, mainReducer } from './core/store/main.store';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './core/store/main.effects';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ [mainStoreKey]: mainReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, autoPause: true }),
    EffectsModule.forRoot([ MainEffects ]),
    IonicStorageModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
