<template>
  <HeaderComponent/>
  <CardComponent :username-git-hub="usernameGitHub"/>
  <FooterComponent/>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import CardComponent from '@/components/CardComponent.vue'

export default {
  name: 'CardPage',
  components: { CardComponent, FooterComponent, HeaderComponent },
  props: {
    usernameGitHub: { type: String, required: true },
  },

  data: () => {
    return {
      repositories: [],
    }
  }, //
}
</script>

