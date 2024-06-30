<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row">


          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        <strong>Alquileres</strong>
                      </p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">
                        {{ dashboard.alquileres }}
                      </h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-dollar-sign text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        <strong>Users</strong>
                      </p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">
                        {{ dashboard.users }}
                      </h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-user-shield text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        <strong>Clientes</strong>
                      </p>
                      <h5 class="text-danger text-center font-weight-bolder mb-0">
                        {{ dashboard.clientes }}

                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-user text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas
                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.casillas }}

                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Pequeñas
                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.pequeñas }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Pequeñas Ocupadas
                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.pequeñasocupadas }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Pequeñas libres
                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.pequeñaslibres1 }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Medianas

                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.medianas }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Medianas Ocupadas

                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.medianasocupadas }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Medianas libres
                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.medianaslibres }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Cajones

                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.cajones }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Cajones Ocupadas

                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.cajonocupadas }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Cajones libres
                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.cajoneslibres }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Gabetas 

                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.gabetas }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Gabetas Ocupadas

                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.gabetaocupadas }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">
                        Casillas Gabetas libres
                      </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">
                        {{ dashboard.gabetaslibres }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card-body p-3">
            <div class="row">
              <div class="text-center">
                <h6>
                  <span class="font-weight-bold text-blue fs-4">Bienvenido al sistema de</span>
                  <span class="text-color-ganadores fs-4">Recaudacion de Casillas AGBC</span>
                </h6>
              </div>
            </div>
            <div class="row justify-content-center mt-3">
              <img src="/assets/imagenes/logo.png" alt="Logo Casillas AGBC" class="logo-image">
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
  data() {
    return {
      user: {},
      variableInt: null,
      page: "Dashboard",
      modulo: "Dashboard",
      load: false,
      dashboard: {
        alquileres: 10,
        users: 10,
        clientes: 10,
        casillas: 10,
        
      },

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
    // Realiza la llamada a la API y actualiza los datos
    try {
      const data = await this.GET_DATA('/dashboard'); // Ruta correcta del controlador
      this.dashboard.alquileres = data.alquileres;
      this.dashboard.users = data.users;
      this.dashboard.clientes = data.clientes;
      this.dashboard.casillas = data.casillas;
      this.dashboard.precios = data.precios;
      this.dashboard.pequeñas = data.pequeñas;
      this.dashboard.medianas = data.medianas;
      this.dashboard.cajones = data.cajones;
      this.dashboard.gabetas = data.gabetas;
      this.dashboard.pequeñaslibres1 = data.pequeñaslibres1;
      this.dashboard.medianaslibres = data.medianaslibres;
      this.dashboard.gabetaslibres = data.gabetaslibres;
      this.dashboard.cajoneslibres = data.cajoneslibres;
      this.dashboard.categorias = data.categorias; // Asigna las categorías obtenidas
      this.dashboard.pequeñasocupadas = data.pequeñasocupadas;
      this.dashboard.medianasocupadas = data.medianasocupadas;
      this.dashboard.gabetaocupadas = data.gabetaocupadas;
      this.dashboard.cajonocupadas = data.cajonocupadas;
      
      // Obtener el total de casillas sin importar su estado
      const totalCasillas = data.pequeñas + data.medianas + data.cajones + data.gabetas;
      this.dashboard.casillas = totalCasillas;

    } catch (error) {
      console.error("Error al obtener datos del servidor:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  });
},


};
</script>



<style scoped>
.logo-image {
  width: 100%;
  /* Hace que la imagen ocupe todo el ancho disponible */
  height: auto;
  /* Ajusta la altura automáticamente para mantener la proporción original */
  object-fit: cover;
  /* Ajusta la forma en que la imagen se ajusta dentro del contenedor */
}

.fs-4 {
  font-size: 1.5rem;
  /* Cambia el tamaño según tus preferencias */
}

.ganador-image {
  width: 100px;
  /* Cambia el ancho según tus preferencias */
  height: 100px;
  /* Cambia la altura según tus preferencias */
  object-fit: cover;
  /* Ajusta la forma en que la imagen se ajusta dentro del contenedor */
}
</style>
