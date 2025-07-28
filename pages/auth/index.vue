<template>
  <div>
    <JcLoader :load="load"></JcLoader>

    <div slot="body">
      <button @click="abrirModalMapa" class="btn btn-primary">Ver Mapa</button>
      <button @click="regresarBienvenida" class="btn btn-secondary">Regresar a Bienvenida</button> <!-- Botón añadido -->

      <div class="col-12 col-md-4 mt-2 d-flex justify-content-start">
        <div class="status-container">
          <div class="status-item" v-for="status in estadosCasillas" :key="status.color">
            <span>{{ status.nombre }}</span>
            <div :class="['status-square', status.colorClass]"></div>
          </div>
        </div>
      </div>
      <div class="row justify-content-end text-right"></div>
      <div class="sections-container">
        <!-- Primera fila de secciones (1 a 22) -->
        <div class="section" v-for="seccion in seccionesPrimeraFila" :key="seccion.id">
          <div class="text-center mb-4">
            <h2>{{ seccion.nombre }}</h2>
          </div>

          <!-- Título para casillas Pequeñas -->
          <div class="text-center mb-2">
            <h4>Pequeña</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Pequeña')"
              :key="item.id ? 'small-' + item.id : 'small-' + index" class="casilla-item small-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>

          <!-- Título para casillas Medianas -->
          <div class="text-center mb-2">
            <h4>Mediana</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Mediana')"
              :key="item.id ? 'medium-' + item.id : 'medium-' + index" class="casilla-item medium-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>

          <!-- Título para casillas Cajón -->
          <div class="text-center mb-2">
            <h4>Gaveta</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Gaveta')"
              :key="item.id ? 'large1-' + item.id : 'large1-' + index" class="casilla-item large-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>

          <!-- Título para casillas Gabeta -->
          <div class="text-center mb-2">
            <h4>Cajón</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Cajon')"
              :key="item.id ? 'large2-' + item.id : 'large2-' + index" class="casilla-item large-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Segunda fila de secciones (23 y más) -->
      <div class="sections-container2">
        <div class="section2" v-for="seccion in seccionesSegundaFila" :key="seccion.id">
          <div class="text-center mb-4">
            <h2>{{ seccion.nombre }}</h2>
          </div>

          <!-- Título para casillas Pequeñas -->
          <div class="text-center mb-2">
            <h4>Pequeña</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Pequeña')"
              :key="item.id ? 'small-23-' + item.id : 'small-23-' + index" class="casilla-item small-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>

          <!-- Título para casillas Medianas -->
          <div class="text-center mb-2">
            <h4>Mediana</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Mediana')"
              :key="item.id ? 'medium-23-' + item.id : 'medium-23-' + index" class="casilla-item medium-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>

          <!-- Título para casillas Cajón -->
          <div class="text-center mb-2">
            <h4>Gaveta</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Gaveta')"
              :key="item.id ? 'large1-23-' + item.id : 'large1-23-' + index" class="casilla-item large-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>

          <!-- Título para casillas Gabeta -->
          <div class="text-center mb-2">
            <h4>Cajón</h4>
          </div>
          <div class="casillas-container">
            <div v-for="(item, index) in getCasillasByType(seccion.id, 'Cajon')"
              :key="item.id ? 'large2-23-' + item.id : 'large2-23-' + index" class="casilla-item large-casilla">
              <div :class="['circle-icon', getIconColorClass(item.casilla_estado)]">
                <i :class="getIconClass(item.categoria_nombre)" @click="abrirModal(item)"></i>
              </div>
              <div class="text-center">
                <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal personalizado -->
    <div v-if="modalVisible" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles de la Casilla</h5>
            <button type="button" class="close" @click="cerrarModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Numero de Casilla: {{ casillaSeleccionada.casilla_nombre }}</p>
            <p>Seccion: {{ casillaSeleccionada.seccione_id }}</p>
            <p>Categoría: {{ casillaSeleccionada.categoria_nombre }}</p>
            <p>Estado: {{ getTextForEstado(casillaSeleccionada.casilla_estado) }}</p>
          </div>
          <div class="modal-footer">
            <nuxt-link v-if="casillaSeleccionada.casilla_estado === 1"
              :to="`${url_nuevo}?casillaId=${casillaSeleccionada.casilla_id}`" class="btn btn-dark btn-sm w-30">
              <i class="fas fa-plus"></i>Reservar
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para el Mapa -->
    <div v-if="modalMapaVisible" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Mapa de Sección</h5>
            <button type="button" class="close" @click="cerrarModalMapa">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="@/pages/auth/img/2.png" alt="Mapa de Sección" style="width: 100%;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "IndexPage",
  data() {
    return {
      dropdownVisible: false,
      load: true,
      casillas: [],
      page: 'Casillas',
      modulo: 'AGBC',
      seccionSeleccionada: "1",
      url_nuevo: '/auth/nuevo',
      url_editar: '/casillas/casilla/estado/',
      url_editar2: '/alquileres/alquilere/renovar/',
      modalVisible: false,
      casillaSeleccionada: {},
      modalMapaVisible: false,
      busqueda: '',
      mostrarListaOpciones: false,
      opcionesBusqueda: [],
      estadosCasillas: [
        { colorClass: 'status-red', nombre: 'Mantenimiento' },
        { colorClass: 'status-blue', nombre: 'Reservado' },
        { colorClass: 'status-orange', nombre: 'Con Correspondencia' },
        { colorClass: 'status-black', nombre: 'Ocupado' },
        { colorClass: 'status-green', nombre: 'Libre' },
        { colorClass: 'status-yellow', nombre: 'Vencido' }
      ]
    };
  },
  computed: {
    secciones() {
      const seccionesUnicas = [...new Set(this.casillas.map((item) => item.seccione_id))];
      return seccionesUnicas.map((id) => ({ id, nombre: `Sección ${id}` }));
    },
    seccionesPrimeraFila() {
      return this.secciones.filter(seccion => seccion.id <= 22).sort((a, b) => a.id - b.id);
    },
    seccionesSegundaFila() {
      let seccionesSegundaFila = this.secciones.filter(seccion => seccion.id >= 23 && seccion.id !== 45).sort((a, b) => a.id - b.id);
      let seccion45 = this.secciones.find(seccion => seccion.id === 45);
      if (seccion45) {
        seccionesSegundaFila.unshift(seccion45);
      }
      return seccionesSegundaFila;
    },
    categorias() {
      const categoriasUnicas = [...new Set(this.casillas.map((item) => item.categoria_nombre))];
      return categoriasUnicas.map((nombre, index) => ({ id: index + 1, nombre }));
    },
    casillasOrdenadas() {
      return this.casillas.slice().sort((a, b) => b.categoria_nombre.localeCompare(a.categoria_nombre));
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    isMediana(categoria) {
      return categoria === 'Mediana';
    },
    abrirElemento(id) {
      const elemento = this.casillas.find(item => item.casilla_id === id);
      if (elemento) {
        this.abrirModal(elemento);
      } else {
      }
    },
    filtrarOpcionesBusqueda() {
      if (this.busqueda.trim() === '') {
        this.mostrarListaOpciones = false;
        return;
      }
      const busquedaLowerCase = this.busqueda.toLowerCase().trim();
      this.opcionesBusqueda = this.casillas
        .filter(item => (
          (item.casilla_nombre && item.casilla_nombre.toLowerCase().includes(busquedaLowerCase)) ||
          (item.cliente_nombre && item.cliente_nombre.toLowerCase().includes(busquedaLowerCase)) ||
          (item.carnet && item.carnet.toLowerCase().includes(busquedaLowerCase))
        ))
        .map(item => ({
          id: item.casilla_id,
          nombre: `${item.casilla_nombre} - ${item.cliente_nombre}`,
        }));
      this.mostrarListaOpciones = true;
    },
    abrirImagen(imagen) {
      const rutaImagen = `/assets/imagenes/${imagen}`;
      window.open(rutaImagen, '_self');
    },
    
    mostrarCasillasFiltradas(casillasFiltradas) {
      this.modalVisible = true;
      this.casillaSeleccionada = casillasFiltradas[0] || null;
      this.casillas = casillasFiltradas;
    },
    getCasillasByType(seccionId, tipo) {
      const casillasTipo = this.casillas.filter((item) => item.seccione_id === seccionId && item.categoria_nombre === tipo);
      return casillasTipo.sort((a, b) => parseInt(a.casilla_nombre) - parseInt(b.casilla_nombre));
    },
    async cargarDatos() {
      try {
        const res = await this.$api.$get('todas-las-casillas');
        if (res && Array.isArray(res.casillas)) {
          this.casillas = res.casillas;
          this.casillas.sort((b, a) => {
            const categoriaComparison = a.categoria_nombre.localeCompare(b.categoria_nombre);
            if (categoriaComparison !== 0) return categoriaComparison;
            return parseInt(b.casilla_nombre) - parseInt(a.casilla_nombre);
          });
        } else {
        }
      } catch (error) {
      } finally {
        this.load = false;
      }
    },
    abrirModal(item) {
      this.casillaSeleccionada = item;
      this.modalVisible = true;
    },
    cerrarModal() {
      this.modalVisible = false;
    },
    abrirModalMapa() {
      this.modalMapaVisible = true;
    },
    cerrarModalMapa() {
      this.modalMapaVisible = false;
    },
    getIconColorClass(estado) {
      switch (estado) {
        case 1:
          return 'text-success';
        case 2:
          return 'text-brown';
        case 3:
          return 'text-danger';
        case 4:
          return 'text-warning';
        case 5:
          return 'text-custom-blue'; // Usar la nueva clase personalizada
        default:
          return 'text-black';
      }
    },
    getIconSize(categoria) {
      switch (categoria) {
        case 'Pequeña':
          return 'scale(1)';
        case 'Mediana':
          return 'scale(1)';
        case 'Gaveta':
          return 'scale(1)';
        case 'Cajon':
          return 'scale(1)';
        default:
          return 'scale(1)';
      }
    },
    getIconClass(categoria) {
      switch (categoria) {
        case 'Pequeña':
          return 'fas fa-box';
        case 'Mediana':
          return "fa fa-th-large";
        case 'Gaveta':
          return 'fa fa-archive';
        case 'Cajon':
          return 'fas fa-box-open';
        default:
          return 'fas fa-box';
      }
    },
    getTextForEstado(estado) {
      switch (estado) {
        case 0:
          return 'Ocupado';
        case 1:
          return 'Libre';
        case 2:
          return 'Con Correspondencia';
        case 3:
          return 'Mantenimiento';
        case 4:
          return 'Vencido';
        case 5:
          return 'Reservado';
        default:
          return 'Desconocido';
      }
    },
    regresarBienvenida() {
      this.$router.push('/auth/welcome');
    }
  },
  async mounted() {
    this.cargarDatos();
  },
};
</script>


