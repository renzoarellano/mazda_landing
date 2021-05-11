<template>
  <div class="radiobuttons_container">
    <p>{{ titleRadioSection }}</p>
    <div
      class="radiobuttons_container__radios"
      :style="
        displayMode == 'row' ? 'flex-direction:row' : 'flex-direction:column'
      "
    >
      <label
        v-for="(val, key) in options"
        :key="val"
        class="radiobuttons_container__radios__label"
      >
        <input
          :name="labelName"
          :value="val"
          type="radio"
          :checked="val == defaultValue"
          @change="onChange(val)"
        />
        {{ key }}
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioButtons',
  props: {
    title: {
      type: String,
      default: '',
    },
    labelName: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/require-prop-types
    defaultValue: {
      // selected Radio Button

      default: '' || 0,
    },
    displayMode: {
      // selected Radio Button
      type: String,
      default: 'column',
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      titleRadioSection: this.title,
    }
  },
  watch: {
    options() {
      this.settingData()
    },
  },
  mounted() {
    this.settingData()
  },
  methods: {
    onChange(val) {
      console.log('🚀 ~ file: RadioButtons.vue ~ line 73 ~ onChange ~ val', val)
      this.$emit('input', val)
    },
    settingData() {
      if (this.defaultValue) {
        this.onChange(this.defaultValue)
      }
    },
  },
}
</script>

<style></style>
