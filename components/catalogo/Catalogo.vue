<template>
  <div
    class="col-12 col-md-8 offset-md-4 col-lg-9 offset-lg-3 catalogComponent"
  >
    <b-row>
      <div class="col-7 col-md-6 col-lg-8">
        <TitleCatalog />
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <CustomSelect
          v-model="selectedOrder"
          :custom-color="'#303030'"
          :options-value="optionsOders"
        />
      </div>
    </b-row>
    <b-row>
      <div class="col-12 espaceRowCars">
        <b-row>
          <div
            v-for="(model, index) in carItems"
            :key="`${model.slug} - ${index}`"
            class="col-12 col-md-6 col-lg-4 cardAutoCatalog"
          >
            <img
              :src="`https://cotizadorderco.com/forms/campanaMazda/${model.newImageCatalogo}`"
              alt=""
            />
            <div class="cardAutoCatalog__textos">
              <h3>{{ model.name }}</h3>
              <div class="cardAutoCatalog__textos__bottom">
                <p>desde US$ {{ model.defaultVersion.prices[0].value }}</p>
                <p>S/ {{ model.defaultVersion.prices[0].convertedValue }}</p>
              </div>
            </div>
          </div>
        </b-row>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TitleCatalog from '~/components/catalogo/Title'
import CustomSelect from '~/components/common/Select'
export default {
  name: 'CatalogoComponent',
  components: { TitleCatalog, CustomSelect },
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      selectedOrder: null,
      optionsOders: [
        {
          text: 'ORDENAR POR PRECIOS',
          value: null,
        },
        {
          text: 'MAYOR A MENOR',
          value: 'DESC',
        },
        {
          text: 'MENOR A MAYOR',
          value: 'ASC',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      carItems: 'cars/cars',
    }),
  },
}
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .catalogComponent {
    padding: 25px 15px;
  }
  .espaceRowCars {
    padding-top: 0px;
  }
}
@media (min-width: 768px) {
  .catalogComponent {
    padding: 50px 25px;
  }
  .espaceRowCars {
    padding-top: 50px;
  }
}
@media (min-width: 992px) {
  .catalogComponent {
    padding: 50px 45px;
  }
}
</style>
