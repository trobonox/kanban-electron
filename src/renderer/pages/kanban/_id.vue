<template>
  <div class="px-6">
    <h1
      v-if="!boardTitleEditing"
      class="font-bold text-4xl mb-2"
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
      class="
        mr-2
        mb-2
        px-2
        text-4xl
        w-full
        bg-elevation-1
        border-2 border-dotted border-accent
        outline-none
        rounded-sm
        break-all
      "
      @blur="
        boardTitleEditing = false;
        updateBoardTitleStorage();
      "
      @keypress.enter="
        boardTitleEditing = false;
        updateBoardTitleStorage();
      "
    />
    <div class="flex flex-row gap-4">
      <nuxt-link to="/"
        ><button class="p-2 mb-6 rounded-md bg-accent">Go back home</button>
      </nuxt-link>
      <button class="p-2 mb-6 rounded-md bg-accent" @click="deleteBoard">
        Delete Board
      </button>
    </div>
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
            @updateStorage="updateStorage"
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
            bg-elevation-1 bg-elevation-2-hover
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
      const boards = this.boardsWithoutCurrent();

      this.board.lists = this.applyDrag(this.board.lists, dropResult);

      this.$store.state.storage.set("boards", [...boards, this.board]);
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
      const boards = this.boardsWithoutCurrent();

      const column = {
        id: this.board.lists.length + 1,
        title: "New Column",
        cards: [{ name: "Test Card" }],
      };

      this.$set(this.board.lists, this.board.lists.length, column);
      this.$store.state.storage.set("boards", [...boards, this.board]);
    },

    removeColumn(columnID) {
      const boards = this.boardsWithoutCurrent();

      const column = this.board.lists.filter((obj) => {
        return obj.id === columnID;
      })[0];
      const columnIndex = this.board.lists.indexOf(column);

      this.$delete(this.board.lists, columnIndex);
      this.$store.state.storage.set("boards", [...boards, this.board]);
    },

    enableDragging() {
      this.draggingEnabled = true;
    },

    disableDragging() {
      this.draggingEnabled = false;
    },

    boardsWithoutCurrent() {
      let boards = this.$store.state.storage.get("boards");
      boards.splice(this.$route.params.id, 1);
      return boards;
    },

    deleteBoard() {
      const boards = this.boardsWithoutCurrent();
      this.$store.state.storage.set("boards", boards);
      this.$router.push("/");
    },

    updateStorage(columnRef) {
      const boards = this.boardsWithoutCurrent();

      let board = this.board;

      const column = this.board.lists.filter((obj) => {
        return obj.id === columnRef.id;
      })[0];
      const columnIndex = this.board.lists.indexOf(column);

      board.lists[columnIndex] = columnRef;

      this.$store.state.storage.set("boards", [...boards, this.board]);
    },

    updateBoardTitleStorage() {
      const boards = this.boardsWithoutCurrent();
      this.board.title = this.boardTitle;
      this.$store.state.storage.set("boards", [...boards, this.board]);
    },
  },
};
</script>

<style>
.smooth-dnd-container.horizontal {
  display: flex;
}

.bg-elevation-1 {
  background-color: var(--elevation-1);
}

.bg-elevation-2-hover:hover {
  background-color: var(--elevation-2);
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
</style>
