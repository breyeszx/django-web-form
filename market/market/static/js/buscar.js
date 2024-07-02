$(document).ready(function () {
  function buscarServicios() {
    var query = $("#search").val();
    var costo_rango = $("#costo_rango").val();
    var duracion = $("#duracion").val();
    var requisitos = $("#requisitos").is(":checked") ? 1 : "";

    $.get(
      "/consulta/buscar/",
      {
        q: query,
        costo_rango: costo_rango,
        duracion: duracion,
        requisitos: requisitos,
      },
      function (data) {
        $("#resultados").empty();
        data.forEach(function (servicio) {
          $("#resultados").append(
            '<li class="list-group-item">' +
              servicio.nombre +
              ": " +
              servicio.descripcion +
              " - " +
              servicio.costo +
              " - " +
              servicio.duracion +
              " - " +
              (servicio.requisitos ? "Requiere" : "No requiere") +
              "</li>"
          );
        });
      }
    );
  }

  $("#buscar").on("click", buscarServicios);

  // Inicializar la búsqueda al cargar la página
  buscarServicios();
});
