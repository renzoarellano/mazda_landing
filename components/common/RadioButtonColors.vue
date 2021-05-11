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
        v-for="(val, index) in options"
        :key="index"
        class="radiobuttons_container__radios__label"
        style="padding-left: 5px; padding-top: 5px"
      >
        <input
          :name="labelName"
          :value="val.color"
          type="radio"
          :checked="val.color == defaultValue"
          @change="onChange(val.color)"
        />
        <div
          class="checkedRadioButtonBody"
          :style="{ backgroundColor: val.hexadecimal1 }"
        ></div>
        <span class="checkmarkColors"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioButtonColors',
  props: {
    title: {
      type: String,
      default: '',
    },
    labelName: {
      type: String,
      default: '',
    },
    defaultValue: {
      // selected Radio Button
      type: String,
      default: '',
    },
    displayMode: {
      // selected Radio Button
      type: String,
      default: 'column',
    },
    options: {
      type: Array,
      default() {
        return []
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
      this.$emit('input', val)
    },
    settingData() {
      if (this.defaultValue) {
        this.onChange(this.defaultValue.color)
      }
    },
  },
}
</script>

<style>
.checkedRadioButtonBody {
  width: 20px;
  height: 20px;
  border-radius: 100%;
}
.radiobuttons_container__radios__label input:checked ~ .checkmarkColors {
  background-color: transparent;
  border: 3px solid #3e3e3e;
}
.checkmarkColors {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.radiobuttons_container__radios__label input:checked ~ .checkmarkColors:after {
  display: block;
}
</style>
