<template>
  <HeaderComponent/>
  <ProfileInfo :username-git-hub="usernameGitHub" @userExists.once="handleExistence"/>
  <!-- Hack : Can't use a v-if, else handleExistence will never get call but using a v-show will not display the three.js canvas until a resize -->
  <!-- This is why we handle the conditional display of ProfileInfo inside its own component -->
  <ProfileRepo :username-git-hub="usernameGitHub" v-if="displayUserInfo"/>
  <InvalidUserComponent :username-git-hub="usernameGitHub" v-if="!isLoading && !displayUserInfo"/>
  <LoadingIcon v-if="isLoading"/>
  <FooterComponent/>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'
import ProfileRepo from '@/components/ProfileRepo.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import InvalidUserComponent from '@/components/InvalidUserComponent.vue'

export default {
  name: 'ProfilePage',
  components: { InvalidUserComponent, LoadingIcon, FooterComponent, ProfileRepo, ProfileInfo, HeaderComponent },
  props: {
    usernameGitHub: { type: String, required: true },
  },
  data: () => {
    return {
      displayUserInfo: false,
      isLoading: true,
    }
  },
  methods: {
    handleExistence (doesExist) {
      this.isLoading = false
      if (doesExist.data === true)
        this.displayUserInfo = true
    },
  },
}
</script>

<style scoped>

</style>