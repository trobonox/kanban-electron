<template>
  <div class="px-6">
    <h1 class="font-bold text-4xl mb-2">
      {{ board.title }}
    </h1>
    <a href="/"
      ><button class="p-2 mb-6 rounded-md bg-emerald-600">Go back home</button>
    </a>
    <div
      class="
        pb-8
        flex flex-row
        gap-4
        w-full
        items-start
        justify-start
        overflow-x-auto
        z-1
        min-h-[87vh]
        custom-scrollbar-horizontal
      "
    >
      <Container
        @drop="onDrop"
        group-name="columns"
        :orientation="'horizontal'"
        class="flex-row gap-4"
        :get-child-payload="getChildPayload"
        :non-drag-area-selector="'nodrag'"
        :drag-handle-selector="dragHandleSelector"
      >
        <Draggable v-for="column in board.lists" :key="column.id">
          <KanbanColumn
            :ref="'kanbancol' + column.id"
            :id="column.id"
            :title="column.title"
            :list="column.cards"
            @removeColumn="removeColumn"
            @addColumn="addColumn"
            @modalOpen="disableDragging()"
            @modalClose="enableDragging()"
          />
        </Draggable>
        <div
          class="
            nodrag
            h-min
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
          <span hidden>Add Board</span>
        </div>
      </Container>
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
      draggingEnabled: true,
    };
  },
  mounted() {
    let board_init =
      this.$store.state.storage.get("boards")[this.$route.params.id];

    this.board = board_init;

    this._keyListener = function (e) {
      if (e.key === "b" && (e.ctrlKey || e.metaKey)) {
        // ctrl + b for new board
        this.addColumn();
      } else if (e.key === "d" && (e.ctrlKey || e.metaKey)) {
        // ctrl + d for deleting the last board
        const columnToDelete = this.board.lists[this.board.lists.length - 1].id;
        this.removeColumn(columnToDelete);
      } else if (e.key === "t" && (e.ctrlKey || e.metaKey)) {
        // ctrl + t for enabling title editing for the last column
        const columnToEditID = this.board.lists[this.board.lists.length - 1].id;
        const columnToEditRefName = "kanbancol" + columnToEditID.toString();
        const titleEditingForLastColumn =
          this.$refs[columnToEditRefName][0].titleEditing;

        if (titleEditingForLastColumn) return;

        this.$refs[columnToEditRefName][0].titleEditing = true;

        this.$nextTick(() =>
          this.$refs[columnToEditRefName][0].$refs.titleInput.focus()
        );
      } else if (e.key === "n" && (e.ctrlKey || e.metaKey)) {
        // ctrl + n for new card in the last column
        const columnToEditID = this.board.lists[this.board.lists.length - 1].id;
        const columnToEditRefName = "kanbancol" + columnToEditID.toString();
        const cardAddModeForLastColumn =
          this.$refs[columnToEditRefName][0].cardAddMode;

        if (cardAddModeForLastColumn) return;

        this.$refs[columnToEditRefName][0].cardAddMode = true;

        this.$nextTick(() =>
          this.$refs[columnToEditRefName][0].$refs.newCardInput.focus()
        );
      }
    };

    document.addEventListener("keydown", this._keyListener.bind(this));
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener);
  },

  computed: {
    dragHandleSelector() {
      if (this.draggingEnabled) return "";
      else return "joe";
    },
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

    removeColumn(columnID) {
      const column = this.board.lists.filter((obj) => {
        return obj.id === columnID;
      })[0];
      const columnIndex = this.board.lists.indexOf(column);

      this.$delete(this.board.lists, columnIndex);
    },

    enableDragging() {
      this.draggingEnabled = true;
    },

    disableDragging() {
      this.draggingEnabled = false;
    },
  },
};
</script>

<style>
.smooth-dnd-container.horizontal {
  display: flex;
}
</style>
