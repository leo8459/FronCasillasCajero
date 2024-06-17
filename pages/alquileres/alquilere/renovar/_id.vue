<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">

          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Actualizar</h3>
              </div>
              <div class="card-body">
                <CrudUpdate :model="model" :apiUrl="apiUrl">
                  <div slot="body" class="row">




                    <div class="form-group col-12">
                      <label for="">Cliente</label>
                      <select name="" id="" class="form-control" v-model="model.cliente_id" disabled>
                        <option v-for="m in clientes" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>


                    <div class="form-group col-12">
                      <label for="">Casilla</label>
                      <select name="" id="" class="form-control" v-model="model.casilla_id" disabled>
                        <option v-for="m in casillas" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>



                    <div class="form-group col-12">
                      <label for="">Tamaño</label>
                      <select name="" id="" class="form-control" v-model="model.categoria_id" @change="updateCategoria">
                        <option v-for="m in categorias" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>


                    <div class="form-group col-12">
    <label for="">Tiempo</label>
<select name="" id="" class="form-control" v-model="model.precio_id" @change="updateFechaTermino" :disabled="tiempoSeleccionado">
      <option v-for="m in precios" :value="m.id">{{ m.tiempo }}</option>
    </select>
  </div>


                    <div class="form-group col-12">
                      <label for="">Fecha INICIAL</label>
                      <input type="date" v-model="model.ini_fecha" class="form-control" :min="minFecha">
                    </div>

                    <div class="form-group col-12">
                      <label for="">Fecha TERMINO</label>
                      <input type="date" v-model="model.fin_fecha" class="form-control" :min="model.ini_fecha">
                    </div>



                    <!-- <div class="form-group col-12">
                      <label for="">Estado de Casilla</label>
                      <select v-model="model.casilla_estado" class="form-control">
                        <option value="Activo">Activo</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                      </select>
                    </div>


                    <div class="form-group col-12">
                      <label for="">Estado</label>
                      <select v-model="model.estado" class="form-control">
                        <option value="1">Activo</option>
                        <option value="0">Mantenimiento</option>
                      </select>
                    </div> -->









                  </div>
                </CrudUpdate>
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
  name: "IndexPage",
  head() {
    return {
      title: "alquileres",
    };
    ;
  },
  data() {
    return {
      load: true,
      tiempoSeleccionado: false, // Nueva propiedad para controlar si se ha seleccionado el tiempo

      model: {
        nombre: '',
        ini_fecha: '',
        fin_fecha: '',
        cliente_id: '',
        casilla_id: '',
        casilla_estado: '',
        categoria_id: '',
        precio_id: '',
        estado: ''

      },
      apiUrl: "alquileres",
      page: "alquileres",
      modulo: "Agbc",
      clientes: [],
      casillas: [],
      categorias: [],
      precios: [],


    };
  },
  methods: {


    

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




    updateFechaTermino() {
      const selectedPrecio = this.precios.find(precio => precio.id === this.model.precio_id);

      if (selectedPrecio) {
        // Obtener el tiempo en días, meses, o años desde el precio seleccionado
        const tiempo = selectedPrecio.tiempo;
        const [cantidad, unidad] = tiempo.split(" "); // Suponiendo que el formato es "cantidad unidad"

        // Calcular la fecha de finalización basada en el tiempo seleccionado
        const fechaInicio = new Date(this.model.fin_fecha);
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
        const year = String(fechaFin.getFullYear()).padStart(2, '0');
        const month = String(fechaFin.getMonth() + 1).padStart(2, '0');
        const day = String(fechaFin.getDate()+ 1).padStart(2, '0');
        this.model.fin_fecha = `${year}-${month}-${day}`;
              this.tiempoSeleccionado = true;

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
      return res
    },

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
      try {
      await Promise.all([this.GET_DATA(this.apiUrl + "/" + this.$route.params.id), this.GET_DATA('clientes'), this.GET_DATA('casillas'), this.GET_DATA('categorias'), this.GET_DATA('precios'),]).then((v) => {
        this.model = v[0];
        this.clientes = v[1];
        this.casillas = v[2];
        this.categorias = v[3];
        this.precios = v[4];

        // Si deseas establecer el tiempo en vacío por defecto
        this.model.precio_id = null;

        // Actualiza la fecha de término basada en el tiempo inicial
        this.updateFechaTermino();
      })
    } catch (e) {
      console.log(e);
    } finally {
      this.load = false
    }



    });
  }
};
</script>