<template>
  <section class="content col-12 col-md-8 offset-md-4 col-lg-9 offset-lg-3">
    <div class="btn-back only-mobile backCatalogMobile">
      <nuxt-link to="/catalogo">
        <img src="../../assets/icons/next.svg" alt="" /> volver al catálogo
      </nuxt-link>
    </div>
    <div class="model-car new-only-mobile-flex row">
      <div class="col-7">
        <p>Modelo</p>
        <h5>{{ model.name }}</h5>
      </div>
      <div class="col-5">
        <FilterDetailMobileComponent />
      </div>
    </div>
    <div class="btn-back only-desktop">
      <nuxt-link to="/catalogo">
        <img src="../../assets/icons/next.svg" alt="" /> volver al catálogo
      </nuxt-link>
    </div>
    <!-- <ul class="tabs-type">
      <li
        :class="stateTransmision == 'mecanico' ? 'active' : ''"
        @click="setTransmision('mecanico')"
      >
        mecánico
      </li>
      <li
        :class="stateTransmision == 'automatico' ? 'active' : ''"
        @click="setTransmision('automatico')"
      >
        automático
      </li>
    </ul> -->

    <div class="only-mobile-detail">
      <CustomSelect
        v-if="viewsDetail && viewDetailSelected"
        v-model="selectedDetailView"
        :default="viewDetailSelected"
        :options-value="formateDetailView(viewsDetail)"
        :absolute="false"
      />
    </div>

    <Carrousel />
    <div class="prices only-mobile">
      <p>{{ model.name }}</p>
      <div>
        <span>{{ objectPrices.value | USD }}</span
        >|<span>{{ objectPrices.convertedValue | PE }}</span>
      </div>
    </div>
    <div class="detail-car">
      <div class="description" style="white-space: pre-line">
        {{ stateVersion.extra }}
      </div>
      <div>
        <button class="btn-blackgray only-mobile" @click="cotizacionMazda">
          cotiza ahora
        </button>
        <button
          v-show="!disabledReserva"
          class="btn-red only-mobile"
          @click="actionReserva"
        >
          reservar
        </button>
        <button @click="openBrochure">Descargar ficha técnica</button>
      </div>
    </div>
    <!-- <div id="credit-calculate-mob" class="credit-calculate hiddenItem">
      <div class="btn-calculate">
        Calcular credito
        <img id="img-plus" src="../../assets/icons/plus.svg" alt="" />
        <img
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
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Carrousel from '~/components/common/SwiperSlider'
import CustomSelect from '~/components/common/Select'
import FilterDetailMobileComponent from '~/components/catalogo/FilterDetailMobile'
export default {
  name: 'CarDetailComponent',
  components: { Carrousel, FilterDetailMobileComponent, CustomSelect },
  props: {},
  data() {
    return {
      disabledReserva: false,
      selectedDetailView: null,
    }
  },
  computed: {
    ...mapGetters({
      versions: 'detailcar/modelVersions',
      model: 'detailcar/modelData',
      years: 'detailcar/yearsByVersion',
      yearSelected: 'detailcar/selectedYear',
      viewsDetail: 'detailcar/viewsByVersion',
      viewDetailSelected: 'detailcar/selectedView',
      stateVersion: 'detailcar/version',
      stateTransmision: 'detailcar/transmision',
      objectPrices: 'detailcar/objectPriceByYear',
    }),
  },
  watch: {
    stateVersion(value) {
      this.reservaMazda()
    },
    selectedDetailView(view) {
      this.setViewDetail(view)
      this.setColorCaptionDetail(view)
    },
  },

  methods: {
    openBrochure() {
      window.open(
        this.model.specsSheetUrl,
        '_blank' // <- This is what makes it open in a new window.
      )
    },
    cotizacionMazda() {
      const URL = `https://www.mazda.pe/cotizacion?id=${this.stateVersion.id}&year=${this.yearSelected}`
      window.location.href = URL
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
    formateDetailView(options) {
      const keysFromObject = Object.keys(options)
      const arrayOptions = []
      keysFromObject.forEach((key) => {
        const fixedObject = {
          value: key,
          text: key.toUpperCase(),
        }
        arrayOptions.push(fixedObject)
      })
      console.log('arrayOptions', arrayOptions)
      return arrayOptions
    },
    ...mapActions({
      setViewDetail: 'detailcar/settingSelectedView',
      setColorCaptionDetail: 'detailcar/settingColorCaption',
      /* setTransmision: 'detailcar/settingTransmision', */
    }),
  },
}
</script>

<style scoped>
.content {
  width: 100%;
  padding: 0 15px 15px;
}
@media (max-width: 767px) {
  .content {
    width: 100%;
    padding: 0px 15px 40px 15px;
  }
}
.model-car {
  margin-bottom: 32px;
  position: relative;
}
.model-car p,
.content .prices p {
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
.model-car button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  outline: none;
  cursor: pointer;
  width: 77px;
  height: 36px;
  border-radius: 5px;
  background-color: #000000;
  font-size: 12px;
  letter-spacing: 1px;
  color: #cfcfcf;
  text-transform: uppercase;
}
.content .credit-calculate {
  border-radius: 5px;
  background-color: #000000;
  width: 100%;
  color: #cfcfcf;
  font-size: 16px;
  padding: 15px;
  margin-bottom: 12px;
}
.content .credit-calculate .btn-calculate {
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}
.content .prices div {
  color: #d8d8d8;
  font-size: 21px;
  letter-spacing: 2px;
  line-height: 27px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}
.content .credit-calculate .btn-calculate.active {
  padding-bottom: 15px;
  border-bottom: 0.5px solid #3b3b3b;
}
.content .credit-calculate .btn-calculate {
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.content .credit-calculate .btn-calculate img {
  width: 13px;
}
.content .credit-calculate #options-calculate {
  padding-top: 15px;
}
.content .credit-calculate #options-calculate > div {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 14px;
  letter-spacing: 1px;
  color: #d0d0d0;
  flex-wrap: wrap;
  align-items: center;
}
.content .credit-calculate #options-calculate .option-range span {
  color: #6c6c6c;
  font-size: 12px;
}
.content .credit-calculate #options-calculate .option-range input {
  width: 100%;
  margin-bottom: 10px;
}
.content .credit-calculate #options-calculate .option-range input[type='range'],
.content
  .credit-calculate
  #options-calculate
  .option-range
  input[type='range']::-webkit-slider-runnable-track,
