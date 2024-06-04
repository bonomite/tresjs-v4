<script lang="ts" setup>
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three"
import * as THREE from "three"
import { TresCanvas } from "@tresjs/core"

const gl = {
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    opacity: { value: 0.5 }, // Adjust transparency
  },
  vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        uniform float opacity;

        varying vec2 vUv;

        void main() {
            // Removed the incorrect GL calls

            // Placeholder for shadow intensity calculation
            float shadowIntensity = 0.0; // You'll need to calculate this based on your shadow map
            gl_FragColor = mix(vec4(0.0, 0.0, 0.0, opacity), vec4(1.0, 1.0, 1.0, 1.0), shadowIntensity);
        }
    `,
  depthTest: true, // Enable depth testing
  depthWrite: true, // Enable depth writing
  side: THREE.DoubleSide, // Ensures the material reacts to shadows from both sides
})
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
      <!--       <TresShaderMaterial
        color="#FFFFFF"
        :vertex-shader="shaderMaterial.vertexShader"
        :fragment-shader="shaderMaterial.fragmentShader"
        :uniforms="shaderMaterial.uniforms"
      /> -->
      <TresShadowMaterial />
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
  background-color: rgb(192, 13, 88);
}
#app {
  height: 100%;
  width: 100%;
}
</style>
