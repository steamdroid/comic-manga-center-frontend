<template>
  <table class="striped">
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
        <td>{{ book.name }}</td>
        <td>{{ book.publisher }}</td>
        <td>{{ book.rating }}</td>
        <td>{{ book.language.name }}</td>
        <td>{{ book.year }}</td>
        <td>{{ book.status.name }}</td>
      </tr>
    </tbody>
  </table>
  <span ref="bottom"></span>
</template>
<script setup>
import { useBooksStore } from '@/stores/books';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const bottom = ref(null);
const booksStore = useBooksStore();
const { fetchBooks } = booksStore;
const { booksList, hasMoreBooks } = storeToRefs(booksStore);

useInfiniteScroll(bottom, async () => await fetchBooks(), {
  distance: 10,
  interval: 500,
  canLoadMore: () => hasMoreBooks.value
});
</script>
