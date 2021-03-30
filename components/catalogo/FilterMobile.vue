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
          Aplicar Filtros
        </button>
      </div>
    </div>
    <button class="filtroButton" @click="toggleFiltros">FILTROS</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      this.toggleFiltros()
      this.filtrar(filterOptions)
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
    toggleFiltros() {
      this.showModal = !this.showModal
      if (this.showModal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    },
    ...mapActions({
      filtrar: 'cars/filterCars',
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
  min-height: 500px;
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
