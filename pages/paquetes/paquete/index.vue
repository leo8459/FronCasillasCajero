<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Buscar..." v-model="searchQuery" @input="filterList">
        </div>
        <div class="row justify-content-end">
          <div class="col-2">
            <nuxtLink :to="url_nuevo" class="btn btn-dark btn-sm w-100">
              <i class="fas fa-plus"></i> Agregar
            </nuxtLink>
            <button class="btn btn-primary" @click="generarPDF">Generar PDF</button>

          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <thead>
                    <th class="py-0 px-1">#</th>
                    <th class="py-0 px-1">Codigo</th>
                    <th class="py-0 px-1">Fecha</th>
                    <th class="py-0 px-1">Departamento</th>
                    <th class="py-0 px-1">Alquiler</th>
                    <!-- <th class="py-0 px-1">llaves</th> -->
                    <th class="py-0 px-1"></th>
                  </thead>
                  <tbody>
  <tr v-for="(m, index) in paginatedList" :key="index">
    <td class="py-0 px-1">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
    <td class="py-0 px-1">{{ m.codigo ? m.codigo : 'S/N' }}</td>
    <td class="py-0 px-1">{{ m.fecha ? m.fecha : 'S/N' }}</td>
    <td class="py-0 px-1">{{ m.departamento ? m.departamento : 'S/N' }}</td>
    <!-- Uso del operador opcional para evitar errores si alquilere o nombre son null -->
    <td class="py-0 px-1">{{ m.alquilere?.nombre ? m.alquilere.nombre : 'S/N' }}</td>
    <td class="py-0 px-1">
      <div class="btn-group">
        <nuxtLink :to="url_editar + m.id" class="btn btn-info btn-sm py-1 px-2">
          <i class="fas fa-pen"></i>
        </nuxtLink>
        <button type="button" @click="Eliminar(m.id)" class="btn btn-danger btn-sm py-1 px-2">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  </tr>
</tbody>


                </table>
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-between">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="prevPage()">
                        <</button>
                    </li>
                    <li class="page-item" v-for="page in displayedPageNumbers" :key="page"
                      :class="{ active: currentPage === page }">
                      <button class="page-link" @click="gotoPage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPage }">
                      <button class="page-link" @click="nextPage()">></button>
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: "IndexPage",
  data() {
    return {
      load: true,
      list: [],
      apiUrl: 'paquetes',
      page: 'Paquetes',
      modulo: 'AGBC',
      url_nuevo: '/paquetes/paquete/nuevo',
      url_editar: '/paquetes/paquete/editar/',
      currentPage: 1,
      pageSize: 10,
      user: {
        cartero: []//recuperar usuario
      },
      maxPageNumbers: 10, // Define el máximo número de números de página a mostrar
      searchQuery: '' // Consulta de búsqueda

    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.list.length / this.pageSize);
    },
    paginatedList() {
    const filteredList = this.list.filter(item => {
      return (
        (item.codigo ? item.codigo.toLowerCase().includes(this.searchQuery.toLowerCase()) : 'S/N') ||
        (item.fecha ? item.fecha.toLowerCase().includes(this.searchQuery.toLowerCase()) : 'S/N') ||
        (item.departamento ? item.departamento.toLowerCase().includes(this.searchQuery.toLowerCase()) : 'S/N') ||
        (item.alquilere?.nombre ? item.alquilere.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) : 'S/N')
      );
    });

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredList.slice(startIndex, endIndex);
  },

    displayedPageNumbers() {
      const totalPages = this.totalPage;
      const currentPage = this.currentPage;
      const maxPageNumbers = this.maxPageNumbers;
      let startPage, endPage;

      if (totalPages <= maxPageNumbers) {
        // Si el número total de páginas es menor o igual al máximo de números de página a mostrar,
        // muestra todas las páginas disponibles.
        startPage = 1;
        endPage = totalPages;
      } else {
        // Si hay más páginas disponibles que el máximo de números de página a mostrar,
        // calcula el rango de páginas a mostrar alrededor de la página actual.
        const halfMaxPages = Math.floor(maxPageNumbers / 2);
        if (currentPage <= halfMaxPages) {
          startPage = 1;
          endPage = maxPageNumbers;
        } else if (currentPage + halfMaxPages >= totalPages) {
          startPage = totalPages - maxPageNumbers + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - halfMaxPages;
          endPage = currentPage + halfMaxPages;
        }
      }

      return Array(endPage - startPage + 1).fill().map((_, index) => startPage + index);
    }
  },
  methods: {
    generarPDF() {
      const doc = new jsPDF();
      let y = 10;
      const data = this.list.map((item, index) => [
        (this.currentPage - 1) * this.pageSize + index + 1,
        item.nombre,
        item.categoria.nombre,
        item.seccione.nombre,
        this.getEstadoText(item.estado)
      ]);

      doc.text('Reporte de Casillas', 10, y);
      y += 10;

      doc.autoTable({
        startY: y,
        head: [['#', 'Codigo Casilla', 'Categoria', 'Seccion', 'Estado']],
        body: data
      });

      window.open(doc.output('bloburl'), '_blank');
    },

    getEstadoText(estado) {
      switch (estado) {
        case 1:
          return 'Libre';
        case 2:
          return 'Con Correspondecia';
        case 3:
          return 'Mantenimiento';
        case 4:
          return 'Vencido';
        default:
          return 'Ocupado';
      }
    },

    filterList() {
      this.currentPage = 1; // Reiniciar la página actual al realizar una búsqueda
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async EliminarItem(id) {
      this.load = true;
      try {
        const res = await this.$api.$delete(this.apiUrl + '/' + id);
        console.log(res);
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0];
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
    }
  },
  mounted() {
    this.$nextTick(async () => {
      let user = localStorage.getItem('userAuth');//recuperar usuario
      this.user = JSON.parse(user);//recuperar usuario
      try {
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0];
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
