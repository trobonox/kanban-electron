<template>
  <main id="home" class="px-6">
    <header class="flex flex-col w-full items-center justify-center">
      <div class="flex flex-col items-center bg-zinc-800 p-6 rounded-md">
        <h1 class="font-bold text-6xl text-emerald-500">Electron Kanban</h1>
        <h2>Version 0.1.0-beta made by Trobonox</h2>
      </div>
    </header>
    <section id="board-selection" class="mt-4 mb-10 flex flex-col items-start">
      <h3 class="mb-2 font-bold text-4xl">Your boards:</h3>
      <button
        class="
          mb-6
          ml-1
          px-2
          py-1
          bg-emerald-600
          hover:bg-emerald-700
          rounded-md
        "
        @click="createNewBoard"
      >
        Create new board
      </button>
      <span class="ml-1" v-if="!boards"
        >Wowzers! Looks like you have no boards yet! Use the button above to
        create a new one.</span
      >
      <div class="flex flex-row gap-4 ml-1" v-else>
        <nuxt-link
          v-for="board in boards"
          :key="board.id"
          :to="'/kanban/' + board.id"
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
      let old_boards = this.$store.state.storage.get("boards");

      let board = {
        id: 1,
        title: "test board",
        lists: [
          {
            title: "pog",
            cards: [{ name: "test" }, { name: "champ" }],
          },
          {
            title: "champ",
            cards: [{ name: "ok" }],
          },
        ],
      };
      this.store.state.$storage.set("boards", [...old_boards, board]);
      this.boards = this.$store.state.storage.get("boards");
    },
  },
  mounted() {
    console.log(this.$store.state.storage.get("boards"));
    this.boards = this.$store.state.storage.get("boards");
  },
};
</script>

