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
                      <label for="">Numero de Llaves</label>
                      <input type="text" v-model="model.nombre" class="form-control" />
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
      title: "Llaves",
    };
  },
  data() {
    return {
      load: true,
      model: {
        nombre: '',
      },
      apiUrl: "llaves",
      page: "Llaves",
      modulo: "AGBC",
    };
  },
  methods: {
    async GET_DATA(path) {
      try {
        const res = await this.$api.$get(path);
        return res.data; // Asegúrate de que devuelva el objeto de datos directamente
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        const data = await this.GET_DATA(this.apiUrl + '/' + this.$route.params.id);
        this.model = { ...this.model, ...data }; // Asigna el objeto de datos, manteniendo las propiedades existentes
      } catch (e) {
        console.error(e);
      } finally {
        this.load = false;
      }
    });
  },
};
</script>
