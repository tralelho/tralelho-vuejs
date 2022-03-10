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
        <img src="/favicon.png" alt="Tralelho" class="mx-2" />
        <h1 class="title has-text-white">Tralelho</h1>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavbar"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="mainNavbar" class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <router-link
          :to="{ name: 'home', params: { locale } }"
          class="navbar-item"
          @click="showNav = !showNav"
        >
          Home
        </router-link>

        <router-link
          :to="{ name: 'translation', params: { locale } }"
          class="navbar-item"
          @click="showNav = !showNav"
        >
          Translation
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Samu </a>

          <div class="navbar-dropdown">
            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'eng' },
              }"
              class="navbar-item"
              v-t="{ path: 685, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'deu' },
              }"
              class="navbar-item"
              v-t="{ path: 681, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'spa' },
              }"
              class="navbar-item"
              v-t="{ path: 744, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'por' },
              }"
              class="navbar-item"
              v-t="{ path: 730, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'ita' },
              }"
              class="navbar-item"
              v-t="{ path: 700, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Imprimer </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" @click="createPdf(Pdf.PATIENT)">
              Fiche patient
            </a>
            <a class="navbar-item" @click="createPdf(Pdf.PEDIATRIE)">
              Fiche pédiatrie
            </a>
            <a class="navbar-item" @click="createPdf(Pdf.SCANNER)">Scanner</a>
            <a class="navbar-item" @click="createPdf(Pdf.IRM)">IRM</a>
            <a class="navbar-item" @click="createPdf(Pdf.BLOC)">
              Bloc Opératoire
            </a>
            <a class="navbar-item" @click="createPdf(Pdf.SECRETARIAT)"
              >Secrétariat</a
            >
          </div>
        </div>

        <router-link
          :to="{ name: 'about', params: { locale } }"
          class="navbar-item"
          @click="showNav = !showNav"
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

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { jsPDF } from "jspdf";

const { locale, t, messages } = useI18n({
  useScope: "global",
});

import Content from "../views/pdf/Content.json";

const showNav = ref(false);

enum Pdf {
  PATIENT = "Patient",
  PEDIATRIE = "Pédiatrie",
  SCANNER = "Scanner",
  IRM = "IRM",
  BLOC = "Bloc opératoire",
  SECRETARIAT = "Secretariat",
}

const createPdf = function (type: Pdf) {
  const doc = new jsPDF();

  doc.text(type, 10, 10);

  let y = 30;
  for (const phrase of Content[type].phrases) {
    doc.text(t(`${phrase}`), 10, y);
    doc.text(messages.value.eng[`${phrase}`].source, 10, y + 10);
    y = y + 30;
  }

  doc.save(`${type}.pdf`);
};
</script>
