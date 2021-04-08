import Vue from 'vue'
import currency from 'currency.js'

const USD = (value) =>
  currency(value, {
    symbol: 'US$ ',
    precision: 0,
    formatWithSymbol: true,
  }).format()
const PE = (value) =>
  currency(value, {
    symbol: 'S/ ',
    precision: 0,
    formatWithSymbol: true,
  }).format()

Vue.filter('USD', USD)
Vue.filter('PE', PE)
