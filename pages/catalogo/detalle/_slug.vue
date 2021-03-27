<template>
  <b-container fluid class="">
    <b-row>
      <FilterDetailComponent />
      <CarDetailComponent  />
      <!-- <div>{{ slug }}</div> -->
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterDetailComponent from '~/components/catalogo/FilterDetail'
import CarDetailComponent from '~/components/catalogo/CarDetail'
export default {
  components: {
    FilterDetailComponent,
    CarDetailComponent,
  },
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
}
</script>

<style scoped></style>
