<template>
  <div class="px-6">
    <Navbar />
    <main id="home">
      <section
        id="board-selection"
        class="mt-4 mb-10 ml-2 flex flex-col items-start"
      >
        <h4 class="mb-8 text-4xl font-bold">Welcome back!</h4>
        <h4 class="mb-2 text-xl font-medium">Your boards:</h4>
        <button
          class="text-buttons bg-accent mb-6 rounded-md px-2 py-1"
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
            class="bg-elevation-1 bg-elevation-2-hover rounded-md p-4 text-lg"
            >{{ board.title }}</nuxt-link
          >
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
