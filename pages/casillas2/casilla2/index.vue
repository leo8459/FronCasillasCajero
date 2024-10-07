<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">

        <div class="row justify-content-end text-right">
          <div class="col-12 col-md-4">
            <label for="searchInput">Buscar por nombre:</label>
            <input type="text" v-model="busqueda" id="searchInput" @input="filtrarOpcionesBusqueda">
            <ul v-if="mostrarListaOpciones">
              <li v-for="opcion in opcionesBusqueda" :key="opcion.id" @click="abrirElemento(opcion.id)">
                {{ opcion.nombre }}
              </li>
            </ul>
          </div>

        </div>

        <div class="col-2">
          <label for="seccionSelector">Selecciona una sección:</label>
          <select v-model="seccionSeleccionada" id="seccionSelector" @change="cargarDatos">
            <option v-for="n in 45" :value="n">Sección {{ n }}</option>
          </select>
        </div>
        <div class="col-12 col-md-4 mt-2 d-flex justify-content-start">
          <div class="status-container">
            <div class="status-item" v-for="status in estadosCasillas" :key="status.color">
              <span>{{ status.nombre }}</span>
              <div :class="['status-square', status.colorClass]"></div>
            </div>
          </div>
        </div>
        <!-- Subdividir por categoría -->
        <div v-for="categoria in categorias" :key="categoria.id">
          <div class="text-center mb-4">
            <h2>Casilla {{ categoria.nombre }}</h2>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="row mt-4">
              <div class="d-flex flex-wrap justify-content-center casillas-container">
                <div
                  v-for="(item, index) in casillasFiltradasPorDepartamento.filter(c => c.categoria_nombre === categoria.nombre)"
                  :key="item.id" :class="{ 'small-casilla': item.categoria_nombre === 'Pequeño' }" class="m-2" :style="{
                    fontSize: '2rem',
                    width: isMediana(item.categoria_nombre) ? 'calc(20% - 10px)' : 'calc(110px - 5px)', // Ajusta el ancho dependiendo de si es mediana o no
                    transform: getIconSize(item.categoria_nombre),
                  }">
                <div class="circle-icon">
  <i :class="getIconClass(item.categoria_nombre)" 
     :style="{ color: getIconColorClass(item.casilla_estado) }"
     @click="abrirModal(item)">
  </i>
