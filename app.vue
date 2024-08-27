<script lang="ts" setup>
import RadioButton from "primevue/radiobutton"
import {
  BasicShadowMap,
  SRGBColorSpace,
  NoToneMapping,
  PCFSoftShadowMap,
  Vector3,
} from "three"
import * as THREE from "three"
import { TresCanvas, useLoader } from "@tresjs/core"
import { ref, computed } from "vue"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"
const gl = {
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: PCFSoftShadowMap,
  //outputColorSpace: SRGBColorSpace,
  //toneMapping: NoToneMapping,
}

//const { greenhouse } = await useLoader(GLTFLoader, "~/gtlf/greenhouse.glb")

// Variables for customization
const numOfUnits = ref(9) // Total number of units
let maxObjectsPerColumn = 1
let verticalPadding = 0.1 // Example value, adjust as needed
let horizontalPadding = 0.1 // Example value, adjust as needed
const unitSize = [1, 0.2, 1]
const structureSize = computed(() => {
  let columns = Math.ceil(Math.sqrt(numOfUnits.value / maxObjectsPerColumn))
  let rows = Math.ceil(numOfUnits.value / columns)
  const gridWidth = columns * (unitSize[0] + horizontalPadding) - horizontalPadding
  const gridHeight = rows * (unitSize[1] + verticalPadding) - verticalPadding
  const size = Math.max(gridWidth, gridHeight) / 2
  const scaleFactor = 2.2 // Adjust the scale factor as needed
  return [size * scaleFactor, (size / 4) * scaleFactor, size * scaleFactor]
})

const calcUnitsPosition = (index) => {
  let columns = Math.ceil(Math.sqrt(numOfUnits.value / maxObjectsPerColumn))
  let rows = Math.ceil(numOfUnits.value / columns)

  // Ensure rows are a multiple of maxObjectsPerColumn
  rows = Math.ceil(rows / maxObjectsPerColumn) * maxObjectsPerColumn

  // Calculate grid dimensions
  let gridWidth = columns * (unitSize[0] + horizontalPadding) - horizontalPadding
  let gridHeight = rows * (unitSize[1] + verticalPadding) - verticalPadding
  let gridDepth =
    Math.ceil(numOfUnits.value / (columns * maxObjectsPerColumn)) *
      (unitSize[2] + horizontalPadding) -
    horizontalPadding

  // Calculate center of the grid
  let centerX = gridWidth / 2
  let centerY = gridHeight / 2
  let centerZ = gridDepth / 2

  // Calculate position based on index, relative to the center
  let x =
    (index % columns) * (unitSize[0] + horizontalPadding) - horizontalPadding - centerX
  let y =
    (Math.floor(index / columns) % maxObjectsPerColumn) *
      (unitSize[1] + verticalPadding) -
    verticalPadding -
    centerY
  let z =
    Math.floor(index / (columns * maxObjectsPerColumn)) *
      (unitSize[2] + horizontalPadding) -
    horizontalPadding -
    centerZ

  return [x, y, z]
}
const structures = [
  {
    name: "Indoor",
    obj: "indoor.obj",
  },
  {
    name: "Outdoor",
    obj: "outdoor.obj",
  },
  {
    name: "Greenhouse",
    obj: "greenhouse.obj",
  },
]
const structureSelected = ref(structures[0].name)
</script>

<template>
  <div>
    <Button label="Check" icon="pi pi-check" />
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center" v-for="structure in structures">
        <RadioButton
          v-model="structureSelected"
          inputId="structure1"
          :name="structure.name"
          :value="structure.name"
        />
        <label for="structure1" class="ml-2">{{ structure.name }}</label>
      </div>
    </div>
    <h2>{{ numOfUnits }} Units</h2>
    <input
      type="number"
      min="9"
      max="1000"
      v-model="numOfUnits"
      style="width: 100%; z-index: 23023"
    />
    <div>
      <TresCanvas window-size v-bind="gl" style="top: 280px">
        <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" :fov="45" />
        <OrbitControls />
        <Unit
          v-for="(unit, index) in numOfUnits"
          :key="`unit-${index}`"
          :position="calcUnitsPosition(index)"
          LineBasicMaterial
          :size="unitSize"
        />
        <Room
          :type="structureSelected"
          :key="`unit-house`"
          :size="structureSize"
          color="#ffffff"
          :opacity="0.1"
          :position="[-0.6, -0.2, -0.6]"
        />
        <!-- <primitive :object="greenhosue" /> -->
        <!-- <TresMesh
          :position="[0, -0.19, 0]"
          :rotation="[-1.57, 0, 0]"
          :scale="[20, 20, 1]"
          receive-shadow
        >
          <TresPlaneGeometry />
          <TresShadowMaterial opacity="0.15" />
        </TresMesh> -->
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
