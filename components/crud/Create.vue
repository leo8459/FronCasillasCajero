<template>
  <div>
    <JcLoader :load="load"></JcLoader>

      <div class="row">
        <div class="col-12">
          <slot name="body">

          </slot>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-6">
          <button class="btn btn-info w-100" @click="$router.back()">
            Regresar
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-dark w-100" @click="Save()">
            Guardar
          </button>
        </div>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
export default {

  props:{
    model:{
      type:Object,
      default:()=>{}
    },
    apiUrl:{
      type:String,
      default:''
    }

  },
  data() {
    return {
      load: false,

    };
  },
  methods: {
    async Save() {
  this.load = true;
  try {
    this.$swal.fire({
      title: 'Enviando mensaje...',
      text: 'Por favor espera mientras se guarda y se envía el correo de reserva.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const res = await this.$api.$post(this.apiUrl, this.model);
    console.log(res);

    this.$swal.fire({
      title: "Guardado!",
      text: "Reserva realizada y correo enviado con éxito.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        this.$router.back();
      }
    });

  } catch (e) {
    console.error(e);
    this.$swal.fire({
      title: "Error",
      text: "Ocurrió un problema al guardar la reserva.",
      icon: "error"
    });
  } finally {
    this.load = false;
  }
}
,
  },
  mounted() {
    this.$nextTick(async () => {
      try {
      } catch (e) {
        console.log(e);
      } finally {
      }
    });
  },
};
</script>
