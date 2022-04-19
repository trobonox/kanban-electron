<template>
  <div class="px-6">
    <Navbar />
    <main id="home" class="mx-4">
      <section
        id="board-selection"
        class="mt-4 mb-10 ml-2 flex flex-col items-start"
      >
        <h1 class="text-4xl font-bold">Welcome back!</h1>
        <span class="text-dim-3 mb-8"
          >Your {{ this.boards.length }} boards are ready and waiting for
          you.</span
        >
        <h2 class="mb-2 text-2xl font-bold">Your boards:</h2>

        <span v-if="!boards || boards.length == 0"
          >Wowzers! Looks like you have no boards yet! Use the button above to
          create a new one.</span
        >
        <div class="flex flex-row gap-4" v-else>
          <nuxt-link
            v-for="(board, index) in boards"
            :key="index"
            :to="'/kanban/' + index"
            class="bg-elevation-1 bg-elevation-2-hover rounded-md p-4 text-lg"
            >{{ board.title }}</nuxt-link
          >
          <button
            class="bg-elevation-1 bg-elevation-2-hover rounded-md px-4 py-2 text-lg"
            @click="createNewBoard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-accent h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span hidden>Add Board</span>
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";

export default {
  name: "IndexPage",
  components: { Navbar },
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
  },
};
</script>