<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
}

ul li {
  padding: 5px 10px;
  cursor: pointer;
}

.label-container {
  position: absolute;
  top: 10px;
  right: 1000px;
  background-color: #f0f0f0;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.label-text {
  font-size: 10px;
}

.circle-icon {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  font-size: 2rem;
  margin: 0 auto;
  transform-origin: center;
  transition: transform 0.2s;
}

.text-black {
  color: black;
}

.text-brown {
  color: rgb(255, 128, 0);
}

p {
  font-size: 1rem;
}

.casilla-nombre {
  font-size: 0.8rem;
}

.casillas-container {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  margin-bottom: 0px;
  /* Reducir margen inferior entre contenedores de casillas */
}

.small-casilla {
  width: calc(12.5% - 0px);
  /* 8 casillas pequeñas por fila */
  margin: 0;
  /* Eliminar margen */
  padding: 0;
  /* Eliminar padding */
  box-sizing: border-box;
  /* Asegurarse de que el padding y el borde se incluyan en el tamaño total */
}

.medium-casilla,
.large-casilla {
  width: calc(25% - 0px);
  /* 4 casillas medianas, gabetas y cajones por fila */
  margin: 0;
  /* Eliminar margen */
  padding: 0;
  /* Eliminar padding */
  box-sizing: border-box;
  /* Asegurarse de que el padding y el borde se incluyan en el tamaño total */
}

