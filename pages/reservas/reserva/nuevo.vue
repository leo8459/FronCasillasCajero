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
                    <!-- Nuevo campo de entrada para el cliente con funcionalidad de búsqueda -->
                   
                    <div class="form-group col-12">
                      <label for="">Nombre</label>
                      <input type="text" v-model="model.nombre" class="form-control" id="">
                    </div>
                    <div class="form-group col-12">
                      <label for="">Email</label>
                      <input type="text" v-model="model.email" class="form-control" id="">
                    </div>
                    <div class="form-group col-12">
                      <label for="">Carnet</label>
                      <input type="text" v-model="model.carnet" class="form-control" id="">
                    </div>
                    <div class="form-group col-12">
                      <label for="">Direccion</label>
                      <input type="text" v-model="model.direccion" class="form-control" id="">
                    </div>
                    <div class="form-group col-12">
                      <label for="">Telefono</label>
                      <input type="text" v-model="model.telefono" class="form-control" id="">
                    </div>

                    <div class="form-group col-12">
                      <label for="">Casilla</label>
                      <select name="" id="" class="form-control" v-model="model.casilla_id" @change="updateCategoria"
                        disabled>
                        <option v-for="m in casillas" :value="m.id">{{ m.nombre }}</option>
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
        email: '',
        carnet: '',
        direccion: '',
        telefono: '',
        casilla_id: '',
      },
      apiUrl: 'reservas',
      page: 'alquileres',
      modulo: 'AGBC',
      load: true,
      searchQuery: '', // Añade esta línea
      searchResults: [], // Añade esta línea
      casillas: [],
    };
  },

  methods: {
    async searchClients() {
      // Realizar la búsqueda de clientes basada en la consulta de búsqueda
      if (this.searchQuery.trim() !== '') {
        // Simplemente filtrar clientes aquí, puedes ajustarlo según tus necesidades
        this.searchResults = this.clientes.filter(cliente => {
          return cliente.nombre.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        this.searchResults = [];
      }
    },

    selectClient(client) {
      // Asignar el cliente seleccionado al modelo y limpiar los resultados de búsqueda
      this.model.cliente_id = client.id;
      this.searchQuery = '';
      this.searchResults = [];
    },

    autocompleteFirstResult(event) {
      // Verificar si se presionó la tecla Enter
      if (event.key === 'Enter' && this.searchResults.length > 0) {
        // Autocompletar con el primer resultado de la lista
        this.model.cliente_id = this.searchResults[0].id;
        this.searchQuery = this.searchResults[0].nombre;
        this.searchResults = []; // Limpiar la lista de resultados
      }
    },

    selectClient(client) {
      // Autocompletar con el cliente seleccionado
      this.model.cliente_id = client.id;
      this.searchQuery = client.nombre;
      this.searchResults = []; // Limpiar la lista de resultados
    },

    highlightClient(client) {
      // Opcional: Realizar alguna acción cuando se pase el mouse sobre un cliente en la lista
    },

    async updateCategoria() {
      // Obtén la casilla seleccionada
      const selectedCasilla = this.casillas.find(casilla => casilla.id === this.model.casilla_id);

      if (selectedCasilla) {
        // Asigna la categoría de la casilla seleccionada al modelo
        this.model.categoria_id = selectedCasilla.categoria_id;

        // Filtra los precios según la categoría seleccionada (tamaño)
        this.precios = this.precios.filter(precio => precio.categoria_id === this.model.categoria_id);

        // Filtra los tiempos según la categoría seleccionada (tamaño)
        this.tiemposFiltrados = this.precios.map(precio => precio.tiempo);
      }
    },

    // Nuevo método para actualizar los tiempos basados en el tamaño seleccionado
    updateTiemposBySize() {
      if (this.model.categoria_id === 'ID_TU_TAMAÑO_PEQUEÑA') {
        // Actualizar tiemposFiltrados para el tamaño pequeño
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Pequeña')).map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_MEDIANA') {
        // Actualizar tiemposFiltrados para el tamaño mediano
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Mediana')).map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_GABETA') {
        // Actualizar tiemposFiltrados para el tamaño de gabeta
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Gabeta')).map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_CAJON') {
        // Actualizar tiemposFiltrados para el tamaño de cajón
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Cajon')).map(precio => precio.tiempo);
      } else {
        // En caso de otro tamaño o selección no válida, muestra todos los tiempos
        this.tiemposFiltrados = this.precios.map(precio => precio.tiempo);
      }
    },

    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },

    updateFechaTermino() {
      const selectedPrecio = this.precios.find(precio => precio.id === this.model.precio_id);

      if (selectedPrecio) {
        // Obtener el tiempo en días, meses, o años desde el precio seleccionado
        const tiempo = selectedPrecio.tiempo;
        const [cantidad, unidad] = tiempo.split(" "); // Suponiendo que el formato es "cantidad unidad"

        // Calcular la fecha de finalización basada en el tiempo seleccionado
        const fechaInicio = new Date(this.model.ini_fecha);
        let fechaFin = new Date(fechaInicio);

        switch (unidad.toLowerCase()) {
          case 'día':
          case 'días':
            fechaFin.setDate(fechaInicio.getDate() + parseInt(cantidad));
            break;
          case 'mes':
          case 'meses':
            fechaFin.setMonth(fechaInicio.getMonth() + parseInt(cantidad));
            break;
          case 'año':
          case 'años':
            fechaFin.setFullYear(fechaInicio.getFullYear() + parseInt(cantidad));
            break;
          // Puedes añadir más casos según necesites para manejar diferentes unidades de tiempo
        }

        // Actualizar model.fin_fecha con la fecha de finalización calculada
        const year = fechaFin.getFullYear();
        const month = String(fechaFin.getMonth() + 1).padStart(2, '0');
        const day = String(fechaFin.getDate()).padStart(2, '0');
        this.model.fin_fecha = `${year}-${month}-${day}`;
      }
    }
  },
  computed: {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    minFecha() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  mounted() {
    this.$nextTick(async () => {
      let user = localStorage.getItem('userAuth'); // Asignar cajero_id al modelo
      this.user = JSON.parse(user); // Asignar cajero_id al modelo
      this.model.cajero_id = this.user.cajero.id; // Asignar cajero_id al modelo
      
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      this.model.apertura = formattedDate; // Asignar la fecha actual a la apertura

      try {
        await Promise.all([this.GET_DATA('clientes'), this.GET_DATA('casillas'), this.GET_DATA('categorias'), this.GET_DATA('precios')]).then((v) => {
          this.clientes = v[0];
          this.casillas = v[1];
          this.categorias = v[2];
          this.precios = v[3];
        });

        // Acceder a los parámetros de consulta
        const casillaId = this.$route.query.casillaId;

        // Verificar si se proporcionó el parámetro casillaId y usarlo para llenar los datos
        if (casillaId) {
          // Buscar la casilla correspondiente
          const casillaSeleccionada = this.casillas.find(casilla => casilla.id === parseInt(casillaId));
          if (casillaSeleccionada) {
            // Llenar los datos del modelo con la casilla seleccionada
            this.model.casilla_id = casillaSeleccionada.id;
            this.model.categoria_id = casillaSeleccionada.categoria_id;
            // También puedes llenar otros datos según sea necesario
          }
        }

        // Establecer la fecha inicial en el modelo con la fecha actual
        this.model.ini_fecha = formattedDate;

        // Llamar al método updateFechaTermino cuando se cambie el valor de model.precio_id
        this.$watch('model.precio_id', this.updateFechaTermino);

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
</style>
