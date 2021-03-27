<template>
  <section class="content col-12 col-md-8 col-lg-9">
    <div class="model-car only-mobile">
      <p>Modelo</p>
      <h5>all-new mazda3 sport</h5>
      <button id="btnCalculateMob" class="only-mobile">filtros</button>
    </div>
    <div class="btn-back only-desktop">
      <a href="#">
        <img src="../../assets/icons/next.svg" alt="" /> volver al catálogo
      </a>
    </div>
    <ul class="tabs-type">
      <li>mecánico</li>
      <li class="active">automático</li>
    </ul>
    <div class="slider">
      <ul>
        <li>
          <img src="../../assets/images/auto.png" alt="" />
        </li>
      </ul>
    </div>
    <div class="prices only-mobile">
      <p>all-new automático 2.5 high</p>
      <div><span>US$ 18,900</span>|<span>S/ 68,364</span></div>
    </div>
    <div class="detail-car">
      <div class="description">
        <p>Tracción AWD</p>
        <p>6 Airbags</p>
        <p>Sistema de sonido Bose</p>
        <p>Apple CarPlay</p>
        <p>Cámara de retroceso y sensores</p>
      </div>
      <div>
        <button class="btn-blackgray only-mobile">cotiza ahora</button>
        <button class="btn-red only-mobile">reservar</button>
        <button>descargar brochure</button>
      </div>
    </div>
    <div id="credit-calculate-mob" class="credit-calculate only-mobile">
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
                  version="1.1" 
                  id="Capa_1" 
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
                  version="1.1" 
                  id="Capa_1" 
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
  </section>
</template>

<script>
export default {
  name: 'CarDetailComponent',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.content {
  width: 100%;
  padding: 0 15px 15px;
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
.content .credit-calculate #options-calculate .option-range input[type='range']::-webkit-slider-runnable-track,
.content .credit-calculate #options-calculate .option-range input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}
.content .credit-calculate #options-calculate .option-range input[type='range']::-webkit-slider-thumb {
  background-color: #fff;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  margin-top: -4px;
  cursor: pointer;
  filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.5));
}
.content .credit-calculate #options-calculate .option-range input[type='range']::-webkit-slider-runnable-track {
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
  filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.5));
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
  background-color: #242424;
  margin-bottom: 15px;
}
.content .detail-car button.btn-red {
  background-color: #781326;
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
  left: 4px
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
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 50px;
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
  height: 56px;
  text-align: center;
  background-color: black;
  font-size: 14px;
  letter-spacing: 1px;
  color: #ffffff;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
}
.content .credit-calculate {
  margin-top: 15px;
}
.content .prices p {
  color: #FFF;
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
    padding: 42px 32px;
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
</style>
