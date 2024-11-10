<template>
  <header class="header">
    <div class="header__socials socials">
      <div class="container">
        <ul class="socials__list">
          <li class="socials__item" v-for="social in socials" :key="social.id">
            <a :href="social.link" target="_blank">
              <span class="socials__item-icon">
                <component :is="social.icon" />
              </span>
              <span>{{ social.text }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="header__wrapper">
        <img class="header__logo" src="@/assets/logo.jpg" />
        <div class="header__nav-wrapper">
          <nav class="header__top-nav top-nav">
            <fieldset class="top-nav__items">
              <select
                class="no-mb"
                name="category"
                v-if="categoriesList?.length"
                v-model="currentCategoryId"
              >
                <option v-for="category in categoriesList" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <SkeletonText v-else />
              <label class="no-wrap">
                <input name="only_new" type="checkbox" v-model="onlyNew" role="switch" />
                Только новинки
              </label>
            </fieldset>
          </nav>
          <nav class="header__top-nav top-nav">
            <fieldset class="top-nav__items" v-if="statusList?.length">
              <label v-for="status in statusList" :key="status.id">
                <input
                  :name="'status_' + status.id"
                  v-model="status.active"
                  type="checkbox"
                  role="switch"
                />
                <span class="no-wrap">{{ status.name }}</span>
              </label>
            </fieldset>
            <SkeletonText v-else />
          </nav>
        </div>
      </div>
      <form role="search" @submit.prevent="">
        <input v-model="searchQuery" type="search" name="search" placeholder="Название или автор" />
      </form>
    </div>
  </header>
</template>
<script setup>
import SkeletonText from '@/components/SkeletonText.vue';
import IconTelegram from '@/components/icons/IconTelegram.vue';
import IconVk from '@/components/icons/IconVk.vue';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFiltersStore } from '@/stores/filters.js';

const filtersStore = useFiltersStore();
const { fetchCategories, fetchStatuses } = filtersStore;
const { searchQuery, categoriesList, currentCategoryId, statusList, onlyNew } =
  storeToRefs(filtersStore);

onMounted(async () => {
  Promise.all([fetchCategories(), fetchStatuses()]);
});

const socials = ref([
  {
    id: 1,
    icon: IconVk,
    link: 'https://vk.com/manga_comics_center',
    text: 'VK'
  },
  {
    id: 2,
    icon: IconTelegram,
    link: 'https://t.me/manga_comics_center',
    text: 'Telegram'
  }
]);
</script>
<style scoped lang="scss">
.header__wrapper {
  display: flex;
  flex-direction: row;
  padding: 15px 0 10px;
}

.header__socials {
  background-color: #0172ad;
  padding: 10px 0;
  color: #ffffff;
}

.header__top-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.header__logo {
  width: 155px;
  height: 155px;
  margin-right: auto;
}

.top-nav__items {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

@media screen and (max-width: 767px) {
  .top-nav__items {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
