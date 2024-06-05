<script lang="ts" setup>
import { Vector3 } from "three"

var props = defineProps({
  position: {
    type: Vector3,
    required: true,
    default: [0, 0, 0],
  },
})
</script>

<template>
  <TresMesh cast-shadow :position="props.position">
    <TresBoxGeometry :args="[1.5, 0.75, 1]" />
    <MeshPhongMaterial color="orange" />
  </TresMesh>
</template>

<style></style>
