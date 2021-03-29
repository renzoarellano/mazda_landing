<template>
  <div
    class="custom__selectFilter"
    :style="customColor != '' ? `background-color:${customColor}` : ''"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div class="selectedValue" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div
      class="items"
      :style="customColor != '' ? `background-color:${customColor}` : ''"
      :class="{ selectHide: !open }"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="item"
        @click="onChange(option)"
      >
        {{ option.text.toUpperCase() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    optionsValue: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    customColor: {
      type: String,
      required: false,
      default: '',
    },
    setDefaultFunction: {
      type: Function,
      required: false,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.optionsValue.length > 0
        ? this.optionsValue[0].text
        : null,
      open: false,
      options: this.optionsValue,
    }
  },
  mounted() {
    console.log('selected', this.setDefaultFunction)
  },
  methods: {
    onChange(value) {
      if (value === '') {
        value = null
      }
      this.selected = value.text
      this.open = false
      this.$emit('input', value.value)
    },
    /* setDefault(defaultValue, optionsSelect) {
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
    }, */
  },
}
</script>
