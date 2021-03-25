<template>
  <div class="page-wrap d-flex flex-row align-items-center">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="12" class="text-center">
          <span class="title">UPS!</span>
          <div class="section-description">
            <span class="text-description">
              Parece que ha habído un error con la página que estabas buscando.
            </span>
            <br />
            <span class="text-description">
              Esposible que la entrada haya sido eliminada o la página no
              exista.
            </span>
          </div>
          <b-button
            class="button-error"
            pill
            variant="primary"
            :to="{ name: 'index' }"
          >
            IR A LA PÁGINA PRINCIPAL
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.page-wrap {
  min-height: 100vh;
}
.title {
  font-size: 32px;
}
</style>
