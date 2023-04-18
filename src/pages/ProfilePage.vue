<template>
  <HeaderComponent></HeaderComponent>
  <ProfileInfo :username-git-hub="usernameGitHub" v-show="displayUserInfo" @userExists.once="handleExistence"></ProfileInfo>
  <ProfileRepo :username-git-hub="usernameGitHub" v-if="displayUserInfo"></ProfileRepo>
  <InvalidUserComponent :username-git-hub="usernameGitHub" v-if="!isLoading && !displayUserInfo"></InvalidUserComponent>
  <LoadingIcon v-if="isLoading"></LoadingIcon>
  <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileRepo from "@/components/ProfileRepo.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import InvalidUserComponent from "@/components/InvalidUserComponent.vue";

export default {
  name: 'ProfilePage',
  components: {InvalidUserComponent, LoadingIcon, FooterComponent, ProfileRepo, ProfileInfo, HeaderComponent},
  props: {
    usernameGitHub: {type: String, required: true},
  },
  data: () => {
    return {
      displayUserInfo: false,
      isLoading: true,
    }
  },
  methods: {
    handleExistence(doesExist) {
      this.isLoading = false
      if (doesExist.data === true)
        this.displayUserInfo = true
    }
  },
}
</script>

<style scoped>

</style>