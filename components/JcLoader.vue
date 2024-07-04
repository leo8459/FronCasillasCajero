<template>
  <div class="vld-parent">
    <Loading :active="load">
      <!-- Icono de perrito corriendo como sprite sheet -->
      <div class="dog-running"></div>
    </Loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  props: {
    load: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Loading
  }
}
</script>

<style>
/* Estilo para el contenedor del perrito */
.dog-running {
  width: 200px; /* Ancho del cuadro de la animación */
  height: 200px; /* Altura del cuadro de la animación */
  background-image: url('@/pages/auth/img/AGBClogo.png'); /* Ruta de la imagen del perrito */
  background-size: cover; /* Ajusta esto si la imagen debe cubrir todo el área */
  background-position: center; /* Centra la imagen en el contenedor */
}
</style>
