<template>
  <div class="selectWrapper">
    <select
      :value="modelValue"
      @change="onChange($event)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <i class="icon"></i>
  </div>
</template>

<script lang="ts">
export default {
  name: "Select",
  props: {
    options: {
      type: Array as () => Array<{ label: string; value: string }>,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],

  methods: {
    onChange(event: Event) {
      this.$emit("update:modelValue", (event.target as HTMLSelectElement).value);
    },
  },
}
</script>

<style lang="scss" scoped>
.selectWrapper {
  position: relative;

  select {
    padding-right: 3rem;
    width: 100%;
    height: 100%;
  }
}

.icon {
  position: absolute;

  right: 0.6rem;
  top: 0.6rem;

  width: 1rem;
  height: 1rem;

  @media screen and (min-width: $tablet) {
    right: 0.8rem;
    top: 0.8rem;

    width: 1.1rem;
    height: 1.1rem;
  }

  background-image: url("@/assets/icons/down_arrow.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  pointer-events: none;
}
</style>