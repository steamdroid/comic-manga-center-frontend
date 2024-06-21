import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useFiltersStore } from '@/stores/filters';
import booksApi from '@/services/booksApi.js';

export const useBooksStore = defineStore('books', () => {
  const booksList = ref([]);
  const currentPage = ref(1);
  const lastPage = ref(null);

  const fetchBooks = async (loadNextPage = true) => {
    if (currentPage.value !== null && currentPage.value === lastPage.value) {
      return;
    }

    const { filterQs } = useFiltersStore();

    if (booksList.value.length && loadNextPage) {
      currentPage.value += 1;
    }

    const books = await booksApi.getBooks(filterQs + '&page=' + currentPage.value); // TODO refactor

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

  return {
    booksList,
    currentPage,
    hasMoreBooks,
    fetchBooks,
    clearAndFetch
  };
});
