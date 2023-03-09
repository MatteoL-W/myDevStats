<template>
  <HeaderComponent></HeaderComponent>
  <ProfileInfo :username-git-hub="usernameGitHub"></ProfileInfo>
  <ProfileRepo :username-git-hub="usernameGitHub"></ProfileRepo>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileRepo from "@/components/ProfileRepo.vue";

export default {
  name: 'ProfilePage',
  components: {ProfileRepo, ProfileInfo, HeaderComponent},
  props: {
    usernameGitHub: {type: String, required: true},
  },
}
</script>

<style scoped>

</style>