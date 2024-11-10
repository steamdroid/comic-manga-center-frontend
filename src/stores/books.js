import { ref, computed, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { watchDebounced } from '@vueuse/core';
import { useFiltersStore } from '@/stores/filters';
import { useLoadingStore } from '@/stores/loading';
import booksApi from '@/services/booksApi.js';

export const useBooksStore = defineStore('books', () => {
  const filtersStore = useFiltersStore();
  const { filterQs, isFiltersLoaded } = storeToRefs(filtersStore);

  const loadingStore = useLoadingStore();

  const booksList = ref([]);
  const currentPage = ref(1);
  const lastPage = ref(null);

  const fetchBooks = async (loadNextPage = true) => {
    if (currentPage.value !== null && currentPage.value === lastPage.value) {
      return;
    }

    if (booksList.value.length && loadNextPage) {
      currentPage.value += 1;
    }

    let books = [];

    loadingStore.startLoading();

    try {
      const params = new URLSearchParams({ filters: filterQs.value, page: currentPage.value });
      books = await booksApi.getBooks(`?${params.toString()}`);
    } catch (err) {
      console.error(err);
    }

    loadingStore.stopLoading();

    booksList.value = [...booksList.value, ...books.data];
    currentPage.value = books.current_page;
    lastPage.value = books.last_page;
  };

  const clearBooks = () => {
    booksList.value = [];
    currentPage.value = 1;
    lastPage.value = null;
  };

  const clearAndFetch = async () => {
    clearBooks();
    await fetchBooks(false);
  };

  const hasMoreBooks = computed(() => {
    if (lastPage.value === 1) {
      return false;
    }
    return lastPage.value === null || currentPage.value < lastPage.value;
  });

  loadingStore.startLoading();

  watch(
    isFiltersLoaded,
    async (newValue) => {
      if (newValue === true) {
        watchDebounced(filterQs, clearAndFetch, { debounce: 700, maxWait: 3000 });
        await clearAndFetch();
      }
    },
    { once: true }
  );

  return {
    booksList,
    currentPage,
    hasMoreBooks,
    fetchBooks,
    clearAndFetch
  };
});
