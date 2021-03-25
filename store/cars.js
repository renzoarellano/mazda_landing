export const SET_CARS = 'SET_CARS'
export const TOTAL_CARS = 'TOTAL_CARS'
export const SET_MODELS = 'SET_MODELS'
export const SET_YEARS = 'SET_YEARS'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_PAGINATION_SEARCH = 'SET_PAGINATION_SEARCH'
export const ADD_BODY_SEARCH_DATA = 'ADD_BODY_SEARCH_DATA'
export const SET_IMAGESAPI = 'SET_IMAGESAPI'
export const state = () => ({
  cars: [],
  totalCars: 0,
  models: [],
  categories: [], // carClasses
  years: [],
  paginationSearch: {},
  imagesAPI: [],
  bodySearch: {
    filters: {
      priceRanges: [0, 0],
      brands: ['mazda'],
      carClasses: [], // SUV, SEDÁN, HATCHBACK
      carClassesDerco: [],
      models: [],
    },
    order: 'asc',
  },
})

export const getters = {
  models: (state) => state.models,
  years: (state) => state.years,
  categories: (state) => state.categories,
  cars: (state) => state.cars,
  imagesAPI: (state) => state.imagesAPI,
  totalCars: (state) => state.totalCars,
  bodySearch: (state) => state.bodySearch,
  bodySearchFilters: (state) => {
    const filtersQuery = {}
    const filters = state.bodySearch.filters
    if (filters.priceRanges.length >= 1)
      filtersQuery.priceRanges = filters.priceRanges.join(',')
    if (filters.carClasses.length >= 1)
      filtersQuery.carClasses = filters.carClasses.join(',')
    if (filters.carClassesDerco.length >= 1)
      filtersQuery.carClassesDerco = filters.carClassesDerco.join(',')
    if (filters.models.length >= 1)
      filtersQuery.models = filters.models.join(',')
    filtersQuery.order = state.bodySearch.order
    filtersQuery.page = state.paginationSearch.currentPage || 1
    return filtersQuery
  },
}

export const actions = {
  async search({ commit, state }, { params, type }) {
    const body = state.bodySearch
    body.type = type || 'cars'
    try {
      const {
        data,
        total,
        per_page: perPage,
        current_page: currentPage,
      } = await this.$axios.$post('cars/search', body, {
        params,
      })
      commit(SET_CARS, data)
      commit(SET_MODELS, data.model)
      commit(TOTAL_CARS, total)
      commit(SET_PAGINATION_SEARCH, {
        total,
        perPage,
        currentPage,
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },
  addBodySearchData({ commit }, data) {
    commit(ADD_BODY_SEARCH_DATA, data)
  },
  async gettingCars({ commit, state }) {
    try {
      const data = await this.$axios.$get(
        'https://cotizadorderco.com/mazdaCampaign'
      )
      commit(SET_IMAGESAPI, data)
    } catch (error) {
      console.log(error)
    }
  },
  async gettingModelsFromAPI({ commit, state }) {
    try {
      const modelsData = await this.$axios.$get('api/v6/models')
      console.log(
        '🚀 ~ file: cars.js ~ line 96 ~ gettingModelsFromAPI ~ modelsData',
        modelsData
      )
      commit(SET_MODELS, modelsData)
      commit(SET_CARS, modelsData)
    } catch (error) {
      console.log(error)
    }
  },
  filterCars({ commit, state }, data) {
    console.log('🚀 ~ file: cars.js ~ line 107 ~ filterCars ~ data', data)
    let carFilter = state.models
    if (data) {
      carFilter = state.models.filter((car) => car.slug === data)
    }
    console.log(
      '🚀 ~ file: cars.js ~ line 109 ~ filterCars ~ carFilter',
      carFilter
    )
    commit(SET_CARS, carFilter)
  },
}

export const mutations = {
  [SET_CARS](state, items) {
    state.cars = items
  },
  [TOTAL_CARS](state, items) {
    state.totalItems = items
  },
  [SET_MODELS](state, data) {
    state.models = data
  },
  [SET_IMAGESAPI](state, data) {
    state.imagesAPI = data
  },
  [SET_YEARS](state, data) {
    state.years = data
  },
  [SET_CATEGORIES](state, items) {
    state.categories = items
  },
  [ADD_BODY_SEARCH_DATA](state, data) {
    switch (data.key) {
      case 'priceRanges':
        state.bodySearch.filters.priceRanges = data.value
        break
      case 'carClasses':
        state.bodySearch.filters.carClasses = data.value
        break
      case 'models':
        state.bodySearch.filters.models = data.value
        break
      case 'order':
        state.bodySearch.order = data.value
        break
      case 'page':
        state.paginationSearch.currentPage = data.value
        break
      default:
        break
    }
  },
}
