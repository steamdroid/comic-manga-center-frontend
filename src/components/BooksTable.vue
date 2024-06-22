<template>
  <div class="table-wrapper" v-if="booksList?.length">
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
          <td>
            <span :data-tooltip="book.comment">{{ book.name }}</span>
            <span v-if="book.is_new" class="badge badge--new">Новинка</span>
          </td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.rating }}</td>
          <td>{{ book.language.name }}</td>
          <td>{{ book.year }}</td>
          <td>
            <span
              :class="{
                'status-available': book.status.id === 1 || book.status.id === 4,
                'status--booked': book.status.id === 3
              }"
            >
              {{ book.status.name }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
  color: #ffffff;
}
.badge--new {
  background-color: #ff0000;
}
.status-available {
  color: #28a745;
}
.status-booked {
  background-color: #0172ad;
}
.text-center {
  text-align: center;
}
.table-wrapper {
  max-width: 100%;
  overflow-x: scroll;
}
</style>
