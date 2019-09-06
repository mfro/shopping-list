import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
  },
  mutations: {
    SET_STATE(state, value) {
      Object.assign(state, value);
    },

    REMOVE_ITEM(state, item) {
      let i = state.items.indexOf(item);
      if (i < 0) throw new Error('Item does not exist');

      state.items.splice(i, 1);
    },

    ADD_ITEM(state, item) {
      let i = state.items.indexOf(item);
      if (i >= 0) throw new Error('Item exists');

      for (i = 0; i < state.items.length; ++i) {
        if (item.localeCompare(state.items[i]) < 1) {
          state.items.splice(i, 0, item);
          return;
        }
      }

      state.items.push(item);
    },
  },
  actions: {
    
  },
})
