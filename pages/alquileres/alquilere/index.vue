<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-end">
          <div class="col-2"></div>
          <div class="contenedor">
            <div class="busqueda">
              <input type="text" v-model="searchTerm" class="form-control" placeholder="Buscar por nombre" @input="buscar" />
            </div>
          </div>

          <!-- Botón para abrir el modal -->
          <div class="btn-group mr-2">
            <button class="btn btn-info" @click="modalVisible2 = true">
              <i class="fas fa-file-pdf"></i> Reportes Por Fechas
            </button>
          </div>
          <!-- Modal personalizado -->
          <div v-if="modalVisible2" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Generar Reportes por Fechas</h5>
                  <button type="button" class="close" @click="modalVisible2 = false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="d-flex flex-column align-items-center">
                    <!-- Botones de reporte -->
                    <!-- Input para seleccionar la fecha de inicio -->
                    <input type="date" v-model="fechaInicio" class="form-control" placeholder="Fecha de inicio" />

                    <!-- Input para seleccionar la fecha de fin -->
                    <input type="date" v-model="fechaFin" class="form-control" placeholder="Fecha de fin" />

                    <!-- Botón para generar el reporte de casillas vencidas entre las fechas seleccionadas -->
                    <button @click="generarReporteCasillasVencidasEntreFechas" class="btn btn-fx btn-info">
                      Casillas Vencidas
                    </button>
                    <!-- Botón para generar el reporte de casillas vencidas entre las fechas seleccionadas -->
                    <button @click="reportefechadeinicio" class="btn btn-fx btn-info">
                      Fecha de Ingreso de Casillas Alquiladas
                    </button>
                    <!-- Botón para generar el reporte de casillas vencidas entre las fechas seleccionadas -->
                    <button @click="generarReporteCompletoFechas" class="btn btn-fx btn-info">
                      reporte general
                    </button>
                    <button @click="generarReporteCasillasPequenasFechas" class="btn btn-fx btn-info">
                      reporte Casillas Pequeñas
                    </button>
                    <button @click="generarReporteCasillasMedianasFechas" class="btn btn-fx btn-info">
                      reporte Casillas Medianas
                    </button>
                    <button @click="generarReporteGabetasFechas" class="btn btn-fx btn-info">
                      reporte Casillas Gabetas
                    </button>
                    <button @click="generarReporteCajonFechas" class="btn btn-fx btn-info">
                      reporte Casillas Cajones
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botón para abrir el modal -->
          <div class="btn-group mr-2">
            <button class="btn btn-info" @click="modalVisible = true">
              <i class="fas fa-file-pdf"></i> Reportes
            </button>
          </div>

          <!-- Modal personalizado -->
          <div v-if="modalVisible" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Generar Reportes</h5>
                  <button type="button" class="close" @click="modalVisible = false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="d-flex flex-column align-items-center">
                    <!-- Botones de reporte -->

                    <button @click="generarReporteCompleto" class="btn btn-sm btn-primary mb-2">
                      Reporte General
                    </button>
                    <button @click="generarReporteCasillasOcupadas" class="btn btn-sm btn-primary mb-2">
                      Casillas Ocupadas
                    </button>
                    <button @click="generarReporteFechasPasadas" class="btn btn-sm btn-primary mb-2">
                      Casillas vencidas
                    </button>
                    <button @click="generarReporteCasillasVigentes" class="btn btn-sm btn-primary mb-2">
                      Casillas vigentes
                    </button>
                    <button @click="generarReporteFechasPorVencer" class="btn btn-sm btn-primary mb-2">
                      Casillas por Vencer
                    </button>
                    <button @click="generarReporteCasillasPequenas" class="btn btn-sm btn-primary mb-2">
                      Casillas Pequeñas recaudado
                    </button>
                    <button @click="generarReporteCasillasMedianas" class="btn btn-sm btn-primary mb-2">
                      Casillas Medianas recaudado
                    </button>
                    <button @click="generarReporteCasillasGabetas" class="btn btn-sm btn-primary mb-2">
                      Casillas Gabetas recaudado
                    </button>
                    <button @click="generarReporteCasillasCajones" class="btn btn-sm btn-primary mb-2">
                      Casillas Cajones recaudado
                    </button>
                  </div>
                </div>
                <!-- Puedes agregar más contenido al cuerpo del modal si es necesario -->
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <thead>
                    <th class="py-0 px-1">#</th>
                    <th class="py-0 px-1">Cliente</th>
                    <th class="py-0 px-1">Telefono</th>
                    <th class="py-0 px-1">Casilla</th>
                    <th class="py-0 px-1">Carnet</th>
                    <th class="py-0 px-1">SECCION</th>
                    <th class="py-0 px-1">Precio</th>
                    <th class="py-0 px-1">Tamaño</th>
                    <th class="py-0 px-1">Estado</th>
                    <th class="py-0 px-1">Total Llave Extra</th>
                    <th class="py-0 px-1">Multas</th>
                    <th class="py-0 px-1">Tiempo Inicio</th>
                    <th class="py-0 px-1">Tiempo Fin</th>
                    <th class="py-0 px-1">Estado</th>
                    <th class="py-0 px-1"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in paginatedList" :key="m.id">
                      <td class="py-0 px-1">{{ (currentPage - 1) * pageSize + i + 1 }}</td>
                      <td class="py-0 px-1">{{ m.cliente.nombre }}</td>
                      <td class="py-0 px-1">{{ m.cliente.telefono }}</td>
                      <td class="py-0 px-1">{{ m.casilla.nombre }}</td>
                      <td class="py-0 px-1">{{ m.cliente.carnet }}</td>
                      <td class="py-0 px-1">{{ m.casilla.seccione_id }}</td>
                      <td class="py-0 px-1">{{ m.precio.precio }}</td>
                      <td class="py-0 px-1">{{ m.categoria.nombre }}</td>
                      <td class="py-0 px-1" :class="formatoEstado(m.casilla.estado)">
                        {{ formatoEstado(m.casilla.estado) }}
                      </td>
                      <td class="py-0 px-1">{{ m.estado_pago }}</td>
                      <td class="py-0 px-1">{{ m.nombre }}</td>
                      <td class="py-0 px-1">{{ m.ini_fecha }}</td>
                      <td class="py-0 px-1">{{ m.fin_fecha }}</td>
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
                <div class="pagination">
                  <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-primary">
                    &laquo;
                  </button>
                  <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ active: page === currentPage }" class="page-number">
                    {{ page }}
                  </span>
                  <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-primary">
                    &raquo;
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

