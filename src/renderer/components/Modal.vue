<template>
  <transition name="modal-fade">
    <div
      @click.self="$emit('closeModal')"
      class="
        modal
        flex flex-col
        items-center
        justify-center
        z-50
        inset-0
        w-screen
        h-screen
        bg-clip-padding bg-zinc-200 bg-opacity-30
        dark:bg-zinc-800 dark:bg-opacity-40
        backdrop-filter backdrop-blur-xl
      "
    >
      <div
        class="
          flex flex-col
          items-start
          w-2/5
          h-4/5
          py-4
          pl-8
          pr-6
          bg-zinc-100
          dark:bg-zinc-800
          shadow-lg
          rounded-md
          modal-body
        "
      >
        <div class="flex flex-row items-center justify-between w-full">
          <h1
            @click="enableTitleEditing"
            v-if="!titleEditing"
            :v-model="modalTitle"
            class="text-2xl font-bold pr-5 pointer-events-auto"
          >
            {{ modalTitle || title }}
          </h1>
          <input
            @blur="setTitleRemote()"
            @keypress.enter="setTitleRemote()"
            v-if="titleEditing"
            ref="titleInput"
            type="text"
            v-model="modalTitle"
            class="
              text-xl
              bg-zinc-800
              text-gray-100
              focus:border-2
              focus:border-emerald-600
              focus:border-dotted
              focus:outline-none
              pointer-events-auto
            "
          />
          <div @click="$emit('closeModal')" class="p-1">
            <svg
              class="w-6 h-6 text-gray-500 hover:text-indigo-500"
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
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["title", "titleEditingAllowed"],
  data() {
    return {
      modalTitle: "",
      titleEditing: false,
    };
  },
  methods: {
    setTitleRemote() {
      this.$emit("setTitle", this.modalTitle);
      this.titleEditing = false;
    },
    setTitle(title) {
      this.modalTitle = title;
    },
    enableTitleEditing() {
      if (!this.titleEditingAllowed) return;
      this.titleEditing = true;
      this.$nextTick(() => this.$refs.titleInput.focus());
    },
  },
};
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.35s ease;
}

.modal {
  position: fixed;
  max-width: 100%;
  /* And then, position it at will */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
