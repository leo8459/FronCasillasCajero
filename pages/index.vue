<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        
        <div class="row">
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-white">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Casillas Totales</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.casillas }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-white">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Clientes</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.clientes }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-user text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Global Alquileres Hoy -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-white">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Alquileres Hoy</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.alquileresHoy }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-calendar-day text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Ingresos Totales -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-white">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Ingresos Totales</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.total_multas }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-dollar-sign text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <!-- Casillas Pequeñas -->
        <div class="row">
          <!-- Pequeñas Alquiladas Hoy -->
         
          <!-- Casillas Pequeñas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Total Casillas Pequeñas </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.pequeñas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Pequeñas Ocupadas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Pequeñas Alquiladas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.pequeñasocupadas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Pequeñas Libres -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Pequeñas Libres</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.pequeñaslibres1 }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Pequeñas Mantenimiento</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasMantenimientoPequenas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Pequeñas Vencidas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasVencidoPequenas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Pequeñas Correspondecia</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasConCorrespondenciaPequenas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Pequeñas Alquiladas Hoy</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.pequeñasHoy }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-calendar-day text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Ingresos Pequeñas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-blue">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Ingresos Pequeñas</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.total_multas_pequenas }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-dollar-sign text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Casillas Medianas -->
        <div class="row">        
          <!-- Casillas Medianas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-green">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Total Casillas Medianas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.medianas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Medianas Ocupadas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-green">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Medianas Alquiladas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.medianasocupadas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Medianas Libres -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-green">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Medianas Libres</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.medianaslibres }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-green">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Medianas Mantenimiento</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasMantenimientoMedianas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-green">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Medianas Vencidas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasVencidoMedianas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-green">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Medianas Correspondencia</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasConCorrespondenciaMedianas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <!-- Medianas Alquiladas Hoy -->
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card bg-light-green">
                <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Medianas Alquiladas Hoy</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.medianasHoy }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-calendar-day text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Ingresos Medianas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-green">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Ingresos Medianas</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.total_multas_medianas }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-dollar-sign text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gabetas -->
        <div class="row">
        
          <!-- Casillas Gabetas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-yellow">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Total Casillas Gabetas </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.gabetas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Gabetas Ocupadas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-yellow">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Gabetas Alquiladas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.gabetaocupadas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Gabetas Libres -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-yellow">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Gabetas Libres</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.gabetaslibres }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-yellow">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Gabetas Mantenimiento</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasMantenimientoGabeta }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-yellow">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Gabetas Vencidos</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasVencidoGabeta }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-yellow">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Gabetas Correspondecia</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasConCorrespondenciaGabeta }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <!-- Gabetas Alquiladas Hoy -->
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card bg-light-yellow">
                <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Gabetas Alquiladas Hoy</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.gabetasHoy }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-calendar-day text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Ingresos Gabetas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-yellow">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Ingresos Gabetas</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.total_multas_gabeta }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-dollar-sign text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cajones -->
        <div class="row">
        
          <!-- Casillas Cajones -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-red">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Total Casillas Cajones </p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.cajones }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Cajones Ocupadas -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-red">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Cajones Alquiladas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.cajonocupadas }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Casillas Cajones Libres -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-red">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Cajones Libres</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.cajoneslibres }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-red">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Cajones Mantenimiento</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasMantenimientoCajon }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-red">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Cajones Vencidas</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasVencidoCajon }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-red">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize">Casillas Cajones Correspondecia</p>
                      <h5 class="text-info text-center font-weight-bolder mb-0">{{ dashboard.casillasConCorrespondenciaCajon }}</h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-box text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <!-- Cajones Alquiladas Hoy -->
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card bg-light-red">
                <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Cajones Alquiladas Hoy</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.cajonesHoy }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-calendar-day text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Ingresos Cajones -->
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card bg-light-red">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize"><strong>Ingresos Cajones</strong></p>
                      <h6 class="text-center text-lg font-weight-bolder text-black">{{ dashboard.total_multas_cajon }}</h6>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="fas fa-dollar-sign text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card-body p-3">
          <div class="row">
            <div class="text-center">
              <h6>
                <span class="font-weight-bold text-blue fs-4">Bienvenido al sistema de</span>
                <span class="text-color-ganadores fs-4">Recaudacion de Casillas AGBC</span>
              </h6>
            </div>
          </div>
          <div class="row justify-content-center mt-3">
            <img src="/assets/imagenes/logo.png" alt="Logo Casillas AGBC" class="logo-image">
          </div>
        </div>
      </div>
    </AdminTemplate>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      user: {},
      variableInt: null,
      page: "Dashboard",
      modulo: "Dashboard",
      load: false,
      dashboard: {
        alquileres: 10,
        users: 10,
        clientes: 10,
        casillas: 10,
        alquileresHoy: 0,
        pequeñasHoy: 0,
        medianasHoy: 0,
        gabetasHoy: 0,
        cajonesHoy: 0,
        pequeñas: 0,
        medianas: 0,
        gabetas: 0,
        cajones: 0,
        pequeñasocupadas: 0,
        medianasocupadas: 0,
        gabetaocupadas: 0,
        cajonocupadas: 0,
        pequeñaslibres1: 0,
        medianaslibres: 0,
        gabetaslibres: 0,
        cajoneslibres: 0,
        total_multas_pequenas: 0,
        total_multas_medianas: 0,
        total_multas_gabeta: 0,
        total_multas_cajon: 0,
        total_multas: 0,
      },
    };
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
  },
  formatKey(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    }).replace(/\d+/g, function (match) {
      return ' ' + match;
    }).trim();
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        const data = await this.GET_DATA('/dashboard');
        this.dashboard.alquileres = data.alquileres;
        this.dashboard.users = data.users;
        this.dashboard.clientes = data.clientes;
        this.dashboard.casillas = data.casillas;
        this.dashboard.precios = data.precios;
        this.dashboard.pequeñas = data.pequeñas;
        this.dashboard.medianas = data.medianas;
        this.dashboard.cajones = data.cajones;
        this.dashboard.gabetas = data.gabetas;
        this.dashboard.pequeñaslibres1 = data.pequeñaslibres1;
        this.dashboard.medianaslibres = data.medianaslibres;
        this.dashboard.gabetaslibres = data.gabetaslibres;
        this.dashboard.cajoneslibres = data.cajoneslibres;
        this.dashboard.categorias = data.categorias;
        this.dashboard.pequeñasocupadas = data.pequeñasocupadas;
        this.dashboard.medianasocupadas = data.medianasocupadas;
        this.dashboard.gabetaocupadas = data.gabetaocupadas;
        this.dashboard.cajonocupadas = data.cajonocupadas;
        this.dashboard.alquileresHoy = data.alquileresHoy;
        this.dashboard.pequeñasHoy = data.pequeñasHoy;
        this.dashboard.medianasHoy = data.medianasHoy;
        this.dashboard.gabetasHoy = data.gabetasHoy;
        this.dashboard.cajonesHoy = data.cajonesHoy;
        this.dashboard.total_multas_pequenas = data.total_multas_pequenas;
        this.dashboard.total_multas_medianas = data.total_multas_medianas;
        this.dashboard.total_multas_gabeta = data.total_multas_gabeta;
        this.dashboard.total_multas_cajon = data.total_multas_cajon;
        this.dashboard.casillasMantenimientoPequenas = data.casillas_mantenimiento_pequenas;
        this.dashboard.casillasMantenimientoMedianas = data.casillas_mantenimiento_medianas;
        this.dashboard.casillasMantenimientoGabeta = data.casillas_mantenimiento_gabeta;
        this.dashboard.casillasMantenimientoCajon = data.casillas_mantenimiento_cajon;
        this.dashboard.casillasVencidoPequenas = data.casillas_vencido_pequenas;
        this.dashboard.casillasVencidoMedianas = data.casillas_vencido_medianas;
        this.dashboard.casillasVencidoGabeta = data.casillas_vencido_gabeta;
        this.dashboard.casillasVencidoCajon = data.casillas_vencido_cajon;
        this.dashboard.casillasConCorrespondenciaPequenas = data.casillas_con_correspondencia_pequenas;
        this.dashboard.casillasConCorrespondenciaMedianas = data.casillas_con_correspondencia_medianas;
        this.dashboard.casillasConCorrespondenciaGabeta = data.casillas_con_correspondencia_gabeta;
        this.dashboard.casillasConCorrespondenciaCajon = data.casillas_con_correspondencia_cajon;
        this.dashboard.total_multas = data.total_multas;
        const totalCasillas = data.pequeñas + data.medianas + data.cajones + data.gabetas;
        this.dashboard.casillas = totalCasillas;
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    });
  },
};
</script>

<style scoped>
.bg-light-blue {
  background-color: #e3f2fd;
}
.bg-light-green {
  background-color: #e8f5e9;
}
.bg-light-yellow {
  background-color: #fffde7;
}
.bg-light-red {
  background-color: #ffebee;
}
.bg-light-white {
  background-color: #ffffff;
}
</style>
