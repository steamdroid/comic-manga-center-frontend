<template>
  <button
    type="button"
    class="up"
    :class="{
      'up--visible': showButton
    }"
    @click="backToTop"
    title="Наверх"
  ></button>
</template>
<script setup>
import { computed } from 'vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();

const showButton = computed(() => y.value > 100);

const backToTop = () => (y.value = 0);
</script>
<style scoped lang="scss">
.up {
  padding: 0;
  margin: 0;
  display: none;
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  background-color: #0172ad;
  border-radius: 3px;
  cursor: pointer;

  &::after {
    content: '';
    width: 15px;
    height: 15px;
    border: 2px solid #ffffff;
    border-bottom-color: transparent;
    border-right-color: transparent;
    transform: rotate(45deg);
    top: 12px;
    right: 6px;
    display: block;
    position: absolute;
  }

  &--visible {
    display: block !important;
  }
}
</style>
