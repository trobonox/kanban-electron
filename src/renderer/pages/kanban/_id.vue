<template>
  <div class="px-6">
    <h1
      v-if="!boardTitleEditing"
      class="mb-2 text-4xl font-bold"
      @click="
        boardTitleEditing = true;
        $nextTick(() => $refs.boardTitleInput.focus());
      "
    >
      {{ boardTitle }}
    </h1>
    <input
      ref="boardTitleInput"
      v-if="boardTitleEditing"
      type="text"
      v-model="boardTitle"
      class="bg-elevation-1 border-accent mr-2 mb-2 w-full break-all rounded-sm border-2 border-dotted px-2 text-4xl outline-none"
      @blur="
        boardTitleEditing = false;
        updateBoardTitleStorage();
      "
      @keypress.enter="boardTitleEditing = false"
    />
    <div class="flex flex-row gap-4">
      <nuxt-link to="/"
        ><button class="text-buttons bg-accent mb-6 rounded-md p-2">
          Go back home
        </button>
      </nuxt-link>
      <button
        class="text-buttons bg-accent mb-6 rounded-md p-2"
        @click="deleteBoard"
      >
        Delete Board
      </button>
    </div>
    <div
      class="z-1 custom-scrollbar-horizontal flex min-h-[87vh] w-full flex-row items-start justify-start gap-4 overflow-x-auto pb-8"
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
            @updateStorage="updateColumnProperties"
          />
        </Draggable>
        <div
          class="nodrag bg-elevation-1 bg-elevation-2-hover flex h-min cursor-pointer flex-row items-center gap-2 rounded-md p-2"
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
import { generateUniqueID } from "~/utils/idGenerator.js";

export default {
  name: "pog",
  components: { Container, Draggable, KanbanColumn },
  data() {
    return {
      board: [],
      draggingEnabled: true,
      boardTitle: "",
      boardTitleEditing: false,
    };
  },
  mounted() {
    let board_init =
      this.$store.state.storage.get("boards")[this.$route.params.id];

    this.board = board_init;
    this.boardTitle = this.board.title;

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

      this.updateStorage();
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
        id: generateUniqueID(),
        title: "New Column",
        cards: [{ name: "Test Card" }],
      };

      this.$set(this.board.lists, this.board.lists.length, column);
      this.updateStorage();
    },

    removeColumn(columnID) {
      const column = this.board.lists.filter((obj) => {
        return obj.id === columnID;
      })[0];
      const columnIndex = this.board.lists.indexOf(column);

      this.$delete(this.board.lists, columnIndex);
      this.updateStorage();
    },

    enableDragging() {
      this.draggingEnabled = true;
    },

    disableDragging() {
      this.draggingEnabled = false;
    },

    deleteBoard() {
      const boards = this.$store.state.storage.get("boards");
      boards.splice(this.$route.params.id, 1);

      this.$store.state.storage.set("boards", boards);
      this.$router.push("/");
      this.$toast.success("Successfully deleted board.", { duration: 2500 });
    },

    updateColumnProperties(columnRef) {
      let board = this.board;
      const column = this.board.lists.filter((obj) => {
        return obj.id === columnRef.id;
      })[0];
      const columnIndex = this.board.lists.indexOf(column);

      board.lists[columnIndex] = columnRef;
      this.board = board;

      this.updateStorage();
    },

    updateBoardTitleStorage() {
      this.board.title = this.boardTitle;
      this.updateStorage();
    },

    updateStorage() {
      let savedBoards = this.$store.state.storage.get("boards");
      const currentBoard = savedBoards.filter((obj) => {
        return obj.id === this.board.id;
      })[0];
      const currentBoardIndex = savedBoards.indexOf(currentBoard);

      console.log(savedBoards);

      savedBoards[currentBoardIndex] = this.board; // overwrite old board with new one
      this.$store.state.storage.set("boards", savedBoards); // overwrite all svaed boards with new altered array which includes modified current board
    },
  },
};
</script>

<style scoped>
.smooth-dnd-container.horizontal {
  display: flex;
}
</style>
