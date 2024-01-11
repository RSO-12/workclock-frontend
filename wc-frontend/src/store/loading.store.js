import { defineStore } from 'pinia'

export const useLoader = defineStore('loader', {
    state: () => ({
        isVisible: false,
    }),
    actions: {
        show() {
            this.isVisible = true;
        },
        hide() {
            this.isVisible = false;
        }
    },
})
