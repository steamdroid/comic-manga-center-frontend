<template>
  <AppHeader />
  <main>
    <div class="container">
      <BooksTable />
    </div>
  </main>
  <UpButton />
</template>
<script setup>
import AppHeader from './components/AppHeader.vue';
import BooksTable from './components/BooksTable.vue';
import UpButton from './components/UpButton.vue';
</script>
<style lang="scss"></style>
