<template>
  <div class="col-12 col-md-8 col-lg-9">
    <div class="card">
      <h1
        v-for="(carItem, index) in carItems"
        :key="index"
        style="color: white"
      >
        {{ carItem.name }}
      </h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CatalogoComponent',
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    ...mapGetters({
      carItems: 'cars/cars',
    }),
  },
}
</script>

<style></style>