export default {
  name: "IndexPage",
  data() {
    return {
      load: true,
      list: [],
      apiUrl: "alquileres",
      page: "alquileres",
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
    };
  },
  computed: {
    paginatedList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredList.slice(start, end);
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
    generarReporteCasillasPequenas() {
  // Obtener los datos para el reporte (se utiliza this.list para obtener todos los datos)
  const dataForReport = this.list.filter(alquiler => alquiler.categoria.nombre === 'Pequeña');

  // Calcular el total del precio sumando los precios de todas las casillas pequeñas
  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas pequeñas
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total del valor numérico de los nombres sumando los valores numéricos de todas las observaciones de las casillas pequeñas
const totalNombreValue = dataForReport.reduce((total, alquiler) => {
  const nombreValue = parseFloat(alquiler.nombre) || 0;
  return total + nombreValue;
}, 0);


  // Calcular el total de la suma de los precios, del estado de pago y de la longitud de los nombres
  const totalSuma = totalPrice + totalEstadoPago + totalNombreValue;

  // Crear una cadena para el reporte
  let reporte = "Reporte de Casillas Pequeñas\n\n";

  // Crea un nuevo documento PDF
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' indica orientación horizontal

  const headers = [
    '#','Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra','Multas', 'Tiempo Inicio', 'Tiempo Fin'
  ];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondencia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Casillas Pequeñas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar filas vacías para el total y dejar espacio para ello
  const emptyRows = 1; // Ajustar la cantidad de filas vacías
  for (let i = 0; i < emptyRows; i++) {
    body.push(['', '', '', '', '', '', '', '', '', '', '', '']);
  }

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extras:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de la longitud de los nombres
  body.push(['', '', '', '', '', 'Total Multas:', totalNombreValue, '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y longitud de los nombres
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 1,
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
generarReporteCasillasCajones() {
  // Obtener los datos para el reporte (se utiliza this.list para obtener todos los datos)
  const dataForReport = this.list.filter(alquiler => alquiler.categoria.nombre === 'Cajon');

  // Calcular el total del precio sumando los precios de todas las casillas de tipo "cajones"
  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas de tipo "cajones"
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total del valor numérico de los nombres sumando los valores numéricos de todas las observaciones de las casillas de tipo "cajones"
  const totalNombreValue = dataForReport.reduce((total, alquiler) => {
    const nombreValue = parseFloat(alquiler.nombre) || 0;
    return total + nombreValue;
  }, 0);

  // Calcular el total de la suma de precios, estado de pago y valor numérico de los nombres
  const totalSuma = totalPrice + totalEstadoPago + totalNombreValue;

  // Crear una cadena para el reporte
  let reporte = "Reporte de Casillas de Tipo Cajones\n\n";

  // Crea un nuevo documento PDF
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' indica orientación horizontal

  const headers = [
    '#','Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra','Multas', 'Tiempo Inicio', 'Tiempo Fin'
  ];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Casillas de Tipo Cajones';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar filas vacías para el total y dejar espacio para ello
  const emptyRows = 1; // Ajustar la cantidad de filas vacías
  for (let i = 0; i < emptyRows; i++) {
    body.push(['', '', '', '', '', '', '', '', '', '', '', '']);
  }

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extras:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del valor numérico de los nombres
  body.push(['', '', '', '', '', 'Total Multas:', totalNombreValue, '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y valor numérico de los nombres
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

generarReporteCasillasGabetas() {
  // Obtener los datos para el reporte (se utiliza this.list para obtener todos los datos)
  const dataForReport = this.list.filter(alquiler => alquiler.categoria.nombre === 'Gabeta');

  // Calcular el total del precio sumando los precios de todas las casillas de tipo "gabeta"
  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas de tipo "gabeta"
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total del valor numérico de las multas sumando los valores numéricos de todas las multas de las casillas de tipo "gabeta"
  const totalMultas = dataForReport.reduce((total, alquiler) => {
    const multa = parseFloat(alquiler.nombre) || 0;
    return total + multa;
  }, 0);

  // Calcular el total de la suma de precios, estado de pago y multas
  const totalSuma = totalPrice + totalEstadoPago + totalMultas;

  // Crear una cadena para el reporte
  let reporte = "Reporte de Casillas de Tipo Gabeta\n\n";

  // Crea un nuevo documento PDF
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' indica orientación horizontal

  const headers = [
    '#', 'Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra', 'Multas', 'Tiempo Inicio', 'Tiempo Fin'
  ];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Casillas de Tipo Gabeta';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar filas vacías para el total y dejar espacio para ello
  const emptyRows = 1; // Ajustar la cantidad de filas vacías
  for (let i = 0; i < emptyRows; i++) {
    body.push(['', '', '', '', '', '', '', '', '', '', '', '']);
  }

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extras:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de las multas
  body.push(['', '', '', '', '', 'Total Multas:', totalMultas, '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y multas
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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



generarReporteCasillasMedianas() {
  // Obtener los datos para el reporte (se utiliza this.list para obtener todos los datos)
  const dataForReport = this.list.filter(alquiler => alquiler.categoria.nombre === 'Mediana');

  // Calcular el total del precio sumando los precios de todas las casillas medianas
  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas medianas
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total del valor numérico de los nombres sumando los valores numéricos de todas las observaciones de las casillas medianas
  const totalNombreValue = dataForReport.reduce((total, alquiler) => {
    const nombreValue = parseFloat(alquiler.nombre) || 0;
    return total + nombreValue;
  }, 0);

  // Calcular el total de la suma de los precios, estado de pago y valor numérico de los nombres
  const totalSuma = totalPrice + totalEstadoPago + totalNombreValue;

  // Crear una cadena para el reporte
  let reporte = "Reporte de Casillas Medianas\n\n";

  // Crea un nuevo documento PDF
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' indica orientación horizontal

  const headers = [
    '#', 'Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra','Multas', 'Tiempo Inicio', 'Tiempo Fin'
  ];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Casillas Medianas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar filas vacías para el total y dejar espacio para ello
  const emptyRows = 1; // Ajustar la cantidad de filas vacías
  for (let i = 0; i < emptyRows; i++) {
    body.push(['', '', '', '', '', '', '', '', '', '', '', '']);
  }

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extras:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del valor numérico de los nombres
  body.push(['', '', '', '', '', 'Total Multas:', totalNombreValue, '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y valor numérico de los nombres
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

generarReporteCompleto() {
  // Obtener los datos para el reporte (se utiliza this.list para obtener todos los datos)
  const dataForReport = this.list;

  // Calcular el total del precio sumando los precios de todas las casillas
  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total del valor numérico de los nombres sumando los valores numéricos de todas las observaciones de las casillas
  const totalNombreValue = dataForReport.reduce((total, alquiler) => {
    const nombreValue = parseFloat(alquiler.nombre) || 0;
    return total + nombreValue;
  }, 0);

  // Calcular el total de la suma de precios, estado de pago y valor numérico de los nombres
  const totalSuma = totalPrice + totalEstadoPago + totalNombreValue;

  // Crear una cadena para el reporte
  let reporte = "Reporte de Alquileres\n\n";

  // Crea un nuevo documento PDF
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' indica orientación horizontal

  const headers = [
    '#', 'Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra','Multas', 'Tiempo Inicio', 'Tiempo Fin'
  ];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    // alquiler.casilla.observacion,
    // alquiler.cajero.nombre,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte General';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar filas vacías para el total y dejar espacio para ello
  const emptyRows = 1; // Ajustar la cantidad de filas vacías
  for (let i = 0; i < emptyRows; i++) {
    body.push(['', '', '', '', '', '', '', '', '', '', '', '', '']);
  }

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extra:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total del valor numérico de los nombres
  body.push(['', '', '', '', '', 'Total Multas:', totalNombreValue, '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y valor numérico de los nombres
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 20, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

  // Guardar el archivo PDF
  // const fileName = 'reporte_casillas_vigentes.pdf';
  // doc.save(fileName);
},
//
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
generarReporteCompletoFechas() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
    return;
  }

  const fechaInicio = new Date(this.fechaInicio);
  const fechaFin = new Date(this.fechaFin);

  const dataForReport = this.list.filter(alquiler => {
    const iniFecha = new Date(alquiler.ini_fecha);
    return iniFecha >= fechaInicio && iniFecha <= fechaFin;
  });

  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total del valor numérico de los nombres sumando los valores numéricos de todas las observaciones de las casillas
  const totalNombreValue = dataForReport.reduce((total, alquiler) => {
    const nombreValue = parseFloat(alquiler.nombre) || 0;
    return total + nombreValue;
  }, 0);

  // Calcular el total de la suma de precios, estado de pago y valor numérico de los nombres
  const totalSuma = totalPrice + totalEstadoPago + totalNombreValue;

  const doc = new jsPDF('l', 'mm', 'a4');
  const headers = ['#', 'Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra','Multas', 'Tiempo Inicio', 'Tiempo Fin'];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  const emptyRows = 0;
  for (let i = 0; i < emptyRows; i++) {
    body.push(['', '', '', '', '', '', '', '', '', '', '', '']);
  }

  // Agregar título al reporte con espaciado
  const title = 'Reporte General';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2), '', '', '']);
  body.push(['', '', '', '', '', 'Total Llaves Extra:', totalEstadoPago.toFixed(2), '', '', '']);
  body.push(['', '', '', '', '', 'Total Multas:', totalNombreValue, '', '', '']);
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 10 + y, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

reportefechadeinicio() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
    return;
  }

  const fechaInicio = new Date(this.fechaInicio);
  const fechaFin = new Date(this.fechaFin);

  const casillasVencidas = this.list.filter(alquiler => {
    const iniFecha = new Date(alquiler.ini_fecha); // Usar ini_fecha en lugar de fin_fecha
    return iniFecha >= fechaInicio && iniFecha <= fechaFin;
  });

  const doc = new jsPDF('l', 'mm', 'a4');
  const headers = ['#', 'Cliente', 'Casilla', 'Carnet', 'SECCION', 'Precio', 'Tamaño', 'Estado', 'Tiempo Inicio', 'Tiempo Fin'];
  const body = casillasVencidas.map((alquiler, index) => [
    index + 1,
    // alquiler.casilla.observacion,
    // alquiler.cajero.nombre,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    alquiler.precio.precio,
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Fecha de Ingreso de Casillas Alquiladas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

  const casillasVencidas = this.list.filter(alquiler => {
    const finFecha = new Date(alquiler.fin_fecha);
    return finFecha >= fechaInicio && finFecha <= fechaFin;
  });

  const doc = new jsPDF('l', 'mm', 'a4');
  const headers = ['#','Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Estado', 'Tiempo Inicio', 'Tiempo Fin'];
  const body = casillasVencidas.map((alquiler, index) => [
    index + 1,
    // alquiler.casilla.observacion,
    // alquiler.cajero.nombre,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    alquiler.precio.precio,
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte Casillas Vencidas Entre Fechas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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
generarReporteCasillasVigentes() {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Filtrar la lista para obtener solo las casillas vigentes a la fecha actual y en estado 1
  const casillasVigentes = this.list.filter(alquiler => {
    const finFecha = new Date(alquiler.fin_fecha);
    return finFecha >= currentDate && alquiler.estado === 1;
  });

  // Calcular el total del precio
  const totalPrecio = casillasVigentes.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Crear un nuevo documento PDF
  const doc = new jsPDF('l', 'mm', 'a4');

  // Definir encabezados y datos del reporte
  const headers = [
    '#', 'Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Estado', 'Tiempo Inicio', 'Tiempo Fin'
  ];

  const body = casillasVigentes.map((alquiler, index) => [
    index + 1,
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

  // Agregar título al reporte con espaciado
  const title = 'Reporte Casillas Vigentes';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar el total del precio al final del reporte
  body.push(['', '', '', '', '', '', 'Total:', totalPrecio.toFixed(2), '', '', '']);

  // Generar la tabla en el documento PDF
  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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
generarReporteCasillasOcupadas() {
  // Filtrar la lista para obtener solo las casillas ocupadas
  const casillasOcupadas = this.list.filter(alquiler => alquiler.casilla.estado === 0);

  // Crear un nuevo documento PDF
  const doc = new jsPDF('l', 'mm', 'a4');

  const headers = [
    '#',
    'Cliente',
    'Casilla',
    'Sección',
    'Tamaño',
    'Estado',
    'Tiempo Inicio',
    'Tiempo Fin',
  ];

  const body = casillasOcupadas.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.casilla.seccione_id,
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte Casillas Ocupadas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
      overflow: 'linebreak',
      columnWidth: 'wrap',
    },
    columnStyles: {
      0: { cellWidth: 10 }, // Ajusta el ancho de la primera columna según sea necesario
      // Puedes ajustar los anchos de otras columnas si es necesario
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
generarReporteFechasPasadas() {
  const currentDate = new Date(); // Obtener la fecha actual
  const dataForReport = this.list.filter(alquiler => {
    // Filtrar los elementos con la fecha fin anterior a la fecha actual
    const finFecha = new Date(alquiler.fin_fecha);
    return finFecha < currentDate;
  });

  // Crear un documento PDF
  const doc = new jsPDF('l', 'mm', 'a4');

  const headers = [
    '#',
    'Cliente',
    'Telefono',
    'Casilla',
    'Carnet',
    'Sección',
    'Precio',
    'Tamaño',
    'Estado',
    'Tiempo Inicio',
    'Tiempo Fin',
  ];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.cliente.telefono,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    alquiler.precio.precio,
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte Casillas Vencidas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 15, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

  // Guardar el archivo PDF
  // const fileName = 'reporte_fechas_pasadas.pdf';
  // doc.save(fileName);
},
generarReporteCasillasPequenasFechas() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
    return;
  }

  const fechaInicio = new Date(this.fechaInicio);
  const fechaFin = new Date(this.fechaFin);

  const dataForReport = this.list.filter(alquiler => {
    const iniFecha = new Date(alquiler.ini_fecha);
    return iniFecha >= fechaInicio && iniFecha <= fechaFin && alquiler.categoria.nombre === 'Pequeña';
  });

  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total de las multas sumando los valores de las multas de todas las casillas
  const totalMultas = dataForReport.reduce((total, alquiler) => {
    const multas = parseFloat(alquiler.nombre) || 0;
    return total + multas;
  }, 0);

  // Calcular el total de la suma de los precios, estado de pago y multas
  const totalSuma = totalPrice + totalEstadoPago + totalMultas;

  const doc = new jsPDF('l', 'mm', 'a4');
  const headers = ['#','Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra','Multas', 'Tiempo Inicio', 'Tiempo Fin'];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Casillas Pequeñas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2),  '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extra:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de las multas
  body.push(['', '', '', '', '', 'Total Multas:', totalMultas.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y multas
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 10 + y, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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


generarReporteCasillasMedianasFechas() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
    return;
  }

  const fechaInicio = new Date(this.fechaInicio);
  const fechaFin = new Date(this.fechaFin);

  const dataForReport = this.list.filter(alquiler => {
    const iniFecha = new Date(alquiler.ini_fecha);
    return iniFecha >= fechaInicio && iniFecha <= fechaFin && alquiler.categoria.nombre === 'Mediana';
  });

  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las casillas
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total de las multas sumando los valores de las multas de todas las casillas
  const totalMultas = dataForReport.reduce((total, alquiler) => {
    const multas = parseFloat(alquiler.nombre) || 0;
    return total + multas;
  }, 0);

  // Calcular el total de la suma de los precios, estado de pago y multas
  const totalSuma = totalPrice + totalEstadoPago + totalMultas;

  const doc = new jsPDF('l', 'mm', 'a4');
  const headers = ['#','Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Alquiler','Llaves Extra','Multas', 'Tiempo Inicio', 'Tiempo Fin'];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Casillas Medianas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2),  '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extra:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de las multas
  body.push(['', '', '', '', '', 'Total Multas:', totalMultas.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y multas
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 10 + y, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

generarReporteGabetasFechas() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
    return;
  }

  const fechaInicio = new Date(this.fechaInicio);
  const fechaFin = new Date(this.fechaFin);

  const dataForReport = this.list.filter(alquiler => {
    const iniFecha = new Date(alquiler.ini_fecha);
    return iniFecha >= fechaInicio && iniFecha <= fechaFin && alquiler.categoria.nombre === 'Gabeta';
  });

  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas las gabetas
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total de las multas sumando los valores de las multas de todas las gabetas
  const totalMultas = dataForReport.reduce((total, alquiler) => {
    const multas = parseFloat(alquiler.nombre) || 0;
    return total + multas;
  }, 0);

  // Calcular el total de la suma de los precios, estado de pago y multas
  const totalSuma = totalPrice + totalEstadoPago + totalMultas;

  const doc = new jsPDF('l', 'mm', 'a4');
  const headers = ['#','Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Estado','Llaves Extra', 'Multas', 'Tiempo Inicio', 'Tiempo Fin'];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Gabetas';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2),  '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extra:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de las multas
  body.push(['', '', '', '', '', 'Total Multas:', totalMultas.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y multas
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 10 + y, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

generarReporteCajonFechas() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert("Por favor selecciona tanto la fecha de inicio como la fecha de fin.");
    return;
  }

  const fechaInicio = new Date(this.fechaInicio);
  const fechaFin = new Date(this.fechaFin);

  const dataForReport = this.list.filter(alquiler => {
    const iniFecha = new Date(alquiler.ini_fecha);
    return iniFecha >= fechaInicio && iniFecha <= fechaFin && alquiler.categoria.nombre === 'Cajon';
  });

  const totalPrice = dataForReport.reduce((total, alquiler) => {
    return total + parseFloat(alquiler.precio.precio);
  }, 0);

  // Calcular el total del estado de pago sumando los valores del estado de pago de todas los cajones
  const totalEstadoPago = dataForReport.reduce((total, alquiler) => {
    const estadoPago = parseFloat(alquiler.estado_pago);
    return isNaN(estadoPago) ? total : total + estadoPago;
  }, 0);

  // Calcular el total de las multas sumando los valores de las multas de todos los cajones
  const totalMultas = dataForReport.reduce((total, alquiler) => {
    const multas = parseFloat(alquiler.nombre) || 0;
    return total + multas;
  }, 0);

  // Calcular el total de la suma de los precios, estado de pago y multas
  const totalSuma = totalPrice + totalEstadoPago + totalMultas;

  const doc = new jsPDF('l', 'mm', 'a4');
  const headers = ['#','Cliente', 'Casilla', 'Carnet', 'Sección', 'Precio', 'Tamaño', 'Estado','Llaves Extra', 'Multas', 'Tiempo Inicio', 'Tiempo Fin'];

  const body = dataForReport.map((alquiler, index) => [
    index + 1,
    alquiler.cliente.nombre,
    alquiler.casilla.nombre,
    alquiler.cliente.carnet,
    alquiler.casilla.seccione_id,
    parseFloat(alquiler.precio.precio),
    alquiler.categoria.nombre,
    alquiler.casilla.estado === 1 ? 'Libre' : alquiler.casilla.estado === 2 ? 'Con Correspondecia' : 'Ocupado',
    alquiler.estado_pago,
    alquiler.nombre,
    alquiler.ini_fecha,
    alquiler.fin_fecha,
  ]);

  // Agregar título al reporte con espaciado
  const title = 'Reporte de Cajones';
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - titleWidth) / 2;
  const y = 10; // Ajustar el espaciado vertical aquí
  doc.text(title, x, y);

  // Agregar una fila para mostrar el total del precio
  body.push(['', '', '', '', '', 'Total Precio:', totalPrice.toFixed(2),  '', '', '']);

  // Agregar una fila para mostrar el total del estado de pago
  body.push(['', '', '', '', '', 'Total Llaves Extra:', totalEstadoPago.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de las multas
  body.push(['', '', '', '', '', 'Total Multas:', totalMultas.toFixed(2), '', '', '']);

  // Agregar una fila para mostrar el total de la suma de precios, estado de pago y multas
  body.push(['', '', '', '', '', 'Total Suma:', totalSuma.toFixed(2), '', '', '']);

  doc.autoTable({
    head: [headers],
    body: body,
    startY: 10 + y, // Ajustar la posición vertical del contenido
    theme: 'striped',
    margin: { top: 20 },
    styles: {
      fontSize: 6,
      cellPadding: 2,
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

    // Método para generar una alerta cuando una casilla está por vencer en un mes
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
    alert(`Tienes ${numeroCasillasPorVencer} casilla(s) por vencer en un mes.`);
  }
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
        default: return 'Ocupado';
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0].filter(item => item.estado === 1);
          this.casillasOcupadas = this.list.map((item) => item.casilla.nombre);
          this.filteredList = this.list;
        });
        this.generarAlertaCasillasPorVencer();
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    });
  },
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
</style>
