<template>
  <AppHeader />
  <main x-data>
    <div class="container">
      <BooksTable />
    </div>
  </main>
</template>
<script setup>
import AppHeader from './components/AppHeader.vue';
import BooksTable from './components/BooksTable.vue';
</script>
<style lang="scss"></style>
