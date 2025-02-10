declare module '@mapbox/mapbox-gl-geocoder' {
    import * as mapboxgl from 'mapbox-gl';
  
    export default class MapboxGeocoder {
      constructor(options: any);
      on(event: string, callback: Function): void;
      onAdd(map: mapboxgl.Map): HTMLElement;
    }
  }
  