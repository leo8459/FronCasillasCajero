<template>
  <main class="main-content mt-0 ps">
    <section>
      <div class="page-header min-vh-100 d-flex">
        <!-- Imagen en la mitad izquierda -->
        <div class="col-6 d-flex align-items-center justify-content-center p-0">
          <img ref="image" src="@/pages/auth/img/mediana.jpg" alt="Logo" class="img-fluid w-100 h-100 rounded shadow-lg">
        </div>
        <!-- Formulario de inicio de sesión en la mitad derecha -->
        <div class="col-6 d-flex align-items-center justify-content-center">
          <div class="container">
            <div class="row justify-content-center">
              <div ref="formContainer" class="col-xl-8 col-lg-10 col-md-12 d-flex flex-column">
                <div class="card card-plain mt-8 shadow-lg rounded bg-white">
                  <div class="card-header pb-0 text-start">
                    <h3 ref="typingTitle" class="font-weight-bolder text-info text-gradient typing">
                      Sistema de Casillas AGBC
                    </h3>
                    <p ref="typingSubtitle" class="mb-0 typing">Ingresa tu email y tu password para iniciar.</p>
                  </div>
                  <div ref="formBody" class="card-body" style="opacity: 0;">
                    <div role="form" class="text-start">
                      <label>Email</label>
                      <div class="mb-3">
                        <input type="text" v-model="model.email" class="form-control rounded shadow-sm" placeholder="Email" aria-label="Email" />
                      </div>
                      <label>Password</label>
                      <div class="mb-3">
                        <input type="password" v-model="model.password" class="form-control rounded shadow-sm" placeholder="Password" aria-label="Password" />
                      </div>
                      <div class="text-center">
                        <button type="button" class="btn bg-gradient-info w-100 mt-4 mb-0 rounded shadow" @click="Login()">
                          Ingresar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main-content {
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.page-header {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.img-fluid {
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.typing {
  overflow: hidden;
  border-right: .15em solid rgb(0, 21, 255);
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .15em;
  animation:
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}

.fade-in {
  opacity: 0;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.card {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.form-control {
  border-radius: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn {
  border-radius: 25px;
}
</style>

<script>
// import anime from 'animejs/lib/anime.es.js';
const anime = require('animejs/lib/anime.js'); // Usando la versión CommonJS de anime.js

export default {
  data() {
    return {
      model: {
        email: '',
        password: ''
      }
    }
  },
  mounted() {
    this.animateImage();
    this.animateText();
  },
  methods: {
    animateImage() {
      anime({
        targets: this.$refs.image,
        scale: [0, 1],
        duration: 2500,
        easing: 'easeInOutExpo'
      });
    },
    animateText() {
      anime({
        targets: [this.$refs.typingTitle, this.$refs.typingSubtitle],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(250, { start: 250 }),
        complete: () => {
          this.$refs.formBody.style.opacity = 1;
          anime({
            targets: this.$refs.formBody,
            opacity: [0, 1],
            duration: 250,
            easing: 'easeInOutExpo'
          });
        }
      });
    },
    redirectToWelcome() {
      this.$router.push('/auth/login');
    },
    async Login() {
      try {
        const res = await this.$api.$post('login3', this.model);
        let user = res
        if (user.hasOwnProperty('errors')) {
          this.$swal
            .fire({
              title: "Credenciales incorrectas",
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "Ok"
            })
        } else {
          localStorage.setItem('userAuth', JSON.stringify(user))
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
        this.$swal
          .fire({
            title: "No se puedo iniciar sesion",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok"
          })
      }
    }
  }
}
</script>
