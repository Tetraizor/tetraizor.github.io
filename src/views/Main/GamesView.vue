<template>
  <div class="gamesViewWrapper">
    <div class="blurField">
      <router-view v-slot="{ Component }">
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import PageViewer from "./PageViewer.vue";

export default {
  name: "GamesView",
  props: ["selectedIndex", "index"],
  components: {},

  data() {
    return {
      title: "under construction",
      doesTitleHaveCursor: false,

      navigationPage: useNavigationStore(),
    };
  },

  mounted() {
    setInterval(() => {
      this.doesTitleHaveCursor = !this.doesTitleHaveCursor;

      if (!this.doesTitleHaveCursor) {
        this.title = this.title.slice(0, -1);
      } else {
        this.title = this.title + "|";
      }
    }, 500);
  },
};
</script>

<style lang="scss">
.gamesViewWrapper {
  background-color: $background-primary;
  background-image: url("@/assets/patterns/pattern.svg");

  width: 100%;
  height: 100%;

  animation: slide 100s linear infinite;

  overflow: hidden;

  @keyframes slide {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 750px 433px;
    }

    100% {
      background-position: 1500px 866px;
    }
  }

  .blurField {
    backdrop-filter: blur(6px);

    width: 100%;
    height: 100%;
  }
}
</style>
