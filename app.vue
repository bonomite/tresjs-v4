<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core"
</script>

<template>
  <TresCanvas window-size clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" :fov="45" />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
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
}
#app {
  height: 100%;
  width: 100%;
}
</style>
