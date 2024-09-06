<template>
  <div class="loading-placeholder">
    <div class="loading-placeholder__shimmer"></div>
  </div>
</template>
<style scoped lang="scss">
.loading-placeholder {
  width: 360px;
  height: 30px;
  border-radius: var(--pico-border-radius);
  background-color: #bfc7d9;
  position: relative;

  &__shimmer {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  &__shimmer::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    animation: shimmer 1s infinite;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
