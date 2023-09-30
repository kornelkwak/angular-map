import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { MapModule } from './map.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MapModule,
    AppRoutingModule,
    HomeComponent,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
