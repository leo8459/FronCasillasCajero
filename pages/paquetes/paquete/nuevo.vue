<template>
  <div>
    <JcLoader :load="load"></JcLoader>

    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Agregar Paquete</h3>
              </div>
              <div class="card-body">
                <CrudCreate :model="model" :apiUrl="apiUrl">
                  <div slot="body" class="row">
                    <div class="form-group col-12">
                      <label for="">Codigo de Paquete</label>
                      <input type="text" v-model="model.codigo" class="form-control" id="codigo">
                    </div>
                    
                    <!-- <div class="form-group col-12">
                      <label for="">Casilla</label>
                      <select name="" id="" class="form-control" v-model="model.alquilere_id" @change="updateCategoria"
                        disabled>
                        <option v-for="m in alquileres" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div> -->

                 
                    <div class="form-group col-12">
                      <label for="departamento">Departamento</label>
                      <select v-model="model.departamento" class="form-control" id="departamento">
                        <option value="LPB">La Paz (LPB)</option>
                        <option value="SRZ">Santa Cruz (SRZ)</option>
                        <option value="CBB">Cochabamba (CBB)</option>
                        <option value="ORU">Oruro (ORU)</option>
                        <option value="PTI">Potosí (PTI)</option>
                        <option value="TJA">Tarija (TJA)</option>
                        <option value="SRE">Sucre (SRE)</option>
                        <option value="BEN">Trinidad (TDD)</option>
                        <option value="CIJ">Cobija (CIJ)</option>
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      model: {
        codigo: '',
        fecha: '',
        alquilere_id: '',
        departamento: '',
      },
      apiUrl: 'paquetes',
      page: 'Casillas',
      modulo: 'AGBC',
      load: true,
      categorias: [],
      secciones: [],
      llaves: [],
    };
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA('alquileres')]).then((v) => {
          this.alquileres = v[0];


        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false
      }

    });
  },
};
</script>
