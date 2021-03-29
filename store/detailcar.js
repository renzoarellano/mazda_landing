/* eslint-disable no-console */
export const SET_VERSIONS = 'SET_VERSIONS'
export const SET_MODEL = 'SET_MODEL'
export const SET_DETAIL_IMAGES = 'SET_DETAIL_IMAGES'
export const SET_YEARS_BY_VERSION = 'SET_YEARS_BY_VERSION'
export const SET_SELECTED_YEAR = 'SET_SELECTED_YEAR'
export const SET_TRANSMISION = 'SET_TRANSMISION'
export const state = () => ({
  modelData: {},
  imagesDetail: {},
  modelVersions: [],
  yearsByVersion: [],
  selectedYear: null,
  transmision: 'automatico',
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
  modelData: (state) => state.modelData,
  imagesDetail: (state) => state.imagesDetail,
  modelVersions: (state) => state.modelVersions,
  yearsByVersion: (state) => state.yearsByVersion,
  selectedYear: (state) => state.selectedYear,
  transmision: (state) => state.transmision,
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
  async gettingImagesDetail({ commit }, slug) {
    try {
      const imagesDetail = await this.$axios.$get(
        `https://cotizadorderco.com/mazdaCampaign/getVersions/${slug}`
      )
      commit(SET_MODEL, imagesDetail)
      commit(SET_DETAIL_IMAGES, imagesDetail)
      commit(SET_VERSIONS, imagesDetail.versions)
    } catch (error) {
      console.log(error)
    }
  },
  /* async gettingModelData({ commit }, slug) {
    try {
      const modelData = await this.$axios.$get(`api/v6/models/slug/${slug}`)
      commit(SET_MODEL, modelData[0] || {})
      commit(SET_VERSIONS, modelData[0].versions)
    } catch (error) {
      console.log(error)
    }
  }, */
  settingYearData({ commit, state }, slug) {
    const version = state.modelVersions.filter(
      (version) => version.slug === slug
    )
    const optionsYears = {}

    if (version) {
      version[0].prices.forEach((year) => {
        optionsYears[year.type] = parseInt(year.type)
      })
      console.log(
        '🚀 ~ file: detailcar.js ~ line 76 ~ settingYearData ~ optionsYears',
        optionsYears
      )
      console.log('version[0].prices[0].type', version[0].prices[0].type)
      commit(SET_YEARS_BY_VERSION, optionsYears)
      commit(SET_SELECTED_YEAR, parseInt(version[0].prices[0].type))
    }
  },
  settingSelectedYear({ commit }, year) {
    console.log(
      '🚀 ~ file: detailcar.js ~ line 85 ~ settingSelectedYear ~ year',
      year
    )
    commit(SET_SELECTED_YEAR, year)
  },
}

export const mutations = {
  [SET_VERSIONS](state, items) {
    state.modelVersions = items
  },
  [SET_MODEL](state, items) {
    state.modelData = items
  },
  [SET_DETAIL_IMAGES](state, items) {
    state.imagesDetail = items
  },
  [SET_YEARS_BY_VERSION](state, items) {
    state.yearsByVersion = items
  },
  [SET_SELECTED_YEAR](state, items) {
    state.selectedYear = items
  },
  [SET_TRANSMISION](state, items) {
    state.transmision = items
  },
}
