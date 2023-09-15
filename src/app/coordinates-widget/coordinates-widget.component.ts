import { Component, Input } from '@angular/core';
import proj4 from 'proj4';

const coordinateDefs: { [key: string]: string } = {
  'EPSG:2178': '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs',
  'EPSG:2180': '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs',
  'EPSG:32433': '+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
  'EPSG:4326': '+proj=longlat +datum=WGS84 +no_defs'
};

for (const epsg in coordinateDefs) {
  proj4.defs(epsg, coordinateDefs[epsg]);
}

enum CoordinateFormat {
  Decimal = 'Decimal',
  DegreesMinutesSeconds = 'DegreesMinutesSeconds'
}

@Component({
  selector: 'app-coordinates-widget',
  templateUrl: './coordinates-widget.component.html',
  styleUrls: ['./coordinates-widget.component.scss']
})
export class CoordinatesWidgetComponent {
  @Input() currentCoordinates: string = '';
  selectedFormat: CoordinateFormat = CoordinateFormat.Decimal;
  selectedEpsg: string = 'EPSG:4326'; // Domyślny kod EPSG (WGS 84)

  convertCoordinates(): string {
    const sourceEpsg = 'EPSG:4326'; // Aktualny układ współrzędnych (np. WGS 84)
    const targetEpsg = this.selectedEpsg; // Układ współrzędnych wybrany z dropdown listy

    const coordinates = this.currentCoordinates.split(', ');

    if (!Number.isFinite(Number(coordinates[1])) || !Number.isFinite(Number(coordinates[0]))) {
      return 'Invalid coordinates';
    }
    
    const [lng, lat] = proj4(sourceEpsg, targetEpsg).forward([Number(coordinates[1]), Number(coordinates[0])]);
  
    return `X: ${lat.toFixed(6)}, Y: ${lng.toFixed(6)}`;
  }
}