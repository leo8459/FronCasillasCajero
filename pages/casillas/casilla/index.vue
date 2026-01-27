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
            <button class="btn btn-warning" @click="generarBackup">Generar Backup</button>

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
                    <th class="py-0 px-1">Codigo Casilla</th>
                    <th class="py-0 px-1">Categoria</th>
                    <th class="py-0 px-1">Seccion</th>
                    <th class="py-0 px-1">Estado</th>
                    <th class="py-0 px-1">Llaves</th>
                    <th class="py-0 px-1"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, index) in paginatedList" :key="index">
                      <td class="py-0 px-1">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                      <td class="py-0 px-1">{{ m.nombre }}</td>
                      <td class="py-0 px-1">{{ m.categoria.nombre }}</td>
                      <td class="py-0 px-1">{{ m.seccione.nombre }}</td>

                      <td class="py-0 px-1"
  :class="m.estado === 1 ? 'Libre' : (m.estado === 2 ? 'Con Correspondecia' : (m.estado === 3 ? 'Mantenimiento' : (m.estado === 4 ? 'Vencido' : 'Ocupado')))">
  {{ m.estado === 1 ? 'Libre' : (m.estado === 2 ? 'Con Correspondecia' : (m.estado === 3 ? 'Mantenimiento' : (m.estado === 4 ? 'Vencido' : 'Ocupado'))) }}
</td>
<td class="py-0 px-1">{{ m.llaves ? m.llaves.nombre : 'Sin llave' }}</td>

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
      apiUrl: 'casillas',
      page: 'Casillas',
      modulo: 'AGBC',
      url_nuevo: '/casillas/casilla/nuevo',
      url_editar: '/casillas/casilla/editar/',
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
        // Filtrar por nombre, categoría, sección y estado según sea necesario
        return (
          item.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.categoria.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.seccione.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          this.getEstadoText(item.estado).toLowerCase().includes(this.searchQuery.toLowerCase())
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
    async generarBackup() {
    try {
      // Mostrar el modal de carga
      this.$swal.fire({
        title: 'Generando backup',
        text: 'Por favor, espere mientras se genera el backup...',
        allowOutsideClick: false,
        didOpen: () => {
          this.$swal.showLoading();
        }
      });

      // Llamar a la API para generar el backup
      const response = await this.$api.$post('/backup-laravel');
      
      // Descargar el archivo automáticamente
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response], { type: 'application/zip' }));
      link.setAttribute('download', 'laravel_backup.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cerrar el modal de carga
      this.$swal.close();
      
      // Mostrar mensaje de éxito
      this.$swal.fire('¡Backup generado!', 'El backup se ha generado y descargado con éxito.', 'success');
    } catch (error) {
      console.error('Error al generar el backup:', error);
      
      // Cerrar el modal de carga si ocurre un error
      this.$swal.close();
      
      // Mostrar mensaje de error
      this.$swal.fire('¡Backup generado!', 'El backup se ha generado y descargado con éxito.', 'success');
    }
  },

  
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
        const dep = this.user?.cajero?.departamento || this.user?.departamento;

const url = dep
  ? `${this.apiUrl}?departamento=${encodeURIComponent(dep)}`
  : this.apiUrl;

await Promise.all([this.GET_DATA(url)]).then((v) => {
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
