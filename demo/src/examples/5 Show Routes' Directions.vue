<template>
  <app-sidebar>
    <template #title>{{ name }}</template>

    <p>Another example that demonstrates the ease of extending the original styles provided by the plugin.</p>

    <p>This time a "symbol" layer is added that shows the direction the selected route goes in.</p>

    <small
      ><strong>Note</strong> that you have to manually load and add the images you intend to use for the custom layers
      you add</small
    >
  </app-sidebar>

  <div ref="mapRef" class="shadow-xl" />
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import AppSidebar from "../components/AppSidebar.vue";
  import maplibregl from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";
  import style from "../assets/map/style/style.json?url";
  import MaplibreGlDirections, { layersFactory } from "@maplibre/maplibre-gl-directions";
  import DirectionArrowImageSrc from "../assets/map/images/direction-arrow.png";

  const name = ref(useRoute().matched[0].name);

  const directions = ref<MaplibreGlDirections>();

  const mapRef = ref();
  onMounted(() => {
    const map = new maplibregl.Map({
      container: mapRef.value,
      style,
      center: [-74.1197632, 40.6974034],
      zoom: 11,
    });

    map.loadImage(DirectionArrowImageSrc, (error, image) => {
      if (!error && image) {
        map.addImage("direction-arrow", image);
      }
    });

    const layers = layersFactory();
    // add direction arrow
    layers.push({
      id: "maplibre-gl-directions-routeline-direction-arrow",
      type: "symbol",
      source: "maplibre-gl-directions",
      layout: {
        "symbol-placement": "line-center",
        "icon-image": "direction-arrow",
        "icon-size": ["interpolate", ["exponential", 1.5], ["zoom"], 12, 0.85, 18, 1.4],
      },
      paint: {
        "icon-opacity": 0.5,
      },
      filter: ["all", ["in", "$type", "LineString"], ["in", "route", "SELECTED"]],
    });

    map.on("load", () => {
      directions.value = new MaplibreGlDirections(map, {
        requestOptions: {
          alternatives: "true",
        },
        layers,
      });

      directions.value.interactive = true;
    });
  });
</script>
