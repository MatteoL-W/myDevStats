<template>
  <div class="info__data" ref="threejs">
    <Renderer ref="renderer" antialias orbit-ctrl resize="true" alpha>
      <Camera :position="{ z: 11, y: 4 }"></Camera>
      <Scene ref="scene">
        <AmbientLight :intensity="0.4"></AmbientLight>
        <PointLight :position="{ y: 10, z: 10 }" :intensity="0.4"></PointLight>

        <Text v-if="selectedRepo" :text="selectedRepo.full_name"
              font-src="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
              align="center"
              :size="1"
              :height="0.2"
              :position="{ x: 0, y: 3, z: 0 }"
              :cast-shadow="true"
        >
          <PhongMaterial color="#ff0000"/>
        </Text>

        <Text v-if="selectedRepo" :text="selectedRepo.language + ' project'"
              font-src="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
              align="center"
              :size="1"
              :height="0.2"
              :position="{ x: 0, y: 1.5, z: 0 }"
              :cast-shadow="true"
        >
          <PhongMaterial color="#ff0000"/>
        </Text>

        <Sphere v-for="(commit, index) in sortedCommits" :key="commit.name" :radius="0.3"
                :position="{ x: index - (sortedCommits.length/2) + 0.5, y: commit.commits, z: 0 }">
          <PhongMaterial color="#ff0000"/>
        </Sphere>
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import { eventBus } from '@/utils/event-bus-profile.js'
import { octokit } from '@/services/api/octokit'

export default {
  name: 'ProfileDataVisualization',
  data () {
    return {
      selectedRepo: null,
      latestCommits: [],
      sortedCommits: [],
    }
  },
  props: {
    username: { type: String, required: true },
  },
  async mounted () {

    eventBus.on('repo-selected', async repo => {
      this.sortedCommits = []
      this.selectedRepo = repo

      const latestCommits = await octokit.request('GET /repos/{owner}/{repo}/commits?author={username}',
          { owner: repo.owner.login, repo: repo.name, username: this.username })
      this.latestCommits = latestCommits.data

      await this.latestCommits.forEach((commit) => {
        const date = new Date(commit.commit.committer.date).toLocaleDateString()
        const dateLine = this.sortedCommits.find(dayStat => dayStat.date === date)

        if (dateLine) dateLine.commits += 1
        else this.sortedCommits.push({ date, commits: 1 })
      })
    })
  },
}

</script>

<style scoped>

</style>