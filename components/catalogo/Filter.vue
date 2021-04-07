<template>
  <div class="col-md-4 col-lg-3 col-xl-3 filterPad">
    <div class="filterContainer col-12">
      <CustomSelect v-model="selectedModel" :options-value="optionsModels" />
      <CustomSelect v-model="selectedPrice" :options-value="optionsPrices" />
      <RadioButtons
        v-model="selectedRadioButtonYear"
        :title="titleRadioButtonsYear"
        :label-name="labelRadioButtonsYear"
        :options="optionsRadioButtonsYear"
        :value="selectedRadioButtonYear"
        :display-mode="'row'"
      />
      <RadioButtons
        v-model="selectedRadioButtonType"
        :title="titleRadioButtonsType"
        :label-name="labelRadioButtonsType"
        :options="optionsRadioButtonsType"
        :value="selectedRadioButtonType"
      />
      <button class="buttonFilterAction" @click="applyFilter()">
        AÑADIR FILTROS
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CustomSelect from '~/components/common/Select'
import RadioButtons from '~/components/common/RadioButtons'
export default {
  name: 'FilterComponent',
  components: { CustomSelect, RadioButtons },
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
      selectedRadioButtonYear: null,
      titleRadioButtonsYear: 'AÑO',
      labelRadioButtonsYear: 'RadioButtonsYear',
      optionsRadioButtonsYear: {
        2021: 2021,
        2022: 2022,
      },
      selectedRadioButtonType: null,
      titleRadioButtonsType: 'CATEGORÍA',
      labelRadioButtonsType: 'RadioButtonsType',
      optionsRadioButtonsType: {
        SUV: 'SUV',
        HATCHBACK: 'Hatchback',
        SEDÁN: 'Sedán',
      },
    }
  },
  methods: {
    applyFilter() {
      const filterOptions = {
        model: this.selectedModel,
        price: this.selectedPrice,
        year: this.selectedRadioButtonYear,
        category: this.selectedRadioButtonType,
      }
      this.filtrar(filterOptions)
      this.scrollTop()
    },
    updateModelsData(modelsMazda) {
      let newOptions = [
        {
          value: null,
          text: 'MODELOS',
        },
      ]
      if (modelsMazda) {
        newOptions = newOptions.concat(
          modelsMazda.map(
            (model) =>
              (model = { ...model, value: model.slug, text: model.name })
          )
        )
      }

      return newOptions
    },
    scrollTop() {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId)
        }
        window.scroll(0, window.pageYOffset - 50)
      }, 20)
    },
    ...mapActions({
      filtrar: 'cars/filterCars',
    }),
  },
}
</script>

<style scoped>
.filterPad {
  padding-left: 0px;
  position: fixed;
}
@media (max-width: 767px) {
  .filterPad {
    display: none;
  }
}
</style>
