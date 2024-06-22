<template>
  <table v-if="booksList?.length" class="striped">
    <thead>
      <tr>
        <th>Автор</th>
        <th>Название</th>
        <th>Издательство</th>
        <th>Рейтинг</th>
        <th>Язык</th>
        <th>Год</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in booksList" :key="book.id">
        <td>{{ book.author }}</td>
        <td>{{ book.name }} <span v-if="book.is_new" class="badge badge--red">Новинка</span></td>
        <td>{{ book.publisher }}</td>
        <td>{{ book.rating }}</td>
        <td>{{ book.language.name }}</td>
        <td>{{ book.year }}</td>
        <td>{{ book.status.name }}</td>
      </tr>
    </tbody>
  </table>
  <p class="text-center" v-else-if="!isLoading">По данному запросу ничего не найдено</p>
  <p class="loading" :aria-busy="isLoading"></p>
  <span v-if="booksList?.length" ref="bottom"></span>
</template>
<script setup>
import { useBooksStore } from '@/stores/books';
import { useLoadingStore } from '@/stores/loading';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const bottom = ref(null);
const booksStore = useBooksStore();
const { fetchBooks } = booksStore;
const { booksList, hasMoreBooks } = storeToRefs(booksStore);

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);

useInfiniteScroll(bottom, async () => await fetchBooks(), {
  distance: 10,
  interval: 500,
  canLoadMore: () => hasMoreBooks.value
});
</script>
<style scoped>
.loading {
  width: 100%;
}
.badge {
  display: inline-block;
  font-size: 14px;
  padding: 0 7px;
  border-radius: 3px;
}
.badge--red {
  background-color: #ff0000;
  color: #ffffff;
}
.text-center {
  text-align: center;
}
</style>
