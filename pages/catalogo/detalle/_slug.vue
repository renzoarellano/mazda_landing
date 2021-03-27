<template>
  <b-container fluid class="">
    <b-row>
      <FilterDetailComponent />
      <DetailCarComponent  />
      <div>{{ slug }}</div>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterDetailComponent from '~/components/catalogo/FilterDetail'
import DetailCarComponent from '~/components/catalogo/DetailCar'
export default {
  components: {
    FilterDetailComponent,
    DetailCarComponent,
  },
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
}
</script>

<style scoped></style>
