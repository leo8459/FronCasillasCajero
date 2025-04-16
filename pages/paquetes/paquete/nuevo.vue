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
                    <div class="form-group col-12">
                      <label for="">Codigo de Casilla</label>
                      <input type="text" v-model="model.nombre" class="form-control" id="">
                    </div>
                    
                    <div class="form-group col-12">
                      <label for="">Categorias</label>
                      <select name="" id="" class="form-control" v-model="model.categoria_id">
                        <option v-for="m in categorias" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>

                    <div class="form-group col-12">
                      <label for="">Secciones</label>
                      <select name="" id="" class="form-control" v-model="model.seccione_id">
                        <option v-for="m in secciones" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
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
                    <div class="form-group col-12">
                      <label for="">Llaves</label>
                      <v-select 
                        :options="llaves" 
                        v-model="model.llaves_id" 
                        label="nombre" 
                        :reduce="llave => llave.id"
                        placeholder="Seleccione o escriba una llave"
                      ></v-select>
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
        nombre: '',
        categoria_id: '',
        seccione_id: '',
        llaves_id: '',
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
        await Promise.all([this.GET_DATA('categorias'), this.GET_DATA('secciones'), this.GET_DATA('llaves')]).then((v) => {
          this.categorias = v[0];
          this.secciones = v[1];
          this.llaves = v[2];
          if (this.categorias.length) {
            this.model.categoria_id = this.categorias[0].id
          }
          if (this.secciones.length) {
            this.model.seccione_id = this.secciones[0].id










          }
          if (this.llaves.length) {
            this.model.llaves_id = this.llaves[0].id
          }

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
