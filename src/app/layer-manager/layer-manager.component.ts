import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Layer, TileLayer } from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';

interface Overlay {
  name: string;
  layer: Layer;
}

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.scss']
})
export class LayerManagerComponent {
  @Input() baseLayers: Overlay[] | undefined;
  @Input() overlays: Overlay[];
  @Input() selectedBaseLayer: string;
  @Input() selectedLayers: string[];
  @Output() baseLayerChange = new EventEmitter<string>();
  @Output() layerChange = new EventEmitter<{ layerName: string; isChecked: boolean }>();

  @ViewChild(LeafletDirective) leafletDirective!: LeafletDirective;

  onBaseLayerChange(layerName: string): void {
    this.baseLayerChange.emit(layerName);
  }

  onLayerChange(layerName: string, isChecked: boolean): void {
    this.layerChange.emit({ layerName, isChecked });
  }

  private updateBaseLayer(selectedBaseLayer: Layer): void {
    const map = this.leafletDirective.getMap();

    map.eachLayer((layer: Layer) => {
      if (layer instanceof TileLayer && layer !== selectedBaseLayer) {
        map.removeLayer(layer);
      }
    });

    if (!map.hasLayer(selectedBaseLayer)) {
      map.addLayer(selectedBaseLayer);
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

  private removeLayerByName(layerName: string): void {
    const map = this.leafletDirective.getMap();

    map.eachLayer((layer: Layer) => {
      if ((layer as any).options['layerName'] === layerName) {
        map.removeLayer(layer);
      }
    });
  }
}
