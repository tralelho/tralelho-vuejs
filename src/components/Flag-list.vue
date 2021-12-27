<template>
  <div
    class="card mb-4"
    v-for="continent in countriesByContinent"
    :key="continent"
    :id="continent.name"
  >
    <header class="card-header" @click="changeVisibility(continent.name)">
      <p class="card-header-title is-capitalized">{{ continent.name }}</p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <font-awesome-icon
            v-if="isVisibleContinent === continent.name"
            icon="angle-down"
          />
          <font-awesome-icon
            v-if="isVisibleContinent != continent.name"
            icon="angle-up"
          />
        </span>
      </button>
    </header>
    <div class="card-content" v-if="isVisibleContinent === continent.name">
      <div class="content">
        <div class="tile is-ancestor is-flex-wrap-wrap mx-4">
          <div
            class="tile is-vertical"
            v-for="country in continent.countries"
            :key="country.iso2"
          >
            <p class="mb-1">
              <router-link
                class="m-1"
                :to="{
                  name: 'translation',
                  params: { locale },
                  query: {
                    lang: country.languages,
                    country: country.iso3,
                  },
                }"
              >
                <span
                  :class="
                    'flag-font-size flag-icon flag-icon-' +
                    country.iso2.toLowerCase()
                  "
                ></span>
              </router-link>
            </p>
            <p>{{ country.namefr }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import countries from "./countries.json";
const continents = ["africa", "america", "asia", "europe", "oceania"];
const countriesByContinent = continents.map((continent) => {
  const countriesOfContinent = countries.filter(
    (country) => country.continent === continent
  );
  return { name: continent, countries: countriesOfContinent };
});

defineProps({
  isVisibleContinent: String,
});

const emit = defineEmits(["changeContinent"]);

const changeVisibility = (continent: string) => {
  emit("changeContinent", continent);
};

const { locale } = useI18n({ useScope: "global" });
</script>

<style scoped lang="scss">
.flag-font-size {
  font-size: 6rem;
}

.continent-title {
  border: darkgray solid thin;
}

.continent-title:hover {
  cursor: pointer;
}
</style>
