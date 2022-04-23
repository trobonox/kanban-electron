<template>
  <div>
    <HelpModal
      v-show="modalVisible"
      ref="modal"
      @closeModal="modalVisible = false"
    />
    <header
      class="bg-elevation-1 flex w-full flex-row items-center justify-between rounded-lg py-2 px-4 shadow-lg"
    >
      <div>
        <nuxt-link
          to="/"
          class="text-accent text-accent-darker-hover text-xl font-bold"
          >Kanban Electron</nuxt-link
        >
        <span class="text-dim-3 ml-1">v0.2.2-beta</span>
      </div>
      <div class="flex flex-row gap-4">
        <button @click="modalVisible = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-accent-hover h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <nuxt-link to="/settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-accent-hover h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </nuxt-link>
      </div>
    </header>
  </div>
</template>

<script>
import HelpModal from "~/components/HelpModal.vue";

export default {
  name: "Navbar",
  components: { HelpModal },
  data() {
    return {
      modalVisible: false,
    };
  },
};
</script>
