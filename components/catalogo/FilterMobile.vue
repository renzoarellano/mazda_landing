<template>
  <div class="col-12 np">
    <div v-show="showModal" class="col-12 filterPadMobile">
      <div class="filterContainer col-12 filterContainerMobile">
        <div class="col-12 topTitleFilterMobile">
          <h2>FILTROS</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 10"
            width="14"
            height="10"
            @click="toggleFiltros"
          >
            <style>
              tspan {
                white-space: pre;
              }
              .shp0 {
                fill: #ffffff;
              }
            </style>
            <g id="05-RANGO-PRECIOS">
              <g id="Group 14">
                <path
                  id="X"
                  class="shp0"
                  d="M6.04 4.82L1.32 0L3.64 0L7.35 3.51L7.46 3.51L11.22 0L12.84 0L8.29 4.46L13.47 9.87L13.47 10L11 10L6.96 5.8L6.87 5.8L2.62 10L1 10L6.04 4.82Z"
                />
              </g>
            </g>
          </svg>
        </div>
        <CustomSelect
          v-model="selectedModelMobile"
          :options-value="optionsModelsMobile"
          :default="selectedModelMobile"
        />
        <CustomSelect
          v-model="selectedPriceMobile"
          :options-value="optionsPricesMobile"
          :absolute="false"
        />
        <RadioButtons
          v-model="selectedRadioButtonYearMobile"
          :title="titleRadioButtonsYearMobile"
          :label-name="labelRadioButtonsYearMobile"
          :options="allYearsMobile"
          :value="selectedYearMobile"
          :default-value="selectedYearMobile"
          :display-mode="'row'"
        />
        <RadioButtons
          v-model="selectedRadioButtonTypeMobile"
          :title="titleRadioButtonsTypeMobile"
          :label-name="labelRadioButtonsTypeMobile"
          :options="allCategoriesMobile"
          :default-value="selectedCategoryMobile"
          :value="selectedRadioButtonTypeMobile"
        />
        <button
          class="buttonFilterAction"
          @click="
            applyFilterMobile()
            closeModal()
          "
        >
          AÑADIR FILTROS
        </button>
        <button class="cleanFilters" @click="cleanFilters()">
          Quitar Filtros
        </button>
      </div>
    </div>
    <button class="filtroButton" @click="toggleFiltros">FILTROS</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CustomSelect from '~/components/common/Select'
import RadioButtons from '~/components/common/RadioButtons'
export default {
  name: 'FilterMobileComponent',
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
      showModal: false,
      selectedModelMobile: this.$route.query.model || null,
      optionsModelsMobile: this.updateModelsData(this.models),
      selectedPriceMobile: this.gettingPrice(this.$route.query.price),
      optionsPricesMobile: [
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
      selectedRadioButtonYearMobile: this.$route.query.year || null,
      titleRadioButtonsYearMobile: 'AÑO',
      labelRadioButtonsYearMobile: 'RadioButtonsYearMobile',
      optionsRadioButtonsYearMobile: {
        2021: 2021,
        2022: 2022,
      },
      selectedRadioButtonTypeMobile: this.$route.query.category || null,
      titleRadioButtonsTypeMobile: 'CATEGORÍA',
      labelRadioButtonsTypeMobile: 'RadioButtonsTypeMobile',
      optionsRadioButtonsTypeMobile: {
        SUV: 'SUV',
        HATCHBACK: 'Hatchback',
        SEDÁN: 'Sedán',
      },
    }
  },
  computed: {
    ...mapGetters({
      selectedYearMobile: 'cars/year',
      allYearsMobile: 'cars/years',
      selectedCategoryMobile: 'cars/category',
      allCategoriesMobile: 'cars/categories',
    }),
  },
  watch: {
    selectedModelMobile(model) {
      this.filterByCar(model)
      this.selectedRadioButtonYearMobile = null
      this.selectedRadioButtonTypeMobile = null
      this.setYear(null)
      this.setCategory(null)
      this.applyFilterMobile()
    },
    selectedRadioButtonYearMobile(year) {
      this.setYear(year)
      this.applyFilterMobile()
    },
    selectedRadioButtonTypeMobile(category) {
      this.setCategory(category)
      this.applyFilterMobile()
    },
  },
  async mounted() {
    const { query } = await this.$route
    const { model, price, category, year } = query
    console.log(window.innerWidth)
    if ((model || price || category || year) && window.innerWidth < 768) {
      await this.applyFilterMobile()
    }
  },
  methods: {
    gettingPrice(price) {
      if (price) return price
      return null
    },
    applyFilterMobile() {
      console.log('Apply filter MOBILE')
      this.$router.push({
        path: this.$route.path,
        query: {},
      })
      const filterOptions = {
        model: this.selectedModelMobile,
        price: this.selectedPriceMobile,
        year: this.selectedRadioButtonYearMobile,
        category: this.selectedRadioButtonTypeMobile,
      }
      this.filtrar(filterOptions)
      this.$router.push({
        path: this.$route.path,
        query: filterOptions,
      })
      /* const str = Object.keys(filterOptions)
        .map(function (key) {
          if (filterOptions[key] != null) {
            return key + '=' + filterOptions[key]
          } else {
            return key
          }
        })
        .join('&')
      history.pushState(null, 'Catalogo Mazda', '/catalogo' + '?' + str) */
    },
    closeModal() {
      this.showModal = false
      document.body.style.overflow = 'initial'
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
    toggleFiltros() {
      this.showModal = !this.showModal
      if (this.showModal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    },
    cleanFilters() {
      this.selectedModelMobile = null
      this.selectedPriceMobile = null
      this.selectedRadioButtonYearMobile = null
      this.selectedRadioButtonTypeMobile = null
      this.setCategory(null)
      this.applyFilterMobile()
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

<style>
.np {
  padding-left: 0px;
  padding-right: 0px;
}

.filterContainerMobile {
  padding-top: 20px;
  overflow: auto;
  min-height: 100vh;
}
.filterPadMobile {
  top: 0;
  left: 0;
  z-index: 99;
  position: fixed;
  padding: 0;
}
.filtroButton {
  background-color: #101010;
  color: white;
  font-family: 'mazda_regular';
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  border: 0;
  padding: 10px;
  border-radius: 4px;
}

.topTitleFilterMobile {
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

@media (min-width: 768px) {
  .filterPadMobile {
    display: none;
  }
}
</style>
