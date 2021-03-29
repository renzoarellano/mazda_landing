<template>
  <section class="sidebar col-md-4 col-lg-3 col-xl-3">
    <div class="model-car only-desktop col-12">
      <p>Modelo</p>
      <h5>{{ model ? model.name : '' }}</h5>
    </div>
    <div class="top-sidebar only-mobile">
      <p>filtros</p>
      <a href="#">
        <img src="../../assets/icons/cancel.svg" alt="" />
      </a>
    </div>
    <div class="filters col-12">
      <CustomSelect
        v-model="selectedVersion"
        :default="defaultVersion(model)"
        :options-value="updateVersionsData(versions)"
        :set-default-function="setDefaultSelectVersion"
      />
      <RadioButtons
        v-if="years && yearSelected"
        :model="selectedRadioButtonYear"
        :title="titleRadioButtonsYear"
        :label-name="labelRadioButtonsYear"
        :options="years"
        :value="yearSelected"
        :display-mode="'row'"
      />
      <div class="views">
        <p>vistas</p>
        <ul>
          <li class="item-radiobutton">
            <input id="view1" type="radio" name="views" value="Exterior" />
            <label for="view1">Exterior</label>
          </li>
          <li class="item-radiobutton">
            <input id="view2" type="radio" name="views" value="Interior" />
            <label for="view2">Interior</label>
          </li>
          <li class="item-radiobutton">
            <input id="view3" type="radio" name="views" value="Asientos" />
            <label for="view3">Asientos</label>
          </li>
          <li class="item-radiobutton">
            <input id="view4" type="radio" name="views" value="Detalles" />
            <label for="view4">Detalles</label>
          </li>
        </ul>
      </div>
      <div class="colors">
        <p>color exterior</p>
        <ul>
          <li>
            <input type="radio" />
          </li>
          <li>
            <input type="radio" />
          </li>
        </ul>
      </div>
      <div class="prices only-desktop">
        <p>precio</p>
        <div>
          <span>US$ {{ objetoPrecios ? objetoPrecios.value : '' }}</span
          >|<span
            >S/ {{ objetoPrecios ? objetoPrecios.convertedValue : '' }}</span
          >
        </div>
      </div>
      <div id="credit-calculate-des" class="credit-calculate">
        <div class="btn-calculate">
          Calcular credito
          <img id="img-plus" src="../../assets/icons/plus.svg" alt="" /><img
            id="img-minus"
            class="hide"
            src="../../assets/icons/remove.svg"
            alt=""
          />
        </div>
        <div id="options-calculate" class="hide">
          <div>
            <span>Precio del auto:</span>
            <span>US$ 18,900</span>
          </div>
          <div>
            <span>Cuota Inicial:</span>
            <span>20%</span>
          </div>
          <div class="option-range">
            <input id="input-range" value="50" min="0" max="100" type="range" />
            <span>Equivalente a:</span>
            <span>US$ 3,000</span>
          </div>
          <div>
            <span>Compra inteligente:</span>
            <div class="item-checkbox">
              <input id="checkCalculate" type="checkbox" />
              <label for="checkCalculate"></label>
            </div>
          </div>
          <div>
            <span>N° Cuotas:</span>
            <div class="counter">
              <input type="text" value="0" maxlength="2" readonly />
              <div>
                <span>
                  <svg
                    id="Capa_1"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="404.308px"
                    height="404.309px"
                    viewBox="0 0 404.308 404.309"
                    xml:space="preserve"
                  >
                    <g>
                      <path d="M0,101.08h404.308L202.151,303.229L0,101.08z" />
                    </g>
                  </svg>
                </span>
                <span>
                  <svg
                    id="Capa_1"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="404.308px"
                    height="404.309px"
                    viewBox="0 0 404.308 404.309"
                    xml:space="preserve"
                  >
                    <g>
                      <path d="M0,101.08h404.308L202.151,303.229L0,101.08z" />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="option-value">
            <span>Valor cuota:</span>
            <span>US$ 00,000</span>
          </div>
          <div class="ref-value">
            <span>Valor cuota referencial:</span>
            <img src="../../assets/icons/exclamation.svg" alt="" />
          </div>
          <button>quiero este</button>
        </div>
      </div>
      <div class="buttons only-desktop">
        <button class="btn-blackgray" @click="cotizacionMazda">
          cotiza ahora
        </button>
        <button class="btn-red">reservar</button>
      </div>
      <button class="btn-blackgray only-mobile">añadir filtros</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CustomSelect from '~/components/common/Select'
