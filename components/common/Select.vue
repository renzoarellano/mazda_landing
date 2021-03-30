<template>
  <div
    class="custom__selectFilter"
    :style="customColor != '' ? `background-color:${customColor}` : ''"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div class="selectedValue" :class="{ open: open }" @click="open = !open">
      {{ selected ? selected.toUpperCase() : '' }}
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
  },
  data() {
    return {
      selected: null,
      open: false,
      options: this.optionsValue,
    }
  },
  watch: {
    optionsValue(newOptions) {
      this.options = newOptions
      this.settingData()
    },
  },
  mounted() {
    this.settingData()
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
    settingData() {
      if (this.default && this.optionsValue) {
        const option = this.optionsValue.find(
          (option) => option.slug === this.default
        )
        this.onChange(option)
      } else {
        this.selected = this.optionsValue ? this.optionsValue[0].text : null
      }
    },
  },
}
</script>
