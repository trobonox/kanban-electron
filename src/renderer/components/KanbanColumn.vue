<template>
  <div class="col-drag flex flex-col bg-zinc-800 p-2 rounded-md w-64">
    <h1 id="col-drag" class="col-drag ml-1 font-bold text-lg">{{ title }}</h1>
    <Container
      group-name="cards"
      :get-child-payload="getChildPayload"
      @drop="onDrop"
      :non-drag-area-selector="'nodrag'"
      class="max-h-65vh overflow-y-auto mt-2 rounded-sm custom-scrollbar"
    >
      <Draggable
        v-for="(el, index) in cards"
        :key="index"
        class="px-3 pt-3 pb-5 mb-3 bg-zinc-700 rounded-sm cursor-pointer"
      >
        <div class="flex flex-row justify-between">
          <p>{{ el.name }}</p>
          <div class="cursor-pointer" @click="$emit('click-close', el)">
            <!-- eslint-disable-next-line -->
            <svg
              class="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </Draggable>
    </Container>
    <div v-if="cardAddMode" class="flex flex-col mt-2">
      <textarea
        id="newCardInput"
        ref="newCardInput"
        type="text"
        placeholder="Enter a card title..."
        v-model="newCardName"
        class="
          h-8
          mb-2
          p-1
          bg-zinc-700
          rounded-sm
          nodrag
          focus:outline-1 focus:outline-emerald-400
        "
        @blur="addCard($event)"
        @keypress.enter="addCard($event)"
        v-resizable
      />
      <div class="flex flex-row gap-2 w-full justify-start">
        <button
          id="submitButton"
          class="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-md"
          @click="addCard($event)"
        >
          Add Card
        </button>
        <button
          @click="
            cardAddMode = !cardAddMode;
            newCardName = '';
          "
          class="px-2 py-1 hover:bg-zinc-600 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>

    <div
      v-if="!cardAddMode"
      class="
        mt-2
        py-1
        flex flex-row
        gap-1
        font-medium
        text-gray-200
        hover:bg-zinc-600
        rounded-md
        cursor-pointer
      "
      @click="
        cardAddMode = !cardAddMode;
        $nextTick(() => $refs.newCardInput.focus());
      "
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
      <h2>Add Card</h2>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: "KanbanColumn",
  components: { Container, Draggable },
  props: {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cards: [...this.list],
      cardAddMode: false,
      newCardName: "",
    };
  },
  methods: {
    onDrop(dropResult) {
      this.cards = this.applyDrag(this.cards, dropResult);
      // TODO: add logic for json saving
    },

    getChildPayload(index) {
      return this.cards[index];
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

    addCard(event) {
      if (
        (event.relatedTarget && event.relatedTarget.id === "submitButton") ||
        event instanceof KeyboardEvent
      ) {
        this.$set(
          this.cards,
          this.cards.length,
          JSON.parse(JSON.stringify({ name: this.newCardName }))
        );
      }

      this.newCardName = "";
      this.cardAddMode = false;
    },
  },
};
</script>

