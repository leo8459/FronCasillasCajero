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
                      <label for="">Llaves</label>
                      <select name="" id="" class="form-control" v-model="model.llaves_id">
                        <option v-for="m in llaves" :value="m.id">{{ m.nombre }}</option>
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
        categoria_id: '',
        seccione_id: '',
        estado: ''


      },
      apiUrl: 'casillas',
      page: 'Casillas',
      modulo: 'AGBC',
      load: true,
      categorias:[],
      secciones:[],
    }

  },

  methods: {
    async GET_DATA(path) {
            const res = await this.$api.$get(path);
            return res
        },

  },
  mounted() {
    this.$nextTick(async () => {
          try{
            await Promise.all([this.GET_DATA('categorias'),this.GET_DATA('secciones'),this.GET_DATA('llaves')]).then((v)=>{
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
          }catch(e){
            console.log(e);
          }finally{
            this.load = false
          }

        });
  },

}
</script>
