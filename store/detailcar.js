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
export const SET_TRANSMISION_LIST = 'SET_TRANSMISION_LIST'
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
  transmisionList: [],
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
  transmisionList: (state) => state.transmisionList,
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
    console.log('gettingImagesDetail')
    try {
      const getModel = await this.$axios.$get(
        `https://cotizadorderco.com/mazdaCampaign/getNewVersions/${slug}`
      )

      const versionsWithTransmision = []
      let tramisionArray = []
      getModel.versions.forEach((version) => {
        tramisionArray.push(version.transmission)
        if (version.transmission === state.transmision) {
          const fixedVersion = {
            ...version,
            value: version.slug,
            text: version.name,
          }
          versionsWithTransmision.push(fixedVersion)
        }
      })
      tramisionArray = tramisionArray.filter((item, index) => {
        return tramisionArray.indexOf(item) === index
      })
      const finalTransmisionList = []
      tramisionArray.forEach((transmision) => {
        const fixedTransmision = {
          value: transmision,
          text: transmision.toUpperCase(),
        }
        finalTransmisionList.push(fixedTransmision)
      })
      console.log('finalTransmisionList', finalTransmisionList)
      commit(SET_MODEL, getModel)
      commit(SET_VERSIONS, getModel.versions)
      commit(SET_SELECTED_VERSIONS, versionsWithTransmision)
      commit(SET_TRANSMISION_LIST, finalTransmisionList)
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
    console.log('settingYearData')
    const version = state.modelVersions.filter(
      (version) => version.slug === slug
    )
    const optionsYears = {}
    const optionsVistas = {}
    if (version) {
      version[0].prices.forEach((year) => {
        optionsYears[year.type] = parseInt(year.type)
      })
      const keys = Object.keys(version[0].gallery)
      if (keys) {
        keys.forEach((key) => {
          optionsVistas[key] = key
        })
      }
      console.log('version[0].gallery[keys[0]]', version[0].gallery[keys[0]])
      commit(SET_YEARS_BY_VERSION, optionsYears)
      commit(SET_SELECTED_YEAR, parseInt(version[0].prices[0].type))
      commit(SET_VIEWS_BY_VERSION, optionsVistas)
      commit(SET_SELETED_VIEW, optionsVistas[keys[0]])
      commit(SET_OBJECT_PRICE_BY_YEAR, version[0].prices[0])
      commit(SET_DETAIL_IMAGES, version[0].gallery[keys[0]][0].medias)
      commit(SET_COLORS, version[0].colors || null)
      commit(SET_SELECTED_COLOR, version[0].gallery[keys[0]][0].color || null)
    }
  },
  settingSelectedYear({ commit }, year) {
    commit(SET_SELECTED_YEAR, year)
  },
  settingSelectedView({ commit }, view) {
    commit(SET_SELETED_VIEW, view)
  },
  settingColorCaption({ commit, state }, view) {
    console.log('settingColorCaption')
    if (view) {
      console.log('state.version', state.version)
      const imgsDetail = state.version.gallery[view]
      console.log(
        '🚀 ~ file: detailcar.js ~ line 141 ~ settingColorCaption ~ imgsDetail',
        imgsDetail
      )
      commit(SET_DETAIL_IMAGES, imgsDetail[0].medias)
      if (view === 'externas') {
        commit(SET_COLORS, state.version.colors)
        console.log('imgsDetail[0].color', imgsDetail[0].color)
        commit(SET_SELECTED_COLOR, imgsDetail[0].color)
      } else {
        commit(SET_COLORS, null)
        commit(SET_SELECTED_COLOR, null)
      }
    }
  },
  settingImagesByColor({ commit, state }, color) {
    console.log(
      '🚀 ~ file: detailcar.js ~ line 163 ~ settingImagesByColor ~ color',
      color
    )
    console.log('settingImagesByColor')
    if (color) {
      console.log('color', color)
      console.log('selectedView', state.selectedView)
      const imgsDetail = state.version.gallery[state.selectedView]
      console.log(
        '🚀 ~ file: detailcar.js ~ line 154 ~ settingImagesByColor ~ imgsDetail',
        imgsDetail
      )
      const images = imgsDetail.filter((view) => view.color === color)
      console.log(
        '🚀 ~ file: detailcar.js ~ line 159 ~ settingImagesByColor ~ images',
        images
      )
      commit(SET_DETAIL_IMAGES, images ? images[0].medias : [])
    } else {
      console.log('No hay colores')
    }
  },
  settingTransmision({ commit, state }, transmision) {
    console.log('settingTransmision')
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
    if (versionsWithTransmision.length) {
      commit(SET_SELECTED_VERSIONS, versionsWithTransmision)
    }
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
  [SET_TRANSMISION_LIST](state, items) {
    state.transmisionList = items
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
