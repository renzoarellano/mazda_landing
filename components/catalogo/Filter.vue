<template>
  <div class="col-md-4 col-lg-3 col-xl-3 filterPad">
    <div class="filterContainer col-12">
      <CustomSelect
        v-model="selectedModel"
        :options-value="optionsModels"
        :default="selectedModel"
      />
      <CustomSelect
        v-model="selectedPrice"
        :options-value="optionsPrices"
        :absolute="false"
      />
      <RadioButtons
        v-model="selectedRadioButtonYear"
        :title="titleRadioButtonsYear"
        :label-name="labelRadioButtonsYear"
        :options="allYears"
        :value="selectedYear"
        :default-value="selectedYear"
        :display-mode="'row'"
      />
      <RadioButtons
        v-model="selectedRadioButtonType"
        :title="titleRadioButtonsType"
        :label-name="labelRadioButtonsType"
        :options="allCategories"
        :value="selectedCategory"
        :default-value="selectedCategory"
      />
      <button class="buttonFilterAction" @click="applyFilter()">
        AÑADIR FILTROS
      </button>
      <button class="cleanFilters" @click="cleanFilters()">
        Quitar Filtros
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      selectedModel: this.$route.query.model || null,
      optionsModels: this.updateModelsData(this.models),
      selectedPrice: this.gettingPrice(this.$route.query.price),
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
      selectedRadioButtonYear: this.$route.query.year || null,
      titleRadioButtonsYear: 'AÑO',
      labelRadioButtonsYear: 'RadioButtonsYear',
      optionsRadioButtonsYear: {
        2021: 2021,
        2022: 2022,
      },
      selectedRadioButtonType: this.$route.query.category || null,
      titleRadioButtonsType: 'CATEGORÍA',
      labelRadioButtonsType: 'RadioButtonsType',
      optionsRadioButtonsType: {
        SUV: 'SUV',
        HATCHBACK: 'Hatchback',
        SEDÁN: 'Sedán',
      },
    }
  },
  computed: {
    ...mapGetters({
      selectedYear: 'cars/year',
      allYears: 'cars/years',
      selectedCategory: 'cars/category',
      allCategories: 'cars/categories',
    }),
  },
  watch: {
    selectedModel(model) {
      this.filterByCar(model)
      this.selectedRadioButtonYear = null
      this.selectedRadioButtonType = null
      this.setYear(null)
      this.setCategory(null)
      this.applyFilter()
    },
    selectedRadioButtonYear(year) {
      this.setYear(year)
      this.applyFilter()
    },
    selectedRadioButtonType(category) {
      this.setCategory(category)
      this.applyFilter()
    },
  },
  async mounted() {
    const { query } = await this.$route
    const { model, price, category, year } = query
    if (model || price || category || year) {
      await this.applyFilter()

      await this.setYear(year)
      await this.setCategory(category)
    }
  },
  methods: {
    gettingPrice(price) {
      if (price) return price
      return null
    },
    applyFilter() {
      console.log('carga')
      this.$router.push({
        path: this.$route.path,
        query: {},
      })
      const filterOptions = {
        model: this.selectedModel,
        price: this.selectedPrice,
        year: this.selectedRadioButtonYear,
        category: this.selectedRadioButtonType,
      }
      this.filtrar(filterOptions)
      this.$router.push({
        path: this.$route.path,
        query: filterOptions,
      })
      /*  const str = Object.keys(filterOptions)
        .map(function (key) {
          if (filterOptions[key] != null) {
            return key + '=' + filterOptions[key]
          } else {
            return key
          }
        })
        .join('&')
      history.pushState(null, 'Catalogo Mazda', '/catalogo' + '?' + str) */
      /* this.scrollTop() */
    },
    updateModelsData(modelsMazda) {
      let newOptions = [
        {
          value: null,
          text: 'TODOS LOS MODELOS',
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
    cleanFilters() {
      this.selectedModel = null
      this.selectedPrice = null
      this.selectedRadioButtonYear = null
      this.selectedRadioButtonType = null
      this.setCategory(null)
      this.applyFilter()
    },
    ...mapActions({
      filtrar: 'cars/filterCars',
      setYear: 'cars/settingYear',
      setCategory: 'cars/settingCategory',
      filterByCar: 'cars/filterByModel',
    }),
  },
}
</script>

<style scoped>
.filterPad {
  padding-left: 0px;
  position: fixed;
}
@media (min-width: 1200px) {
  .filterPad {
    max-width: 345px;
  }
}
@media (max-width: 767px) {
  .filterPad {
    display: none;
  }
}
</style>
