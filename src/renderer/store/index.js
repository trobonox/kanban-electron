import Store from "electron-store";

const storage = new Store();

export const state = () => ({
  storage: storage
})
