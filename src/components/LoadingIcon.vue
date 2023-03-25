<template>
  <div>
    <span class="loading material-symbols-outlined">autorenew</span>
  </div>
</template>

<script>
export default {
  name: 'LoadingIcon',
}
</script>

<style scoped>

div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.loading {
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