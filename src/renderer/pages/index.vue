<template>
  <main id="home" class="px-6">
    <header
      class="
        flex flex-row
        w-full
        items-center
        justify-between
        bg-zinc-800
        py-2
        px-4
        rounded-lg
      "
    >
      <a href="/" class="font-bold text-xl text-emerald-500">Kanban Electron</a>
      <span>Version 0.1.0-beta made by Trobonox</span>
    </header>
    <section
      id="board-selection"
      class="mt-4 mb-10 ml-2 flex flex-col items-start"
    >
      <h4 class="mb-8 font-bold text-4xl">Welcome back!</h4>
      <h4 class="mb-2 font-medium text-xl">Your boards:</h4>
      <button
        class="mb-6 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-md"
        @click="createNewBoard"
      >
        Create new board
      </button>
      <span v-if="!boards || boards == []"
        >Wowzers! Looks like you have no boards yet! Use the button above to
        create a new one.</span
      >
      <div class="flex flex-row gap-4" v-else>
        <nuxt-link
          v-for="(board, index) in boards"
          :key="index"
          :to="'/kanban/' + index"
          class="p-4 text-lg bg-zinc-800 hover:bg-zinc-700 rounded-md"
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
    this.boards = this.$store.state.storage.get("boards");
  },
};
</script>

