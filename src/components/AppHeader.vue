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
            <SkeletonText v-else />
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
        <SkeletonText v-else />
      </nav>
      <form role="search" @submit.prevent="">
        <input v-model="searchQuery" type="search" name="search" placeholder="Название или автор" />
      </form>
    </div>
  </header>
</template>
<script setup>
import SkeletonText from '@/components/SkeletonText.vue';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useFiltersStore } from '@/stores/filters.js';

const filtersStore = useFiltersStore();
const { fetchCategories, fetchStatuses } = filtersStore;
const { searchQuery, categoriesList, currentCategoryId, statusList, onlyNew } =
  storeToRefs(filtersStore);

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
