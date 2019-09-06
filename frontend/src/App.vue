<template>
  <v-app>
    <div id="root">
      <v-app-bar id="toolbar" fixed>
        <v-toolbar-title>Shopping List</v-toolbar-title>
        <div class="flex-grow-1" />
        <template v-if="shopping">
          <v-btn :color="'primary'" icon @click="toggleShopping()">
            <v-icon>shopping_cart</v-icon>
          </v-btn>
          <v-btn icon :disabled="items.find(a => a.checked) == null" @click="finishShopping()">
            <v-icon>delete_sweep</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn icon @click="toggleShopping()">
            <v-icon>add_shopping_cart</v-icon>
          </v-btn>
          <v-btn icon @click="startAdd()">
            <v-icon>add</v-icon>
          </v-btn>
        </template>
      </v-app-bar>
      <div id="toolbar-spacer" />

      <v-list>
        <template v-if="shopping">
          <v-list-item
            v-for="item in sortedItems"
            :key="item.value"
            @delete="remove(item)"
            @click="toggleCheck(item)"
          >
            <v-list-item-icon class="my-0 mr-4 align-self-center">
              <v-icon v-if="item.checked">check_box</v-icon>
              <v-icon v-else>check_box_outline_blank</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.value }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <swipe-item v-for="item in sortedItems" :key="item.value" @delete="remove(item)">
            <v-list-item-content>
              <v-list-item-title>{{ item.value }}</v-list-item-title>
            </v-list-item-content>
          </swipe-item>
        </template>
      </v-list>

      <v-dialog v-model="adding" max-width="30em">
        <v-card ref="popup">
          <v-card-title>Add a new item</v-card-title>
          <v-card-text class="pb-0">
            <v-text-field v-model="addValue" />
          </v-card-text>
          <v-list id="suggestions">
            <v-list-item v-for="entry in suggestions" :key="entry" @click="addValue = entry">
              <v-list-item-content>
                <v-list-item-title>{{ entry }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn text @click="adding = false, addValue = ''">Cancel</v-btn>
            <div class="flex-grow-1" ref="buttonPadding" />
            <v-btn color="primary" :disabled="!isValidAdd(addValue)" @click="add()">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import SwipeItem from '@/components/SwipeItem';
import { setTimeout } from 'timers';

export default {
  name: 'home',

  components: {
    SwipeItem,
  },

  data() {
    return {
      adding: false,
      addValue: '',
    };
  },

  computed: {
    items: vm => vm.$store.state.items,
    memory: vm => vm.$store.state.memory,
    shopping: vm => vm.$store.state.shopping,

    suggestions() {
      let list = this.memory.slice();
      return list.sort((a, b) => {
        if (b.count != a.count)
          return b.count - a.count;
        return a.value.localeCompare(b.value);
      }).filter(a => {
        if (!this.isValidAdd(a.value))
          return false;

        if (this.addValue && !a.value.toLowerCase().includes(this.addValue.toLowerCase()))
          return false;

        return true;
      }).map(a => a.value);
    },

    sortedItems() {
      let list = this.items.slice();
      return list.sort((a, b) => {
        if (a.checked != b.checked && this.shopping)
          return a.checked ? 1 : -1;

        return a.value.localeCompare(b.value);
      });
    },
  },

  methods: {
    toggleShopping() {
      this.$store.commit('SET_SHOPPING', !this.shopping);
      window.scrollTo(0, 0);
    },

    toggleCheck(item) {
      if (item.checked)
        this.$store.commit('UNCHECK_ITEM', item.value);
      else
        this.$store.commit('CHECK_ITEM', item.value);
    },

    finishShopping() {
      this.$store.commit('PURCHASE_CHECKED_ITEMS');
      this.toggleShopping();
    },

    startAdd() {
      this.adding = true;
      // setTimeout(() => {
      //   let rect = this.$refs.popup.$el.getBoundingClientRect();
      //   window.scroll(rect.left, rect.left);
      // }, 1);
    },

    isValidAdd(value) {
      if (value.trim() == '')
        return false;

      if (this.items.find(a => a.value.toLowerCase() == value.toLowerCase()))
        return false;

      return true;
    },

    add() {
      this.$store.commit('ADD_ITEM', this.addValue);
      this.addValue = '';
      this.adding = false;
    },

    remove(item) {
      this.$store.commit('REMOVE_ITEM', item.value);
    },
  },
};
</script>

<style lang="scss">
.v-application--wrap {
  min-height: 0 !important;
}
</style>

<style lang="scss" scoped>
#root {
  width: 100vw;
  overflow-x: hidden;
}

#toolbar {
  z-index: 3;
}

#toolbar-spacer {
  height: 56px;
}

#popup {
  max-width: 20em;
}

#suggestions {
  overflow-y: auto;
  max-height: 50vh;
}
</style>
