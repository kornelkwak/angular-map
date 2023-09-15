import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { CoordinatesWidgetComponent } from './coordinates-widget/coordinates-widget.component'; 

@NgModule({
  declarations: [
    CoordinatesWidgetComponent,
  ],  
  exports: [
    LeafletModule,
    LeafletDrawModule,
  ]
})
export class MapModule {}