<template>
  <b-container fluid class="catalogoContainer">
    <b-row>
      <FilterComponent v-if="models" :models="models" />
      <CatalogoComponent :items="cars" />
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterComponent from '~/components/catalogo/Filter'
import CatalogoComponent from '~/components/catalogo/Catalogo'
export default {
  components: {
    FilterComponent,
    CatalogoComponent,
  },
  async asyncData({ store, route }) {
    await store.dispatch('cars/gettingSlugData')
    await store.dispatch('cars/gettingCarItemsData')
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      models: 'cars/models',
      imagesAPI: 'cars/imagesAPI',
      cars: 'cars/cars',
    }),
  },
}
</script>

<style scoped></style>
