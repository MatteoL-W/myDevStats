<template>
  <div class="card">
    <div class="card__info">
      <p>Hey <b>{{ usernameGitHub }}</b>, Want to attach some stats to your GitHub profile ?</p>
    </div>
    <div class="card__preview">
      <apexchart type="polarArea" :options="languageChartOptions" :series="languageSort[1]"
                 ref="languageChart" height="300px"/>
    </div>
    <div class="card__download">
      <a @click="download" href="#" ref="downloadButton">Download the image</a>
    </div>
  </div>
</template>

<script>
import { retrieveUserRepos } from '@/utils/github'

export default {
  name: 'CardPage',
  props: {
    usernameGitHub: { type: String, required: true },
  },

  data: () => {
    return {
      repositories: [],
    }
  },

  computed: {
    languageSort () {
      const counts = this.repositories.reduce((acc, { language }) => {
        if (!language) {
          return acc
        }
        acc[language] = (acc[language] || 0) + 1
        return acc
      }, {})

      const languages = Object.keys(counts)
      const amounts = Object.values(counts)

      return [languages, amounts]
    },

    languageChartOptions () {
      return {
        chart: {
          type: 'polarArea',
        },
        labels: this.languageSort[0],
        redrawOnWindowResize: true,
        stroke: {
          colors: ['#fff'],
        },
        fill: {
          opacity: 0.8,
        },
      }
    },
  },

  async created () {
    await this.loadRepositories()
  },

  methods: {
    async loadRepositories () {
      const cache = sessionStorage.getItem(this.usernameGitHub + '_30repositories')
      if (cache)
        this.repositories = JSON.parse(cache)
      else
        this.repositories = await this.fetchRepositories()
    },

    async fetchRepositories () {
      const response = await retrieveUserRepos(this.usernameGitHub, 0, 30)
      sessionStorage.setItem(this.usernameGitHub + '_30repositories', JSON.stringify(response))
      return response
    },

    download () {
      const paper = this.$refs.languageChart.chart.paper()
      const svg = paper.svg()
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      this.$refs.downloadButton.href = URL.createObjectURL(svgBlob)
      this.$refs.downloadButton.download = 'chart.svg'
    },
  }
  ,
//
}
</script>

<style scoped lang="scss">
.card {
  background: white;
  border-radius: $cardBorderRadius;
  box-shadow: $shadowDefault;
  padding: 20px;
  width: 100%;
  text-align: center;
  max-height: 80vh;

  &__preview {
    height: 100%;
  }
}
</style>