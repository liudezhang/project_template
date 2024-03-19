import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "ldz",
    age: 18
  }),
  getters: {
    getName: (state) => state.name
  },
  actions: {
    setName(name: string) {
      this.name = name
    }
  }
})
