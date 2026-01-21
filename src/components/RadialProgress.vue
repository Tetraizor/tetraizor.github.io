<template>
  <div
    class="radialProgress"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="clampedValue"
    :style="{
      '--stroke-width': strokeWidth,
      '--progress-color': color,
      '--track-color': trackColor
    }"
  >
    <svg
      class="radialSvg"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        class="ringBg"
        cx="50"
        cy="50"
        :r="radius"
      />
      <circle
        class="ringProgress"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <div class="progressLabel">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  fillAmount: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  text?: string;
}>();

const clampedValue = computed(() => {
  const v = Number(props.fillAmount);
  if (isNaN(v)) return 0;
  return Math.min(100, Math.max(0, v));
});

const strokeWidth = props.strokeWidth ?? 8;
const color = props.color ?? '#4caf50';
const trackColor = props.trackColor ?? '#e6e6e6';

const radius = 50 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;
const dashOffset = computed(() => {
  return circumference * (1 - clampedValue.value / 100);
});
</script>

<style lang="scss" scoped>
.radialProgress {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;

  .radialSvg {
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-width: var(--stroke-width);
  }

  .ringBg {
    stroke: var(--track-color);
  }

  .ringProgress {
    stroke: var(--progress-color);
    transition: stroke-dashoffset 0.6s ease;
    stroke-linecap: round;
  }

  .progressLabel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    font-weight: 500;
    pointer-events: none;
  }
}

/* Default CSS variables (can be overridden via props/style binding) */
.radialProgress {
  --stroke-width: 10;
  /* viewBox units */
  --progress-color: #4caf50;
  --track-color: #e6e6e6;
}
</style>
