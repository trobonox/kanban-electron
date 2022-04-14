<template>
  <div :style="cssVars">
    <div class="mx-auto py-4 w-full min-h-screen default-layout">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      colors: {},
    };
  },
  mounted() {
    this.colors = this.$store.state.storage.get("colors");
  },
  computed: {
    cssVars() {
      console.log(this.colors);
      return {
        "--bg-primary": this.colors.bgPrimary || "#18181b",
        "--elevation-1": this.colors.elevation1 || "#27272a",
        "--elevation-2": this.colors.elevation2 || "#3f3f46",
        "--elevation-3": this.colors.elevation3 || "#52525b",
        "--accent": this.colors.accent || "#059669",
        "--accent-darker": this.colors.accentDarker || "#047857",
        "--text": this.colors.text || "#f4f4f5",
      };
    },
  },
};
</script>

<style>
.default-layout {
  background-color: var(--bg-primary);
  color: var(--text);
}

.bg-elevation-1 {
  background-color: var(--elevation-1);
}

.bg-elevation-2-hover:hover {
  background-color: var(--elevation-2);
}

.bg-accent {
  background-color: var(--accent);
}

.bg-accent:hover {
  background-color: var(--accent-darker);
}

.border-accent {
  border-color: var(--accent);
}
</style>
