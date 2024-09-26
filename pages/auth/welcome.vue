<template>
  <div class="landing-page">
    <header class="main-header">
      <div class="logo">
        <img src="../auth/img/AGBClogo.png" alt="Logo de la Empresa" />
      </div>
      <div class="spacer"></div>
      <div class="login-btn">
        <router-link to="/auth/login" class="btn btn-link">Iniciar sesión</router-link>
      </div>
    </header>

    <section class="hero-section">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Bienvenido a servicio de casillas de la AGBC</h1>
        <p class="hero-subtitle">Una opción segura y confiable para recibir correspondencia y paquetes.</p>
        <p class="hero-description">
          Al registrarte, te asignan una dirección de casilla con tu nombre y un número específico. Ofrece diferentes
          tamaños de casillas y servicios adicionales como consolidación de paquetes. Los costos varían según el tamaño
          y duración del contrato. Es recomendable verificar los precios actualizados directamente en la oficina.
        </p>

        <!-- Buscador de Casillas -->
        <div class="search-container">
          <!-- Campo de entrada para ingresar el ID o nombre de la casilla -->
          <input v-model="casilla_id" type="text" placeholder="Ingrese su número de casilla" class="search-input">

          <!-- Botón para iniciar la búsqueda -->
          <button @click="buscarCasilla" class="search-btn">Buscar Casilla</button>
        </div>

        <div class="cta-buttons">
          <router-link to="/auth/" class="btn btn-primary">Reserva tu casilla</router-link>
        </div>
      </div>
    </section>

    <section class="features-section">
      <h2 class="section-title">Precios y Tamaños</h2>
      <div class="features-container">
        <div class="feature">
          <img src="../auth/img/pequeña.jpg" alt="Característica 1" />
          <h2 class="animated-text">Casilla Pequeña</h2>
          <p class="animated-text">Precio 1 mes 35Bs</p>
          <p class="animated-text">Precio 6 meses 126Bs</p>
          <p class="animated-text">Precio 1 año 210Bs</p>
        </div>
        <div class="feature">
          <img src="../auth/img/mediana.jpg" alt="Característica 2" />
          <h2 class="animated-text">Casilla Mediana</h2>
          <p class="animated-text">Precio 1 mes 49 Bs</p>
          <p class="animated-text">Precio 6 meses 175 Bs</p>
          <p class="animated-text">Precio 1 año 294 Bs</p>
        </div>
        <div class="feature">
          <img src="../auth/img/gabeta.jpg" alt="Característica 3" />
          <h2 class="animated-text">Casilla Gabeta</h2>
          <p class="animated-text">Precio 1 mes 70 Bs</p>
          <p class="animated-text">Precio 6 meses 250 Bs</p>
          <p class="animated-text">Precio 1 año 420 Bs</p>
        </div>
        <div class="feature">
          <img src="../auth/img/cajon.jpg" alt="Característica 3" />
          <h2 class="animated-text">Casilla Cajon</h2>
          <p class="animated-text">Precio 1 mes 84 Bs</p>
          <p class="animated-text">Precio 6 meses 300 Bs</p>
          <p class="animated-text">Precio 1 año 504 Bs</p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2 style="color: #fff;">¿Listo para empezar?</h2>
        <p style="color: #fff;">REQUISITOS PARA ADQUIRIR TU CASILLA</p>
        <p style="color: #fff;">- Fotocopia de CI Actualizado. (Persona Natural y/o Jurídica)</p>
        <p style="color: #fff;">- Fotocopia de NIT. (Solo Persona Jurídica)</p>
        <p style="color: #fff;">- Fotocopia de Luz o Agua.</p>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <p>&copy; #EstamosSaliendoAdelante #RumboalBicentenario
          <br>
          © 2023 Todos los derechos reservados - Agencia Boliviana de Correos
          <br>
          Contacto: (591-2) 2152423 - Av. Mariscal Santa Cruz Esq. C. Oruro Edif. Telecomunicaciones -
          agbc@correos.gob.bo
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      casilla_id: '', // Almacena el ID o nombre de la casilla ingresado por el usuario
      estadoCasilla: '', // Almacena el estado de la casilla después de la búsqueda
      paquetes: [], // Almacena los códigos de paquetes asociados

    };
  },
  methods: {
    async buscarCasilla() {
      try {
        // Realiza una solicitud al backend para buscar la casilla por su ID o nombre
        const response = await this.$api.get(`/buscar-casilla/${this.casilla_id}`);
        console.log(response.data); // Revisa si aquí se está devolviendo el estado correcto

        if (response.data.success) {
          this.estadoCasilla = this.obtenerEstado(response.data.estado_casilla);
          this.paquetes = response.data.paquetes; // Guarda los códigos de los paquetes asociados al alquiler
          this.mostrarEstado(); // Llama a la función para mostrar el estado en SweetAlert2
        } else {
          this.mostrarError(response.data.message); // Llama a la función para mostrar el error en SweetAlert2
        }
      } catch (error) {
        console.error('Error al buscar la casilla:', error);
        this.mostrarError('Ocurrió un error al realizar la búsqueda. Intenta nuevamente.');
      }
    },
    obtenerEstado(estado) {
      // Función que devuelve el estado de la casilla en texto
      switch (estado) {
        case 0:
          return 'Ocupada';
        case 1:
          return 'Libre';
        case 2:
          return 'Con Correspondencia';
        case 3:
          return 'En Mantenimiento';
        case 4:
          return 'Vencida';
        case 5:
          return 'Reservada';
        default:
          return 'Desconocido';
      }
    },
    mostrarEstado() {
      // Generar el texto de los paquetes
      const paquetesText = this.paquetes.length > 0 ? this.paquetes.join(', ') : 'No hay paquetes asociados.';

      // Función para mostrar el estado de la casilla en SweetAlert2
      Swal.fire({
        title: 'Estado de tu casilla',
        text: `El número de casilla: ${this.casilla_id} está en estado: ${this.estadoCasilla}. Paquetes asociados: ${paquetesText}.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    },
    mostrarError(mensaje) {
      // Función para mostrar un error en SweetAlert2
      Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
};
</script>

<style scoped>
.landing-page {
  font-family: 'Arial', sans-serif;
  color: #fff;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: transparent;
  position: absolute;
  width: 100%;
  z-index: 1000;
}

.logo img {
  width: 60px;
  height: auto;
}

.spacer {
  flex: 1;
}

.login-btn .btn {
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #fff;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.login-btn .btn:hover {
  background-color: #fff;
  color: #000;
}

.hero-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../auth/img/monito.gif');
  /* Actualiza la ruta a la imagen */
  background-size: cover;
  background-position: center;
  text-align: center;
  color: #fff;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  padding: 20px;
}

.hero-title {
  font-size: 3em;
  margin-bottom: 20px;
  color: #ffffff;
  /* Cambia este valor por el color que desees */
}

.hero-subtitle {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.cta-buttons .btn-primary {
  padding: 15px 30px;
  border-radius: 5px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-buttons .btn-primary:hover {
  background-color: #2980b9;
}
.cta-buttons {
  margin-top: 20px; /* Add some margin to move the button down */
}

.features-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #fff;
  border-radius: 50px;
  margin-bottom: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.features-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.section-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 40px;
  color: #000;
}

.feature {
  text-align: center;
  width: 23%;
  padding: 20px;
  border-radius: 50px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  border: 5px solid #B99C46;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature img {
  width: 100%;
  height: auto;
  border-radius: 50px;
  margin-bottom: 15px;
}

.feature h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.feature p {
  color: #666;
}

.animated-text {
  animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
  white-space: nowrap;
  overflow: hidden;
  border-right: 4px solid;
}

@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

@keyframes blink-caret {

  from,
  to {
    border-color: transparent
  }

  50% {
    border-color: black;
  }
}

.cta-section {
  text-align: center;
  padding: 50px;
  background-color: #34447C;
  border-radius: 50px;
  margin-bottom: 40px;
  color: #fff;
}

.cta-content h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: #34447C;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  color: #fff;
}

.footer-content p {
  margin: 0;
}

.cta-btn .btn {
  padding: 15px 30px;
  border-radius: 20px;
  background-color: #B99C46;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-btn .btn:hover {
  background-color: #A6802D;
}

.nav-link {
  margin: 0 15px;
  color: #fff;
  text-decoration: none;
  font-size: 1em;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #B99C46;
}

/* Estilos del contenedor de búsqueda */
.search-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.search-input {
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ccc;
  font-size: 1.2em;
}

.search-btn {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #3498db;
  color: #fff;
  border: none;
  margin-left: 10px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #2980b9;
}
</style>