.casilla-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  /* Eliminar margen */
  padding: 0;
  /* Eliminar padding */
  box-sizing: border-box;
  /* Asegurarse de que el padding y el borde se incluyan en el tamaño total */
}

.row {
  overflow-x: auto;
  white-space: nowrap;
}

.col-md-4 {
  display: inline-block;
  vertical-align: top;
  min-width: 33.33%;
}

.sections-container {
  width: 1100%;
  overflow-x: auto;
  /* Scroll horizontal */
  white-space: nowrap;
  /* Evitar saltos de línea */
  display: flex;
  /* Flexbox para alinear las secciones */
}

.section {
  width: 20%;
  padding: 20px;
  border: 5px solid #ccc;
  display: inline-block;
}

.sections-container2 {
  width: 1100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  margin-top: 100px;
  /* Separación añadida aquí */
}

.section2 {
  width: 20%;
  padding: 20px;
  border: 5px solid #ccc;
  display: inline-block;
}

.status-table {
  width: auto;
  font-size: 0.7rem;
  /* Hacemos la tabla más pequeña */
}

.status-table td {
  padding: 3px 5px;
  /* Reducimos el padding para hacer la tabla más compacta */
  text-align: center;
}

.status-red {
  background-color: red;
  color: white;
  width: 30px;
  /* Aumentar el tamaño del cuadro */
  height: 30px;
  /* Aumentar el tamaño del cuadro */
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #000;
  /* Borde alrededor del cuadro */
}

