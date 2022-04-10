<template>
  <div class="flex flex-col bg-zinc-800 p-2 rounded-md w-64">
    <h1 class="ml-1 font-bold text-lg">{{ title }}</h1>
    <Container
      group-name="1"
      :get-child-payload="getChildPayload"
      @drop="onDrop"
    >
      <Draggable
        v-for="(el, index) in list"
        :key="index"
        class="px-3 pt-3 pb-5 mt-3 bg-zinc-700 rounded-sm cursor-pointer"
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
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: "KanbanColumn",
  components: { Container, Draggable },
  data() {
    return {
      title: "testchamp",
      list: [
        { id: 1, name: "joe" },
        { id: 2, name: "goat" },
        { id: 3, name: "suiii" },
      ],
    };
  },
  methods: {
    onDrop(dropResult) {
      this.list = this.applyDrag(this.list, dropResult);
    },
    getChildPayload(index) {
      return this.list[index];
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
};
</script>

