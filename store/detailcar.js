/* eslint-disable no-console */
export const SET_VERSIONS = 'SET_VERSIONS'
export const SET_SELECTED_VERSIONS = 'SET_SELECTED_VERSIONS'
export const SET_VERSION = 'SET_VERSION'
export const SET_MODEL = 'SET_MODEL'
export const SET_DETAIL_IMAGES = 'SET_DETAIL_IMAGES'
export const SET_YEARS_BY_VERSION = 'SET_YEARS_BY_VERSION'
export const SET_SELECTED_YEAR = 'SET_SELECTED_YEAR'
export const SET_TRANSMISION = 'SET_TRANSMISION'
export const SET_VIEWS_BY_VERSION = 'SET_VIEWS_BY_VERSION'
export const SET_SELETED_VIEW = 'SET_SELETED_VIEW'
export const SET_OBJECT_PRICE_BY_YEAR = 'SET_OBJECT_PRICE_BY_YEAR'
export const SET_COLORS = 'SET_COLORS'
export const SET_SELECTED_COLOR = 'SET_SELECTED_COLOR'
export const state = () => ({
  modelData: {},
  imagesDetail: {},
  modelVersions: [],
  version: {},
  selectedVersions: [],
  yearsByVersion: [],
  selectedYear: '',
  viewsByVersion: {},
  selectedView: '',
  objectPriceByYear: {},
  transmision: 'automatico',
  bodySearch: {
    filters: {
      brands: ['mazda'],
      carClasses: [], // SUV, SEDÁN, HATCHBACK
      models: [],
    },
    order: 'asc',
  },
  colors: [],
  selectedColor: {},
})

export const getters = {
  modelData: (state) => state.modelData,
  imagesDetail: (state) => state.imagesDetail,
  modelVersions: (state) => state.modelVersions,
  selectedVersions: (state) => state.selectedVersions,
  version: (state) => state.version,
  yearsByVersion: (state) => state.yearsByVersion,
  selectedYear: (state) => state.selectedYear,
  transmision: (state) => state.transmision,
  viewsByVersion: (state) => state.viewsByVersion,
  selectedView: (state) => state.selectedView,
  objectPriceByYear: (state) => state.objectPriceByYear,
  colors: (state) => state.colors,
  selectedColor: (state) => state.selectedColor,
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
  async gettingImagesDetail({ commit, state }, slug) {
    try {
      const getModel = await this.$axios.$get(
        `https://cotizadorderco.com/mazdaCampaign/getVersions/${slug}`
      )

      const versionsWithTransmision = []

      getModel.versions.forEach((version) => {
        if (version.transmission === state.transmision) {
          const fixedVersion = {
            ...version,
            value: version.slug,
            text: version.name,
          }
          versionsWithTransmision.push(fixedVersion)
        }
      })
      commit(SET_MODEL, getModel)
      commit(SET_VERSIONS, getModel.versions)
      commit(SET_SELECTED_VERSIONS, versionsWithTransmision)
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
    const optionsVistas = {}
    if (version) {
      version[0].prices.forEach((year) => {
        optionsYears[year.type] = parseInt(year.type)
      })
      const keys = Object.keys(version[0].campaingImgs)
      if (keys) {
        keys.forEach((key) => {
          optionsVistas[key] = key
        })
      }
      commit(SET_YEARS_BY_VERSION, optionsYears)
      commit(SET_SELECTED_YEAR, parseInt(version[0].prices[0].type))
      commit(SET_VIEWS_BY_VERSION, optionsVistas)
      commit(SET_SELETED_VIEW, optionsVistas[keys[0]])
      commit(SET_OBJECT_PRICE_BY_YEAR, version[0].prices[0])
      commit(SET_DETAIL_IMAGES, version[0].campaingImgs[keys[0]][0].imgs)
      commit(SET_COLORS, version[0].campaingImgs[keys[0]])
      commit(SET_SELECTED_COLOR, version[0].campaingImgs[keys[0]][0].color)
    }
  },
  settingSelectedYear({ commit }, year) {
    commit(SET_SELECTED_YEAR, year)
  },
  settingSelectedView({ commit }, view) {
    commit(SET_SELETED_VIEW, view)
  },
  settingColorCaption({ commit, state }, view) {
    if (view) {
      const imgsDetail = state.version.campaingImgs[view]
      commit(SET_DETAIL_IMAGES, imgsDetail[0].imgs)
      commit(SET_COLORS, imgsDetail)
      commit(SET_SELECTED_COLOR, imgsDetail[0].color)
    }
  },
  settingImagesByColor({ commit, state }, color) {
    if (color) {
      const imgsDetail = state.version.campaingImgs[state.selectedView]
      const images = imgsDetail.filter((view) => view.color === color)
      commit(SET_DETAIL_IMAGES, images ? images[0].imgs : [])
    }
  },
  settingTransmision({ commit, state }, transmision) {
    commit(SET_TRANSMISION, transmision)
    const versionsWithTransmision = []
    state.modelVersions.forEach((version) => {
      if (version.transmission === transmision) {
        const fixedVersion = {
          ...version,
          value: version.slug,
          text: version.name,
        }
        versionsWithTransmision.push(fixedVersion)
      }
    })
    commit(SET_SELECTED_VERSIONS, versionsWithTransmision)
  },
  settingObjectPriceByYear({ commit, state }) {
    const setPrices = state.version.prices
    const price = setPrices.find(
      (price) => price.type === state.selectedYear.toString()
    )
    commit(SET_OBJECT_PRICE_BY_YEAR, price)
  },
  settingSelectedVersion({ commit, state }, slug) {
    const versionObject = state.modelVersions.find(
      (version) => version.slug === slug
    )
    commit(SET_VERSION, versionObject)
  },
}

export const mutations = {
  [SET_VERSIONS](state, items) {
    state.modelVersions = items
  },
  [SET_VERSION](state, items) {
    state.version = items
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
  [SET_VIEWS_BY_VERSION](state, items) {
    state.viewsByVersion = items
  },
  [SET_SELETED_VIEW](state, items) {
    state.selectedView = items
  },
  [SET_OBJECT_PRICE_BY_YEAR](state, items) {
    state.objectPriceByYear = items
  },
  [SET_SELECTED_VERSIONS](state, items) {
    state.selectedVersions = items
  },
  [SET_COLORS](state, items) {
    state.colors = items
  },
  [SET_SELECTED_COLOR](state, items) {
    state.selectedColor = items
  },
}
