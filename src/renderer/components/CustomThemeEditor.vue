<template>
  <div class="flex w-[48rem] flex-col gap-4">
    <div id="color-row" class="flex flex-row items-center justify-between">
      <label for="color-picker">Accent color</label>
      <div class="flex flex-row gap-4">
        <input
          type="text"
          v-model="customTheme.accent"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        />
        <input
          ref="colorInput"
          type="color"
          value="#ffffff"
          v-model="customTheme.accent"
        />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">Primary text color</label>
      <div class="flex flex-row gap-4">
        <input
          type="text"
          v-model="customTheme.text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        />
        <input
          ref="colorInput"
          type="color"
          value="#ffffff"
          v-model="customTheme.text"
        />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">Button text</label>
      <div class="flex flex-row gap-4">
        <input
          type="text"
          v-model="customTheme.textButtons"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        />
        <input
          ref="colorInput"
          type="color"
          value="#ffffff"
          v-model="customTheme.textButtons"
        />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">Primary background color</label>
      <div class="flex flex-row gap-4">
        <input
          type="text"
          v-model="customTheme.bgPrimary"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        />
        <input
          ref="colorInput"
          type="color"
          value="#ffffff"
          v-model="customTheme.bgPrimary"
        />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">1st level of elevation</label>
      <div class="flex flex-row gap-4">
        <input
          type="text"
          v-model="customTheme.elevation1"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        />
        <input
          ref="colorInput"
          type="color"
          value="#ffffff"
          v-model="customTheme.elevation1"
        />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">2nd level of elevation</label>
      <div class="flex flex-row gap-4">
        <input
          type="text"
          v-model="customTheme.elevation2"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        />
        <input
          ref="colorInput"
          type="color"
          value="#ffffff"
          v-model="customTheme.elevation2"
        />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">3rd level of elevation</label>
      <div class="flex flex-row gap-4">
        <input
          type="text"
          v-model="customTheme.elevation3"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        />
        <input
          ref="colorInput"
          type="color"
          value="#ffffff"
          v-model="customTheme.elevation3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { dark } from "~/themes.js";
import { lightenColor } from "~/utils/colorUtils.js";

export default {
  name: "CustomThemeEditor",
  data() {
    return {
      customTheme: "",
    };
  },
  mounted() {
    const savedPalette = this.$store.state.storage.get("colors");
    this.customTheme = savedPalette || dark;

    console.log(this.customTheme);
    console.log(lightenColor(String(this.customTheme.accent), -30));
  },
};
</script>

<style scoped>
input[type="color"] {
  -webkit-appearance: none;
  border-radius: 8px;
  cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 8px;
}

input[type="color"]::-webkit-color-swatch {
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: var(--text);
}
</style>
