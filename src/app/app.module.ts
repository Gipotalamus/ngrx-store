import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import {privateReducer, publicReducer} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { FirstWindowComponent } from './first-window/first-window.component';
import { SecondWindowComponent } from './second-window/second-window.component';
import { ThirdWindowComponent } from './third-window/third-window.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstWindowComponent,
    SecondWindowComponent,
    ThirdWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({publicMessage: publicReducer, privateMessage: privateReducer}),
      StoreDevtoolsModule.instrumentOnlyWithExtension({
        maxAge: 5
      })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
