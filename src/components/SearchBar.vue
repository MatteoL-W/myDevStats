<template>
  <div>
    <input type="text" placeholder="Enter a GitHub name..." v-model="searchbar">
    <a :href="searchbar" class="material-symbols-outlined">search</a>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => {
    return {
      searchbar: null,
    }
  }
}
</script>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

div {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-bottom: 15px;
  margin-top: 15px;

  input {
    border: 0;
    border-radius: $inputBorderRadius;
    outline: none;
    font-style: italic;
    padding: 10px;
    width: 85%;
    box-shadow: $shadowDefault;
  }

  a {
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