<template>
  <div class="px-6">
    <h1 class="font-bold text-4xl mb-2">
      {{ board.title }}
    </h1>
    <a href="/"
      ><button class="p-2 mb-6 rounded-md bg-emerald-600">Go back home</button>
    </a>
    <div class="flex flex-row gap-4 w-full items-start justify-start">
      <Container
        @drop="onDrop"
        group-name="columns"
        :orientation="'horizontal'"
        class="flex-row gap-4"
        :get-child-payload="getChildPayload"
      >
        <Draggable v-for="column in board.lists" :key="column.id">
          <KanbanColumn :title="column.title" :list="column.cards" />
        </Draggable>
      </Container>
      <div
        class="
          w-32
          flex flex-row
          gap-2
          items-center
          p-2
          bg-zinc-800
          hover:bg-zinc-700
          rounded-md
          cursor-pointer
        "
        @click="addColumn()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
        <span>Add Board</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import KanbanColumn from "~/components/KanbanColumn.vue";

export default {
  name: "pog",
  components: { Container, Draggable, KanbanColumn },
  data() {
    return {
      board: [],
    };
  },
  methods: {
    onDrop(dropResult) {
      this.board.lists = this.applyDrag(this.board.lists, dropResult);
    },

    getChildPayload(index) {
      return this.board.lists[index];
    },

    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },

    addColumn() {
      const column = {
        id: this.board.lists.length + 1,
        title: "New Column",
        cards: [{ name: "Test Card" }],
      };

      this.$set(this.board.lists, this.board.lists.length, column);
    },
  },
  mounted() {
    let board_init =
      this.$store.state.storage.get("boards")[this.$route.params.id];

    this.board = board_init;
  },
};
</script>

<style>
.smooth-dnd-container.horizontal {
  display: flex;
}
</style>
