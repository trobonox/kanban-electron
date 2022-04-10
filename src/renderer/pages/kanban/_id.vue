<template>
  <div class="px-6">
    <h1 class="font-bold text-4xl mb-2">
      {{ board.title }}
    </h1>
    <a href="/"
      ><button class="p-2 mb-6 rounded-md bg-emerald-600">Go back home</button>
    </a>
    <Container
      @drop="onDrop"
      group-name="columns"
      :orientation="'horizontal'"
      class="flex-row w-full gap-4"
      :get-child-payload="getChildPayload"
    >
      <Draggable v-for="column in board.lists" :key="column.id">
        <KanbanColumn :title="column.title" :list="column.cards" />
      </Draggable>
    </Container>
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
      console.log(dropResult);
      console.log(this.board.lists);
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
  },
  mounted() {
    let board_init =
      this.$store.state.storage.get("boards")[this.$route.params.id - 1];

    this.board = board_init;
  },
};
</script>

<style>
.smooth-dnd-container.horizontal {
  display: flex;
}
</style>
