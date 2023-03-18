<template>
  <div class="info__data" ref="threejs">
    <renderer ref="renderer" antialias orbit-ctrl resize="true" alpha>
      <camera :position="{ z: 10, y:3 }"></camera>
      <scene>
        <point-light :position="{ y: 50, z: 50 }"></point-light>
        <box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
          <lambert-material></lambert-material>
        </box>
      </scene>
    </renderer>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: "ProfileDataVisualization",
  props: {
    user: {type: Object, required: true},
  },
  mounted() {
    const scene = this.$refs.renderer.scene
    const renderer = this.$refs.renderer
    const box = this.$refs.box.mesh

    const size = 12;
    const divisions = 12;
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    renderer.onBeforeRender(() => {
      box.rotation.x += 0.01
    })
  }
}

</script>

<style scoped>

</style>