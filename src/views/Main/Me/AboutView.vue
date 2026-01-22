<template>
  <div
    class="aboutPage"
    ref="aboutPage"
  >
    <div class="content">
      <div class="leftViewWrapper">
        <div class="leftView">
          <RouterView v-slot="{ Component }">
            <Transition
              name="slide"
              mode="out-in"
            >
              <Component :is="Component" />
            </Transition>
          </RouterView>
          <div style="flex: 1"></div>
          <div class="contact">
            <a
              class="contactCard open"
              href="mailto://me@umuthanozel.com"
            >
              <div class="icon mail"></div>
              <h1>me@umuthanozel.com</h1>
            </a>
            <a
              class="contactCard"
              href="https://www.github.com/Tetraizor"
            >
              <div class="icon github"></div>
            </a>
            <div
              class="contactCard"
              @click.prevent="showAlert"
            >
              <div class="icon discord"></div>
            </div>
            <a
              class="contactCard"
              href="https://linkedin.com/in/umuthan-ozel"
            >
              <div class="icon linkedin"></div>
            </a>
          </div>
        </div>
      </div>
      <div class="rightView">
        <div style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: end;
            margin-bottom: 1.6rem;
          ">
          <h1 class="underline">featured</h1>
        </div>
        <template
          v-for="featured in featured"
          :key="featured.featured_id"
        >
          <featuredContainer :featured="featured" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";
import featuredContainer from "@/components/Me/About/FeaturedContainer.vue";
import FeaturedItemType from "@/interface/FeaturedItemType";
import API_CONFIG from "@/config/apiConfig";

