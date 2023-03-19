<template>
  <div class="info__data" ref="threejs">
    <Renderer ref="renderer" antialias orbit-ctrl resize="true" alpha>
      <Camera :position="{ z: 11, y: 4 }"></Camera>
      <Scene ref="scene">
        <AmbientLight :intensity="0.4"></AmbientLight>
        <PointLight :position="{ y: 10, z: 10 }" :intensity="0.4"></PointLight>

        <Text v-if="selectedRepo" :text="selectedRepo.name"
              font-src="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
              align="center"
              :size="1"
              :height="0.2"
              :position="{ x: 0, y: 3, z: 0 }"
              :cast-shadow="true"
        >
          <PhongMaterial color="#ff0000"/>
        </Text>

        <Sphere v-for="(commit, index) in latestCommits" :key="commit.name" :radius="0.3"
                :position="{ x: index - (latestCommits.length/2) + 0.5, y: 0, z: 0 }">
          <PhongMaterial color="#ff0000"/>
        </Sphere>
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import {eventBus} from '@/utils/event-bus-profile.js'
import {octokit} from "@/services/api/octokit";
import * as THREE from "three";

export default {
  name: "ProfileDataVisualization",
  data() {
    return {
      selectedRepo: null,
      latestCommits: [],
    }
  },
  props: {
    username: {type: String, required: true},
  },
  async mounted() {
    const scene = this.$refs.scene

    eventBus.on('repo-selected', async repo => {
      this.selectedRepo = repo

      const latestCommits = await octokit.request('GET /repos/{owner}/{repo}/commits?author={username}', { owner: repo.owner.login, repo: repo.name, username: this.username })
      this.latestCommits = latestCommits.data
      //console.log(this.latestCommits)

      const gridHelper = new THREE.GridHelper( Math.min(this.latestCommits.length, 30), Math.min(this.latestCommits.length, 30) );
      scene.add( gridHelper );
    })
  },
}

</script>

<style scoped>

</style>