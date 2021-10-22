<template>
  <nav
    class="navbar is-fixed-top is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link
        :to="{ name: 'home', params: { locale } }"
        class="navbar-item"
      >
        <img src="/favicon.png" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="mainNavbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link
          :to="{ name: 'home', params: { locale } }"
          class="navbar-item"
        >
          Home
        </router-link>

        <router-link
          :to="{ name: 'translation', params: { locale } }"
          class="navbar-item"
        >
          Translation
        </router-link>

        <router-link
          :to="{ name: 'about', params: { locale } }"
          class="navbar-item"
        >
          About
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <span class="is-size-1 flag-icon flag-icon-fr"></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";

export default {
  data() {
    const { locale } = useI18n({ useScope: "global" });
    return {
      locale,
    };
  },
};
</script>