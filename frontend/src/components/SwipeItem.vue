<template>
  <div id="root" class="swiper-container error" :style="rootStyle" :class="{ active, error: active }">
    <div class="swiper-wrapper">
      <div class="swiper-slide" />

      <v-list-item id="list-item" class="swiper-slide" :class="{ active }">
        <slot />
      </v-list-item>

      <div class="swiper-slide" />
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
      this.active = value != 0 && value != 1 && value != 0.5;
      console.log(value);
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
#list-item {
  flex: 0 0 auto;
  background-color: white;
  transition: border-radius 150ms;

  &.active {
    border-radius: 5px;
  }
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
