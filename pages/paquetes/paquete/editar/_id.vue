<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">

          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Actualizar Casilla</h3>
              </div>
              <div class="card-body">
                <CrudUpdate :model="model" :apiUrl="apiUrl">
                  <div slot="body" class="row">

                    <div class="form-group col-12">
                      <label for="">Nombre</label>
                      <input type="text" v-model="model.nombre" class="form-control" id="">
                    </div>


                    <div class="form-group col-12">
                      <label for="">Secciones</label>
                      <select name="" id="" class="form-control" v-model="model.seccione_id">
                        <option v-for="m in secciones" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>


                    <div class="form-group col-12">
                      <label for="">Tamaño</label>
                      <select name="" id="" class="form-control" v-model="model.categoria_id">
                        <option v-for="m in categorias" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>

                    

                    <div class="form-group col-6">
                      <label for="">Estado de Casilla</label>
                      <select v-model="model.estado" class="form-control">
                        <option value="3">Mantenimiento</option>
                        <option value="2">Con Correspondecia</option>
                        <option value="1">Libre</option>
                        <option value="0">Ocupado</option>
                      </select>
                    </div>
                    <!-- <div class="form-group col-12">
                      <label for="">llaves</label>
                      <select name="" id="" class="form-control" v-model="model.llaves_id">
                        <option v-for="m in llaves" :value="m.id">{{ m.nombre }}</option>
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
      title: "casillas",
    };
    ;
  },
  data() {
    return {
      load: true,

      model: {
        nombre: '',
        categoria_id: '',
        seccione_id: '',
        estado: '',
        llaves: '',

      },
      apiUrl: "casillas",
      page: "Casillas",
      modulo: "AGBC",
      categorias: [],
      secciones: [],
      llaves: [], // Agregar aquí para que se inicialice

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
      const [casillaData, categoriasData, seccionesData, llavesData] = await Promise.all([
        this.GET_DATA(this.apiUrl + '/' + this.$route.params.id),
        this.GET_DATA('categorias'),
        this.GET_DATA('secciones'),
        this.GET_DATA('llaves')
      ]);

      console.log("Casilla Data:", casillaData);
      console.log("Categorias Data:", categoriasData);
      console.log("Secciones Data:", seccionesData);
      console.log("Llaves Data:", llavesData);

      this.model = casillaData;
      this.categorias = categoriasData;
      this.secciones = seccionesData;
      this.llaves = llavesData;
    } catch (e) {
      console.log("Error:", e);
    } finally {
      this.load = false;
    }
  });
}
};
</script>