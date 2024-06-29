// Initialization for ES Users
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

initMDB({ Dropdown, Collapse });
$(document).ready(function () {
  $("#createCardButton").prop("disabled", true);

  function validarRut(rut) {
    if (rut.length < 9 || rut.length > 10) return false;

    var rutBody = rut.slice(0, -1);
    var dv = rut.slice(-1).toUpperCase();

    var suma = 0;
    var multiplo = 2;

    for (var i = rutBody.length - 1; i >= 0; i--) {
      suma += rutBody[i] * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    var dvEsperado = 11 - (suma % 11);
    dvEsperado =
      dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dv === dvEsperado;
  }

  function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var fechaNac = new Date(fechaNacimiento);
    var edad = hoy.getFullYear() - fechaNac.getFullYear();
    var mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }

  // Validar que los campos de RUT y celular solo acepten números
  $("#rut, #celular").on("input", function () {
    this.value = this.value.replace(/[^0-9kK]/g, "");
  });

  // Validar que los campos de nombre y apellidos solo acepten texto
  $("#nombre, #apellidoPaterno, #apellidoMaterno, #profesion").on(
    "input",
    function () {
      this.value = this.value.replace(/[^a-zA-ZñÑáÁéÉíÍóÓúÚ\s]/g, "");
    }
  );

  $("#fechaNacimiento").attr("max", new Date().toISOString().split("T")[0]);

  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    var rut = $("#rut").val().trim();
    var nombre = $("#nombre").val().trim();
    var apellidoPaterno = $("#apellidoPaterno").val().trim();
    var apellidoMaterno = $("#apellidoMaterno").val().trim();
    var edad = parseInt($("#edad").val().trim());
    var fechaNacimiento = $("#fechaNacimiento").val().trim();
    var correo = $("#correo").val().trim();
    var genero = $("#genero").val().trim();
    var celular = $("#celular").val().trim();

    if (!validarRut(rut)) {
      alert("RUT inválido.");
      return;
    }

    if (nombre.length < 3 || nombre.length > 20) {
      alert("El nombre debe tener entre 3 y 20 caracteres.");
      return;
    }

    if (apellidoPaterno.length < 3 || apellidoPaterno.length > 20) {
      alert("El apellido paterno debe tener entre 3 y 20 caracteres.");
      return;
    }

    if (apellidoMaterno.length < 3 || apellidoMaterno.length > 20) {
      alert("El apellido materno debe tener entre 3 y 20 caracteres.");
      return;
    }

    if (edad < 18 || edad > 35) {
      alert("La edad debe estar entre 18 y 35 años.");
      return;
    }
    if (celular < 8 || celular > 9) {
      alert("ingrese numero de celular denuevo");
      return;
    }

    if (!fechaNacimiento) {
      alert("Debe ingresar una fecha de nacimiento.");
      return;
    }

    var edadCalculada = calcularEdad(fechaNacimiento);
    if (edad !== edadCalculada) {
      alert("La fecha de nacimiento no coincide con la edad ingresada.");
      return;
    }

    if (!correo.includes("@")) {
      alert("El correo electrónico debe ser válido.");
      return;
    }

    if (!genero) {
      alert("Debe seleccionar un género.");
      return;
    }

    if (celular.length < 9 || celular.length > 12) {
      alert("El celular debe tener entre 9 y 12 caracteres.");
      return;
    }

    var formData = {
      rut: rut,
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      edad: edad,
      fechaNacimiento: fechaNacimiento,
      correo: correo,
      genero: genero,
      celular: celular,
    };

    var jsonData = JSON.stringify(formData);
    localStorage.setItem("formData", jsonData);

    alert("Formulario enviado exitosamente.");

    /* $("#createCardButton").prop("disabled", false); */

    $("#createCardButton").click(function () {
      $("#modal-text").text(
        "Mi nombre es " +
          formData.nombre +
          " " +
          formData.apellidoPaterno +
          " " +
          formData.apellidoMaterno +
          " y tengo " +
          formData.edad +
          " y me postulo para ayudante en las tareas a llevar en chiloe"
      );
      var myModal = new bootstrap.Modal(document.getElementById("modal"), {});
      myModal.show();
    });
  });

  $("#confirmButton").click(function () {
    var myModalEl = document.getElementById("modal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  });
});