.content
  .credit-calculate
  #options-calculate
  .option-range
  input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}
.content
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
.content
  .credit-calculate
  #options-calculate
  .option-range
  input[type='range']::-webkit-slider-runnable-track {
  background-color: #fff;
  height: 3px;
  border-radius: 2px;
}
.content .credit-calculate #options-calculate .option-value {
  border-top: 0.5px solid #3b3b3b;
  border-bottom: 0.5px solid #3b3b3b;
  text-transform: uppercase;
}
.content .credit-calculate #options-calculate .ref-value img {
  width: 12px;
}
.content .credit-calculate #options-calculate button {
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
.content .detail-car button.btn-blackgray {
  background-color: #282828;
  margin-bottom: 15px;
  padding: 20px 40px;
  font-family: 'mazda_regular';
}
.content .detail-car button.btn-red {
  background-color: #781326;
  font-family: 'mazda_regular';
}
.content .credit-calculate .item-checkbox {
  position: relative;
}
.content .credit-calculate .item-checkbox input {
  position: absolute;
  opacity: 0;
}
.content .credit-calculate .item-checkbox input {
  width: 16px;
  height: 16px;
}
.content .credit-calculate .item-checkbox label {
  position: relative;
  cursor: pointer;
  height: 19px;
  padding: 0;
  align-items: center;
  display: flex;
}
.content .credit-calculate .item-checkbox input:checked + label:after {
  background-color: #dbdbdb;
}
.content .credit-calculate .item-checkbox label:before {
  content: '';
  width: 16px;
  height: 16px;
  border: 1px solid #797979;
  border-radius: 2px;
}
.content .credit-calculate .item-checkbox label:after {
  content: '';
  background-color: transparent;
  width: 10px;
  height: 10px;
  position: absolute;
  left: 4px;
}
.content .credit-calculate .counter {
  width: 49px;
  height: 23px;
  border-radius: 2px;
  background-color: #292929;
  display: flex;
  align-items: center;
}
.content .credit-calculate .counter div {
  display: flex;
  flex-direction: column;
}
.content .credit-calculate .counter input {
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
.content .credit-calculate .counter span {
  height: 6px;
  display: flex;
  align-items: center;
}
.content .credit-calculate .counter span svg {
  width: 6px;
  height: 10px;
  fill: #e6e6e6;
}
.content .credit-calculate .counter span:first-child {
  transform: rotate(180deg);
  margin-bottom: 2px;
}
.content .btn-back a {
  color: #b4b4b4;
  font-size: 14px;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}
.content .btn-back a img {
  width: 10px;
  transform: rotate(180deg);
  margin-right: 20px;
}
.content .tabs-type {
  width: 100%;
  display: flex;
  padding: 0;
  margin-top: 0;
  list-style: none;
}
.content .tabs-type li {
  cursor: pointer;
  border-bottom: 1px solid #a6a6a6;
  flex-grow: 1;
  font-size: 12px;
  letter-spacing: 1px;
  color: #c3c3c3;
  text-align: center;
  padding: 24px;
  text-transform: uppercase;
}
.content .tabs-type li.active {
  border-bottom: 4px solid #ffffff;
  color: #ffffff;
}
.content .slider {
  width: 100%;
}
.content .slider ul {
  padding: 0;
  list-style: none;
}
.content .slider ul li {
  width: 100%;
}
.content .slider ul li img {
  width: 100%;
}
.content .detail-car {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 50px;
}
.content .detail-car .description {
  font-size: 16px;
}
.content .description {
  margin-bottom: 15px;
}

.content .description p {
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 19px;
  color: #c7c7c7;
  text-align: center;
  margin: 0;
}
.content .detail-car button {
  width: 100%;
  min-width: 250px;
  height: 56px;
  text-align: center;
  background-color: #000000;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
  font-size: 14px;
  letter-spacing: 1px;
  color: #ffffff;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  font-family: 'mazda_regular';
  margin-top: 15px;
  cursor: pointer;
}
.content .credit-calculate {
  margin-top: 15px;
}
.content .prices p {
  color: #fff;
  text-align: center;
}
.content .prices div {
  max-width: 305px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
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
  /*  body {
    flex-direction: row;
  } */
  .content {
    padding: 45px 100px;
  }
  .content .tabs-type {
    margin-top: 40px;
  }
  .content .tabs-type li {
    font-size: 16px;
    letter-spacing: 2px;
  }
  .content .detail-car {
    flex-direction: row;
  }
  .content .description p {
    text-align: left;
    font-size: 16px;
    letter-spacing: 2px;
  }
  .content button {
    width: 278px;
  }
}
.prices {
  margin-top: 20px;
}

@media (max-width: 767px) {
  .description {
    text-align: center;
  }
}

.backCatalogMobile {
  margin-top: 25px;
}
@media (min-width: 768px) {
  .only-mobile-detail {
    display: none;
  }
}
</style>
