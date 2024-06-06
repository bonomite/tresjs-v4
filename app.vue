<script lang="ts" setup>
import {
  BasicShadowMap,
  SRGBColorSpace,
  NoToneMapping,
  PCFSoftShadowMap,
  Vector3,
} from "three"
import * as THREE from "three"
import { TresCanvas } from "@tresjs/core"
import { ref, computed } from "vue"
const gl = {
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: PCFSoftShadowMap,
  //outputColorSpace: SRGBColorSpace,
  //toneMapping: NoToneMapping,
}

// Variables for customization
let maxObjectsPerColumn = 3
let verticalPadding = 0.1 // Example value, adjust as needed
let horizontalPadding = 0.1 // Example value, adjust as needed
const numOfUnits = ref(29) // Total number of units
const unitSize = [1.5, 0.75, 1]

const calcUnitsPosition = (index) => {
  // Determine the number of columns and rows based on the total number of units
  let columns = Math.ceil(Math.sqrt(numOfUnits.value / maxObjectsPerColumn))
  let rows = Math.ceil(numOfUnits.value / columns)

  // Ensure rows are a multiple of maxObjectsPerColumn
  rows = Math.ceil(rows / maxObjectsPerColumn) * maxObjectsPerColumn

  // Calculate position based on index
  let x = (index % columns) * (unitSize[0] + horizontalPadding)
  let y =
    (Math.floor(index / columns) % maxObjectsPerColumn) * (unitSize[1] + verticalPadding)
  let z =
    Math.floor(index / (columns * maxObjectsPerColumn)) *
    (unitSize[2] + horizontalPadding)

  return [x, y, z]
}
</script>

<template>
  <h2>{{ numOfUnits }} Units</h2>
  <input
    type="number"
    min="1"
    max="200"
    v-model="numOfUnits"
    style="width: 100%; z-index: 23023"
  />
  <div>
    <TresCanvas window-size v-bind="gl" style="top: 80px">
      <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" :fov="45" />
      <OrbitControls />
      <Unit
        v-for="(unit, index) in numOfUnits"
        :key="`unit-${index}`"
        :position="calcUnitsPosition(index)"
        :size="unitSize"
      />
      <TresMesh
        :position="[0, -0.39, 0]"
        :rotation="[-1.57, 0, 0]"
        :scale="[20, 20, 1]"
        receive-shadow
      >
        <TresPlaneGeometry />
        <TresShadowMaterial opacity="0.35" />
      </TresMesh>
      <TresDirectionalLight
        :position="[-4, 5, 4]"
        :intensity="1.2"
        cast-shadow
        :shadow-mapSize="2024"
        :shadow-camera-left="-70"
        :shadow-camera-right="70"
        :shadow-camera-top="70"
        :shadow-camera-bottom="-70"
        :shadow-camera-near="0.5"
        :shadow-camera-far="1000"
        color="#ffffff"
      />
      <TresAmbientLight :intensity="0.5" />
    </TresCanvas>
  </div>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
