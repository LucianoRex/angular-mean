import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './layout/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { environment } from 'src/environments/environment';


//import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';


import localePtBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LayoutComponent
  ],
  imports: [    
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,       

  //  AngularFireModule.initializeApp(environment.firebase),
  //  AngularFireDatabaseModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
