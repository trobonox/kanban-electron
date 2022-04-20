<template>
  <div class="flex w-[48rem] flex-col gap-4">
    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">Accent color</label>
      <input
        ref="colorInput"
        type="color"
        value="#ffffff"
        v-model="customTheme.accent"
      />
    </div>
  </div>
</template>

<script>
import { dark } from "~/themes.js";
import { shadeColor } from "~/utils/colorUtils.js";

export default {
  name: "CustomThemeEditor",
  data() {
    return {
      customTheme: dark,
    };
  },
  mounted() {
    console.log(this.customTheme);
    console.log(shadeColor(String(this.customTheme.accent), 40));
  },
};
</script>

<style scoped>
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 8px;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 8px;
}
</style>
