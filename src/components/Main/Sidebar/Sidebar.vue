<template>
  <div>
    <div
      class="background"
      :class="{ on: sidebarStore.isOpen }"
      @click.prevent="onEmptySpaceClicked()"
    ></div>
    <div
      class="sidebar"
      :class="{ collapse: !sidebarStore.isOpen }"
    >
      <div
        class="sidebarToggle"
        :class="{ collapse: !sidebarStore.isOpen }"
        @click.prevent="toggleSidebar()"
      >
        <div class="icon"></div>
      </div>
      <div class="sidebarWrapper">
        <div class="divider"></div>
        <div class="buttonWrapper">
          <PageButton
            title="me."
            description="a little summary about me."
            :pageData="getPageByName('me')"
            :selectedIndex="selectedIndex"
            @sidebarButtonPressed="() => sidebarButtonPressed('me')"
          />

          <!--
          <PageButton
          title="blog."
          description="my thoughts, lined up."
          :pageData="getPageByName('blog')"
          :selectedIndex="selectedIndex"
          @sidebarButtonPressed="() => sidebarButtonPressed('blog')"
          />
          -->

          <PageButton
            title="games."
            description="my takes on video games, compiled into a list"
            :pageData="getPageByName('games')"
            :selectedIndex="selectedIndex"
            @sidebarButtonPressed="() => sidebarButtonPressed('games')"
          />
          <PageButton
            title="projects."
            description="projects i did and hopefully will do."
            :pageData="getPageByName('projects')"
            :selectedIndex="selectedIndex"
            :disabled="true"
            @sidebarButtonPressed="() => sidebarButtonPressed('projects')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageButton from "./PageButton.vue";
import { useSidebarStore } from "@/stores/sidebarStore";
import NavigationPage, { getPageByName } from "@/models/NavigationPage";

export default defineComponent({
  name: "Sidebar",
  components: { PageButton },
  props: {
    isPageViewerBeingAnimated: {
      type: Boolean,
      default: false,
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      sidebarStore: useSidebarStore(),
    };
  },

  methods: {
    toggleSidebar() {
      this.sidebarStore.toggle();
    },

    onEmptySpaceClicked() {
      this.sidebarStore.close();
    },

    sidebarButtonPressed(page: string) {
      this.sidebarStore.close();
      this.$emit("sidebarButtonPressed", getPageByName(page));
    },

    getPageByName(name: string): NavigationPage {
      return getPageByName(name);
    },
  },
});
</script>

<style scoped lang="scss">
.background {
  position: fixed;

  height: 100%;
  width: 100%;

  top: 0px;
  left: 0px;

  z-index: 99;

  transition: background-color 0.3s linear, pointer-events 0.3s;

  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;

  &.on {
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: all;
  }
}

.sidebar {
  position: fixed;
  height: 100%;

  right: 0;
  top: 0;

  transition: right 0.5s ease-in-out;

  z-index: 101;

  @media screen and (max-width: $tablet) {
    right: 0;
    position: fixed;
    width: 100%;

    z-index: 100;

    &.collapse {
      right: -100%;
    }
  }

  @media screen and (min-width: $tablet) {
    min-width: 25vw;
    width: 468px;

    &.collapse {
      right: calc(min(-468px, -25vw));
    }
  }

  .divider {
    width: 2px;
    background-color: $divider;
    height: 100%;
  }

  .buttonWrapper {
    @media screen and (max-width: $tablet) {
      padding: 32px;
      margin-top: 64px;
    }

    @media screen and (min-width: $tablet) {
      padding: 16px;
    }

    width: 100%;
    display: flex;

    flex-grow: 1;
    flex-direction: column;

    align-items: center;

    @media screen and (max-width: $tablet) {
      justify-content: start;
    }

    justify-content: center;

    gap: 32px;
  }

  .sidebarToggle {
    position: absolute;
    z-index: 100;

    cursor: pointer;

    transform: rotate(0deg);
    transition: left 0.5s, transform 0.5s, top 0.5s ease-in-out;

    animation: bounce 1s ease-in-out forwards;

    @keyframes bounce {
      0% {
        top: 25px;
      }

      20% {
        top: 25px;
      }

      40% {
        top: 10px;
      }

      60% {
        top: 25px;
      }

      62% {
        top: 25px;
      }

      80% {
        top: 15px;
      }

      100% {
        top: 25px;
      }
    }

    &.collapse {
      @include respond-to(mobile) {
        left: -65px;
        top: 25px;
      }

      @include respond-to(desktop) {
        left: -75px;
        top: 25px;
      }

      transform: rotate(-180deg);
    }

    @include respond-to(desktop) {
      width: 50px;
      height: 50px;
      top: 25px;
      left: 16px;

      border: 4px solid $accent;
    }

    @include respond-to(mobile) {
      width: 40px;
      height: 40px;
      top: 32px;

      border: 3px solid $accent;

      left: 32px;
    }

    border-radius: 60px;

    background-color: $background-primary;

    .icon {
      background-image: url("@/assets/icons/arrow.svg");

      @include respond-to(mobile) {
        width: 36px;
        height: 40px;
      }

      @include respond-to(desktop) {
        width: 44px;
        height: 44px;
      }
    }
  }
}

.sidebarWrapper {
  position: relative;

  height: 100%;

  background-color: $background-primary;

  background-image: url("@/assets/patterns/pattern.svg");
  background-repeat: repeat;

  background-size: 750px 866px;
  background-position: 0 0;

  display: flex;
  flex-direction: row;

  animation: slide 100s linear infinite;

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
}
</style>
