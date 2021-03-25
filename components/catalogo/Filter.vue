<template>
  <div class="col-12 col-md-4 col-lg-3 col-xl-3">
    <div class="filterContainer">
      <CustomSelect v-model="selectedModel" :options-value="optionsModels" />
      <CustomSelect v-model="selectedPrice" :options-value="optionsPrices" />
      <button @click="applyFilter()">Aplicar Filtros</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CustomSelect from '~/components/common/Select'
export default {
  name: 'FilterComponent',
  components: { CustomSelect },
  props: {
    models: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      selectedModel: null,
      optionsModels: this.updateModelsData(this.models),
      selectedPrice: null,
      optionsPrices: [
        {
          value: null,
          text: 'RANGO DE PRECIOS',
        },
        {
          value: [10000, 20000],
          text: 'US$ 10,000 - US$ 20,000',
        },
        {
          value: [20000, 30000],
          text: 'US$ 20,000 - US$ 30,000',
        },
        {
          value: [30000, 40000],
          text: 'US$ 30,000 - US$ 40,000',
        },
      ],
    }
  },
  methods: {
    applyFilter() {
      this.filtrar(this.selectedModel)
    },
    updateModelsData(modelsMazda) {
      let newOptions = [
        {
          value: null,
          text: 'MODELOS',
        },
      ]
      newOptions = newOptions.concat(
        modelsMazda.map(
          (model) => (model = { ...model, value: model.slug, text: model.name })
        )
      )
      return newOptions
    },
    ...mapActions({
      filtrar: 'cars/filterCars',
    }),
  },
}
</script>

<style></style>
