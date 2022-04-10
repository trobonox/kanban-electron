<template>
  <div class="px-6">
    <h1 class="font-bold text-4xl mb-8">Test</h1>
    <div class="flex flex-row w-full gap-4">
      <Container @drop="onDrop">
        <KanbanColumn />
      </Container>
      <Container @drop="onDrop">
        <KanbanColumn />
      </Container>
      <Container @drop="onDrop">
        <KanbanColumn />
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
      items: [
        { id: 1, data: "Poggers" },
        { id: 2, data: "Poggersn't" },
      ],
    };
  },
  methods: {
    onDrop(dropResult) {
      console.log(dropResult);
    },
  },
};
</script>
