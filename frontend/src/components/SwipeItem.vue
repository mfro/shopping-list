<template>
  <div class="swiper-container error" :style="rootStyle" :class="{ active, error: active }">
    <div class="swiper-wrapper">
      <!-- <div class="swiper-slide" /> -->
      <div class="swiper-slide endcap pa-3 d-flex justify-end align-center">
        <v-icon class="white--text">delete</v-icon>
      </div>

      <v-list-item class="list-item swiper-slide" :class="{ active, 'elevation-2': active }">
        <slot />
      </v-list-item>

      <!-- <div class="swiper-slide" /> -->
      <div class="swiper-slide endcap pa-3 d-flex justify-start align-center">
        <v-icon class="white--text">delete</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      height: null,
      active: false,
      rootStyle: {
        height: 'auto',
        transition: '',
      },
    };
  },

  mounted() {
    this.swiper = new Swiper(this.$el, {
      // direction: 'horizontal',
      initialSlide: 1,
      resistanceRatio: 0,
      speed: 150,
    });

    this.swiper.on('progress', (value) => {
      this.active = value != 0.5;
    });

    this.swiper.on('transitionEnd', (x) => {
      if (this.swiper.activeIndex == 1) {
        return;
      }

      let box = this.$el.getBoundingClientRect();
      this.rootStyle.height = box.height + 'px';
      this.rootStyle.transition = 'height 180ms ease-out';
      setTimeout(() => {
        this.rootStyle.height = '0';
        setTimeout(() => {
          this.$emit('delete');
        }, 180)
      }, 1);
    });
  },

  destroy() {
    this.swiper.desotry();
  },
};
</script>

<style scoped lang="scss">
.list-item {
  flex: 0 0 auto;
  background-color: white;
  transition: border-radius 150ms, box-shadow 100ms;

  &.active {
    border-radius: 5px;
    // box-shadow: 0 1px 3px darkgrey;
  }
}

.endcap {
  height: 48px;
}

.swiper-slide {
  box-sizing: border-box;
}

.swiper-container {
  overflow: visible;

  &.active {
    z-index: 2;
  }
}
</style>
