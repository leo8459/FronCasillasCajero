<template>
  <div>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Agregar</h3>
              </div>
              <div class="card-body">
                <CrudCreate :model="model" :apiUrl="apiUrl">
                  <div slot="body" class="row">
                    <div class="form-group col-12">
                      <label for="">Nombre Completo</label>
                      <input type="text" name="" v-model="model.nombre" class="form-control" id="" />
                    </div>

                    <div class="form-group col-12">
                      <label for="">email</label>
                      <input type="text" name="" v-model="model.email" class="form-control" id="" />
                    </div>

                    <div class="form-group col-12">
                      <label for="">password</label>
                      <input type="text" name="" v-model="model.password" class="form-control" id="" />
                    </div>

                    <div class="form-group col-12">
                      <label for="">carnet</label>
                      <input type="text" name="" v-model="model.carnet" class="form-control" id="" />
                    </div>

                    <div class="form-group col-12">
                      <label for="">Direccion</label>
                      <input type="text" name="" v-model="model.direccion" class="form-control" id="" />
                    </div>

                    <div class="form-group col-12">
                      <label for="">telefono</label>
                      <input type="text" name="" v-model="model.telefono" class="form-control" id="" />
                    </div>

                    <label for="requisitos">Requisitos</label>

                    <!-- Combo List Styled as Checkboxes -->
                    <div class="form-group col-12">
                      <div class="form-check d-flex justify-content-between">
                        <label for="facturaAgua" class="form-check-label">Factura de Agua</label>
                        <input type="radio" id="facturaAgua" v-model="model.factura" value="agua" class="form-check-input">
                      </div>  
                      <div class="form-check d-flex justify-content-between">
                        <label for="facturaLuz" class="form-check-label">Factura de Luz</label>
                        <input type="radio" id="facturaLuz" v-model="model.factura" value="luz" class="form-check-input">
                      </div>
                    </div>
                    <!-- End of Combo List Styled as Checkboxes -->

                    <!-- Checklists -->
                    <div class="form-group col-12">

                      <div class="form-check d-flex justify-content-between">
                        <label for="carnetValido" class="form-check-label">Carnet</label>
                        <input type="radio" id="carnetValido" v-model="model.carnetValido" class="form-check-input" />
                      </div>
                    </div>
                    <!-- End of Checklists -->
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
        password: '',
        carnet: '',
        direccion: '',
        telefono: '',
        estado: '',
        habilitacionCasilla: false,
        factura: '', // Nuevo campo para el combo list
        carnetValido: false
      },
      apiUrl: 'clientes',
      page: 'clientes',
      modulo: 'AGBC',
      load: true,
    }
  },
  methods: {},
  mounted() {},
}
</script>
