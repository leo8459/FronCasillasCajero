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
                      <label for="">Multas</label>
                      <input type="text" v-model="model.nombre" class="form-control" id="">
                    </div>


                   

                    <div class="form-group col-12">
                      <label for="">Llaves Extras</label>
                      <input type="text" v-model="model.estado_pago" class="form-control" id="">
                    </div>

                    <div class="form-group col-6">
                      <label for="">Estado de Casilla</label>
                      <select v-model="model.casilla_estado" class="form-control">
                        <option value="4">Vencido</option>
                        <option value="3">Mantenimiento</option>
                        <option value="2">Con Correspondecia</option>
                        <option value="1">Libre</option>
                        <option value="0">Ocupado</option>
                      </select>
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
    ;
  },
  data() {
    return {
      load: true,

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
      modulo: "AGBC",
      clientes: [],
      casillas: [],
      categorias: [],
      precios: [],


    };
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res
    },

  },
  mounted() {
    this.$nextTick(async () => {

      try {
        await Promise.all([this.GET_DATA(this.apiUrl + "/" + this.$route.params.id), this.GET_DATA('casillas')]).then((v) => {
          this.model = v[0];
          this.casillas = v[1];

          // if (this.clientes.length) {
          //   this.model.cliente_id = this.clientes[0].id
          // }
          // if (this.casillas.length) {
          //   this.model.casilla_id = this.casillas[0].id
          // }
          // if (this.categorias.length) {
          //   this.model.categoria_id = this.categorias[0].id
          // }
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