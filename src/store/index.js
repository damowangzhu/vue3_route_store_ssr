import { createStore } from "vuex";

export default function() {
  return createStore({
    state: {
      message: "Hello Test Page"
    },
    mutations: {},
    actions: {
      fetchMessage: ({ state }) => {
        console.log("fetch message ...");
        return new Promise(resolve => {
          setTimeout(() => {
            state.message = "Vue3 + Route + Store + SSR";
            resolve();
          }, 200);
        });
      }
    },
    modules: {}
  });
}
