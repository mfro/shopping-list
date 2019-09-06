<template>
  <v-app>
    <div id="root">
      <v-toolbar id="toolbar">
        <v-toolbar-title>Shopping List</v-toolbar-title>
        <div class="flex-grow-1" />
        <v-btn color="primary" small absolute bottom right fab @click="startAdd()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list>
        <swipe-item v-for="item in items" :key="item" @delete="remove(item)">
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
        </swipe-item>
      </v-list>

      <v-dialog v-model="adding" max-width="30em">
        <v-card v-if="adding" ref="popup">
          <v-card-title>Add a new item</v-card-title>
          <v-card-text>
            <v-text-field ref="addTextField" autofocus v-model="addValue" />
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="adding = false, addValue = ''">Cancel</v-btn>
            <div class="flex-grow-1" ref="buttonPadding" />
            <v-btn color="primary" @click="add()">Submit</v-btn>
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
  },

  methods: {
    remove(item) {
      this.$store.commit('REMOVE_ITEM', item);
    },

    startAdd() {
      this.adding = true;
      setTimeout(() => {
        let rect = this.$refs.popup.$el.getBoundingClientRect();
        window.scroll(rect.left, rect.left);
        this.$refs.addTextField.focus();
      }, 1);
    },

    add() {
      this.$store.commit('ADD_ITEM', this.addValue);
      this.addValue = '';
      this.adding = false;
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
#toolbar {
  z-index: 3;
}

#popup {
  max-width: 20em;
}
</style>
