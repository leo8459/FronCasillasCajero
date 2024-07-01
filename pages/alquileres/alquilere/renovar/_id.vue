<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Renovar Alquiler</h3>
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
                      <select name="" id="" class="form-control" v-model="model.precio_id" @change="updateFechaTermino"
                        :disabled="tiempoSeleccionado">
                        <option v-for="m in precios" :value="m.id">{{ m.tiempo }}</option>
                      </select>
                    </div>

                    <div class="form-group col-12">
                      <label for="">Multas</label>
                      <input type="text" v-model="model.nombre" class="form-control" id="">
                    </div>

                    <div class="form-group col-12">
                      <label for="">Apertura</label>
                      <input type="date" v-model="model.apertura" class="form-control" :min="apertura" disabled>
                    </div>

                    <div class="form-group col-12">
                      <label for="">Llaves Extras</label>
                      <input type="text" v-model="model.estado_pago" class="form-control" id="">
                    </div>

                    <div class="form-group col-12">
                      <label for="">Fecha INICIAL</label>
                      <input type="date" v-model="model.ini_fecha" class="form-control" :min="minFecha">
                    </div>

                    <div class="form-group col-12">
                      <label for="">Fecha TERMINO</label>
                      <input type="date" v-model="model.fin_fecha" class="form-control" :min="model.ini_fecha"disabled>
                    </div>
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
  },
  data() {
    return {
      load: true,
      tiempoSeleccionado: false,
      model: {
        nombre: '',
        ini_fecha: '',
        fin_fecha: '',
        cliente_id: '',
        casilla_id: '',
        casilla_estado: '',
        categoria_id: '',
        precio_id: '',
        estado: '',
        apertura: '',
        cajero_id: '',
      },
      apiUrl: "alquileres",
      page: "Alquileres",
      modulo: "AGBC",
      clientes: [],
      casillas: [],
      categorias: [],
      precios: [],
      user: {
        cajero: []
      },
    };
  },
  methods: {
    async updateCategoria() {
      const selectedCasilla = this.casillas.find(casilla => casilla.id === this.model.casilla_id);
      if (selectedCasilla) {
        this.model.categoria_id = selectedCasilla.categoria_id;
        this.precios = this.precios.filter(precio => precio.categoria_id === this.model.categoria_id);
        this.tiemposFiltrados = this.precios.map(precio => precio.tiempo);
      }
    },
    updateFechaTermino() {
      const selectedPrecio = this.precios.find(precio => precio.id === this.model.precio_id);
      if (selectedPrecio) {
        const tiempo = selectedPrecio.tiempo;
        const [cantidad, unidad] = tiempo.split(" ");
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
        }
        const year = String(fechaFin.getFullYear()).padStart(2, '0');
        const month = String(fechaFin.getMonth() + 1).padStart(2, '0');
        const day = String(fechaFin.getDate() + 1).padStart(2, '0');
        this.model.fin_fecha = `${year}-${month}-${day}`;
        this.tiempoSeleccionado = true;
      }
    },
    updateTiemposBySize() {
      if (this.model.categoria_id === 'ID_TU_TAMAÑO_PEQUEÑA') {
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Pequeña')).map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_MEDIANA') {
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Mediana')).map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_GABETA') {
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Gabeta')).map(precio => precio.tiempo);
      } else if (this.model.categoria_id === 'ID_TU_TAMAÑO_CAJON') {
        this.tiemposFiltrados = this.precios.filter(precio => precio.tiempo.includes('Cajon')).map(precio => precio.tiempo);
      } else {
        this.tiemposFiltrados = this.precios.map(precio => precio.tiempo);
      }
    },
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  computed: {
    minFecha() {
      return this.getCurrentDate();
    }
  },
  mounted() {
    this.$nextTick(async () => {
      let user = localStorage.getItem('userAuth');
      this.user = JSON.parse(user);
      this.model.cajero_id = this.user.cajero.id;
      try {
        await Promise.all([
          this.GET_DATA(this.apiUrl + "/" + this.$route.params.id),
          this.GET_DATA('clientes'),
          this.GET_DATA('casillas'),
          this.GET_DATA('categorias'),
          this.GET_DATA('precios'),
        ]).then((v) => {
          this.model = v[0];
          this.clientes = v[1];
          this.casillas = v[2];
          this.categorias = v[3];
          this.precios = v[4];
          this.model.precio_id = null;
          this.model.apertura = this.getCurrentDate();
          this.updateFechaTermino();
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    });
  }
};
</script>
