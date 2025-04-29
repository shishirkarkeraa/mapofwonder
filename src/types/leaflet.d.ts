/**
 * Type declarations to support leaflet and react-leaflet
 */

import { type ReactNode } from 'react';
import { type LatLngExpression, type Icon, type LeafletEventHandlerFnMap } from 'leaflet';

declare module 'react-leaflet' {
  export interface MapContainerProps {
    children: ReactNode;
    center?: LatLngExpression;
    zoom?: number;
    style?: React.CSSProperties;
  }

  export interface TileLayerProps {
    url: string;
    attribution?: string;
  }

  export interface MarkerProps {
    position: LatLngExpression;
    icon?: Icon;
    eventHandlers?: LeafletEventHandlerFnMap;
    children?: ReactNode;
  }

  export interface PopupProps {
    children: ReactNode;
  }
}
