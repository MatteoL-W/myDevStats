<template>
  <span class="loading material-symbols-outlined">autorenew</span>
</template>

<script>
export default {
  name: 'LoadingIcon',
}
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  animation: infinite 2s linear rotating;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>