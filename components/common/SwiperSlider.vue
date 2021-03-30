<template>
  <swiper ref="mySwiper" class="sliderContainer" :options="swiperOptions">
    <swiper-slide v-for="(banner, index) in imgDetail" :key="index">
      <img
        class="slideImage"
        :src="'https://cotizadorderco.com/forms/campanaMazda' + banner"
        alt="Mazda - Campaña"
      />
    </swiper-slide>

    <!--     <div slot="pagination" class="swiper-pagination"></div> -->
    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
  </swiper>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Carrousel',
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        keyboard: {
          enabled: true,
        },
        slidesPerView: 1,
        loop: true,
        /* pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }, */
      },
    }
  },
  computed: {
    swiper() {
      return this.imgDetail ? this.$refs.mySwiper.$swiper : null
    },
    ...mapGetters({
      imgDetail: 'detailcar/imagesDetail',
    }),
  },
  mounted() {
    if (this.imgDetail.length) {
      this.swiper.slideTo(1, 300, false)
    }
  },
  methods: {},
}
</script>

<style scoped>
.slideImage,
.slideDimensions {
  width: 100%;
  max-height: 800px;
}
.sliderContainer {
  width: 100%;
  margin-top: 25px;
}
.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  color: white;
}
.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  color: white;
}

@media (max-width: 767px) {
  .swiper-button-next:after,
  .swiper-container-rtl .swiper-button-prev:after {
    font-size: 25px;
  }
  .swiper-button-prev:after,
  .swiper-container-rtl .swiper-button-next:after {
    font-size: 25px;
  }
}
</style>
