<template>
  <div style="width: 100%; height: 100%">
    <div
      class="wrapper"
      @scroll="handleScroll"
    >
      <div class="content">
        <div v-if="post != null && post.content != null">
          <h1 style="margin-bottom: 1rem">
            {{ post?.title }}
          </h1>
          <div style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-bottom: 0.5rem;
            ">
            <h3 style="opacity: 0.8; font-weight: normal">
              {{ date }}
            </h3>
            <h3 style="opacity: 0.8; font-weight: normal">
              {{ post?.views || 0 }} views
            </h3>
          </div>
          <div class="titleDivider"></div>
          <Markdown
            class="markdown"
            :source="post.content"
            :styleOverride="{}"
          ></Markdown>
        </div>
        <div v-else-if="error != ''">
          <h1>{{ error }}</h1>
        </div>
        <div v-else></div>
      </div>
    </div>
    <LoadingPanel :loading="loading" />
  </div>
</template>

<script lang="ts">
import {
  getDifferenceInDaysFormatted,
  getFormattedDate,
} from "@/utils/dateUtils";
import { useNavigationStore } from "@/stores/navigationStore";
import { useScreenStore } from "@/stores/screenStore";
import Markdown from "@/components/Markdown.vue";
import axios from "axios";
import LoadingPanel from "@/components/LoadingPanel.vue";
import API_CONFIG from "@/config/apiConfig";
import { PostType } from "portfolio-types";

export default {
  name: "PostView",
  props: ["slug"],
  components: {
    Markdown,
    LoadingPanel,
  },

  data() {
    return {
      post: null as PostType | null,

      loading: false,

      error: "",

      navigationStore: useNavigationStore(),
      screenStore: useScreenStore(),
    };
  },

  mounted() {
    this.updatePost();

    this.updateScrollAmount(0);
  },

  emits: ["onScroll"],

  methods: {
    updatePost() {
      this.loading = true;
      this.error = "";

      axios.get(API_CONFIG.BLOG.GET_POST + "?url_string=" + this.slug)
        .then(async (res) => {
          await new Promise((resolve) => setTimeout(resolve, 300));
          this.post = res.data.post;
        })
        .catch((err) => {
          if (err.status == 404) {
            this.error = "Post not found.";
            return;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleScroll(event: Event) {
      const target = event.target as HTMLElement;
      const scrollAmount = target.scrollTop;
      this.updateScrollAmount(scrollAmount);
    },
    updateScrollAmount(scrollAmount: number) {
      this.$emit("onScroll", scrollAmount);
    },
  },

  computed: {
    date(): string {
      if (this.post == null) return "";
      return getFormattedDate(new Date(this.post?.created_at));
    },
  },

  watch: {
    slug() {
      this.updatePost();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  overflow-y: auto;

  .content {
    width: 100%;
    max-width: 768px;
    height: 100%;

    padding-top: 4rem;
    padding-bottom: 4rem;

    margin: 0 4rem;

    @include respond-to("mobile") {
      margin: 0 25px;
    }
  }

  h1 {
    font-size: 3rem;
    line-height: 4rem;
    font-weight: bolder;

    @include respond-to("mobile") {
      font-size: 2rem;
      line-height: 3rem;
    }
  }

  .titleDivider {
    width: 100%;
    height: 4px;
    background-color: $accent;
    margin-bottom: 2rem;
  }
}

.markdown {
  padding-bottom: 1rem;
}
</style>
