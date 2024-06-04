<script lang="ts" setup>
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three"
import { TresCanvas } from "@tresjs/core"

const gl = {
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
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
      :scale="[8, 8, 8]"
      receive-shadow
    >
      <TresPlaneGeometry />
      <MeshPhongMaterial color="#FFFFFF" />
    </TresMesh>
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
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
  background-color: red;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
