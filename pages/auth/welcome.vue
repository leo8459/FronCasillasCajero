<template>
    <div class="landing-page">
      <header class="main-header">
        <div class="logo">
          <img src="../auth/img/logo.png" alt="Logo de la Empresa" />
        </div>
        <div class="spacer"></div>
        <div class="login-btn">
          <router-link to="/auth/login" class="btn btn-link">Iniciar sesión</router-link>
        </div>
      </header>
      <header class="hero-section">
        <div class="hero-content">
          <h1>Bienvenido a servicio de casillas de la AGBC</h1>
          <p>Una opción segura y confiable para recibir correspondencia y paquetes. Al registrarte, te asignan una
            dirección de casilla con tu nombre y un número específico. Ofrece diferentes tamaños de casillas y servicios
            adicionales como consolidación de paquetes. Los costos varían según el tamaño y duración del
            contrato. Es recomendable verificar los precios actualizados directamente en la oficina.</p>
        </div>
        <div class="hero-image">
          <img src="../auth/img/casillas1.jpg" alt="Imagen de fondo" />
        </div>
      </header>
  
      <section class="features-section">
        <div class="feature" style="border: 5px solid #B99C46;">
          <img src="../auth/img/pequeña.jpg" alt="Característica 1" />
          <h2 class="animated-text">Casilla Pequeña</h2>
          <p class="animated-text">Precio 1 mes 35Bs</p>
          <p class="animated-text">Precio 6 meses 126Bs</p>
          <p class="animated-text">Precio 1 año 210Bs</p>
        </div>
        <div class="feature" style="border: 5px solid #B99C46;">
          <img src="../auth/img/mediana.jpg" alt="Característica 2" />
          <h2 class="animated-text">Casilla Mediana</h2>
          <p class="animated-text">Precio 1 mes 49 Bs</p>
          <p class="animated-text">Precio 6 meses 175 Bs</p>
          <p class="animated-text">Precio 1 año 294 Bs</p>
        </div>
        <div class="feature" style="border: 5px solid #B99C46;">
          <img src="../auth/img/gabeta.jpg" alt="Característica 3" />
          <h2 class="animated-text">Casilla Gabeta</h2>
          <p class="animated-text">Precio 1 mes 70 Bs</p>
          <p class="animated-text">Precio 6 meses 250 Bs</p>
          <p class="animated-text">Precio 1 año 420 Bs</p>
        </div>
        <div class="feature" style="border: 5px solid #B99C46;">
          <img src="../auth/img/cajon.jpg" alt="Característica 3" />
          <h2 class="animated-text">Casilla Cajon</h2>
          <p class="animated-text">Precio 1 mes 84 Bs</p>
          <p class="animated-text">Precio 6 meses 300 Bs</p>
          <p class="animated-text">Precio 1 año 504 Bs</p>
        </div>
      </section>
  
      <section class="cta-section">
        <div class="cta-content">
          <h2 style="color: #B99C46;">¿Listo para empezar?</h2>
          <p style="color: #B99C46;">REQUISITOS PARA ADQUIRIR TU CASILLA</p>
          <p style="color: #B99C46;">- Fotocopia de CI Actualizado. (Persona Natural y/o Jurídica)</p>
          <p style="color: #B99C46;">- Fotocopia de NIT. (Solo Persona Jurídica)</p>
          <p style="color: #B99C46;">- Fotocopia de Luz o Agua.</p>
        </div>
      </section>
  
      <footer class="footer">
        <div class="footer-content">
          <p>&copy; #EstamosSaliendoAdelante #RumboalBicentenario
  
            © 2023 Todos los derechos reservados - Agencia Boliviana de Correos
  
            Contacto: (591-2) 2152423 - Av. Mariscal Santa Cruz Esq. C. Oruro Edif. Telecomunicaciones -
            agbc@correos.gob.bo </p>
        </div>
      </footer>
    </div>
  </template>
  
  <style scoped>
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  
  .animated-text {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 1.5s steps(40) 1s forwards;
  }
  
  .main-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: rgba(52, 68, 124, 0.9); /* Fondo azul marino semi-transparente */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #fff;
  }
  
  .logo img {
    width: 100px;
    height: auto;
  }
  
  .spacer {
    flex: 1;
  }
  
  .login-btn .btn {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #3498db;
    color: #fff;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .login-btn .btn:hover {
    background-color: #2980b9;
  }
  
  .landing-page {
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #f8f8f8;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
  }
  
  .hero-content {
    flex: 1;
    max-width: 50%;
    text-align: left;
  }
  
  .hero-content h1 {
    font-size: 2.5em;
    margin-bottom: 15px;
  }
  
  .hero-content p {
    font-size: 1.2em;
    color: #666;
    margin-bottom: 25px;
  }
  
  .hero-image {
    flex: 1;
    max-width: 50%;
    border-radius: 15px;
    overflow: hidden;
  }
  
  .hero-image img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }
  
  .features-section {
    display: flex;
    justify-content: space-around;
    padding: 50px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
  }
  
  .feature {
    text-align: center;
    max-width: 30%;
    padding: 20px;
    border-radius: 12px;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .feature:hover {
    transform: translateY(-5px);
  }
  
  .feature img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: 15px;
  }
  
  .feature h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .feature p {
    color: #666;
  }
  
  .cta-section {
    text-align: center;
    padding: 50px;
    background-color: #34447C;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
  }
  
  .cta-content h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .cta-content p {
    font-size: 1.2em;
    color: #666;
    margin-bottom: 30px;
  }
  
  .footer {
    text-align: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  </style>
  