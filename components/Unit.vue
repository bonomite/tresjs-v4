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
var props = defineProps({
  position: {
    type: Object as () => Vector3,
    default: () => new Vector3(0, 0, 0),
  },
  size: {
    type: Object as () => Vector3,
    default: () => new Vector3(1, 1, 1),
  },
  color: {
    type: String,
    default: "orange",
  },
  opacity: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <TresMesh cast-shadow receive-shadow :position="props.position">
    <TresBoxGeometry :args="props.size" />
    <MeshPhongMaterial :color="props.color" :opacity="props.opacity" transparent />
  </TresMesh>
</template>

<style></style>
