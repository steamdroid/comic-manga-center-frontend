<template>
  <header>
    <div class="container">
      <nav class="top-nav">
        <ul class="column-sm">
          <li>
            <select name="category" v-if="categoriesList?.length" v-model="currentCategoryId">
              <option v-for="category in categoriesList" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </li>
          <li>
            <label>
              <input name="only_new" type="checkbox" v-model="onlyNew" role="switch" />
              Только новинки
            </label>
          </li>
        </ul>
      </nav>
      <nav class="top-nav">
        <ul class="column-sm" v-if="statusList?.length">
          <li v-for="status in statusList" :key="status.id">
            <label>
              <input
                :name="'status_' + status.id"
                v-model="status.active"
                type="checkbox"
                role="switch"
              />
              <span>{{ status.name }}</span>
            </label>
          </li>
        </ul>
      </nav>
      <form role="search" @submit.prevent="clearAndFetch">
        <input v-model="searchQuery" type="search" name="search" placeholder="Название или автор" />
        <input type="submit" value="Найти" />
      </form>
    </div>
  </header>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useFiltersStore } from '@/stores/filters.js';
import { useBooksStore } from '@/stores/books.js';

const filtersStore = useFiltersStore();
const { fetchCategories, fetchStatuses } = filtersStore;
const { searchQuery, categoriesList, currentCategoryId, statusList, onlyNew } =
  storeToRefs(filtersStore);

const booksStore = useBooksStore();
const { clearAndFetch } = booksStore;

onBeforeMount(async () => {
  await fetchCategories();
  await fetchStatuses();
});
</script>
<style scoped lang="scss">
.top-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
