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
          :v-model="value"
          :name="labelName"
          :value="val"
          type="radio"
          :checked="val == value"
          @change="$emit('input', val)"
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
    value: {
      // selected Radio Button
      type: Number || String,
      default: '  ',
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
}
</script>

<style></style>