import RadioButtons from '~/components/common/RadioButtons'
export default {
  name: 'FilterDetailComponent',
  components: { CustomSelect, RadioButtons },
  data() {
    return {
      selectedVersion: null,
      selectedRadioButtonYear: this.yearSelected,
      titleRadioButtonsYear: 'AÑO',
      labelRadioButtonsYear: 'RadioButtonsYear',
      selectedRadioButtonType: null,
      titleRadioButtonsType: 'CATEGORÍA',
      labelRadioButtonsType: 'RadioButtonsType',
      objetoPrecios: null,
    }
  },
  computed: {
    ...mapGetters({
      versions: 'detailcar/modelVersions',
      model: 'detailcar/modelData',
      years: 'detailcar/yearsByVersion',
      yearSelected: 'detailcar/selectedYear',
      imagesByVersion: 'detailcar/imagesDetail',
    }),
  },
  watch: {
    selectedVersion(newSlug, oldSluf) {
      this.setYears(newSlug)
    },
    selectedRadioButtonYear(year) {
      console.log(
        '🚀 ~ file: FilterDetail.vue ~ line 199 ~ selectedRadioButtonYear ~ year',
        year
      )
      this.setSelectedYear(year)
      // this.setPrices(this.yearSelected)
      // this.setCotizacion(this.selectedRadioButtonYear, year)
    },
  },
  methods: {
    setDefaultSelectVersion(defaultValue, optionsSelect) {
      if (defaultValue) {
        const filterValue = optionsSelect.filter(
          (option) => option.slug === defaultValue
        )
        if (filterValue) {
          this.onChange(filterValue[0])
          return filterValue[0].text
        }
      }
      return null
    },
    updateVersionsData(versionsData) {
      let newOptions = [
        {
          value: null,
          text: 'VERSIONES',
        },
      ]
      if (versionsData) {
        newOptions = newOptions.concat(
          versionsData.map(
            (version) =>
              (version = {
                ...version,
                value: version.slug,
                text: version.name,
              })
          )
        )
      }
      return newOptions
    },
    defaultVersion(modelData) {
      if (modelData) {
        return modelData.versions[0].slug
      }
      return null
    },
    setPrices(year) {
      let filterYear
      if (year) {
        filterYear = this.years.filter(
          (yearData) => yearData.type === year.toString()
        )
      }
      if (filterYear) {
        this.objetoPrecios = filterYear[0]
        console.log(
          '🚀 ~ file: FilterDetail.vue ~ line 252 ~ setPrices ~ this.objetoPrecios',
          this.objetoPrecios
        )
      } else {
        this.objetoPrecios = {}
      }
    },
    cotizacionMazda() {
      const version = this.versions.filter(
        (version) => version.slug === this.selectedVersion
      )
      if (version) {
        const URL = `https://www.mazda.pe/cotizacion?id=${version[0].id}&year=${this.selectedRadioButtonYear}`

        window.location.href = URL
      }
    },
    ...mapActions({
      setYears: 'detailcar/settingYearData',
      setCotizacion: 'detailcar/settingCotizacionLink',
      setSelectedYear: 'detailcar/settingSelectedYear',
    }),
  },
}
</script>

<style scoped>
.sidebar {
  width: 100%;
  filter: drop-shadow(-13px 0 5px rgba(0, 0, 0, 0.49));
  padding: 15px 15px 0;
  position: fixed !important;
  background-image: linear-gradient(225deg, #363636 0%, #0c0c0c 100%);
  height: auto;
  max-height: 100vh;
  overflow: auto;
  transition: 0.5s all ease-in-out;
}
.sidebar.active {
  left: 0;
  z-index: 1;
}
.model-car {
  margin-bottom: 32px;
  position: relative;
}
.model-car p,
.filters .prices p,
.sidebar .top-sidebar p {
  color: #b4b4b4;
  font-size: 14px;
  text-transform: uppercase;
  margin: 0 0 10px;
}
.model-car h5 {
  font-size: 16px;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
}
.filters .versions,
.filters .years,
.filters .views,
.filters .colors,
.filters .credit-calculate {
  border-radius: 5px;
  background-color: #000000;
  width: 100%;
  color: #cfcfcf;
  font-size: 16px;
  padding: 15px;
  margin-bottom: 12px;
}
.filters .versions div,
.filters .credit-calculate .btn-calculate {
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}
.sidebar .top-sidebar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.sidebar .top-sidebar p {
  font-size: 18px;
}
.sidebar .top-sidebar a img {
  width: 12px;
}
.filters .versions div {
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.filters .versions img {
  transform: rotate(90deg);
  width: 14px;
}
.filters .versions.active img {
  transform: rotate(270deg);
}
.filters .years p,
.filters .views p,
.filters .colors p {
  text-transform: uppercase;
  margin: 0;
}
.filters .years ul,
.filters .colors ul {
  display: flex;
  padding: 0;
  list-style: none;
}
.filters .years ul li:not(:last-child) {
  margin-right: 24px;
}
.filters .years ul input {
  margin: 0;
}
.filters .years ul label,
.filters .views ul label {
  color: #d0d0d0;
  font-size: 16px;
  letter-spacing: 1px;
}
.filters .views ul li {
  margin-bottom: 12px;
}
.filters .views ul {
  padding: 0;
  list-style: none;
}
.filters .prices p {
  margin-top: 15px;
}
.filters .prices div {
  color: #d8d8d8;
  font-size: 21px;
  letter-spacing: 2px;
  line-height: 27px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}
.filters .credit-calculate .btn-calculate.active,
.filters .versions.active div {
  padding-bottom: 15px;
  border-bottom: 0.5px solid #3b3b3b;
}
.filters .credit-calculate .btn-calculate {
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.filters .credit-calculate .btn-calculate img {
  width: 13px;
}
.filters .credit-calculate #options-calculate {
  padding-top: 15px;
}
.filters .credit-calculate #options-calculate > div {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 14px;
  letter-spacing: 1px;
  color: #d0d0d0;
  flex-wrap: wrap;
  align-items: center;
}
.filters .credit-calculate #options-calculate .option-range span {
  color: #6c6c6c;
  font-size: 12px;
}
.filters .credit-calculate #options-calculate .option-range input {
  width: 100%;
  margin-bottom: 10px;
}
.filters .credit-calculate #options-calculate .option-range input[type='range'],
.filters
  .credit-calculate
  #options-calculate
  .option-range
  input[type='range']::-webkit-slider-runnable-track,