export default {
  name: "AboutView",
  props: [],
  components: { featuredContainer },

  data() {
    return {
      screenStore: useScreenStore(),
      navigationStore: useNavigationStore(),

      featured: [] as FeaturedItemType[],
    };
  },

  methods: {
    getFeatured() {
      axios
        .get(API_CONFIG.FEATURED.GET_ALL)
        .then(async (res) => {
          await new Promise((resolve) => setTimeout(resolve, 300));
          const featuredItems = res.data.featuredItems;

          for (let i = 0; i < featuredItems.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            this.featured.push(featuredItems[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    goToLink(link: string) {
      window.open(link, "_blank");
    },

    showAlert() {
      alert(
        "Sorry, there is no profile link on Discord, instead I copied my tag to clipboard. You can add me with that!"
      );
      navigator.clipboard.writeText("Tetraizor");
    },

    scrollToTop() {
      (this.$refs.aboutPage as HTMLElement).scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },

  mounted() {
    this.getFeatured();
  },

  computed: {},
};
</script>

<style scoped lang="scss">
.aboutPage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  margin: auto;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @include respond-to(mobile) {
    overflow-y: auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @include respond-to(desktop) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .divider {
    width: 100%;
    margin: 2rem 0;
    height: 2px;
    min-height: 2px;

    background-color: $text-primary;

    @include respond-to(mobile) {
      background-color: transparent;
    }
  }

  .content {
    width: 100%;
    max-width: $large-desktop;

    height: 100%;

    @include respond-to(mobile) {
      justify-content: center;
    }

    @include respond-to(desktop) {
      flex-direction: row;
      display: flex;
    }

    h1 {
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 0.4rem;

      @include respond-to(mobile) {
        font-size: 1.5rem;
      }
    }

    p,
    li {
      font-size: $font-p-large;
      line-height: $font-p-large * 1.5;

      @include respond-to(mobile) {
        font-size: $font-p-small;
        line-height: $font-p-small * 1.5;
      }
    }

    ul {
      margin-left: 2rem;

      li {
        color: $text-primary;
      }
    }

    .divider {
      width: 100%;
      margin: 0 0 2rem 0;
    }
  }

  .leftViewWrapper {
    width: 60%;
    overflow-y: auto;
    display: inline-block;

    @include respond-to(mobile) {
      width: 100%;
    }

    @include respond-to(desktop) {
      padding-right: 2rem;
      margin-right: 3rem;

      overflow-y: auto;
      justify-content: center;
    }
  }

  .leftView {
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;

    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 2rem;
    padding-bottom: 2rem;

    @include respond-to(desktop) {
      padding-right: 2rem;
    }
  }

  .rightView {
    padding: 2rem 0 2rem 0;
    overflow-x: hidden;

    @include respond-to(mobile) {
      width: 100%;
    }

    @include respond-to(desktop) {
      flex: 1;

      overflow-y: auto;
      justify-content: center;

      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }
}

.contactTitle {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.4rem;

  @include respond-to(mobile) {
    font-size: 1.5rem;
  }
}

.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  margin-bottom: 2rem;

  justify-content: start;

  .contactCard {
    display: flex;
    height: 3.5rem;

    align-items: center;
    justify-content: center;

    background-color: $background-quaternary;

    padding: 0.7rem 0.7rem;

    cursor: pointer;

    h1 {
      margin-left: 1.5rem;
      line-height: 1.5rem;
      margin-bottom: 0;
      padding-bottom: 0;
      font-size: $font-p-large;
      color: $text-primary;
      text-decoration: none;

      flex: 1;
    }

    .open {
      flex: 1;
    }
  }

  .icon {
    width: 2rem;
    height: 2rem;

    color: $text-primary;
    background-color: $text-primary;

    &.linkedin {
      background-image: url("@/assets/icons/linkedin.svg") no-repeat center;
      mask: url("@/assets/icons/linkedin.svg") no-repeat center;
      -webkit-mask: url("@/assets/icons/linkedin.svg") no-repeat center;
    }

    &.github {
      background-image: url("@/assets/icons/github.svg") no-repeat center;
      mask: url("@/assets/icons/github.svg") no-repeat center;
      -webkit-mask: url("@/assets/icons/github.svg") no-repeat center;
    }

    &.mail {
      background-image: url("@/assets/icons/mail.svg") no-repeat center;
      mask: url("@/assets/icons/mail.svg") no-repeat center;
      -webkit-mask: url("@/assets/icons/mail.svg") no-repeat center;
    }

    &.x {
      background-image: url("@/assets/icons/x.svg") no-repeat center;
      mask: url("@/assets/icons/x.svg") no-repeat center;
      -webkit-mask: url("@/assets/icons/x.svg") no-repeat center;
    }

    &.instagram {
      background-image: url("@/assets/icons/instagram.svg") no-repeat center;
      mask: url("@/assets/icons/instagram.svg") no-repeat center;
      -webkit-mask: url("@/assets/icons/instagram.svg") no-repeat center;
    }

    &.steam {
      background-image: url("@/assets/icons/steam.svg") no-repeat center;
      mask: url("@/assets/icons/steam.svg") no-repeat center;
      -webkit-mask: url("@/assets/icons/steam.svg") no-repeat center;
    }

    &.discord {
      background-image: url("@/assets/icons/discord.svg") no-repeat center;
      mask: url("@/assets/icons/discord.svg") no-repeat center;
      -webkit-mask: url("@/assets/icons/discord.svg") no-repeat center;
    }
  }
}
</style>

<style lang="scss">
.aboutSubView {
  padding-bottom: 2rem;

  p {
    margin-bottom: 1.6rem;
    line-height: 1.8rem;
  }

  h1 {
    text-decoration: underline;
    font-weight: normal;

    line-height: 2.4rem;
    margin-bottom: 1.6rem;
  }

  .linkToPage {
    position: relative;
    background-color: $background-tertiary;

    white-space: nowrap;

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      white-space: nowrap;

      z-index: 1;

      height: 100%;
      width: 100%;

      padding: 0;
      margin: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: transparent;
      color: transparent;

      transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

      text-align: center;

      &:hover {
        cursor: pointer;
        background-color: $accent;
        color: $text-primary;
      }

      i {
        color: inherit !important;
      }
    }
  }

  &.slide-enter-from {
    transform: translateX(-100%);
    position: relative;
  }

  &.slide-leave-to {
    transform: translateX(100%);
    position: relative;
  }

  &.slide-enter-to {
    transform: translateX(0);
    position: relative;
  }

  &.slide-leave-from {
    transform: translateX(0);
    position: relative;
  }

  &.slide-enter-active {
    transition: transform 0.3s ease-out;
  }

  &.slide-leave-active {
    transition: transform 0.3s ease-in;
  }
}
</style>
