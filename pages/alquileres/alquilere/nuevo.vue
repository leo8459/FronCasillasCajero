<template>
  <div>
    <JcLoader :load="load"></JcLoader>

    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Agregar Casilla</h3>
              </div>
              <div class="card-body">
                <CrudCreate :model="model" :apiUrl="apiUrl">
                  <div slot="body" class="row">
                    <!-- Campo de búsqueda de Cliente -->
                    <div class="form-group col-12">
                      <label for="cliente">Cliente</label>
                      <input type="text" v-model="searchQuery" @input="searchClients"
                        @keyup.enter="autocompleteFirstResult" class="form-control" id="cliente"
                        placeholder="Buscar cliente..." />
                      <div v-if="searchResults.length" class="search-results">
                        <ul>
                          <li v-for="client in searchResults" :key="client.id" @click="selectClient(client)"
                            @mouseover="highlightClient(client)">
                            {{ client.nombre }}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- Casilla -->
                    <div class="form-group col-12">
                      <label for="casilla">Casilla</label>
                      <select id="casilla" class="form-control" v-model="model.casilla_id" @change="updateCategoria"
                        disabled>
                        <option v-for="m in casillas" :key="m.id" :value="m.id">
                          {{ m.nombre }}
                        </option>
                      </select>
                    </div>

                    <!-- Tamaño -->
                    <div class="form-group col-12">
                      <label for="categoria">Tamaño</label>
                      <select id="categoria" class="form-control" v-model="model.categoria_id"
                        @change="updateCategoria">
                        <option v-for="m in categorias" :key="m.id" :value="m.id">
                          {{ m.nombre }}
                        </option>
                      </select>
                    </div>

                    <!-- Fecha Inicial -->
                    <div class="form-group col-12">
                      <label for="ini_fecha">Fecha Inicial</label>
                      <input type="date" id="ini_fecha" v-model="model.ini_fecha" class="form-control" @change="handleIniFechaChange" />
                    </div>

                    <!-- Tiempo -->
                    <div class="form-group col-12">
                      <label for="precio">Tiempo</label>
                      <select id="precio" class="form-control" v-model="model.precio_id" @change="handlePrecioChange">
                        <option v-for="m in precios" :key="m.id" :value="m.id">
                          {{ m.tiempo }}
                        </option>
                      </select>
                    </div>

                    <!-- Checkbox para Habilitar Tiempo Especial -->
                    <div class="form-group col-12">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="habilitarTiempoEspecial"
                          v-model="habilitarTiempoEspecial" />
                        <label class="form-check-label" for="habilitarTiempoEspecial">
                          Habilitar tiempo especial
                        </label>
                      </div>
                    </div>

                    <!-- Fecha Final (Tiempo Especial) -->
                    <div class="form-group col-12" v-if="habilitarTiempoEspecial">
                      <label for="fin_fecha_especial">Fecha Final (Tiempo Especial)</label>
                      <input type="date" id="fin_fecha_especial" v-model="model.fin_fecha" class="form-control"
                        :min="model.ini_fecha" :max="maxFinFecha" @change="handleFinFechaChange" />
                      <small class="text-danger" v-if="errorFinFecha">{{ errorFinFecha }}</small>
                    </div>

                    <!-- Fecha Final (Automática) -->
                    <div class="form-group col-12" v-else>
                      <label for="fin_fecha">Fecha Final</label>
                      <input type="date" id="fin_fecha" v-model="model.fin_fecha" class="form-control"
                        :min="model.ini_fecha"  />
                    </div>

                    <!-- Llaves Extras -->
                    <div class="form-group col-12">
                      <label for="estado_pago">Llaves Extras</label>
                      <input type="text" id="estado_pago" v-model="model.estado_pago" class="form-control"
                        placeholder="Estado de pago..." />
                    </div>

                    <!-- Multas -->
                    <div class="form-group col-12">
                      <label for="nombre">Multas</label>
                      <input type="text" id="nombre" v-model="model.nombre" class="form-control"
                        placeholder="Nombre de la multa..." />
                    </div>

                    <!-- Apertura -->
                    <div class="form-group col-12">
                      <label for="apertura">Dia de Pago</label>
                      <input type="date" id="apertura" v-model="model.apertura" class="form-control" />
                    
                    </div>

                    <!-- Habilitación -->
                    <div class="form-group col-12">
                      <label for="habilitacion">Habilitación</label>
                      <input type="text" id="habilitacion" v-model="model.habilitacion" class="form-control"
                        placeholder="Habilitación..." />
                    </div>
                     <!-- Habilitación -->
                     <div class="form-group col-12">
                      <label for="autorizado_recojo">Personas autorizadas de recojo</label>
                      <input type="text" id="autorizado_recojo" v-model="model.autorizado_recojo" class="form-control"
                        placeholder="Personas autorizadas de recojo..." />
                    </div>

                    <!-- Precio -->
                    <div class="form-group col-12">
                      <label for="precio_final">Precio</label>
                      <select id="precio_final" class="form-control" v-model="model.precio_id" disabled>
                        <option v-for="m in precios" :key="m.id" :value="m.id">
                          {{ m.precio }}
                        </option>
                      </select>
                    </div>
                  </div>
                </CrudCreate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        nombre: '',
        cliente_id: '',
        casilla_id: '',
        categoria_id: '',
        precio_id: '',
        estado_pago: '',
        ini_fecha: '',
        fin_fecha: '',
        apertura: '',
        habilitacion: '',
        estado: '',
        cajero_id: '',
      },
      apiUrl: 'alquileres',
      page: 'alquileres',
      modulo: 'AGBC',
      load: true,
      searchQuery: '',
      searchResults: [],
      clientes: [],
      casillas: [],
      categorias: [],
      precios: [],
      user: {
        cajero: []
      },
      apertura: '',
      habilitarTiempoEspecial: false, // Checkbox para tiempo especial
      maxFinFecha: '', // Fecha máxima permitida para fin_fecha cuando es tiempo especial
      errorFinFecha: '', // Mensaje de error para fin_fecha
    };
  },

  methods: {
    async searchClients() {
      if (this.searchQuery.trim() !== '') {
        this.searchResults = this.clientes.filter(cliente => {
          return cliente.nombre.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        this.searchResults = [];
      }
    },

    selectClient(client) {
      this.model.cliente_id = client.id;
      this.searchQuery = client.nombre;
      this.searchResults = [];
    },

    autocompleteFirstResult(event) {
      if (event.key === 'Enter' && this.searchResults.length > 0) {
        this.selectClient(this.searchResults[0]);
      }
    },

    highlightClient(client) {
      // Opcional: Añadir lógica para resaltar el cliente
    },

    async updateCategoria() {
      const selectedCasilla = this.casillas.find(casilla => casilla.id === this.model.casilla_id);

      if (selectedCasilla) {
        this.model.categoria_id = selectedCasilla.categoria_id;
        this.precios = this.precios.filter(precio => precio.categoria_id === this.model.categoria_id);
        this.updateTiemposBySize();
        this.updateFechaTermino();
      }
    },

    updateTiemposBySize() {
      if (this.model.categoria_id === 'ID_TU_TAMAÑO_PEQUEÑA') {
        this.tiemposFiltrados = this.precios
          .filter(precio => precio.tiempo.includes('Pequeña'))
          .map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_MEDIANA') {
        this.tiemposFiltrados = this.precios
          .filter(precio => precio.tiempo.includes('Mediana'))
          .map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_GABETA') {
        this.tiemposFiltrados = this.precios
          .filter(precio => precio.tiempo.includes('Gabeta'))
          .map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_CAJON') {
        this.tiemposFiltrados = this.precios
          .filter(precio => precio.tiempo.includes('Cajon'))
          .map(precio => precio.tiempo);
      } else {
        this.tiemposFiltrados = this.precios.map(precio => precio.tiempo);
      }
    },

    async GET_DATA(path) {
      try {
        const res = await this.$api.$get(path);
        return res;
      } catch (error) {
        console.error(`Error fetching data from ${path}:`, error);
        return [];
      }
    },

    // Calcular la fecha final automáticamente
    updateFechaTermino() {
      if (this.habilitarTiempoEspecial) {
        // No hacer nada; el usuario define fin_fecha manualmente
        return;
      }

      const selectedPrecio = this.precios.find(precio => precio.id === this.model.precio_id);

      if (selectedPrecio && this.model.ini_fecha) {
        const tiempo = selectedPrecio.tiempo;
        const [cantidad, unidad] = tiempo.split(" ");
        const cantidadNum = parseInt(cantidad);

        const fechaInicio = new Date(this.model.ini_fecha);
        let fechaFin = new Date(fechaInicio);

        switch (unidad.toLowerCase()) {
          case 'día':
          case 'días':
            fechaFin.setDate(fechaInicio.getDate() + cantidadNum);
            break;
          case 'mes':
          case 'meses':
            fechaFin.setMonth(fechaInicio.getMonth() + cantidadNum);
            break;
          case 'año':
          case 'años':
            fechaFin.setFullYear(fechaInicio.getFullYear() + cantidadNum);
            break;
          default:
            break;
        }

        const year = fechaFin.getFullYear();
        const month = String(fechaFin.getMonth() + 1).padStart(2, '0');
        const day = String(fechaFin.getDate()).padStart(2, '0');
        this.model.fin_fecha = `${year}-${month}-${day}`;
      }
    },

    // Manejar cambios en la fecha inicial
    handleIniFechaChange() {
      if (!this.habilitarTiempoEspecial) {
        this.updateFechaTermino();
      }
      // Recalcular maxFinFecha en cualquier caso
      this.calcularMaxFinFecha();
    },

    // Manejar cambios en el tiempo seleccionado
    handlePrecioChange() {
      this.updateFechaTermino();
      // Recalcular maxFinFecha al cambiar tiempo
      this.calcularMaxFinFecha();
    },

    // Calcular la fecha máxima permitida para fin_fecha cuando es tiempo especial
    calcularMaxFinFecha() {
      if (this.habilitarTiempoEspecial && this.model.ini_fecha) {
        const fechaInicio = new Date(this.model.ini_fecha);
        fechaInicio.setDate(fechaInicio.getDate() + 30); // Añadir 30 días

        const year = fechaInicio.getFullYear();
        const month = String(fechaInicio.getMonth() + 1).padStart(2, '0');
        const day = String(fechaInicio.getDate()).padStart(2, '0');
        this.maxFinFecha = `${year}-${month}-${day}`;
      } else {
        this.maxFinFecha = ''; // No hay límite cuando no es tiempo especial
      }
    },

    // Manejar cambios en fin_fecha cuando es tiempo especial
    handleFinFechaChange() {
      if (this.habilitarTiempoEspecial && this.model.ini_fecha && this.model.fin_fecha) {
        const finFecha = new Date(this.model.fin_fecha);
        const maxFecha = new Date(this.maxFinFecha);

        if (finFecha > maxFecha) {
          this.errorFinFecha = `La fecha final no puede exceder el ${this.maxFinFecha}.`;
        } else {
          this.errorFinFecha = '';
        }
      } else {
        this.errorFinFecha = '';
      }
    },
  },

  computed: {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    // minFecha() {
    //   const now = new Date();
    //   const year = now.getFullYear();
    //   const month = String(now.getMonth() + 1).padStart(2, '0');
    //   const day = String(now.getDate()).padStart(2, '0');
    //   return `${year}-${month}-${day}`;
    // }
    minFecha() {
    return ''; // No establecer una fecha mínima
  }
  },

  watch: {
    'model.precio_id': 'updateFechaTermino',
    'model.ini_fecha': 'updateFechaTermino',
    'habilitarTiempoEspecial': function (newVal) {
      if (!newVal) {
        // Si se desactiva el tiempo especial, recalcular fin_fecha automáticamente
        this.updateFechaTermino();
        this.errorFinFecha = '';
      } else {
        // Si se activa el tiempo especial, limpiar fin_fecha y errores
        this.model.fin_fecha = '';
        this.errorFinFecha = '';
      }
      // Recalcular maxFinFecha siempre
      this.calcularMaxFinFecha();
    }
  },

  mounted() {
    this.$nextTick(async () => {
      let user = localStorage.getItem('userAuth');
      this.user = JSON.parse(user);
      this.model.cajero_id = this.user.cajero.id;

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      this.model.apertura = formattedDate;
      this.apertura = formattedDate;

      try {
        const [clientes, casillas, categorias, precios] = await Promise.all([
          this.GET_DATA('clientes'),
          this.GET_DATA('casillas'),
          this.GET_DATA('categorias'),
          this.GET_DATA('precios')
        ]);

        this.clientes = clientes;
        this.casillas = casillas;
        this.categorias = categorias;
        this.precios = precios;

        const casillaId = this.$route.query.casillaId;

        if (casillaId) {
          const casillaSeleccionada = this.casillas.find(casilla => casilla.id === parseInt(casillaId));
          if (casillaSeleccionada) {
            this.model.casilla_id = casillaSeleccionada.id;
            this.model.categoria_id = casillaSeleccionada.categoria_id;
          }
        }

        this.model.ini_fecha = formattedDate;

        // Inicializar fin_fecha automáticamente si el tiempo especial no está habilitado
        this.updateFechaTermino();

        // Calcular maxFinFecha si es necesario
        this.calcularMaxFinFecha();

      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    });
  }
};
</script>

<style>
/* Estilos para los resultados de búsqueda */
.search-results {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
  width: 100%;
}

.search-results ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.search-results ul li {
  padding: 5px 10px;
  cursor: pointer;
}

.search-results ul li:hover {
  background-color: #f0f0f0;
}

/* Estilos para la selección de fechas de alquiler */
.form-group .d-flex input[type="date"] {
  flex: 1;
}

.form-group .d-flex .mr-2 {
  margin-right: 10px;
}

/* Asegurar que el checkbox y la fecha estén bien espaciados */
.form-check {
  margin-bottom: 15px;
}

/* Estilos para el mensaje de error */
.text-danger {
  font-size: 0.875em;
  margin-top: 5px;
}
</style>
