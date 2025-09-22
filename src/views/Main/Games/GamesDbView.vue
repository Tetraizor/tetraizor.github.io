<template>
  <div class="gamesDbWrapper">
    <div class="gamesDbBackground">
      <div class="header">
        <h1>game log</h1>

        <div
          class="divider accent"
          style="margin: 1rem 0;"
        ></div>

        <p>all games i played/am planning to play.</p>
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
              <div class="stateContainer">
                <p>{{ gameStateToLabel(listing.state) }}</p>
              </div>
              <div class="numberContainer">
                <h2>{{ id }}</h2>
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
                    <div style="display: flex; align-items: center; flex-direction: column;">
                      <p style="opacity: .5;">OST</p>
                      <p>{{ listing.ost_score > 0 ? listing.ost_score : '-' }}</p>
                    </div>

                    <div style="height: 60%; width: 1px; background-color: white; margin: 0 1rem; opacity: .5;" />

                    <div style="display: flex; align-items: center; flex-direction: column;">
                      <p style="opacity: .5;">Gameplay</p>
                      <p>{{ listing.gameplay_score > 0 ? listing.gameplay_score : '-' }}</p>
                    </div>

                    <div style="height: 60%; width: 1px; background-color: white; margin: 0 1rem; opacity: .5;" />

                    <div style="display: flex; align-items: center; flex-direction: column;">
                      <p style="opacity: .5;">Story</p>
                      <p>{{ listing.story_score > 0 ? listing.story_score : '-' }}</p>
                    </div>
                  </div>
                </div>
                <p class="description">{{ listing.description }}</p>
              </div>
              <div class="overallScoreContainer">
                <RadialProgress
                  :value="listing.overall_score"
                  :color="'#' + interpolateColor('DD4747', '8ADE8F', (listing.overall_score / 100))"
                  :trackColor="'#' + interpolateColor('4d1919', '3b592b', (listing.overall_score / 100))"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameLogType, GameState, GameTagType } from 'portfolio-types';
import { computed, onMounted, ref } from 'vue';
import API_CONFIG from '@/config/apiConfig';
import axios from 'axios';
import RadialProgress from '@/components/RadialProgress.vue';
import { interpolateColor } from '@/utils/colorUtils';
import { useScreenStore } from '@/stores/screenStore';
import { parseGameState } from 'portfolio-types';

const gameListings = ref<GameLogType[]>([]);
const tags = ref<GameTagType[]>([]);
const loading = ref<number>(0);

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

const fetchGameListings = async () => {
  loading.value++;

  axios.get(API_CONFIG.GAMES.GET_GAME_LISTINGS)
    .then(async (res) => {
      gameListings.value = res.data.game_logs;
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
      console.log(tags.value);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value--;
    });
};

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

onMounted(() => {
  fetchGameListings();
  fetchTags();
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

    @include respond-to("mobile") {
      max-width: 100%;
    }

    overflow: hidden;

    .header {
      padding: 3rem 3rem 2rem 3rem;
      background-color: $background-secondary;

      @include respond-to("mobile") {
        padding: 4rem 1.5rem 1.5rem 1.5rem;
        background-color: transparent;
      }
    }

    .listWrapper {
      flex: 1;

      overflow-y: auto;

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

          width: 5rem;

          @include respond-to("mobile") {
            width: 2rem;
          }

          flex-shrink: 0;
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
</style>