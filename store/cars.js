/* eslint-disable no-console */
export const SET_CARS = 'SET_CARS'
export const TOTAL_CARS = 'TOTAL_CARS'
export const SET_MODELS = 'SET_MODELS'
export const SET_YEAR = 'SET_YEAR'
export const SET_YEARS = 'SET_YEARS'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_PAGINATION_SEARCH = 'SET_PAGINATION_SEARCH'
export const ADD_BODY_SEARCH_DATA = 'ADD_BODY_SEARCH_DATA'
export const SET_IMAGESAPI = 'SET_IMAGESAPI'
export const SET_SLUGS_API = 'SET_SLUGS_API'
export const state = () => ({
  cars: [],
  totalCars: 0,
  models: [],
  category: null,
  categories: [], // carClasses
  year: null,
  years: [],
  paginationSearch: {},
  imagesAPI: [],
  slugsAPI: [],
  bodySearch: {
    filters: {
      brands: ['mazda'],
      carClasses: [], // SUV, SEDÁN, HATCHBACK
      models: [],
    },
    order: 'asc',
  },
})

export const getters = {
  models: (state) => state.models,
  year: (state) => state.year,
  years: (state) => state.years,
  category: (state) => state.category,
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
  async gettingSlugData({ commit }) {
    try {
      const dataSlugs = await this.$axios.$get(
        'https://cotizadorderco.com/mazdaCampaign/getNewModels'
      )
      commit(SET_SLUGS_API, dataSlugs)
    } catch (error) {
      console.log(error)
    }
  },
  async gettingCarItemsData({ commit, state }) {
    try {
      const modelsToBody = []

      state.slugsAPI.forEach((dato) => modelsToBody.push(dato.modelo))
      const objectFilter = state.bodySearch
      objectFilter.filters.models = modelsToBody

      const { data } = await this.$axios.$post(
        'api/v6/models/search?page=1',
        objectFilter
      )
      const newArrayData = []
      data.forEach((model) => {
        state.slugsAPI.forEach((slug) => {
          if (slug.modelo === model.slug) {
            model.newImageCatalogo = slug.img
            newArrayData.push(model)
          }
        })
      })
      /*  console.log('newArrayData', newArrayData) */
      // Settings Years
      const newArrayYears = {}
      newArrayData.forEach((car) => {
        car.defaultVersion.prices.forEach((price) => {
          newArrayYears[parseInt(price.type)] = parseInt(price.type)
        })
      })
      /*   console.log('newArrayYears', newArrayYears) */
      // Setting Categories
      const newArrayCarClasses = {}
      newArrayData.forEach((car) => {
        newArrayCarClasses[
          car.carClass[0].toUpperCase()
        ] = car.carClass[0].toUpperCase()
      })
      /*  const uniqueCategories = newArrayCarClasses.filter((valor, indice) => {
        return newArrayCarClasses.indexOf(valor) === indice
      }) */

      /* console.log('newArrayCarClasses', newArrayCarClasses)
       */
      // Results
      commit(SET_MODELS, newArrayData)
      commit(SET_CARS, newArrayData)
      commit(SET_YEARS, newArrayYears)
      commit(SET_CATEGORIES, newArrayCarClasses)
    } catch (error) {
      console.log(' error', error)
    }
  },
  async filterCars({ commit, state }, filterView) {
    const models = []
    const category = []
    let newArrayData = [] // array Final de resultados
    if (filterView.model) {
      models.push(filterView.model)
    }
    if (filterView.category) {
      category.push(filterView.category)
    }
    const objectFilter = state.bodySearch
    objectFilter.filters.models = models
    objectFilter.filters.carClasses = category

    if (filterView) {
      const { data } = await this.$axios.$post(
        'api/v6/models/search?page=1',
        objectFilter
      )

      data.forEach((model) => {
        state.slugsAPI.forEach((slug) => {
          if (slug.modelo === model.slug) {
            model.newImageCatalogo = slug.img
            newArrayData.push(model)
          }
        })
      })
    }
    const filterPriceArray = []
    if (filterView.price) {
      const minPrice = filterView.price[0]
      const maxPrice = filterView.price[1]
      newArrayData.forEach((car) => {
        car.defaultVersion.prices.forEach((price) => {
          if (price.value >= minPrice && price.value <= maxPrice) {
            filterPriceArray.push(car)
          }
        })
      })
      newArrayData = filterPriceArray
    }
    const filterYearArray = []
    if (filterView.year) {
      newArrayData.forEach((car) => {
        const yearFounded = car.defaultVersion.prices.find(
          (price) => price.name === filterView.year.toString()
        )
        if (yearFounded) {
          filterYearArray.push(car)
        }
      })
      newArrayData = filterYearArray
    }
    /*  console.log('fase3', newArrayData) */
    commit(SET_CARS, newArrayData)
  },
  orderByCars({ commit, state }, order) {
    const nowCars = state.cars

    if (order) {
      if (order === 'DESC') {
        nowCars.sort(function (a, b) {
          if (
            a.defaultVersion.prices[0].value < b.defaultVersion.prices[0].value
          ) {
            return 1
          }
          if (
            a.defaultVersion.prices[0].value > b.defaultVersion.prices[0].value
          ) {
            return -1
          }
          return 0
        })
        commit(SET_CARS, nowCars)
      } else if (order === 'ASC') {
        nowCars.sort(function (a, b) {
          if (
            a.defaultVersion.prices[0].value > b.defaultVersion.prices[0].value
          ) {
            return 1
          }
          if (
            a.defaultVersion.prices[0].value < b.defaultVersion.prices[0].value
          ) {
            return -1
          }
          return 0
        })
        commit(SET_CARS, nowCars)
      }
    }
  },
  filterByModel({ commit, state }, slug) {
    if (slug) {
      const filterVersion = state.models.find((model) => model.slug === slug)
      const newArrayYears = {}
      filterVersion.defaultVersion.prices.forEach((price) => {
        newArrayYears[price.type] = parseInt(price.type)
      })

      /* console.log('newArrayYears', newArrayYears) */
      // Setting Categories
      const newArrayCarClasses = {}
      filterVersion.carClass.forEach((car) => {
        newArrayCarClasses[car.toUpperCase()] = car.toUpperCase()
      })
      /* console.log('newArrayCarClasses', newArrayCarClasses) */
      /* commit(SET_YEAR, null)
      commit(SET_CATEGORY, null) */
      commit(SET_YEARS, newArrayYears)
      commit(SET_CATEGORIES, newArrayCarClasses)
    } else {
      // Settings Years
      const newArrayYears = {}
      state.models.forEach((car) => {
        car.defaultVersion.prices.forEach((price) => {
          newArrayYears[price.type] = parseInt(price.type)
        })
      })
      /* console.log('newArrayYears', newArrayYears) */
      // Setting Categories
      const newArrayCarClasses = {}
      state.models.forEach((car) => {
        newArrayCarClasses[
          car.carClass[0].toUpperCase()
        ] = car.carClass[0].toUpperCase()
      })

      commit(SET_YEARS, newArrayYears)
      commit(SET_CATEGORIES, newArrayCarClasses)
    }
  },
  settingYear({ commit }, year) {
    commit(SET_YEAR, year)
  },
  settingCategory({ commit }, category) {
    commit(SET_CATEGORY, category)
  },
}

export const mutations = {
  [SET_CARS](state, items) {
    state.cars = items
  },
  [SET_SLUGS_API](state, items) {
    state.slugsAPI = items
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
  [SET_YEAR](state, data) {
    state.year = data
  },
  [SET_YEARS](state, data) {
    state.years = data
  },
  [SET_CATEGORY](state, items) {
    state.category = items
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
      case 'page':
        state.paginationSearch.currentPage = data.value
        break
      default:
        break
    }
  },
}
