<script lang="ts" setup>
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, PCFSoftShadowMap } from "three"
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
    <TresMesh cast-shadow>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <MeshPhongMaterial color="orange" />
    </TresMesh>
    <TresMesh
      :position="[0, -2, 0]"
      :rotation="[-1.5, 0, 0]"
      :scale="[18, 18, 18]"
      receive-shadow
    >
      <TresPlaneGeometry />
      <TresShadowMaterial />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1.2"
      cast-shadow
      :shadow-mapSize="1024"
      :shadow-camera-left="-200"
      :shadow-camera-right="200"
      :shadow-camera-top="200"
      :shadow-camera-bottom="-200"
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
