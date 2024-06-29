// Initialization for ES Users
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

initMDB({ Dropdown, Collapse });
$(document).ready(function () {
  // Validación de RUT chileno
  function validarRUT(rut) {
    // Lógica de validación de RUT chileno
    // (Esta es una versión simplificada, se recomienda buscar una validación completa)
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;
    var tmp = rut.split("-");
    var digv = tmp[1];
    var cuerpo = tmp[0];
    var suma = 0;
    var multiplo = 2;
    for (var i = 1; i <= cuerpo.length; i++) {
      var index = multiplo * rut.charAt(cuerpo.length - i);
      suma += index;
      if (multiplo < 7) {
        multiplo += 1;
      } else {
        multiplo = 2;
      }
    }
    var dvEsperado = 11 - (suma % 11);
    dv =
      dvEsperado == 10 ? "K" : dvEsperado == 11 ? "0" : dvEsperado.toString();
    return dv === digv.toUpperCase();
  }

  $("#registroForm").on("submit", function (event) {
    var rut = $("#id_rut").val() + "-" + $("#id_dv").val();
    if (!validarRUT(rut)) {
      alert("RUT inválido.");
      event.preventDefault();
      return false;
    }
  });

  // Cargar comunas desde la base de datos (Ejemplo de datos estáticos, reemplaza con una llamada AJAX si es necesario)
  var comunas = ["puente alto", "la florida", "can bernardo"];
  $.each(comunas, function (index, value) {
    $("#id_comuna").append($("<option>").text(value).attr("value", value));
  });
});
