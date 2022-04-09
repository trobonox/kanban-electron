<template>
  <div>
    <h1>Test</h1>
    <Container @drop="onDrop">
      <Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item bg-zinc-800 p-2 rounded-md">{{ item.data }}</div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: "pog",
  components: { Container, Draggable },
  data() {
    return {
      items: [
        { id: 1, data: "Poggers" },
        { id: 2, data: "Poggersn't" }
      ]
    }
  },
  methods: {
    onDrop(dropResult) {
      console.log(dropResult)
    }
  }
}

</script>
