<template>
  <div :style="cssVars">
    <div class="default-layout mx-auto min-h-screen w-full py-4">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { dark } from "~/themes.js";

export default {
  name: "default",
  data() {
    return {
      colors: dark,
    };
  },
  mounted() {
    this.colors = this.$store.state.storage.get("colors");
  },
  computed: {
    cssVars() {
      if (!this.colors) {
        return {
          "--bg-primary": dark.bgPrimary,
          "--elevation-1": dark.elevation1,
          "--elevation-2": dark.elevation2,
          "--elevation-3": dark.elevation3,
          "--accent": dark.accent,
          "--accent-darker": dark.accentDarker,
          "--text": dark.text,
          "--text-dim-1": dark.textD1,
          "--text-dim-2": dark.textD2,
          "--text-dim-3": dark.textD3,
          "--text-dim-4": dark.textD4,
          "--text-buttons": dark.textButtons,
        };
      }

      return {
        "--bg-primary": this.colors.bgPrimary,
        "--elevation-1": this.colors.elevation1,
        "--elevation-2": this.colors.elevation2,
        "--elevation-3": this.colors.elevation3,
        "--accent": this.colors.accent,
        "--accent-darker": this.colors.accentDarker,
        "--text": this.colors.text,
        "--text-dim-1": this.colors.textD1,
        "--text-dim-2": this.colors.textD2,
        "--text-dim-3": this.colors.textD3,
        "--text-dim-4": this.colors.textD4,
        "--text-buttons": this.colors.textButtons,
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

.bg-elevation-2 {
  background-color: var(--elevation-2);
}

.bg-elevation-2-hover:hover {
  background-color: var(--elevation-2);
}

.bg-elevation-3-hover:hover {
  background-color: var(--elevation-3);
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

.border-accent-focus:focus {
  border-color: var(--accent);
}

.text-accent {
  color: var(--accent);
}

.text-accent-hover:hover {
  color: var(--accent);
}

.text-accent-darker-hover:hover {
  color: var(--accent-darker);
}

.text-normal {
  color: var(--text);
}

.text-dim-1 {
  color: var(--text-dim-1);
}

.text-dim-2 {
  color: var(--text-dim-2);
}

.text-dim-3 {
  color: var(--text-dim-3);
}

.text-dim-4 {
  color: var(--text-dim-4);
}

.text-buttons {
  color: var(--text-buttons);
}
</style>
