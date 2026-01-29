<template>
  <div class="gamesDbWrapper">
    <div class="gamesDbBackground">
      <div class="header">
        <h1>game log</h1>

        <div
          class="divider accent"
          style="margin: 1rem 0;"
        ></div>

        <p style="margin-bottom: 2rem;">all games i played/am planning to play.</p>

        <SectionContainer
          class="filterContainer"
          label="Filter"
        >
          <div style="display: flex; flex-direction: row; gap: 1rem; flex-wrap: wrap;">
            <SearchBar
              style="min-width: 200px; flex-grow: 1;"
              v-model="searchText"
            ></SearchBar>
            <div style="display: flex; gap: 1rem;">
              <span>
                <p style="margin-bottom: 0.5rem;">Progress</p>
                <Select
                  v-model="stateFilter"
                  :options="stateFilterOptions"
                  @change="() => { fetchGameListings(true); }"
                />
              </span>

              <span>
                <p style="margin-bottom: 0.5rem;">Sort By</p>
                <Select
                  v-model="sortBy"
                  :options="sortByOptions"
                  @change="() => { fetchGameListings(true); }"
                />
              </span>

              <span>
                <p style="margin-bottom: 0.5rem;">Tags</p>
                <Select
                  v-model="selectedTag"
                  :options="tagOptions"
                  @change="() => { fetchGameListings(true); }"
                />
              </span>
            </div>
          </div>
        </SectionContainer>
      </div>

      <div class="divider "></div>

      <div class="listWrapper">
        <div class="listContainer">
          <template
            v-for="(listing, id) in gameListings"
            :key="id"
          >
            <div class="gameListingCard">
              <div
                class="background"
                :style="{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,1)), url(${listing.thumbnail_url})`
                }"
              >
              </div>
              <div
                class="stateContainer"
                :style="{
                  backgroundColor: gameStateToColor(listing.state).background,
                }"
                style="overflow: hidden;"
              >
                <p
                  style="font-weight: bold;"
                  :style="{ color: `${gameStateToColor(listing.state).text}` }
                    "
                >{{ gameStateToLabel(listing.state) }}
                </p>
              </div>
              <div class="numberContainer">
                <template v-if="sortBy == 'title_asc' || sortBy == 'title_desc' || searchText.trim() !== ''">
                  <span class="rankNormal">
                    <p>{{ listing.overall_rank }} </p><i></i>
                  </span>
                </template>
                <template v-else-if="(selectedTag !== '' && selectedTag !== 'all') || (stateFilter !== 'all')">
                  <h2>{{ id + 1 }}</h2>
                  <span class="rankSmall">
                    <p>{{ listing.overall_rank }} </p><i></i>
                  </span>
                </template>
                <template v-else>
                  <span class="rankNormal">
                    <p>{{ listing.overall_rank }} </p><i></i>
                  </span>
                </template>
              </div>
              <div
                class="thumbnailContainer"
                :style="{ backgroundImage: `url(${listing.thumbnail_url})` }"
              >

              </div>
              <div class="informationContainer">
                <div style="display: flex;">
                  <div
                    class="informationHeader"
                    style="flex: 1;"
                  >
                    <h2>{{ listing.title }}</h2>
                    <p class="tags">{{ tagsAsText(listing.tags).value }}</p>
                  </div>

                  <div
                    v-if="!useScreenStore().isMobile"
                    class="scoreContainers"
                  >
                    <template
                      v-for="(score, index) in listing.scores.sort((a, b) => b.value - a.value).slice(0, 4)"
                      :key="index"
                    >
                      <div style="display: flex; align-items: center; flex-direction: column;">
                        <p style="opacity: .5;">{{
                          categories
                            .find(c => c.score_category_id === score.score_category_id)?.name
                        }}</p>
                        <p>{{ score.value > 0 ? score.value : '-' }}</p>
                      </div>

                      <div
                        v-if="index != listing.scores.length - 1"
                        style="height: 60%; width: 1px; background-color: white; margin: 0 1rem; opacity: .5;"
                      />
                    </template>
                  </div>
                </div>
                <p class="description">{{ listing.description }}</p>
              </div>
              <div class="overallScoreContainer">
                <RadialProgress
                  :fillAmount="listing.overall_score"
                  :color="'#' + interpolateColor('DD4747', '8ADE8F', (listing.overall_score / 100))"
                  :trackColor="'#' + (listing.overall_score >= 0 ? interpolateColor('4d1919', '3b592b', (listing.overall_score / 100)) : '3d3d3d')"
                  :text="listing.overall_score >= 0 ? listing.overall_score.toString() : '-'"
                />
              </div>
            </div>
          </template>

          <div
            ref="bottomSentinel"
            style="height: 20px; width: 100%;"
          ></div>

          <div
            v-if="loading > 0 && gameListings.length > 0"
            style="text-align: center; padding: 1rem; color: white;"
          >
            Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameLogType, GameState, GameTagType, GameScore, ScoreCategory } from 'portfolio-types';
import { computed, onMounted, ref, watch } from 'vue';

