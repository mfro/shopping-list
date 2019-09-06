import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    memory: [],
    shopping: false,
  },
  mutations: {
    ASSIGN(state, value) {
      Object.assign(state, value);
    },

    ADD_ITEM(state, value) {
      let i = state.items.findIndex(item => item.value == value);
      if (i >= 0) throw new Error('Item already exists');

      let item = { value, checked: false };

      for (i = 0; i < state.items.length; ++i) {
        if (value.localeCompare(state.items[i].value) < 1) {
          state.items.splice(i, 0, item);
          return;
        }
      }

      state.items.push(item);
    },

    REMOVE_ITEM(state, value) {
      let i = state.items.findIndex(item => item.value == value);
      if (i < 0) throw new Error('Item does not exist');

      state.items.splice(i, 1);
    },

    CHECK_ITEM(state, value) {
      let item = state.items.find(item => item.value == value);
      if (item == null) throw new Error('Item does not exist');

      item.checked = true;
    },

    UNCHECK_ITEM(state, value) {
      let item = state.items.find(item => item.value == value);
      if (item == null) throw new Error('Item does not exist');

      item.checked = false;
    },

    SET_SHOPPING(state, value) {
      state.shopping = value;
    },

    PURCHASE_CHECKED_ITEMS(state) {
      for (let i = state.items.length - 1; i >= 0; --i) {
        if (state.items[i].checked) {
          let entry = state.memory.find((m) => m.value == state.items[i].value);
          if (!entry) state.memory.push(entry = { value: state.items[i].value, count: 0 });
          entry.count += 1;

          state.items.splice(i, 1);
        }
      }
    },
  },
  actions: {

  },
});
