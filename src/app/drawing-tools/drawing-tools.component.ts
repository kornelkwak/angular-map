import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';


@Component({
  selector: 'app-drawing-tools',
  templateUrl: './drawing-tools.component.html',
  styleUrls: ['./drawing-tools.component.css'],
})
export class DrawingToolsComponent implements OnInit {
  options: MapOptions;
  drawOptions: LeafletDrawModule;

  constructor() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '...',
        }),
      ],
      zoom: 10,
      center: latLng(51.505, -0.09),
    };

    this.drawOptions = {
      position: 'topright', // Gdzie ma być umieszczone narzędzie rysowania
      draw: {
        marker: {
          icon: L.icon({ iconUrl: 'path/to/marker-icon.png' }),
        },
        polyline: {
          shapeOptions: {
            color: 'blue', // Kolor linii
          },
          metric: true, // Wybierz jednostki metryczne
        },
        // Dodaj inne narzędzia do rysowania
      },
    };
  }

  ngOnInit(): void {}
}
