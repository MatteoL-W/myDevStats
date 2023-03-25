<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Enter a GitHub name..." v-model="searchbar">
    <input type="submit" class="material-symbols-outlined" value="search">
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => {
    return {
      searchbar: null,
    }
  },
  methods: {
    async handleSubmit() {
      await this.$router.push({path: `/${this.searchbar}`})
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

form {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-bottom: 15px;
  margin-top: 15px;

  input[type='text'] {
    border: 0;
    border-radius: $inputBorderRadius;
    outline: none;
    font-style: italic;
    padding: 10px;
    width: 85%;
    box-shadow: $shadowDefault;
  }

  input[type='submit'] {
    outline: none;
    display: flex;
    background-color: #74A3FF;
    border-radius: $inputBorderRadius;
    width: 10%;
    box-shadow: $shadowDefault;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: black;
  }
}
</style>