.filters
  .credit-calculate
  #options-calculate
  .option-range
  input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}
.filters
  .credit-calculate
  #options-calculate
  .option-range
  input[type='range']::-webkit-slider-thumb {
  background-color: #fff;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  margin-top: -4px;
  cursor: pointer;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
}
.filters
  .credit-calculate
  #options-calculate
  .option-range
  input[type='range']::-webkit-slider-runnable-track {
  background-color: #fff;
  height: 3px;
  border-radius: 2px;
}
.filters .credit-calculate #options-calculate .option-value {
  border-top: 0.5px solid #3b3b3b;
  border-bottom: 0.5px solid #3b3b3b;
  text-transform: uppercase;
}
.filters .credit-calculate #options-calculate .ref-value img {
  width: 12px;
}
.filters .credit-calculate #options-calculate button {
  background-color: #242424;
  border-radius: 5px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
  height: 56px;
  width: 100%;
  border: none;
  outline: none;
  margin-top: 32px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #d0d0d0;
  text-transform: uppercase;
  cursor: pointer;
}
.filters .buttons {
  margin-top: 75px;
}
.filters button {
  border-radius: 5px;
  width: 100%;
  height: 56px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
  font-size: 14px;
  letter-spacing: 1px;
  color: #d0d0d0;
  text-transform: uppercase;
  border: none;
  outline: none;
}
.filters button.btn-blackgray {
  background-color: #242424;
  margin-bottom: 15px;
}
.filters .buttons button.btn-red {
  background-color: #781326;
}
.filters .item-radiobutton,
.filters .credit-calculate .item-checkbox {
  position: relative;
}
.filters .item-radiobutton input,
.filters .credit-calculate .item-checkbox input {
  position: absolute;
  opacity: 0;
}
.filters .item-radiobutton input {
  width: 19px;
  height: 19px;
}
.filters .credit-calculate .item-checkbox input {
  width: 16px;
  height: 16px;
}
.filters .item-radiobutton label,
.filters .credit-calculate .item-checkbox label {
  position: relative;
  cursor: pointer;
  height: 19px;
  padding: 0;
  align-items: center;
  display: flex;
}
.filters .item-radiobutton label:before {
  content: '';
  margin-right: 10px;
  width: 19px;
  height: 19px;
  border: 0.5px solid #ededed;
  border-radius: 50%;
}
.filters .item-radiobutton label:after {
  content: '';
  background-color: transparent;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: absolute;
  left: 6px;
}
.filters .item-radiobutton input:checked + label:after,
.filters .credit-calculate .item-checkbox input:checked + label:after {
  background-color: #dbdbdb;
}
.filters .credit-calculate .item-checkbox label:before {
  content: '';
  width: 16px;
  height: 16px;
  border: 1px solid #797979;
  border-radius: 2px;
}
.filters .credit-calculate .item-checkbox label:after {
  content: '';
  background-color: transparent;
  width: 10px;
  height: 10px;
  position: absolute;
  left: 4px;
}
.filters .credit-calculate .counter {
  width: 49px;
  height: 23px;
  border-radius: 2px;
  background-color: #292929;
  display: flex;
  align-items: center;
}
.filters .credit-calculate .counter div {
  display: flex;
  flex-direction: column;
}
.filters .credit-calculate .counter input {
  width: 35px;
  background: transparent;
  border: none;
  outline: none;
  color: #d0d0d0;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 0 5px;
  text-align: right;
}
.filters .credit-calculate .counter span {
  height: 6px;
  display: flex;
  align-items: center;
}
.filters .credit-calculate .counter span svg {
  width: 6px;
  height: 10px;
  fill: #e6e6e6;
}
.filters .credit-calculate .counter span:first-child {
  transform: rotate(180deg);
  margin-bottom: 2px;
}
.hide {
  display: none;
}
.only-desktop {
  display: none;
}
.only-mobile {
  display: block;
}
@media screen and (min-width: 992px) {
  .only-desktop {
    display: block !important;
  }
  .only-mobile {
    display: none !important;
  }
  .sidebar {
    background-image: linear-gradient(225deg, #363636 0%, #0c0c0c 100%);
    padding: 40px 16px;
    position: relative;
    height: auto;
    overflow: auto;
  }
  .model-car h5 {
    font-size: 18px;
  }
}
</style>
