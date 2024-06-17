<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
    id="sidenav-main">
    <div class="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item mt-3">
          <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
            AGBC
          </h6>
        </li>

        <li class="nav-item">
          <a @click="handleItemClick('admin')" data-bs-toggle="collapse" href="#perfil-admin" class="nav-link"
            aria-controls="configuracion-admin" role="button" aria-expanded="false">
            <div
              class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2">
              <i v-if="role === 'admin'" class="fas fa-user blue-icon"></i>
            </div>
            <span class="nav-link-text ms-1">Ventanilla</span>
          </a>
          <div class="collapse" id="perfil-admin">
            <ul class="nav ms-4 ps-3">



              <li class="nav-item">
                <nuxtLink class="nav-link" to="/">
                  <span class="sidenav-mini-icon"> Dashboard </span>
                  <span class="sidenav-normal"> Dashboard </span>
                </nuxtLink>
              </li>

            <li class="nav-item">
                <nuxtLink class="nav-link" to="/llaves/llave">
                  <span class="sidenav-mini-icon"> llaves </span>
                  <span class="sidenav-normal"> llaves </span>
                </nuxtLink>
              </li>
              <li class="nav-item">
                <nuxtLink class="nav-link" to="/clientes/cliente">
                  <span class="sidenav-mini-icon"> clientes </span>
                  <span class="sidenav-normal"> clientes </span>
                </nuxtLink>
              </li>

              <li class="nav-item">
                <nuxtLink class="nav-link" to="/casillas/casilla">
                  <span class="sidenav-mini-icon"> Crear casillas </span>
                  <span class="sidenav-normal">Crear casillas </span>
                </nuxtLink>
              </li>

              <li class="nav-item">
                <nuxtLink class="nav-link" to="/casillas2/casilla2">
                  <span class="sidenav-mini-icon"> casillas </span>
                  <span class="sidenav-normal"> casillas </span>
                </nuxtLink>
              </li>

              <li class="nav-item">
                <nuxtLink class="nav-link" to="/alquileres/alquilere">
                  <span class="sidenav-mini-icon"> alquileres </span>
                  <span class="sidenav-normal"> alquileres </span>
                </nuxtLink>
              </li>
              <!-- <li class="nav-item">
                   <nuxtLink
                     class="nav-link"
                     to="/ubicaciones/ubicacion"
                   >
                     <span class="sidenav-mini-icon"> Ubicacion </span>
                     <span class="sidenav-normal"> Ubicacion </span>
                   </nuxtLink>
                 </li> -->
            </ul>
          </div>

        </li>







      </ul>
    </div>



  </aside>
</template>
<style scoped>
.blue-icon {
  color: blue;
  /* Set the desired color */
}
</style>

<script>
export default {
  data() {
    return {
      role: '', // Initialize the role data property
    };
  },
  methods: {
    handleItemClick(role) {
      this.role = role; // Update the role property when a menu item is clicked
      console.log(`Clicked on ${role}`);
    },
  },
};
</script>