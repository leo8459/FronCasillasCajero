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
/* Estilo para el contenedor del perrito corriendo */
.dog-running {
  width: 100px; /* Ancho del cuadro de la animación */
  height: 100px; /* Altura del cuadro de la animación */
  background-image: url('/assets/imagenes/1.jpg'); /* Ruta de la imagen del perrito */

}

/* Animación de la secuencia de imágenes */
@keyframes runAnimation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -800px 0; /* Ajusta esto según el ancho total de la secuencia de imágenes */
  }
}
</style>
