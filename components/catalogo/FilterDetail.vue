<template>
  <section class="sidebar col-md-4 col-lg-3 col-xl-3 mobVersionFilterDetail">
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
        v-model="selectedTransmision"
        :default="transmisionSelected"
        :options-value="transmisionOptions"
      />
      <CustomSelect
        v-model="selectedVersion"
        :default="defaultVersion(optionsVersions)"
        :options-value="optionsVersions"
      />
      <RadioButtons
        v-if="years && yearSelected"
        v-model="selectedRadioButtonYear"
        :title="titleRadioButtonsYear"
        :label-name="labelRadioButtonsYear"
        :options="years"
        :default-value="yearSelected"
        :display-mode="'row'"
      />
      <RadioButtons
        v-if="views && viewSelected"
        v-model="selectedRadioButtonView"
        :title="titleRadioButtonsView"
        :label-name="labelRadioButtonsView"
        :options="views"
        :default-value="viewSelected"
      />
      <RadioButtonColors
        v-if="colorsOptions && colorSelected"
        v-model="selectedRadioButtonColor"
        :title="titleRadioButtonsColor"
        :label-name="labelRadioButtonsColor"
        :options="colorsOptions"
        :default-value="colorSelected"
        :display-mode="'row'"
      />

      <div class="prices only-desktop">
        <p>precio</p>
        <div>
          <span>{{ objectPrices.value | USD }}</span
          >|<span>{{ objectPrices.convertedValue | PE }}</span>
        </div>
      </div>
      <!-- <div id="credit-calculate-des" class="credit-calculate hiddenItem">
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
      </div> -->
      <div class="buttons only-desktop">
        <button class="btn-blackgray" @click="cotizacionMazda">
          cotiza ahora
        </button>
        <button v-if="!disabledReserva" class="btn-red" @click="actionReserva">
          reservar
        </button>
      </div>
      <button class="btn-blackgray new-only-mobile">AÑADIR FILTROS</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CustomSelect from '~/components/common/Select'
import RadioButtons from '~/components/common/RadioButtons'
import RadioButtonColors from '~/components/common/RadioButtonColors'
export default {
  name: 'FilterDetailComponent',
  components: { CustomSelect, RadioButtons, RadioButtonColors },
  data() {
    return {
      selectedVersion: null,
      selectedRadioButtonYear: null,
      titleRadioButtonsYear: 'AÑO',
      labelRadioButtonsYear: 'RadioButtonsYear',
      selectedRadioButtonView: null,
      titleRadioButtonsView: 'VISTAS',
      labelRadioButtonsView: 'RadioButtonsView',
      setLinkReserva: '',
      disabledReserva: false,
      selectedRadioButtonColor: null,
      titleRadioButtonsColor: 'COLORES',
      labelRadioButtonsColor: 'RadioButtonsColor',
      selectedTransmision: null,
    }
  },
  computed: {
    ...mapGetters({
      versions: 'detailcar/modelVersions',
      model: 'detailcar/modelData',
      years: 'detailcar/yearsByVersion',
      yearSelected: 'detailcar/selectedYear',
      views: 'detailcar/viewsByVersion',
      viewSelected: 'detailcar/selectedView',
      stateVersion: 'detailcar/version',
      objectPrices: 'detailcar/objectPriceByYear',
      optionsVersions: 'detailcar/selectedVersions',
      colorsOptions: 'detailcar/colors',
      colorSelected: 'detailcar/selectedColor',
      transmisionOptions: 'detailcar/transmisionList',
      transmisionSelected: 'detailcar/transmision',
    }),
  },
  watch: {
    selectedTransmision(transmision) {
      this.setTransmision(transmision)
    },
    selectedVersion(newSlug, oldSluf) {
      this.setYears(newSlug)
      this.setVersion(newSlug)
      this.reservaMazda()
    },
    selectedRadioButtonYear(year) {
      this.setYear(year)
      this.reservaMazda()
    },
    yearSelected(year) {
      this.setYear(year)
      this.setObjectPrice()
    },
    selectedRadioButtonView(view) {
      // CREAR FUNCION PARA SETEAR IMAGENES EN LA VISTA
      this.setView(view)
      this.setColorCaption(view)
    },
    selectedRadioButtonColor(color) {
      this.setImagesByColor(color)
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
    defaultVersion(versionData) {
      if (versionData.length) {
        return versionData[0].slug
      }
      return null
    },
    cotizacionMazda() {
      const version = this.versions.filter(
        (version) => version.slug === this.selectedVersion
      )
      if (version) {
        const URL = `https://www.mazda.pe/cotizacion?id=${version[0].id}&year=${this.yearSelected}`
        window.location.href = URL
      }
    },
    async reservaMazda() {
      const body = [
        {
          sap: this.stateVersion.code,
          year: this.yearSelected,
        },
      ]

      const data = await this.$axios.$post(
        'https://apistore.derco.com.pe/api/store/cars/reservationlink',
        JSON.stringify(body)
      )
      if (data) {
        const link = data[0].prices[0].link || ''
        if (link) {
          this.setLinkReserva = link
          this.disabledReserva = false
        } else {
          this.disabledReserva = true
        }
      }
    },
    actionReserva() {
      window.location.href = this.setLinkReserva
    },
    ...mapActions({
      setYears: 'detailcar/settingYearData',
      setYear: 'detailcar/settingSelectedYear',
      setVersion: 'detailcar/settingSelectedVersion',
      setView: 'detailcar/settingSelectedView',
      setObjectPrice: 'detailcar/settingObjectPriceByYear',
      setColorCaption: 'detailcar/settingColorCaption',
      setImagesByColor: 'detailcar/settingImagesByColor',
      setTransmision: 'detailcar/settingTransmision',
    }),
  },
}
</script>

<style></style>
