<template>
    <div>
      <JcLoader :load="load"></JcLoader>
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="col-4">
            <label for="searchInput">Buscar por nombre:</label>
            <input type="text" v-model="busqueda" id="searchInput" @keydown.enter="buscarCasilla">
          </div>
  
          <!-- Eliminado el selector de sección -->
  
           <!-- Renderizado condicional de las casillas -->
        <div v-if="!load && casillas.length === 0" class="text-center mb-4">
          <h2>No hay casillas disponibles</h2>
        </div>
        <div v-if="!load && casillas.length > 0" class="d-flex justify-content-center align-items-center">
          <div class="row mt-4">
            <div class="d-flex flex-wrap justify-content-center">
              <div v-for="(item, index) in casillasOrdenadas" :key="item.id" class="m-2"
                :style="{
                  fontSize: '2rem',
                  width: 'calc(160px - 5px)',
                  transform: getIconSize(item.categoria_nombre),
                }">
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
              <p>Detalles: {{ casillaSeleccionada.casilla_ubicacion }}</p>
              <p>Categoría: {{ casillaSeleccionada.categoria_nombre }}</p>
              <p>Estado: {{ getTextForEstado(casillaSeleccionada.casilla_estado) }}</p>
              <p>Observacion: {{ casillaSeleccionada.casilla_observacion }}</p>
              <p>Nombre del Cliente: {{ casillaSeleccionada.cliente_nombre }}</p>
              <p>Carnet: {{ casillaSeleccionada.carnet }}</p>
            </div>
            <div class="modal-footer">
              <!-- Condición para mostrar el botón solo si el estado no es 'Ocupado' -->
  
  
              <nuxt-link
                v-if="casillaSeleccionada.casilla_estado !== 0 && casillaSeleccionada.casilla_estado !== 2 && casillaSeleccionada.casilla_estado !== 3"
                :to="`${url_nuevo}?casillaId=${casillaSeleccionada.casilla_id}`" class="btn btn-dark btn-sm w-30">
                <i class="fas fa-plus"></i>Alquilar
              </nuxt-link>
  
              <nuxtLink :to="url_editar + casillaSeleccionada.casilla_id" class="btn btn-info btn-sm py-2 px-4">
                Estado
              </nuxtLink>
              <button @click="handleButtonClick(casillaSeleccionada.casilla_id)">Abrir Ubicación</button>
  
  
  
  
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
        load: true,
        casillas: [],
        apiUrl: 'ver3', // La ruta base
        page: 'Casillas',
        modulo: 'agbc',
        seccionSeleccionada: "1", // Valor por defecto
        url_nuevo: '/alquileres/alquilere/nuevo',
        url_editar: '/casillas/casilla/estado/',
        url_editar2: '/alquileres/alquilere/renovar/',
        url_editar3: '/casillas/casilla/img/',
  
        modalVisible: false,
        casillaSeleccionada: {},
        busqueda: '', // Nuevo campo para almacenar el valor de búsqueda
  
      };
    },
    computed: {
        casillasOrdenadas() {
      return this.casillas.slice().sort((a, b) => b.categoria_nombre.localeCompare(a.categoria_nombre));
    },
    },
    methods: {
  
      abrirImagen(imagen) {
      const rutaImagen = `/assets/imagenes/${imagen}`;
      window.open(rutaImagen, '_self'); // Cambia '_blank' por '_self' si quieres que se abra en la misma ventana.
    },
  
    // Asumamos que añades un método que se llame al hacer clic en tu botón
    handleButtonClick(casillaId) {
      if (casillaId === 5 || casillaId === 7) {
        this.abrirImagen('seccion.jpg');
      } else {
        // Para el caso general, abre la imagen "logo.png"
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
            this.abrirModal(casillasFiltradas[0]);
          } else {
            console.log('No se encontró ninguna casilla con ese nombre o cliente.');
          }
        }
      }
    },
  
  
  
  
     
  
      async cargarDatos() {
        try {
          const res = await this.$api.$get(`${this.apiUrl}/${this.seccionSeleccionada}`);
          console.log('Datos recuperados de la API:', res);
  
          // Verifica que la respuesta tenga la propiedad 'casillas' y es un array
          if (res && Array.isArray(res.casillas)) {
            // Asigna las casillas recuperadas al arreglo 'casillas' del componente
            this.casillas = res.casillas;
          } else {
            console.error('La respuesta de la API no contiene el formato esperado.');
          }
  
        } catch (error) {
          console.error('Error al recuperar los datos de la API:', error);
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
      getIconColorClass(estado) {
        switch (estado) {
          case 1:
            return 'text-success'; // Estado "Disponible"
          case 2:
            return 'text-brown'; // Estado "Con Correspondecia" (nuevo color café)
          case 3:
            return 'text-danger'; // Estado "Con Correspondecia" (nuevo color café)
          default:
            return 'text-black'; // Otros estados
        }
      },
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
          default:
            return 'Desconocido';
        }
      },
    },
    mounted() {
      this.cargarDatos();
    },
  };
  </script>
  
  <style scoped>
  .label-container {
    position: absolute;
    top: 10px;
    /* Ajusta la posición vertical según tus necesidades */
    right: 1000px;
    /* Ajusta la posición horizontal según tus necesidades */
    background-color: #f0f0f0;
    /* Ajusta el color de fondo según tus preferencias */
    padding: 5px;
    /* Ajusta el espaciado interior según tus preferencias */
    border: 1px solid #ccc;
    /* Ajusta los bordes según tus preferencias */
    border-radius: 5px;
    /* Añade bordes redondeados si lo deseas */
  }
  
  .label-text {
    font-size: 10px;
    /* Ajusta el tamaño de fuente según tus preferencias */
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
  </style>
  