<template>
  <swiper ref="mySwiper" class="sliderContainer" :options="swiperOptions">
    <!-- <div v-for="banner in banners" :key="banner.id" class="slideDimensions">
      <swiper-slide>
        <img
          class="slideImage"
          :src="imagesUrl + banner.image"
          :alt="banner.title"
        />
      </swiper-slide>
    </div> -->
    <div slot="pagination" class="swiper-pagination"></div>
    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
  </swiper>
</template>

<script>
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
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      banners: [],
      imagesUrl: 'process.env.imagesUrl',
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    this.getBanners()
    this.swiper.slideTo(1, 300, false)
  },
  methods: {
    async getBanners() {
      /* const token = (await 'Bearer ') + this.$store.getters.getBrandData.token
      const url = process.env.apiUrl + '/banner'
      const headers = {
        Authorization: token
      }
      this.banners = await this.$axios.$get(url, headers) */
    },
  },
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
  margin-top: 76px;
}
</style>
