<template>
  <div class="titleCatalog">
    <h1>CATÁLOGO {{ actualYear }}</h1>
    <p>{{ carItems.length }} resultados</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TitleCatalog',
  data() {
    return {
      actualYear: new Date().getFullYear(),
    }
  },
  computed: {
    ...mapGetters({
      carItems: 'cars/cars',
    }),
  },
}
</script>
