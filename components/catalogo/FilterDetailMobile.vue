<template>
  <div class="col-12 np">
    <section
      v-show="showFiltroMobile"
      class="sidebar col-md-4 col-lg-3 col-xl-3"
      :style="
        showFiltroMobile
          ? {
              position: 'fixed !important',
              width: '100% !important',
              minHeight: '100vh',
              zIndex: 999,
              display: ' block !important',
              top: 0,
              left: 0,
            }
          : {}
      "
    >
      <div class="model-car only-desktop col-12">
        <p>Modelo</p>
        <h5>{{ model ? model.name : '' }}</h5>
      </div>
      <div class="top-sidebar only-mobile">
        <p>filtros</p>
        <a href="#" @click="toggleFiltros">
          <img src="../../assets/icons/cancel.svg" alt="" />
        </a>
      </div>
      <div class="filters col-12 mobVersionFilter">
        <CustomSelect
          v-model="selectedVersion"
          :default="defaultVersion(optionsVersions)"
          :options-value="optionsVersions"
        />
        <RadioButtons
          v-show="years && yearSelected"
          v-model="selectedRadioButtonYearMobile"
          :title="titleRadioButtonsYearMobile"
          :label-name="labelRadioButtonsYearMobile"
          :options="years"
          :default-value="yearSelected"
          :display-mode="'row'"
        />
        <RadioButtons
          v-show="views && viewSelected"
          v-model="selectedRadioButtonViewMobile"
          :title="titleRadioButtonsViewMobile"
          :label-name="labelRadioButtonsViewMobile"
          :options="views"
          :default-value="viewSelected"
        />
        <RadioButtonColors
          v-show="colorsOptions && colorSelected"
          v-model="selectedRadioButtonColorMobile"
          :title="titleRadioButtonsColorMobile"
          :label-name="labelRadioButtonsColorMobile"
          :options="colorsOptions"
          :default-value="colorSelected"
          :display-mode="'row'"
        />

        <div class="prices only-desktop">
          <p>precio</p>
          <div>
            <span>US$ {{ objectPrices ? objectPrices.value : '' }}</span
            >|<span
              >S/ {{ objectPrices ? objectPrices.convertedValue : '' }}</span
            >
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
          <button
            v-if="!disabledReserva"
            class="btn-red"
            @click="actionReserva"
          >
            reservar
          </button>
        </div>
        <button class="btn-blackgray" @click="toggleFiltros">
          añadir filtros
        </button>
      </div>
    </section>
    <button class="btn-blackgray new-only-mobile" @click="toggleFiltros">
      Filtros
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CustomSelect from '~/components/common/Select'
import RadioButtons from '~/components/common/RadioButtons'
import RadioButtonColors from '~/components/common/RadioButtonColors'
export default {
  name: 'FilterDetailMobileComponent',
  components: { CustomSelect, RadioButtons, RadioButtonColors },
  data() {
    return {
      selectedVersion: null,
      selectedRadioButtonMobile: null,
      titleRadioButtonsMobile: 'AÑO',
      labelRadioButtonsMobile: 'RadioButtonsYearMobile',
      selectedRadioButtonViewMobile: null,
      titleRadioButtonsViewMobile: 'VISTAS',
      labelRadioButtonsViewMobile: 'RadioButtonsViewMobile',
      setLinkReserva: '',
      disabledReserva: false,
      selectedRadioButtonColorMobile: null,
      titleRadioButtonsColorMobile: 'COLORES',
      labelRadioButtonsColorMobile: 'RadioButtonsColorMobile',
      showFiltroMobile: false,
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
    }),
  },
  watch: {
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
        } else {
          this.disabledReserva = true
        }
      }
    },
    actionReserva() {
      window.location.href = this.setLinkReserva
    },
    toggleFiltros() {
      this.showFiltroMobile = !this.showFiltroMobile
      if (this.showFiltroMobile) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    },
    ...mapActions({
      setYears: 'detailcar/settingYearData',
      setYear: 'detailcar/settingSelectedYear',
      setVersion: 'detailcar/settingSelectedVersion',
      setView: 'detailcar/settingSelectedView',
      setObjectPrice: 'detailcar/settingObjectPriceByYear',
      setColorCaption: 'detailcar/settingColorCaption',
      setImagesByColor: 'detailcar/settingImagesByColor',
    }),
  },
}
</script>

<style>
.sideBarMobile {
  position: fixed !important;
  width: 100% !important;
  min-height: 100vh;
  z-index: 999;
  display: block !important;
  top: 0;
  left: 0;
}
.btn-blackgray {
  background-color: #1b1b1b;
  border-radius: 5px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
  height: 56px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  letter-spacing: 1px;
  color: #d0d0d0;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