.status-blue {
  background-color: rgb(38, 0, 255);
  color: white;
  width: 30px;
  /* Aumentar el tamaño del cuadro */
  height: 30px;
  /* Aumentar el tamaño del cuadro */
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #000;
  /* Borde alrededor del cuadro */
}

.status-orange {
  background-color: orange;
  color: black;
  width: 30px;
  /* Aumentar el tamaño del cuadro */
  height: 30px;
  /* Aumentar el tamaño del cuadro */
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #000;
  /* Borde alrededor del cuadro */
}

.status-black {
  background-color: black;
  color: white;
  width: 30px;
  /* Aumentar el tamaño del cuadro */
  height: 30px;
  /* Aumentar el tamaño del cuadro */
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #000;
  /* Borde alrededor del cuadro */
}

.status-green {
  background-color: rgb(126, 211, 33);
  color: black;
  width: 30px;
  /* Aumentar el tamaño del cuadro */
  height: 30px;
  /* Aumentar el tamaño del cuadro */
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #000;
  /* Borde alrededor del cuadro */
}

.status-yellow {
  background-color: yellow;
  color: black;
  width: 30px;
  /* Aumentar el tamaño del cuadro */
  height: 30px;
  /* Aumentar el tamaño del cuadro */
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #000;
  /* Borde alrededor del cuadro */
}

.status-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.status-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: 1px solid #ccc;
  /* Borde alrededor de cada ítem */
  padding: 5px;
  /* Espacio alrededor del contenido del ítem */
  border-radius: 5px;
  /* Borde redondeado */
}

.status-item span {
  margin-right: 5px;
  /* Espacio entre el texto y el cuadro */
  font-size: 12px;
  /* Tamaño de la fuente para el texto */
}

.status-blue {
  background-color: rgb(38, 0, 255);
  color: white;
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-left: 5px;
  border: 1px solid #000;
}

.text-custom-blue {
  color: rgb(38, 0, 255);
}
</style>
