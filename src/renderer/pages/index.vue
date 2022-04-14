<template>
  <main id="home" class="px-6">
    <header
      class="
        flex flex-row
        w-full
        items-center
        justify-between
        bg-elevation-1
        py-2
        px-4
        rounded-lg
      "
    >
      <a href="/" class="font-bold text-xl text-accent">Kanban Electron</a>
      <span>Version 0.1.0-beta made by Trobonox</span>
    </header>
    <section
      id="board-selection"
      class="mt-4 mb-10 ml-2 flex flex-col items-start"
    >
      <h4 class="mb-8 font-bold text-4xl">Welcome back!</h4>
      <h4 class="mb-2 font-medium text-xl">Your boards:</h4>
      <button
        class="mb-6 px-2 py-1 text-buttons bg-accent rounded-md"
        @click="createNewBoard"
      >
        Create new board
      </button>
      <span v-if="!boards || boards.length == 0"
        >Wowzers! Looks like you have no boards yet! Use the button above to
        create a new one.</span
      >
      <div class="flex flex-row gap-4" v-else>
        <nuxt-link
          v-for="(board, index) in boards"
          :key="index"
          :to="'/kanban/' + index"
          class="p-4 text-lg bg-elevation-1 bg-elevation-2-hover rounded-md"
          >{{ board.title }}</nuxt-link
        >
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      boards: [],
    };
  },
  methods: {
    openURL(url) {
      window.open(url);
    },
    createNewBoard() {
      let old_boards = this.$store.state.storage.get("boards") || [];

      let board = {
        title: "New Board",
        lists: [
          {
            id: 1,
            title: "New Column 1",
            cards: [
              {
                name: "Example Card 1",
                description: "",
              },
              {
                name: "Example Card 2",
                description: "",
              },
            ],
          },
          {
            id: 2,
            title: "New Column 2",
            cards: [{ name: "Example Card 3", description: "" }],
          },
        ],
      };
      this.$store.state.storage.set("boards", [...old_boards, board]);
      this.boards = this.$store.state.storage.get("boards");
    },
  },
  mounted() {
    this.boards = this.$store.state.storage.get("boards") || [];

    // TODO: add back check to only set these default values if no others are saved, or just remove completely because defaults are set
    /*
    this.$store.state.storage.set("colors", {
      bgPrimary: "#18181b",
      elevation1: "#27272a",
      elevation2: "#3f3f46",
      elevation3: "#52525b",
      accent: "#059669",
      accentDarker: "#047857",
      text: "#f4f4f5",
      textD1: "#e4e4e7",
      textD2: "#d4d4d8",
      textD3: "#a1a1aa",
      textD4: "#71717a",
    });
    */
    this.$store.state.storage.set("colors", {
      bgPrimary: "#1E1E2E",
      elevation1: "#302D41",
      elevation2: "#575268",
      elevation3: "#6E6C7E",
      accent: "#F28FAD",
      accentDarker: "#c97790",
      text: "#f4f4f5",
      textD1: "#e4e4e7",
      textD2: "#d4d4d8",
      textD3: "#a1a1aa",
      textD4: "#71717a",
      textButtons: "#1A1826",
    });
  },
};
</script>

