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

const gl = {
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: PCFSoftShadowMap,
  //outputColorSpace: SRGBColorSpace,
  //toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" :fov="45" />
    <OrbitControls />
    <Unit />
    <TresMesh
      :position="[0, -0.5, 0]"
      :rotation="[-1.5, 0, 0]"
      :scale="[3, 3, 1]"
      receive-shadow
    >
      <TresPlaneGeometry />
      <TresShadowMaterial />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 5, 4]"
      :intensity="1.2"
      cast-shadow
      :shadow-mapSize="2024"
      :shadow-camera-left="-70"
      :shadow-camera-right="70"
      :shadow-camera-top="70"
      :shadow-camera-bottom="-70"
      :shadow-camera-near="0.5"
      :shadow-camera-far="1000"
    />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(192, 13, 88);
}
#app {
  height: 100%;
  width: 100%;
}
</style>
