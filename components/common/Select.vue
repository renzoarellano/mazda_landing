<template>
  <div class="custom__selectFilter" :tabindex="tabindex" @blur="open = false">
    <div class="selectedValue" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
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
  computed: {
    selectedKey() {
      return this.value
    },
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
  },
}
</script>
