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
        <!-- <div style="float: right; width: calc(8% - 5px); margin-bottom: 30px;">
  <div style="border: 1px solid #000; padding: 3px; width: 95%;">
    <p style="color: rgb(43, 255, 0); font-size: 10px;">estado libre <span style="color: rgb(0, 0, 0); font-size: 10px;">estado ocupado</span></p>
    <p style="color: red; font-size: 10px;">estado mantenimiento <span style="color: rgb(255, 128, 0); font-size: 10px;">estado Con Correspondecia</span></p>
  </div>
</div>
<div style="clear: both;"></div> -->


        <!-- Subdividir por categoría -->
        <div v-for="categoria in categorias" :key="categoria.id">
          <div class="text-center mb-4">
            
            <h2>Casilla {{ categoria.nombre }}</h2>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="row mt-4">
              <div class="d-flex flex-wrap justify-content-center">
               <div v-for="(item, index) in casillasOrdenadasPorCategoria(categoria.id)" :key="item.id" class="m-2"
      :style="{
        fontSize: '2rem',
        width: isMediana(item.categoria_nombre) ? 'calc(20% - 10px)' : 'calc(110px - 5px)', // Ajusta el ancho dependiendo de si es mediana o no
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
            <!-- <p>Numero de Casilla: {{ casillaSeleccionada.llaves_id }}</p> -->
            <p>Seccion: {{ casillaSeleccionada.seccione_id }}</p>
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
      apiUrl: 'ver1', // La ruta base
      page: 'Casillas',
      modulo: 'agbc',
      seccionSeleccionada: "1", // Valor por defecto
      url_nuevo: '/alquileres/alquilere/nuevo',
      url_editar: '/casillas/casilla/estado/',//cambiar a editar
      url_editar2: '/alquileres/alquilere/renovar/',
      url_editar3: '/casillas/casilla/img/',

      modalVisible: false,
      casillaSeleccionada: {},
      busqueda: '', // Nuevo campo para almacenar el valor de búsqueda
      mostrarListaOpciones: false,
      opcionesBusqueda: [],
    };
  },
  computed: {
    categorias() {
      // Obtener la lista única de categorías
      const categoriasUnicas = [...new Set(this.casillas.map((item) => item.categoria_nombre))];
      // Mapear las categorías a un objeto con un ID y nombre
      return categoriasUnicas.map((nombre, index) => ({ id: index + 1, nombre }));
    },
    casillasOrdenadas() {
      // Ordenar las casillas por el nombre de la categoría en orden inverso
      return this.casillas.slice().sort((a, b) => b.categoria_nombre.localeCompare(a.categoria_nombre));
    },
  },
  methods: {

isMediana(categoria) {
  return categoria === 'Mediana';
},

    abrirElemento(id) {
      // Encuentra el elemento correspondiente por su ID
      const elemento = this.casillas.find(item => item.casilla_id === id);
      if (elemento) {
        // Aquí puedes realizar alguna acción, por ejemplo, abrir un modal con los detalles del elemento
        this.abrirModal(elemento);
        // También puedes navegar a otra página con los detalles del elemento si lo prefieres
        // this.$router.push(`/detalle/${id}`);
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
      id: item.casilla_id, // Ajusta el ID según tus necesidades
      nombre: `${item.casilla_nombre} - ${item.cliente_nombre}`, // Ajusta el texto según tus necesidades
    }));

  this.mostrarListaOpciones = true;
},


    


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
      // Si la búsqueda está vacía, restaura la lista completa de casillas
      this.cargarDatos();
    } else {
      const casillasFiltradas = this.casillas.filter(item => {
        // Filtrar las casillas por casilla_nombre, cliente_nombre o carnet que no sean null y que contengan el texto de búsqueda
        return (
          (item.casilla_nombre && item.casilla_nombre.toLowerCase().includes(busquedaLowerCase)) ||
          (item.cliente_nombre && item.cliente_nombre.toLowerCase().includes(busquedaLowerCase)) ||
          (item.carnet && item.carnet.toLowerCase().includes(busquedaLowerCase))
        );
      });

      if (casillasFiltradas.length > 0) {
        // Si se encuentran casillas que coinciden, muestra todas las coincidencias
        this.mostrarCasillasFiltradas(casillasFiltradas);
      } else {
        // Si no se encuentra ninguna coincidencia, mostrar un mensaje o realizar alguna acción según necesites
        console.log('No se encontró ninguna casilla con ese nombre o cliente.');
      }
    }
  }
},

mostrarCasillasFiltradas(casillasFiltradas) {
  // Muestra las casillas filtradas
  this.modalVisible = true;
  this.casillaSeleccionada = casillasFiltradas[0] || null; // Establece la primera casilla filtrada o null si no hay coincidencias
  this.casillas = casillasFiltradas;
},











casillasOrdenadasPorCategoria(categoriaId) {
  // Filtrar las casillas por la categoría actual
  const casillasCategoria = this.casillas.filter((item) => item.categoria_nombre === this.categorias[categoriaId - 1].nombre);
  
  // Ordenar las casillas por el número de casilla
  return casillasCategoria.sort((a, b) => parseInt(a.casilla_nombre) - parseInt(b.casilla_nombre));
},


async cargarDatos() {
  try {
    const res = await this.$api.$get(`${this.apiUrl}/${this.seccionSeleccionada}`);
    console.log('Datos recuperados de la API:', res);

    // Verifica que la respuesta tenga la propiedad 'casillas' y es un array
    if (res && Array.isArray(res.casillas)) {
      // Asigna las casillas recuperadas al arreglo 'casillas' del componente
      this.casillas = res.casillas;

      // Ordena las casillas por categoría y luego por número de casilla
      this.casillas.sort((b, a) => {
        // Primero ordena por categoría
        const categoriaComparison = a.categoria_nombre.localeCompare(b.categoria_nombre);
        if (categoriaComparison !== 0) return categoriaComparison;

        // Si las categorías son iguales, ordena por número de casilla
        return parseInt(a.casilla_nombre) - parseInt(b.casilla_nombre);
      });
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
          case 4:
          return 'text-warning'; // Estado "Vencido" (nuevo color amarillo)
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
          case 4:
          return 'Vencido'; // Nuevo estado "Vencido"
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



ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ccc;
  max-height: 150px; /* Establece una altura máxima para la lista */
  overflow-y: auto; /* Agrega desplazamiento vertical si la lista excede la altura máxima */
}

ul li {
  padding: 5px 10px;
  cursor: pointer;
}




ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ccc;
}

ul li {
  padding: 5px 10px;
  cursor: pointer;
}

ul li:hover {
  background-color: #f0f0f0;
}

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
/* Estilo para el elemento */
.elemento {
  float: right;
  width: calc(16% - 10px);
}

</style>
