import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { tileLayer, latLng, circle, polygon, marker, Layer, Polygon, Circle, TileLayer, FeatureGroup, featureGroup, DrawEvents } from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawDirective } from '@asymmetrik/ngx-leaflet-draw';

interface Overlay {
  name: string;
  layer: Layer;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  layerPanelActive = false;
  drawnItems: FeatureGroup = featureGroup();

drawOptions = {
	edit: {
		featureGroup: this.drawnItems
	}
};

public onDrawCreated(e: any) {
	this.drawnItems.addLayer((e as DrawEvents.Created).layer);
}
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };
  selectedBaseLayer: string = 'Open Street Map'; // Domyślna warstwa bazowa

  baseLayersControl = [
    { name: 'Open Street Map', layer: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }) },
    { name: 'Open Cycle Map', layer: tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }) }
    // Dodaj inne warstwy bazowe
  ];
  overlays: Overlay[] = [
    { name: 'Big Circle', layer: circle([46.95, -122], { radius: 5000 }) },
    { name: 'Big Square', layer: polygon([
      [46.8, -121.55],
      [46.9, -121.55],
      [46.9, -121.7],
      [46.8, -121.7]
    ]) },
    { name: 'Drawn items', layer: this.drawnItems}
  ];

  selectedLayers: string[] = [];

  currentCoordinates: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onMapMove(event: MouseEvent): void {
    const latLng = this.leafletDirective.getMap().mouseEventToLatLng(event);
    this.currentCoordinates = `${latLng.lat.toFixed(6)}, ${latLng.lng.toFixed(6)}`;
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  toggleLayerPanel(): void {
    this.layerPanelActive = !this.layerPanelActive;
  }

  @ViewChild(LeafletDirective) leafletDirective!: LeafletDirective;

  onBaseLayerChange(layerName: string): void {
    this.selectedBaseLayer = layerName;
    this.updateBaseLayer();
  }

  private updateBaseLayer(): void {
    const map = this.leafletDirective.getMap();
    const selectedBaseLayer = this.baseLayersControl.find(layer => layer.name === this.selectedBaseLayer)?.layer;

    if (selectedBaseLayer) {
      map.eachLayer((layer: Layer) => {
        if (layer instanceof TileLayer && layer !== selectedBaseLayer) {
          map.removeLayer(layer);
        }
      });

      if (!map.hasLayer(selectedBaseLayer)) {
        map.addLayer(selectedBaseLayer);
      }
    }
  }

  private updateMapLayers(): void {
    const map = this.leafletDirective.getMap();

    map.eachLayer((layer: Layer) => {
      if (!(layer instanceof TileLayer)) {
        map.removeLayer(layer);
      }
    });
  
    for (const overlay of this.overlays) {
      if (this.selectedLayers.includes(overlay.name)) {
        map.addLayer(overlay.layer);
      }
    }
  }

  onLayerChange(event: any, layerName: string): void {
    const isChecked = event as boolean;

    if (isChecked) {
      this.selectedLayers.push(layerName);
    } else {
      this.selectedLayers = this.selectedLayers.filter(l => l !== layerName);
      this.removeLayerByName(layerName);
    }

    this.updateMapLayers();
  }

  private removeLayerByName(layerName: string): void {
    const map = this.leafletDirective.getMap();

    map.eachLayer((layer: Layer) => {
      if ((layer as any).options['layerName'] === layerName) {
        map.removeLayer(layer);
      }
    });
  }

};
