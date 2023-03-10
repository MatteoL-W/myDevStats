<template>
  <HeaderComponent></HeaderComponent>
  <ProfileInfo :username-git-hub="usernameGitHub"></ProfileInfo>
  <ProfileRepo :username-git-hub="usernameGitHub"></ProfileRepo>
  <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileRepo from "@/components/ProfileRepo.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: 'ProfilePage',
  components: {FooterComponent, ProfileRepo, ProfileInfo, HeaderComponent},
  props: {
    usernameGitHub: {type: String, required: true},
  },
}
</script>

<style scoped>

</style>