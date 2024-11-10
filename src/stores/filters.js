import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { stringify } from 'qs';
import booksApi from '@/services/booksApi.js';

export const useFiltersStore = defineStore('filters', () => {
  const categoriesList = ref(null);
  const currentCategoryId = ref(1);
  const isCategoriesLoaded = ref(false);
  const isStatusesLoaded = ref(false);
  const isFiltersLoaded = computed(() => isCategoriesLoaded.value && isStatusesLoaded.value);

  const statusList = ref(null);

  const onlyNew = ref(false);

  const searchQuery = ref('');

  const filterQs = computed(() => {
    const filters = {
      category_id: {
        $eq: currentCategoryId.value
      }
    };

    if (statusList.value?.length) {
      filters.status_id = {
        $in: statusList.value.filter((status) => status.active).map((status) => status.id)
      };
    }

    if (searchQuery.value !== '' && searchQuery.value.length > 1) {
      filters.$or = [
        {
          author: { $contains: searchQuery.value }
        },
        {
          name: { $contains: searchQuery.value }
        }
      ];
    }

    if (onlyNew.value) {
      filters.is_new = { $eq: 1 };
    }
    return stringify({ filters });
  });

  const fetchCategories = async () => {
    const categories = await booksApi.getCategories();
    categoriesList.value = categories.data;
    isCategoriesLoaded.value = true;
  };

  const fetchStatuses = async () => {
    const statuses = await booksApi.getStatuses();
    statusList.value = statuses.data.map((status) => {
      status.active = true;
      return status;
    });
    isStatusesLoaded.value = true;
  };

  return {
    fetchCategories,
    fetchStatuses,
    categoriesList,
    currentCategoryId,
    statusList,
    onlyNew,
    searchQuery,
    filterQs,
    isFiltersLoaded
  };
});
