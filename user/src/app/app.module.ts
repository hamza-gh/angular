import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAzSjx1S8eDYPBhmerX7F3YQxmD4J5ZNZs",
  authDomain: "user-8b74a.firebaseapp.com",
  databaseURL: "https://user-8b74a.firebaseio.com",
  projectId: "user-8b74a",
  storageBucket: "user-8b74a.appspot.com",
  messagingSenderId: "824439234060",
  appId: "1:824439234060:web:d0628b678a1072334f1829",
  measurementId: "G-FG22MFB8KN"
};
 
firebase.initializeApp(firebaseConfig);
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