import API_CONFIG from '@/config/apiConfig';
import axios from 'axios';

import RadialProgress from '@/components/RadialProgress.vue';
import { interpolateColor } from '@/utils/colorUtils';
import { useScreenStore } from '@/stores/screenStore';
import SearchBar from '@/components/SearchBar.vue';
import Select from '@/components/Select.vue';
import Button from '@/components/Button.vue';
import SectionContainer from '@/components/SectionContainer.vue';

const gameListings = ref<GameLogType[]>([]);
const tags = ref<GameTagType[]>([]);
const categories = ref<ScoreCategory[]>([]);

const loading = ref<number>(0);

const searchText = ref<string>("");
const stateFilter = ref<string>("all");
const sortBy = ref<string>("overall_score_desc");
const selectedTag = ref<string>("all");

const page = ref<number>(1);
const pageSize = 10;
const hasMore = ref<boolean>(true);
const bottomSentinel = ref<HTMLElement | null>(null);

const gameStateToColor = (state: GameState): { background: string, text: string } => {
  console.log(state);

  switch (state) {
    case GameState.perfected:
      return { background: "#784278", text: "#cf7ecf" };

    case GameState.completed:
      return { background: "#4da06b", text: "#cbf7db" };

    case GameState.playing:
      return { background: "#63cbf8", text: "#33515d" };

    case GameState.backlog:
      return { background: "#343434", text: "#a1a1a1" };

    case GameState.dropped:
      return { background: "#F87171", text: "#463333" };

    case GameState.endless:
      return { background: "#d7d8a1", text: "#595a4c" };

    default:
      return { background: "#474747", text: "#FFFFFF" };
  }
}

const gameStateToLabel = (state: GameState): string => {
  switch (state) {
    case GameState.completed:
      return "Completed";
    case GameState.playing:
      return "Playing";
    case GameState.dropped:
      return "Dropped";
    case GameState.endless:
      return "Endless";
    case GameState.perfected:
      return "Perfected";
    case GameState.backlog:
    default:
      return "Backlog"
  }
}

const stateFilterOptions = [
  { label: "All", value: "all" },
  { label: "Backlog", value: GameState[GameState.backlog] },
  { label: "Playing", value: GameState[GameState.playing] },
  { label: "Completed", value: GameState[GameState.completed] },
  { label: "Dropped", value: GameState[GameState.dropped] },
  { label: "Perfected", value: GameState[GameState.perfected] },
  { label: "Endless", value: GameState[GameState.endless] },
];

const sortByOptions = [
  { label: "Title (A-Z)", value: "title_asc" },
  { label: "Title (Z-A)", value: "title_desc" },
  { label: "Overall Score (High to Low)", value: "overall_score_desc" },
  { label: "Overall Score (Low to High)", value: "overall_score_asc" },
];

const fetchGameListings = async (reset: boolean = false) => {
  if (loading.value > 0 || (!hasMore.value && !reset)) return;

  loading.value++;

  if (reset) {
    page.value = 1;
    hasMore.value = true;
  }

  const query = new URLSearchParams();

  if (stateFilter.value !== "all") query.append("state", stateFilter.value);
  if (selectedTag.value !== "" && selectedTag.value !== "all") query.append("tags", selectedTag.value);

  if (searchText.value.trim() !== "") {
    query.append("search", searchText.value.trim());
  }

  query.append("sort_by", sortBy.value);
  query.append("page", page.value.toString());
  query.append("page_size", pageSize.toString());

  axios.get(API_CONFIG.GAMES.GET_GAME_LISTINGS + `?${query.toString()}`
  )
    .then(async (res) => {
      const newGames = res.data.game_logs;
      const serverHasMore = res.data.hasMore === "true";

      if (reset) {
        gameListings.value = newGames;
      } else {
        gameListings.value = gameListings.value.concat(newGames);
      }

      hasMore.value = serverHasMore;
      if (serverHasMore) {
        page.value++;
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value--;
    });
}

const fetchTags = async () => {
  loading.value++;

  axios.get(API_CONFIG.GAMES.GET_TAGS)
    .then(async (res) => {
      tags.value = res.data.tags;
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value--;
    });
};

const fetchCategories = async () => {
  loading.value++;

  axios.get(API_CONFIG.GAMES.GET_SCORE_CATEGORIES)
    .then(async (res) => {
      categories.value = res.data.score_categories;
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value--;
    });
}

const tagsAsText = (tagIds: string[]) => computed(() => {
  const tagLabels: string[] = [];

  if (tags.value != undefined) {
    tagIds.forEach(id => {
      const label = tags.value.find(tag => tag.tag_id == id)?.label;

      if (label)
        tagLabels.push(label);
    });

    return tagLabels.join(', ');
  }

  return "-";
});

const tagOptions = computed(() => {
  const options = [{ label: "All", value: "all" }];
  if (tags.value != undefined) {
    tags.value.forEach(tag => {
      options.push({ label: tag.label, value: tag.tag_id });
    });
  }

  return options;
});

let debounceTimeout: ReturnType<typeof setTimeout>;
watch(searchText, () => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    fetchGameListings(true);
  }, 300);
});

