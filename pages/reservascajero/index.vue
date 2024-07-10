<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row">
          <div class="col-12 mb-3">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Buscar..." v-model="searchQuery">
            </div>
          </div>
          <div class="col-2">
            <nuxt-link :to="url_nuevo" class="btn btn-dark btn-sm w-100">
              <i class="fas fa-plus"></i> Agregar
            </nuxt-link>
          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <thead>
                    <th class="py-0 px-1">#</th>
                    <th class="py-0 px-1">Nombre Completo</th>
                    <th class="py-0 px-1">Carnet</th>
                    <th class="py-0 px-1">Telefono</th>
                    <th class="py-0 px-1">Email</th>
                    <th class="py-0 px-1">Direccion</th>
                    <th class="py-0 px-1">Casilla</th>
                    <th class="py-0 px-1"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, index) in paginatedList" :key="m.id">
                      <td class="py-0 px-1">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                      <td class="py-0 px-1">{{ m.nombre }}</td>
                      <td class="py-0 px-1">{{ m.carnet }}</td>
                      <td class="py-0 px-1">{{ m.telefono }}</td>
                      <td class="py-0 px-1">{{ m.email }}</td>
                      <td class="py-0 px-1">{{ m.direccion }}</td>
                      <td class="py-0 px-1">{{ m.casilla.nombre }}</td>
                      <td class="py-0 px-1">
                        <nuxt-link
                          v-if="m.nombre && m.telefono && m.carnet"
                          :to="{ path: '/clientes/cliente/nuevo', query: { nombre: m.nombre, telefono: m.telefono, carnet: m.carnet,email: m.email,direccion: m.direccion, } }"
                          class="btn btn-dark btn-sm w-35 ">
                          <i class="fas fa-plus"></i> Cliente Nuevo
                        </nuxt-link>
                        <nuxt-link
                          v-if="m.nombre && m.telefono && m.carnet"
                          :to="{ path: '/clientes/cliente/nuevo2', query: { nombre: m.nombre, telefono: m.telefono, carnet: m.carnet,email: m.email,direccion: m.direccion, } }"
                          class="btn btn-dark btn-sm w-35 ">
                          <i class="fas fa-plus"></i> Empresa Nuevo
                        </nuxt-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav aria-label="Page navigation example" class="pagination-container">
                  <ul class="pagination justify-content-start">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li class="page-item" v-for="page in paginationRange" :key="page"
                      :class="{ active: currentPage === page }">
                      <a class="page-link" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
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
  name: "IndexPage",
  head() {
    return {
      title: this.modulo,
    };
  },
  data() {
    return {
      load: true,
      list: [],
      apiUrl: 'reservas',
      page: 'Clientes',
      modulo: 'AGBC',
      url_nuevo: { path: '/clientes/cliente/nuevo' }, // Ajuste aquí para url_nuevo
      url_nuevo2: { path: '/clientes/cliente/nuevo2' }, // Ajuste aquí para url_nuevo
      url_editar: '/clientes/cliente/editar/',
      pageSize: 10,
      currentPage: 1,
      searchQuery: '',
    };
  },
  computed: {
    maxPaginationRange() {
      return 10; // Cambia este número según tu preferencia
    },
    // Rango de páginas que se mostrarán en la paginación
    paginationRange() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      const maxRange = this.maxPaginationRange;
      let startPage = 1;
      let endPage = totalPages;

      if (totalPages > maxRange) {
        const halfRange = Math.floor(maxRange / 2);

        if (currentPage > halfRange) {
          startPage = currentPage - halfRange;
          endPage = currentPage + halfRange;

          if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - maxRange + 1;
          }
        } else {
          startPage = 1;
          endPage = maxRange;
        }
      }

      return Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => startPage + index);
    },
    totalPages() {
      return Math.ceil(this.filteredList.length / this.pageSize);
    },
    filteredList() {
      if (!this.searchQuery) return this.list;
      return this.list.filter(item => {
        return Object.values(item).some(value => {
          return String(value).toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      });
    },
    paginatedList() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredList.slice(startIndex, endIndex);
    }
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async EliminarItem(id) {
      this.load = true;
      try {
        await this.$api.$delete(`${this.apiUrl}/${id}`);
        await this.GET_DATA(this.apiUrl).then((data) => {
          this.list = data;
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    Eliminar(id) {
      let self = this;
      this.$swal.fire({
        title: 'Deseas Eliminar?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await self.EliminarItem(id);
        }
      });
    },
    gotoPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await this.GET_DATA(this.apiUrl).then((data) => {
          this.list = data;
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    });
  },
};
</script>

<style>
.pagination-container {
  margin-top: 20px;
}
</style>
