import type { LayerSpecification } from "maplibre-gl";
import { Event, MapLibreEvent } from "maplibre-gl";
import MaplibreGlDirections from "./main";

export interface MaplibreGlDirectionsOptions {
  request: {
    [requestOption: string]: unknown;
  };
  layers: LayerSpecification[];
  pointsScalingFactor: number;
  linesScalingFactor: number;
  sensitiveWaypointLayers: string[];
  sensitiveSnappointLayers: string[];
  sensitiveRoutelineLayers: string[];
  sensitiveAltRoutelineLayers: string[];
  dragThreshold: number;
}

export const DefaultMaplibreGlDirectionsOptions: Omit<MaplibreGlDirectionsOptions, "layers"> = {
  request: {
    api: "https://api.mapbox.com/directions/v5/",
    profile: "mapbox/driving-traffic",
  },
  pointsScalingFactor: 1,
  linesScalingFactor: 1,
  sensitiveWaypointLayers: ["directions-waypoint", "directions-waypoint-casing"],
  sensitiveSnappointLayers: ["directions-snappoint", "directions-snappoint-casing"],
  sensitiveRoutelineLayers: ["directions-routeline", "directions-routeline-casing"],
  sensitiveAltRoutelineLayers: ["directions-alt-routeline", "directions-alt-routeline-casing"],
  dragThreshold: 10,
};

export interface Directions {
  code: "Ok" | "NoRoute" | "NoSegment" | "Forbidden" | "ProfileNotFound" | "InvalidInput";
  routes: Route[];
  uuid: string;
  waypoints: Waypoint[];
}

export type GeoJSONGeometry = { coordinates: [number, number][] };
export type PolylineGeometry = string;
export type Geometry = PolylineGeometry | GeoJSONGeometry;

export interface Route {
  geometry: Geometry;
  legs: Leg[];
}

export interface Leg {
  annotation?: {
    congestion?: ("unknown" | "low" | "moderate" | "heavy" | "severe")[];
    congestion_numeric?: (number | null)[];
  };
  steps: Step[];
}

export interface Step {
  maneuver: {
    location: [number, number];
  };
  geometry: Geometry;
}

export interface Waypoint {
  location: [number, number];
}