</div>


                  <div class="text-center">
                    <p class="casilla-nombre">{{ item.casilla_nombre }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminTemplate>

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
            <p>Observacion: {{ casillaSeleccionada.casilla_observacion }}</p>
            <p>Nombre del Cliente: {{ casillaSeleccionada.cliente_nombre }}</p>
            <p>Carnet: {{ casillaSeleccionada.carnet }}</p>
          </div>
          <div class="modal-footer">
            <nuxt-link
              v-if="casillaSeleccionada.casilla_estado !== 0 && casillaSeleccionada.casilla_estado !== 2 && casillaSeleccionada.casilla_estado !== 3"
              :to="`${url_nuevo}?casillaId=${casillaSeleccionada.casilla_id}`" class="btn btn-dark btn-sm w-30">
              <i class="fas fa-plus"></i>Alquilar
            </nuxt-link>

            <nuxtLink :to="url_editar + casillaSeleccionada.casilla_id" class="btn btn-info btn-sm py-2 px-4">
              Estado
            </nuxtLink>

            <nuxt-link v-if="casillaSeleccionada.casilla_estado !== 1"
              :to="`${url_editar2}${casillaSeleccionada.alquiler_id}`" class="btn btn-info btn-sm py-2 px-4">
              <i class="fas fa-plus"></i> Renovar
            </nuxt-link>

            <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
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
      apiUrl: 'ver1',
      page: 'Casillas',
      modulo: 'AGBC',
      seccionSeleccionada: "1",
      url_nuevo: '/alquileres/alquilere/nuevo',
      url_editar: '/casillas/casilla/estado/',
      url_editar2: '/alquileres/alquilere/renovar/',
      modalVisible: false,
      casillaSeleccionada: {},
      busqueda: '',
      user: {
        cajero: []//recuperar usuario
      },
      mostrarListaOpciones: false,
      opcionesBusqueda: [],
      estadosCasillas: [
        { colorClass: 'status-red', nombre: 'Mantenimiento' },
        { colorClass: 'status-orange', nombre: 'Con Correspondencia' },
        { colorClass: 'status-black', nombre: 'Ocupado' },
        { colorClass: 'status-green', nombre: 'Libre' },
        { colorClass: 'status-yellow', nombre: 'Vencido' }
      ],
    };
  },
  computed: {
    categorias() {
      const categoriasUnicas = [...new Set(this.casillas.map((item) => item.categoria_nombre))];
      return categoriasUnicas.map((nombre, index) => ({ id: index + 1, nombre }));
    },
    casillasOrdenadas() {
      return this.casillas.slice().sort((b, a) => b.categoria_nombre.localeCompare(a.categoria_nombre));
    },
    casillasFiltradasPorDepartamento() {
    if (this.user && this.user.cajero && this.user.cajero.departamento) {
      return this.casillas.filter(item => {
        return item.casilla_departamento === this.user.cajero.departamento;
      });
    } else {
      console.error('Departamento del usuario logueado no está definido');
      return [];
    }
  }
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
        console.error('No se encontró el elemento correspondiente.');
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
    handleButtonClick(casillaId) {
      if (casillaId === 5 || casillaId === 7) {
        this.abrirImagen('seccion.jpg');
      } else {
        this.abrirImagen('seccion.jpg');
      }
    },
    buscarCasilla(event) {
      if (event.key === 'Enter') {
        const busquedaLowerCase = this.busqueda.toLowerCase().trim();
        if (busquedaLowerCase === '') {
          this.cargarDatos();
        } else {
          const casillasFiltradas = this.casillas.filter(item => {
            return (
              (item.casilla_nombre && item.casilla_nombre.toLowerCase().includes(busquedaLowerCase)) ||
              (item.cliente_nombre && item.cliente_nombre.toLowerCase().includes(busquedaLowerCase)) ||
              (item.carnet && item.carnet.toLowerCase().includes(busquedaLowerCase))
            );
          });
          if (casillasFiltradas.length > 0) {
            this.mostrarCasillasFiltradas(casillasFiltradas);
          } else {
            console.log('No se encontró ninguna casilla con ese nombre o cliente.');
          }
        }
      }
    },
    mostrarCasillasFiltradas(casillasFiltradas) {
      this.modalVisible = true;
      this.casillaSeleccionada = casillasFiltradas[0] || null;
      this.casillas = casillasFiltradas;
    },
    casillasOrdenadasPorCategoria(categoriaId) {
      return this.casillas.filter(item => {
        // Comparar el departamento del usuario logueado con el departamento de la casilla
        return item.casilla_departamento === this.user.cajero.departamento && item.categoria_nombre === this.categorias[categoriaId - 1].nombre;
      }).sort((a, b) => parseInt(a.casilla_nombre) - parseInt(b.casilla_nombre));
    },

    async cargarDatos() {
  try {
    const res = await this.$api.$get(`${this.apiUrl}/${this.seccionSeleccionada}`);
    console.log('Datos recuperados de la API:', res);

    if (res && Array.isArray(res.casillas)) {
      // Solo filtrar las casillas si user.cajero.departamento está definido
      if (this.user && this.user.cajero && this.user.cajero.departamento) {
        this.casillas = res.casillas.filter(item => {
          return item.casilla_departamento === this.user.cajero.departamento;
        });

        this.casillas.sort((b, a) => {
          const categoriaComparison = a.categoria_nombre.localeCompare(b.categoria_nombre);
          if (categoriaComparison !== 0) return categoriaComparison;
          return parseInt(b.casilla_nombre) - parseInt(a.casilla_nombre);
        });
      } else {
        console.error('No se puede filtrar por departamento, el usuario o su departamento no están definidos');
      }
    } else {
      console.error('La respuesta de la API no contiene el formato esperado.');
    }
  } catch (error) {
    console.error('Error al recuperar los datos de la API:', error);
  } finally {
    this.load = false;
  }
}

,
    abrirModal(item) {
      this.casillaSeleccionada = item;
      this.modalVisible = true;
    },
    cerrarModal() {
      this.modalVisible = false;
    },
    getIconColorClass(estado) {
  switch (estado) {
    case 1:
      return 'rgb(126, 211, 33)'; // Verde
    case 2:
      return 'rgb(165, 42, 42)'; // Marrón
    case 3:
      return 'rgb(255, 0, 0)'; // Rojo
    case 4:
      return 'rgb(255, 255, 0)'; // Naranja
    default:
      return 'rgb(0, 0, 0)'; // Negro
  }
}
,

    getIconSize(categoria) {
      switch (categoria) {
        case 'Pequeño':
          return 'scale(1)';
        case 'Mediana':
          return 'scale(1)';
        case 'Gabeta':
          return 'scale(1)';
        case 'Cajon':
          return 'scale(1)';
        default:
          return 'scale(1)';
      }
    },
    getIconClass(categoria) {
      switch (categoria) {
        case 'Pequeño':
          return 'fas fa-box';
        case 'Mediana':
          return "fa fa-th-large";
        case 'Gabeta':
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
          return 'Con Correspondecia';
        case 3:
          return 'Mantenimiento';
        case 4:
          return 'Vencido';
        default:
          return 'Desconocido';
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
    try {
      let user = localStorage.getItem('userAuth'); // Recuperar usuario del localStorage
      if (user) {
        this.user = JSON.parse(user);
        
        // Verificar si user y user.cajero están definidos correctamente
        if (this.user && this.user.cajero && this.user.cajero.departamento) {
          console.log('Usuario cargado correctamente', this.user);
          this.cargarDatos(); // Llamar cargarDatos solo si user.cajero.departamento está definido
        } else {
          console.error('El usuario o el departamento no están definidos correctamente:', this.user);
        }
      } else {
        console.error('Usuario no encontrado en localStorage');
      }
    } catch (error) {
      console.error('Error al recuperar o analizar el usuario desde localStorage:', error);
    }
  });
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
  font-size: 1rem;
}

.elemento {
  float: right;
  width: calc(16% - 10px);
}

.casillas-container {
  display: flex;
  flex-wrap: wrap;
  max-width: calc(10 * (110px - 5px));
  /* Ajusta 110px según el ancho calculado de las casillas */
}

.small-casilla {
  width: calc(12.5% - 5px);
  /* 100% / 8 = 12.5% */
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
}

.status-orange {
  background-color: orange;
  color: black;
}

.status-black {
  background-color: black;
  color: white;
}

.status-green {
  background-color: green;
  color: black;
}

.status-yellow {
  background-color: yellow;
  color: black;
}

.dropdown-custom {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 10px;
  /* Reducimos el tamaño del botón */
  font-size: 14px;
  /* Reducimos el tamaño de la fuente */
  border: none;
  cursor: pointer;
  border-radius: 5px;
  /* Borde redondeado */
}

.dropdown-button:hover {
  background-color: #3e8e41;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  /* Ajustamos el ancho mínimo */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  /* Borde redondeado */
}

.dropdown-custom .dropdown-content {
  display: block;
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
</style>