let observer: IntersectionObserver;

onMounted(() => {
  fetchGameListings();
  fetchTags();
  fetchCategories();

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value && loading.value === 0) {
      fetchGameListings(false);
    }
  }, {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
  })

  if (bottomSentinel.value) {
    observer.observe(bottomSentinel.value);
  }
});
</script>

<style lang="scss" scoped>
.gamesDbWrapper {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;

  .gamesDbBackground {
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;

    max-width: min(70%, 1024px);

    overflow-y: auto;

    @include respond-to("mobile") {
      max-width: 100%;
    }

    .header {
      padding: 3rem 3rem 2rem 3rem;
      background-color: $background-secondary-semi-transparent;

      @include respond-to("mobile") {
        padding: 4rem 1.5rem 1.5rem 1.5rem;
        background-color: transparent;
      }

      h1 {
        font-size: calc($font-h1-large * 1.2);
        line-height: calc($font-h1-large * 1.4);

        @include respond-to("mobile") {
          font-size: calc($font-h1-small * 1.2);
          line-height: calc($font-h1-small * 1.4);
        }
      }
    }

    .listWrapper {
      user-select: none;

      flex: 1;

      background-color: $background-primary;

      .listContainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .gameListingCard {
        display: flex;
        flex-direction: row;

        height: 140px;

        @include respond-to("mobile") {
          height: 100px;
        }

        position: relative;

        overflow: hidden;

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;

          filter: blur(4px);
        }

        .stateContainer,
        .thumbnailContainer,
        .numberContainer,
        .informationContainer,
        .overallScoreContainer {
          position: relative;
          z-index: 1;
        }

        .stateContainer {
          width: 1rem;
          flex-shrink: 0;

          background-color: black;

          display: flex;
          flex-direction: column;
          justify-content: end;

          p {
            transform: rotate(-90deg);
            margin-bottom: .4rem;
          }
        }

        .numberContainer {
          display: flex;
          align-items: center;
          justify-content: center;

          flex-direction: column;

          width: 5rem;
          gap: .4rem;

          @include respond-to("mobile") {
            width: 2rem;
            gap: .2rem;
          }

          flex-shrink: 0;

          .rankNormal,
          .rankSmall {
            display: flex;
            justify-content: center;
            align-items: center;

            i {
              display: inline-block;

              background-image: url("@/assets/icons/crown.svg");
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;

              pointer-events: none;
            }
          }

          .rankNormal {
            gap: .2rem;

            i {
              width: 1rem;
              height: 1rem;

              @media screen and (min-width: $tablet) {
                width: 1.1rem;
                height: 1.1rem;
              }
            }
          }

          .rankSmall {

            gap: .15rem;
            opacity: .5;

            font-size: calc($font-p-large * .7);

            @include respond-to("mobile") {
              font-size: calc($font-p-small * .7);
            }

            i {
              width: 1rem;
              height: 1rem;

              @media screen and (min-width: $tablet) {
                width: 1.1rem;
                height: 1.1rem;
              }
            }
          }
        }

        .thumbnailContainer {
          height: 100%;
          background-color: rgb(49, 49, 49);

          flex-shrink: 0;

          aspect-ratio: 3/4;

          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          @include respond-to("mobile") {
            display: none;
          }
        }

        .informationContainer {
          padding: 1rem 2rem;
          flex: 1;
          min-width: 0;

          .informationHeader {
            min-width: 0;

            p,
            h2 {
              font-weight: 300;

              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .tags {
            font-size: calc($font-p-large * .9);

            @include respond-to("mobile") {
              font-size: calc($font-p-small * .9);
            }

            color: $text-disabled;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .description {
            margin-top: .3rem;

            font-size: calc($font-p-large * .7);

            opacity: .8;
            font-style: italic;

            @include respond-to("mobile") {
              font-size: calc($font-p-small * .7);
            }

            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .scoreContainers {
            flex-shrink: 0;
            display: flex;
            flex-direction: row;
            align-items: center;

            p {
              font-weight: 100;

              font-size: calc($font-p-large * .8);

              @include respond-to("mobile") {
                font-size: calc($font-p-small * .8);
              }
            }
          }
        }

        .overallScoreContainer {
          flex-shrink: 0;

          padding: 1rem 2rem 1rem .5rem;
        }
      }
    }
  }

  .divider {
    background-color: $divider-light;

    height: 2px;
    width: 100%;

    &.accent {
      background-color: $accent;
    }
  }
}

.tagContainer {
  display: flex;
  flex-wrap: wrap;

  gap: .5rem;

  .tag {
    padding: .4rem 1.2rem;
    background-color: $background-secondary-transparent;
    border-radius: 2rem;

    color: $text-primary;

    outline: 2px solid $outline;

    cursor: pointer;

    &.selected {
      color: $text-primary;
      background-color: $button-primary-transparent-hover;
    }
  }
}
</style>