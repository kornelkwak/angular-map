import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { CoordinatesWidgetComponent } from './coordinates-widget/coordinates-widget.component'; 

@NgModule({
  declarations: [
    CoordinatesWidgetComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    LeafletModule,
    LeafletDrawModule,
    CoordinatesWidgetComponent
  ]
})
export class MapModule {}