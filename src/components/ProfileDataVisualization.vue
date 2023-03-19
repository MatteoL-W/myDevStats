<template>
  <div class="info__data" ref="threejs">
    <renderer ref="renderer" antialias orbit-ctrl resize="true" alpha>
      <camera :position="{ z: 10, y:3 }"></camera>
      <scene>
        <point-light :position="{ y: 50, z: 50 }"></point-light>
        <box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
          <LambertMaterial />
        </box>
        <Text v-if="selectedRepo" :text="selectedRepo.name"
            font-src="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
            align="center"
            :size="1"
            :height="0.5"
            :position="{ x: 0, y: 3, z: 0 }"
            :cast-shadow="true"
        >
          <PhongMaterial />
        </Text>
      </scene>
    </renderer>
  </div>
</template>

<script>
import { eventBus } from '@/utils/event-bus-profile.js'

export default {
  name: "ProfileDataVisualization",
  data() {
    return {
      selectedRepo: null,
      exist: true,
    }
  },
  props: {
    username: {type: String, required: true},
  },
  mounted() {
    eventBus.on('repo-selected', repo => {
      this.selectedRepo = repo
    })

    const renderer = this.$refs.renderer
    const box = this.$refs.box.mesh

    renderer.onBeforeRender(() => {
      box.rotation.x += 0.01
    })

    //retrieveRepoInfo(this.username, "arkulib").then((result) => {console.log(result)})
  },
}

</script>

<style scoped>

</style>