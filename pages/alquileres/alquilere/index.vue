<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-end align-items-center mb-3">
          <!-- Contenedor de búsqueda -->
          <div class="col-md-4 col-12">
            <input type="text" v-model="searchTerm" class="form-control" placeholder="Buscar por nombre"
              @input="buscar" />
          </div>

          <!-- Botones para reportes -->
          <div class="col-md-8 col-12 d-flex justify-content-end">
            <!-- Botón para abrir el modal de casillas por vencer -->
            <div class="btn-group mr-2">
              <button class="btn btn-info" @click="generarReporteFechasPorVencer">
                <i class="fas fa-exclamation-triangle"></i> Casillas por Vencer
              </button>
            </div>

            <!-- Botón para abrir el modal de reportes por fechas -->
            <div class="btn-group mr-2">
              <button class="btn btn-info" @click="modalVisible2 = true">
                <i class="fas fa-file-pdf"></i> Reportes Por Fechas
              </button>
            </div>

            <!-- Botón para abrir el modal de reportes generales -->
            <div class="btn-group">
              <button class="btn btn-info" @click="modalVisible = true">
                <i class="fas fa-file-pdf"></i> Reportes
              </button>
            </div>
          </div>
        </div>

        <!-- Modal para Reportes Por Fechas -->
        <div v-if="modalVisible2" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);"
          @click.self="modalVisible2 = false">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Generar Reportes por Fechas</h5>
                <button type="button" class="close" @click="modalVisible2 = false">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="d-flex flex-column align-items-stretch">
                  <!-- Input para seleccionar la fecha de inicio -->
                  <input type="date" v-model="fechaInicio" class="form-control mb-3" placeholder="Fecha de inicio" />

                  <!-- Input para seleccionar la fecha de fin -->
                  <input type="date" v-model="fechaFin" class="form-control mb-3" placeholder="Fecha de fin" />

                  <!-- Botones para generar reportes -->
                  <button @click="generarReporteCasillasAlquiladasEntreFechas" class="btn btn-info mb-2">
                    Generar Reporte de Casillas Alquiladas
                  </button>
                  <button @click="generarReporteCasillasPequenasFechas" class="btn btn-info mb-2">
                    Reporte Casillas Pequeñas
                  </button>
                  <button @click="generarReporteCasillasMedianasFechas" class="btn btn-info mb-2">
                    Reporte Casillas Medianas
                  </button>
                  <button @click="generarReporteGabetasFechas" class="btn btn-info mb-2">
                    Reporte Casillas Gavetas
                  </button>
                  <button @click="generarReporteCajonFechas" class="btn btn-info mb-2">
                    Reporte Casillas Cajones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal para Reportes Generales -->
        <div v-if="modalVisible" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);"
          @click.self="modalVisible = false">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Generar Reportes</h5>
                <button type="button" class="close" @click="modalVisible = false">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="d-flex flex-column align-items-stretch">
                  <!-- Botones de reporte -->
                  <button @click="generarReporteCompleto" class="btn btn-primary mb-2">
                    Reporte General
                  </button>
                  <button @click="generarReporteFechasPasadas" class="btn btn-primary mb-2">
                    Casillas vencidas
                  </button>
                  <button @click="generarReporteCasillasVigentes" class="btn btn-primary mb-2">
                    Casillas vigentes
                  </button>
                  <button @click="generarReporteFechasPorVencer" class="btn btn-primary mb-2">
                    Casillas por Vencer
                  </button>
                  <button @click="generarReporteCasillasPequenas" class="btn btn-primary mb-2">
                    Casillas Pequeñas recaudado
                  </button>
                  <button @click="generarReporteCasillasMedianas" class="btn btn-primary mb-2">
                    Casillas Medianas recaudado
                  </button>
                  <button @click="generarReporteCasillasGabetas" class="btn btn-primary mb-2">
                    Casillas Gavetas recaudado
                  </button>
                  <button @click="generarReporteCasillasCajones" class="btn btn-primary mb-2">
                    Casillas Cajones recaudado
                  </button>
                </div>
              </div>
              <!-- Puedes agregar más contenido al cuerpo del modal si es necesario -->
            </div>
          </div>
        </div>

        <!-- Tabla y Paginación -->
        <div class="card">
          <div class="card-body">
            <!-- Contenedor responsivo para la tabla -->
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th class="py-0 px-1"><input type="checkbox" @click="toggleSelectAll" /></th>
                    <th class="py-0 px-1">Cliente</th>
                    <th class="py-0 px-1">Autorizados</th>
                    <th class="py-0 px-1">Cajero</th>
                    <th class="py-0 px-1">Telefono</th>
                    <th class="py-0 px-1">Casilla</th>
                    <th class="py-0 px-1">CI</th>
                    <th class="py-0 px-1">SECCION</th>
                    <th class="py-0 px-1">Precio</th>
                    <th class="py-0 px-1">Tamaño</th>
                    <th class="py-0 px-1">Estado</th>
                    <th class="py-0 px-1">Total Llave Extra</th>
                    <th class="py-0 px-1">Multas</th>
                    <th class="py-0 px-1">Habilitacion</th>
                    <th class="py-0 px-1">Dia Pago</th>
                    <th class="py-0 px-1">Tiempo Inicio</th>
                    <th class="py-0 px-1">Tiempo Fin</th>
                    <th class="py-0 px-1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(m, i) in paginatedList" :key="m.id">
                    <td class="py-0 px-1">
                      <input type="checkbox" v-model="selectedIds" :value="m.id" />
                    </td>
                    <td class="py-0 px-1" :data-tooltip="m.cliente?.nombre || 'S/N'">{{ m.cliente?.nombre || 'S/N' }}
                    </td>
                    <td class="py-0 px-1" :data-tooltip="m.autorizado_recojo || 'S/N'">{{ m.autorizado_recojo || 'S/N'
                      }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.cajero?.nombre || 'S/N'">{{ m.cajero?.nombre || 'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.cliente?.telefono || 'S/N'">{{ m.cliente?.telefono || 'S/N'
                      }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.casilla?.nombre || 'S/N'">{{ m.casilla?.nombre || 'S/N' }}
                    </td>
                    <td class="py-0 px-1" :data-tooltip="m.cliente?.carnet || 'S/N'">{{ m.cliente?.carnet || 'S/N' }}
                    </td>
                    <td class="py-0 px-1" :data-tooltip="m.casilla?.seccione_id || 'S/N'">{{ m.casilla?.seccione_id ||
                      'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.precio?.precio || 'S/N'">{{ m.precio?.precio || 'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.categoria?.nombre || 'S/N'">{{ m.categoria?.nombre || 'S/N'
                      }}</td>
                    <td class="py-0 px-1" :data-tooltip="formatoEstado(m.casilla?.estado) || 'S/N'"
                      :class="formatoEstado(m.casilla?.estado)">
                      {{ formatoEstado(m.casilla?.estado) || 'S/N' }}
                    </td>
                    <td class="py-0 px-1" :data-tooltip="m.estado_pago || 'S/N'">{{ m.estado_pago || 'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.nombre || 'S/N'">{{ m.nombre || 'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.habilitacion || 'S/N'">{{ m.habilitacion || 'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.apertura || 'S/N'">{{ m.apertura || 'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.ini_fecha || 'S/N'">{{ m.ini_fecha || 'S/N' }}</td>
                    <td class="py-0 px-1" :data-tooltip="m.fin_fecha || 'S/N'">{{ m.fin_fecha || 'S/N' }}</td>
                    <td class="py-0 px-1">
                      <nuxtLink :to="url_editar + m.id" class="btn btn-info btn-sm py-1 px-2">
                        <i class="fas fa-pen"></i>
                      </nuxtLink>
                      <button type="button" @click="Eliminar(m.id)" class="btn btn-danger btn-sm py-1 px-2">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Paginación y otros controles -->
            <div class="pagination">
              <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-primary">
                &laquo;
              </button>
              <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ active: page === currentPage }"
                class="page-number">
                {{ page }}
              </span>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-primary">
                &raquo;
              </button>
              <div class="d-flex justify-content-between mt-3">
                <div class="btn-group">
                  <button class="btn btn-warning" @click="updateSelected">
                    <i class="fas fa-edit"></i> Mandar mensajes
                  </button>
                </div>
                <!-- Botón para cambiar todas las casillas con correspondencia a ocupadas -->
                <div class="btn-group mr-2">
                  <button class="btn btn-warning" @click="updateAllToOcupadas">
                    <i class="fas fa-exclamation-triangle"></i> Cambiar Todas a Ocupadas
                  </button>
                </div>
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
import Swal from 'sweetalert2';

export default {
  name: "IndexPage",
  data() {
    return {
      load: true,
      list: [],
      apiUrl: "alquileres",
      page: "Alquileres",
      modulo: "AGBC",
      url_nuevo: "/alquileres/alquilere/nuevo",
      url_editar: "/alquileres/alquilere/editar/",
      casillasOcupadas: [],
      currentPage: 1,
      pageSize: 10,
      searchTerm: "",
      filteredList: [],
      modalVisible: false,
      modalVisible2: false,
      fechaInicio: '',
      fechaFin: '',
      alertShown: false,
      dropdownVisible: false,
      apiCasillas: 'http://172.65.10.33:8000/cajero/casillas',
      // apiCasillas: 'http://127.0.0.1:8000/api/casillas',

      casillasPorVencer: [],
      selectedIds: [], // Para almacenar los IDs seleccionados
      cajero_id: '', // Asignar cajero_id al modelo
      user: { // Asignar cajero_id al modelo
        cajero: [] // LLAMAR DATO DEL CAJERO
      }, // Asignar cajero_id al modelo
    };
  },
  computed: {
    paginatedList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredList.sort((a, b) => b.id - a.id).slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredList.length / this.pageSize);
    },
    pages() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      let pages = [];

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...', totalPages);
        } else if (currentPage > totalPages - 4) {
          pages.push(1, '...');
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1, '...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...', totalPages);
        }
      }

      return pages;
    }

  },

  methods: {
    async updateAllToOcupadas() {
      this.load = true;

      try {
        const response = await this.$api.$post('update-all-to-ocupadas');

        if (response.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.message,
          });
          // Recargar los datos después de la actualización
          await this.GET_DATA(this.apiUrl).then(v => {
            this.list = v;
            this.filteredList = this.list;
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar los registros.',
        });
      } finally {
        this.load = false;
      }
    },
    toggleSelectAll(event) {
      this.selectedIds = event.target.checked ? this.paginatedList.map(m => m.id) : [];
    },
    async updateSelected() {
      if (this.selectedIds.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'Por favor, seleccione al menos un registro.',
        });
        return;
      }

      this.load = true;

      try {
        const response = await this.$api.$post('update-casillas-seleccionadas', {
          ids: this.selectedIds
        });

        if (response.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.message,
          });
          // Recargar los datos después de la actualización
          await this.GET_DATA(this.apiUrl).then(v => {
            this.list = v;
            this.filteredList = this.list;
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar los registros.',
        });
      } finally {
        this.load = false;
      }
    },
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    filtrarPorUsuario() {
      const userId = this.user.cajero.id;
      return this.list.filter(alquiler => alquiler.cajero_id === userId);
    },
    generarReporteCasillasPequenas() {
      // Filtrar los datos por la categoría 'Pequeña'
      const dataForReport = this.filtrarPorUsuario().filter(alquiler => alquiler.categoria.nombre === 'Pequeña');

      // Calcular los totales
      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.precio.precio || 0);
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.estado_pago || 0);
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.nombre || 0);
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.habilitacion || 0);
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Añadir el título
      const title = 'Reporte de Casillas Pequeñas';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteCasillasCajones() {
      // Filtrar los datos por la categoría 'Cajon'
      const dataForReport = this.filtrarPorUsuario().filter(alquiler => alquiler.categoria.nombre === 'Cajon');

      // Calcular los totales
      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.precio.precio || 0);
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.estado_pago || 0);
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.nombre || 0);
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.habilitacion || 0);
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Añadir el título
      const title = 'Reporte de Casillas de Tipo Cajones';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteCasillasGabetas() {
      // Filtrar los datos por la categoría 'Gabeta'
      const dataForReport = this.filtrarPorUsuario().filter(alquiler => alquiler.categoria.nombre === 'Gabeta');

      // Calcular los totales
      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.precio.precio || 0);
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.estado_pago || 0);
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.nombre || 0);
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.habilitacion || 0);
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Añadir el título
      const title = 'Reporte de Casillas de Tipo Gabeta';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteCasillasMedianas() {
      // Filtrar los datos por la categoría 'Mediana'
      const dataForReport = this.filtrarPorUsuario().filter(alquiler => alquiler.categoria.nombre === 'Mediana');

      // Calcular los totales
      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.precio.precio || 0);
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.estado_pago || 0);
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.nombre || 0);
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.habilitacion || 0);
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Añadir el título
      const title = 'Reporte de Casillas Medianas';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteCompleto() {
      // Obtener los datos para el reporte (se utiliza this.list para obtener todos los datos)
      const dataForReport = this.filtrarPorUsuario();

      // Calcular los totales
      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.precio.precio || 0);
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.estado_pago || 0);
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.nombre || 0);
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.habilitacion || 0);
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      // Crear un nuevo documento PDF
      const doc = new jsPDF('l', 'mm', 'a4');

      // Añadir el título
      const title = 'Reporte General';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteFechasPorVencer() {
      // Obtener la fecha actual
      const currentDate = new Date();

      // Obtener la fecha dentro de un mes
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

      const dataForReport = this.list.filter(alquiler => {
        const finFecha = new Date(alquiler.fin_fecha);
        return finFecha >= currentDate && finFecha <= oneMonthLater && alquiler.estado === 1;
      });

      const doc = new jsPDF('l', 'mm', 'a4');
      const headers = ['#', 'Observación', 'Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler', 'Tiempo Inicio', 'Tiempo Fin'];

      const body = dataForReport.map((alquiler, index) => [
        index + 1,
        alquiler.casilla.observacion,
        // alquiler.cajero.nombre,
        alquiler.cliente.nombre,
        alquiler.casilla.nombre,
        alquiler.cliente.carnet,
        alquiler.casilla.seccione_id,
        parseFloat(alquiler.precio.precio),
        alquiler.categoria.nombre,
        alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
        alquiler.ini_fecha,
        alquiler.fin_fecha,
      ]);

      const emptyRows = 0;
      for (let i = 0; i < emptyRows; i++) {
        body.push(['', '', '', '', '', '', '', '', '', '', '', '']);
      }

      // Agregar título al reporte
      const title = 'Reporte de Fechas por Vencer';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      doc.text(title, x, 10);

      doc.autoTable({
        head: [headers],
        body: body,
        startY: 20, // Ajustar la posición del contenido para dejar espacio al título
        theme: 'striped',
        margin: { top: 20 },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          overflow: 'linebreak',
          columnWidth: 'wrap',
        },
        columnStyles: {
          0: { cellWidth: 10 },
        },
        didDrawCell: (data) => {
          const cell = data.cell;
          doc.setFontSize(10);
          doc.setTextColor(50);

          if (cell.height > 10 && doc.getTextWidth(cell.text) > cell.width - 10) {
            doc.autoTableText(cell.text, cell.x + 2, cell.y + 2, {
              halign: 'left',
              valign: 'top',
            });
          }
        },
      });

      window.open(doc.output('bloburl'), '_blank');
    },

    generarReporteCasillasVencidasEntreFechas() {
      if (!this.fechaInicio || !this.fechaFin) {
        alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
        return;
      }

      const fechaInicio = new Date(this.fechaInicio);
      const fechaFin = new Date(this.fechaFin);

      const dataForReport = this.filtrarPorUsuario().filter(alquiler => {
        const finFecha = new Date(alquiler.fin_fecha);
        return finFecha >= fechaInicio && finFecha <= fechaFin;
      });

      // Calcular los totales
      const totalCasillasAlquiladas = casillasVencidas.length;
      const totalPrice = casillasVencidas.reduce((total, alquiler) => total + parseFloat(alquiler.precio.precio || 0), 0);
      const totalEstadoPago = casillasVencidas.reduce((total, alquiler) => total + parseFloat(alquiler.estado_pago || 0), 0);
      const totalMultas = casillasVencidas.reduce((total, alquiler) => total + parseFloat(alquiler.nombre || 0), 0);
      const totalHabilitacion = casillasVencidas.reduce((total, alquiler) => total + parseFloat(alquiler.habilitacion || 0), 0);
      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');



      // Añadir el título
      const title = 'Reporte Casillas Vencidas Entre Fechas';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];










      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteCasillasVigentes() {
      // Obtener la fecha actual
      const currentDate = new Date();

      // Filtrar la lista para obtener solo las casillas vigentes a la fecha actual y en estado 1
      const casillasVigentes = this.list.filter(alquiler => {
        const finFecha = new Date(alquiler.fin_fecha);
        return finFecha >= currentDate && alquiler.estado === 1;
      });

      // Calcular los totales
      const totalCasillasAlquiladas = casillasVigentes.length;
      const totalPrice = casillasVigentes.reduce((total, alquiler) => total + parseFloat(alquiler.precio.precio || 0), 0);
      const totalEstadoPago = casillasVigentes.reduce((total, alquiler) => total + parseFloat(alquiler.estado_pago || 0), 0);
      const totalMultas = casillasVigentes.reduce((total, alquiler) => total + parseFloat(alquiler.nombre || 0), 0);
      const totalHabilitacion = casillasVigentes.reduce((total, alquiler) => total + parseFloat(alquiler.habilitacion || 0), 0);
      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Añadir el título
      const title = 'Reporte Casillas Vigentes';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteFechasPasadas() {
      // Obtener la fecha actual
      const currentDate = new Date();

      // Obtener la fecha dentro de un mes
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

      // Filtrar las casillas que están por vencer
      const dataForReport = this.list.filter(alquiler => {
        const finFecha = new Date(alquiler.fin_fecha);
        return finFecha >= currentDate && finFecha <= oneMonthLater && alquiler.estado === 1;
      });

      // Crear el documento PDF
      const doc = new jsPDF('l', 'mm', 'a4');
      const headers = ['Cliente', 'Teléfono', 'Casilla', 'Sección', 'Tamaño', 'Fecha Inicio', 'Fecha Fin'];

      // Mapear los datos al formato necesario para el reporte
      const body = dataForReport.map(alquiler => [
        alquiler.cliente.nombre || '',
        alquiler.cliente.telefono || '',
        alquiler.casilla.nombre || '',
        alquiler.casilla.seccione_id || '',
        alquiler.categoria.nombre || '',
        alquiler.ini_fecha || '',
        alquiler.fin_fecha || '',
      ]);

      // Agregar título al reporte
      const title = 'Reporte de Casillas por Vencer';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      doc.text(title, x, 10);

      // Generar la tabla en el PDF
      doc.autoTable({
        head: [headers],
        body: body,
        startY: 20, // Posicionar el contenido después del título
        theme: 'striped',
        margin: { top: 20 },
        styles: {
          fontSize: 10,
          cellPadding: 3,
          overflow: 'linebreak',
        },
        columnStyles: {
          0: { cellWidth: 'auto' },
        },
      });

      // Abrir el PDF en una nueva ventana
      window.open(doc.output('bloburl'), '_blank');
    },

    generarReporteCasillasPequenasFechas() {
      if (!this.fechaInicio || !this.fechaFin) {
        alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
        return;
      }

      const moment = require('moment-timezone');

      const fechaInicio = moment.tz(this.fechaInicio, 'America/La_Paz').startOf('day').toDate();
      const fechaFin = moment.tz(this.fechaFin, 'America/La_Paz').endOf('day').toDate();

      const dataForReport = this.filtrarPorUsuario().filter(alquiler => {
        const aperturaFecha = moment.tz(alquiler.apertura, 'America/La_Paz').toDate();
        return aperturaFecha >= fechaInicio && aperturaFecha <= fechaFin && alquiler.categoria.nombre === 'Pequeña';
      });

      const totalCasillasAlquiladas = dataForReport.length;
      const totalPrice = dataForReport.reduce((total, alquiler) => total + parseFloat(alquiler.precio.precio || 0), 0);
      const totalEstadoPago = dataForReport.reduce((total, alquiler) => total + parseFloat(alquiler.estado_pago || 0), 0);
      const totalMultas = dataForReport.reduce((total, alquiler) => total + parseFloat(alquiler.nombre || 0), 0);
      const totalHabilitacion = dataForReport.reduce((total, alquiler) => total + parseFloat(alquiler.habilitacion || 0), 0);
      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Formatear las fechas para el título
      const fechaInicioStr = moment(fechaInicio).format('DD [de] MMMM [de] YYYY');
      const fechaFinStr = moment(fechaFin).format('DD [de] MMMM [de] YYYY');

      // Añadir el título con las fechas
      const title = `Reporte de Casillas Pequeñas (${fechaInicioStr} - ${fechaFinStr})`;
      doc.setFontSize(18);
      doc.setTextColor('#344767'); // Color más empresarial
      const pageWidth = doc.internal.pageSize.width;
      const titleWidth = doc.getTextWidth(title);
      const x = (pageWidth - titleWidth) / 2;
      doc.text(title, x, 20);

      // Añadir tabla de totales (mover los totales a la tabla)
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total General', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: 30, // Mover la tabla más cerca del título
        theme: 'grid',
        styles: {
          fontSize: 10,
          cellPadding: 4,
          overflow: 'linebreak',
        },
        headStyles: {
          fillColor: '#344767', // Color de fondo empresarial
          textColor: '#ffffff', // Color de texto blanco
          fontSize: 12,
        },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      // Abrir el PDF en una nueva ventana
      window.open(doc.output('bloburl'), '_blank');
    }

    ,
    generarReporteCasillasMedianasFechas() {
      if (!this.fechaInicio || !this.fechaFin) {
        alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
        return;
      }

      // Importar moment y moment-timezone
      const moment = require('moment-timezone');

      // Convertir las fechas de inicio y fin a objetos Date y ajustar la zona horaria
      const fechaInicio = moment.tz(this.fechaInicio, 'America/La_Paz').startOf('day').toDate();
      const fechaFin = moment.tz(this.fechaFin, 'America/La_Paz').endOf('day').toDate();

      const dataForReport = this.filtrarPorUsuario().filter(alquiler => {
        const aperturaFecha = moment.tz(alquiler.apertura, 'America/La_Paz').toDate();
        return aperturaFecha >= fechaInicio && aperturaFecha <= fechaFin && alquiler.categoria.nombre === 'Mediana';
      });

      // Verificar los datos filtrados
      console.log("Data for Report:", dataForReport);

      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        const precio = parseFloat(alquiler.precio.precio || 0);
        console.log("Precio:", precio);
        return total + precio;
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        const estadoPago = parseFloat(alquiler.estado_pago || 0);
        console.log("Estado Pago:", estadoPago);
        return total + estadoPago;
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        const multas = parseFloat(alquiler.nombre || 0);
        console.log("Multas:", multas);
        return total + multas;
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        const habilitacion = parseFloat(alquiler.habilitacion || 0);
        console.log("Habilitación:", habilitacion);
        return total + habilitacion;
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      console.log("Totales:", {
        totalCasillasAlquiladas,
        totalPrice,
        totalEstadoPago,
        totalMultas,
        totalHabilitacion,
        totalSuma
      });

      const doc = new jsPDF('l', 'mm', 'a4');

      // Formatear las fechas para el título
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const fechaInicioStr = moment(fechaInicio).format('DD [de] MMMM [de] YYYY');
      const fechaFinStr = moment(fechaFin).format('DD [de] MMMM [de] YYYY');

      // Añadir el título con las fechas
      const title = `Reporte de Casillas Medianas (${fechaInicioStr} - ${fechaFinStr})`;
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto Expresado en (Bs)', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteGabetasFechas() {
      if (!this.fechaInicio || !this.fechaFin) {
        alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
        return;
      }

      // Importar moment y moment-timezone
      const moment = require('moment-timezone');

      // Convertir las fechas de inicio y fin a objetos Date y ajustar la zona horaria
      const fechaInicio = moment.tz(this.fechaInicio, 'America/La_Paz').startOf('day').toDate();
      const fechaFin = moment.tz(this.fechaFin, 'America/La_Paz').endOf('day').toDate();

      const dataForReport = this.filtrarPorUsuario().filter(alquiler => {
        const aperturaFecha = moment.tz(alquiler.apertura, 'America/La_Paz').toDate();
        return aperturaFecha >= fechaInicio && aperturaFecha <= fechaFin && alquiler.categoria.nombre === 'Gabeta';
      });

      // Verificar los datos filtrados
      console.log("Data for Report:", dataForReport);

      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.precio.precio || 0);
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.estado_pago || 0);
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.nombre || 0);
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.habilitacion || 0);
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Formatear las fechas para el título
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const fechaInicioStr = moment(fechaInicio).format('DD [de] MMMM [de] YYYY');
      const fechaFinStr = moment(fechaFin).format('DD [de] MMMM [de] YYYY');

      // Añadir el título con las fechas
      const title = `Reporte de Gabetas (${fechaInicioStr} - ${fechaFinStr})`;
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarReporteCajonFechas() {
      if (!this.fechaInicio || !this.fechaFin) {
        alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
        return;
      }

      // Importar moment y moment-timezone
      const moment = require('moment-timezone');

      // Convertir las fechas de inicio y fin a objetos Date y ajustar la zona horaria
      const fechaInicio = moment.tz(this.fechaInicio, 'America/La_Paz').startOf('day').toDate();
      const fechaFin = moment.tz(this.fechaFin, 'America/La_Paz').endOf('day').toDate();

      const dataForReport = this.filtrarPorUsuario().filter(alquiler => {
        const aperturaFecha = moment.tz(alquiler.apertura, 'America/La_Paz').toDate();
        return aperturaFecha >= fechaInicio && aperturaFecha <= fechaFin && alquiler.categoria.nombre === 'Cajon';
      });

      // Verificar los datos filtrados
      console.log("Data for Report:", dataForReport);

      const totalCasillasAlquiladas = dataForReport.length;

      const totalPrice = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.precio.precio || 0);
      }, 0);

      const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.estado_pago || 0);
      }, 0);

      const totalMultas = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.nombre || 0);
      }, 0);

      const totalHabilitacion = dataForReport.reduce((total, alquiler) => {
        return total + parseFloat(alquiler.habilitacion || 0);
      }, 0);

      const totalSuma = totalPrice + totalEstadoPago + totalMultas + totalHabilitacion;

      const doc = new jsPDF('l', 'mm', 'a4');

      // Formatear las fechas para el título
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const fechaInicioStr = moment(fechaInicio).format('DD [de] MMMM [de] YYYY');
      const fechaFinStr = moment(fechaFin).format('DD [de] MMMM [de] YYYY');

      // Añadir el título con las fechas
      const title = `Reporte de Cajones (${fechaInicioStr} - ${fechaFinStr})`;
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - titleWidth) / 2;
      const y = 10;
      doc.text(title, x, y);

      // Añadir tabla de totales
      const totalHeaders = ['Descripción', 'Monto', 'Cantidad'];
      const totalBody = [
        ['Casillas Alquiladas', '', totalCasillasAlquiladas],
        ['Total Precio', totalPrice.toFixed(2), ''],
        ['Total Llaves Extras', totalEstadoPago.toFixed(2), ''],
        ['Total Multas', totalMultas.toFixed(2), ''],
        ['Total Habilitación', totalHabilitacion.toFixed(2), ''],
        ['Total Suma', totalSuma.toFixed(2), '']
      ];

      doc.autoTable({
        head: [totalHeaders],
        body: totalBody,
        startY: y + 10, // Posicionar la tabla de totales después del título
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          1: { halign: 'right' }, // Alinear montos a la derecha
          2: { halign: 'center' }  // Alinear cantidades al centro
        }
      });

      window.open(doc.output('bloburl'), '_blank');
    },
    generarAlertaCasillasPorVencer() {
      const currentDate = new Date();
      const oneMonthAhead = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

      // Filtrar los alquileres por estado 1 y por fecha de finalización en el próximo mes
      const casillasPorVencer = this.list.filter(alquiler => {
        const finFecha = new Date(alquiler.fin_fecha);
        return finFecha >= currentDate && finFecha < oneMonthAhead && alquiler.estado === 1;
      });

      const numeroCasillasPorVencer = casillasPorVencer.length;

      if (numeroCasillasPorVencer > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: `Tienes ${numeroCasillasPorVencer} casilla(s) por vencer en un mes.`,
        });
      }
    },

    async generarReporteCasillasAlquiladasEntreFechas() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
    return;
  }

  this.load = true;

  try {
    const fechaInicio = new Date(this.fechaInicio);
    const fechaFin    = new Date(this.fechaFin);

    /* =====================================================
     * 1️⃣ FILTRAR ALQUILERES POR FECHAS
     * ===================================================== */
    const dataForReport = this.list.filter(a => {
      const iniFecha = new Date(a.apertura);
      return iniFecha >= fechaInicio && iniFecha <= fechaFin;
    });

    const totalCasillasAlquiladas = dataForReport.length;

    /* =====================================================
     * 2️⃣ TOTALES ECONÓMICOS
     * ===================================================== */
    const totalPrecio = dataForReport.reduce(
      (t, a) => t + parseFloat(a.precio?.precio || 0), 0
    );
    const totalLlavesExtra = dataForReport.reduce(
      (t, a) => t + parseFloat(a.estado_pago || 0), 0
    );
    const totalHabilitacion = dataForReport.reduce(
      (t, a) => t + parseFloat(a.habilitacion || 0), 0
    );
    const totalMultas = dataForReport.reduce(
      (t, a) => t + parseFloat(a.nombre || 0), 0
    );

    const granTotal =
      totalPrecio +
      totalLlavesExtra +
      totalHabilitacion +
      totalMultas;

    /* =====================================================
     * 3️⃣ OBTENER CASILLAS DESDE API REAL
     * ===================================================== */
    const casillas = await this.$axios.$get(this.apiCasillas);

    const totalCasillasLibres = casillas.filter(c => c.estado === 1).length;
    const totalCasillasMantenimiento = casillas.filter(c => c.estado === 3).length;
    const totalCasillasVencidas = casillas.filter(c => c.estado === 4).length;

    /* =====================================================
     * 4️⃣ CREAR PDF
     * ===================================================== */
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const headers = [
      'Cliente',
      'Teléfono',
      'Casilla',
      'Sección',
      'Tamaño',
      'Fecha Pago',
      'Fecha Fin',
      'Precio',
      'Llaves Extra',
      'Habilitación',
      'Multas'
    ];

    const body = dataForReport.map(a => [
      a.cliente?.nombre || 'S/N',
      a.cliente?.telefono || 'S/N',
      a.casilla?.nombre || 'S/N',
      a.casilla?.seccione_id || 'S/N',
      a.categoria?.nombre || 'S/N',
      a.apertura || 'S/N',
      a.fin_fecha || 'S/N',
      parseFloat(a.precio?.precio || 0).toFixed(2),
      parseFloat(a.estado_pago || 0).toFixed(2),
      parseFloat(a.habilitacion || 0).toFixed(2),
      parseFloat(a.nombre || 0).toFixed(2),
    ]);

    /* =====================================================
     * 5️⃣ TÍTULO
     * ===================================================== */
    const title = `Reporte de Casillas Alquiladas (${this.fechaInicio} - ${this.fechaFin})`;
    doc.setFontSize(18);
    doc.setTextColor('#344767');
    const pageWidth = doc.internal.pageSize.width;
    doc.text(title, (pageWidth - doc.getTextWidth(title)) / 2, 20);

    /* =====================================================
     * 6️⃣ RESUMEN
     * ===================================================== */
    doc.setFontSize(12);
    doc.setTextColor(80);

    doc.text(`Total Casillas Alquiladas: ${totalCasillasAlquiladas}`, 14, 30);
    doc.text(`Casillas Libres (Estado 1): ${totalCasillasLibres}`, 14, 36);
    doc.text(`Casillas en Mantenimiento (Estado 3): ${totalCasillasMantenimiento}`, 14, 42);
    doc.text(`Casillas Vencidas (Estado 4): ${totalCasillasVencidas}`, 14, 48);

    doc.text(`Total Precio: Bs. ${totalPrecio.toFixed(2)}`, 14, 56);
    doc.text(`Total Llaves Extra: Bs. ${totalLlavesExtra.toFixed(2)}`, 14, 62);
    doc.text(`Total Habilitación: Bs. ${totalHabilitacion.toFixed(2)}`, 14, 68);
    doc.text(`Total Multas: Bs. ${totalMultas.toFixed(2)}`, 14, 74);
    doc.text(`Gran Total: Bs. ${granTotal.toFixed(2)}`, 14, 80);

    /* =====================================================
     * 7️⃣ TABLA
     * ===================================================== */
    doc.autoTable({
      head: [headers],
      body,
      startY: 88,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: '#344767',
        textColor: '#ffffff',
      },
      columnStyles: {
        7: { halign: 'right' },
        8: { halign: 'right' },
        9: { halign: 'right' },
        10:{ halign: 'right' },
      },
    });

    window.open(doc.output('bloburl'), '_blank');

  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo generar el reporte', 'error');
  } finally {
    this.load = false;
  }
}




    ,

    mostrarCasillasPorVencer() {
      const currentDate = new Date();
      const oneMonthAhead = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

      // Filtrar las casillas por vencer
      this.casillasPorVencer = this.list.filter(alquiler => {
        const finFecha = new Date(alquiler.fin_fecha);
        return finFecha >= currentDate && finFecha < oneMonthAhead && alquiler.estado === 1;
      });

      this.modalCasillasPorVencer = true;
    },
    buscar() {
      if (this.searchTerm.trim() === "") {
        this.filteredList = this.list;
      } else {
        this.filteredList = this.list.filter((item) => {
          const searchTermLower = this.searchTerm.toLowerCase();
          return (
            (item.nombre && item.nombre.toLowerCase().includes(searchTermLower)) ||
            (item.ini_fecha && item.ini_fecha.toLowerCase().includes(searchTermLower)) ||
            (item.fin_fecha && item.fin_fecha.toLowerCase().includes(searchTermLower)) ||
            (item.cajero && item.cajero.nombre && item.cajero.nombre.toLowerCase().includes(searchTermLower)) ||
            (item.cliente && item.cliente.nombre && item.cliente.nombre.toLowerCase().includes(searchTermLower)) ||
            (item.casilla && item.casilla.nombre && item.casilla.nombre.toLowerCase().includes(searchTermLower)) ||
            (typeof item.cliente.carnet === 'string' && item.cliente.carnet.toLowerCase().includes(searchTermLower)) ||
            (typeof item.casilla.seccione_id === 'string' && item.casilla.seccione_id.toLowerCase().includes(searchTermLower)) ||
            (item.precio && typeof item.precio.precio === 'string' && item.precio.precio.toLowerCase().includes(searchTermLower)) ||
            (item.categoria && item.categoria.nombre && item.categoria.nombre.toLowerCase().includes(searchTermLower))
          );
        });
        this.currentPage = 1; // Reset the page to 1 after search
      }
    },
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    async EliminarItem(id) {
      this.load = true;
      try {
        const res = await this.$api.$delete(this.apiUrl + "/" + id);
        console.log(res);
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0];
          this.casillasOcupadas = this.list.map((item) => item.casilla.nombre);
          this.filteredList = this.list; // Reset filtered list after deletion
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    Eliminar(id) {
      let self = this;
      this.$swal
        .fire({
          title: "Deseas Eliminar?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await self.EliminarItem(id);
          }
        });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      if (page !== '...') {
        this.currentPage = page;
      }
    },
    formatoEstado(estado) {
      switch (estado) {
        case 1: return 'libre';
        case 2: return 'Con Correspondencia';
        case 3: return 'Mantenimiento';
        case 4: return 'Vencido';
        case 5: return 'Reservado';
        default: return 'Ocupado';
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        // Recuperar usuario logueado del localStorage
        const userStr = localStorage.getItem('userAuth');
        this.user = JSON.parse(userStr);

        if (this.user && this.user.cajero && this.user.cajero.departamento) {
          const departamentoUsuario = this.user.cajero.departamento;

          // Obtener alquileres y filtrar:
          //   1️⃣  Solo del mismo departamento
          //   2️⃣  Solo estado === 1  (vigentes)
          await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
            this.list = v[0].filter(
              item =>
                item.casilla.departamento === departamentoUsuario && // mismo dep.
                item.estado === 1                                     // solo vigentes
            );

            this.casillasOcupadas = this.list.map(item => item.casilla.nombre);
            this.filteredList = this.list;  // la tabla muestra sólo vigentes
          });

          // Alerta de casillas por vencer (opcional)
          this.generarAlertaCasillasPorVencer();
        } else {
          console.error('El departamento del usuario no está disponible.');
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.load = false;
      }
    });
  }
  ,
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
}

.pagination .page-number {
  margin: 0 5px;
  cursor: pointer;
}

.pagination .page-number.active {
  font-weight: bold;
  text-decoration: underline;
}

.status-table {
  width: auto;
  font-size: 0.7rem;
  /* Hacemos la tabla más pequeña */
}

.status-table td {
  padding: 3px 5px;
  /* Reducimos el padding para hacer la tabla más compacta */
  text-align: center;
}

.status-red {
  background-color: red;
  color: white;
}

.status-orange {
  background-color: orange;
  color: black;
}

.status-black {
  background-color: black;
  color: white;
}

.status-green {
  background-color: green;
  color: black;
}

.status-yellow {
  background-color: yellow;
  color: black;
}

.dropdown-custom {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 10px;
  /* Reducimos el tamaño del botón */
  font-size: 14px;
  /* Reducimos el tamaño de la fuente */
  border: none;
  cursor: pointer;
  border-radius: 5px;
  /* Borde redondeado */
}

.dropdown-button:hover {
  background-color: #3e8e41;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  /* Ajustamos el ancho mínimo */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  /* Borde redondeado */
}

.dropdown-custom .dropdown-content {
  display: block;
}
</style>
