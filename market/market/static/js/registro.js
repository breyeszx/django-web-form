$(document).ready(function () {
  // Método personalizado para validar el RUT chileno
  $.validator.addMethod(
    "rut",
    function (value, element) {
      return this.optional(element) || validarRut(value);
    },
    "El RUT ingresado no es válido"
  );

  // Método personalizado para permitir solo letras
  $.validator.addMethod(
    "lettersonly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    },
    "Solo se permiten letras"
  );

  // Método personalizado para validar la longitud del RUT
  $.validator.addMethod(
    "rutLength",
    function (value, element) {
      var parts = value.split("-");
      if (parts.length != 2) {
        return false;
      }
      var rut = parts[0].replace(/\./g, ""); // Quita los puntos
      return this.optional(element) || (rut.length >= 7 && rut.length <= 8);
    },
    "El RUT debe tener 7 u 8 dígitos antes del guion"
  );

  // Método personalizado para validar la longitud del teléfono (permitiendo espacios)
  $.validator.addMethod(
    "phoneLength",
    function (value, element) {
      return this.optional(element) || value.replace(/\s/g, "").length === 9;
    },
    "El teléfono debe tener 9 dígitos"
  );

  // Método personalizado para validar que el DV coincida
  $.validator.addMethod(
    "dvMatch",
    function (value, element) {
      var rut = $("#rut").val().split("-")[0].replace(/\./g, "");
      return this.optional(element) || dv(rut) == value.toLowerCase();
    },
    "El dígito verificador no coincide"
  );

  $("#trabajadorForm").validate({
    rules: {
      rut: {
        required: true,
        rut: true, // Validación personalizada del RUT
        rutLength: true, // Validación de longitud del RUT
      },
      telefono: {
        required: true,
        digits: true,
        phoneLength: true, // Validación de longitud del teléfono
      },
      nombre: {
        required: true,
        lettersonly: true,
      },
      direccion: {
        required: true,
        // Permite letras y espacios
        lettersonly: {
          param: true,
          depends: function (element) {
            return $(element).val().trim() !== "";
          },
        },
      },
      ocupacion: {
        required: true,
        lettersonly: true,
      },
      profesion: {
        required: true,
        lettersonly: true,
      },
      puesto: {
        required: true,
        lettersonly: true,
      },
      dv: {
        required: true,
        pattern: /^[0-9Kk]{1}$/,
        dvMatch: true, // Validación para que coincida el DV
      },
    },
    messages: {
      rut: {
        required: "Por favor ingrese su RUT",
        rut: "El RUT ingresado no es válido",
        rutLength: "El RUT debe tener 7 u 8 dígitos antes del guion",
      },
      telefono: {
        required: "Por favor ingrese su teléfono",
        digits: "Solo se permiten números",
        phoneLength: "El teléfono debe tener 9 dígitos",
      },
      nombre: {
        required: "Por favor ingrese su nombre",
        lettersonly: "Solo se permiten letras",
      },
      direccion: {
        required: "Por favor ingrese su dirección",
        lettersonly: "Solo se permiten letras y espacios",
      },
      ocupacion: {
        required: "Por favor ingrese su ocupación",
        lettersonly: "Solo se permiten letras",
      },
      profesion: {
        required: "Por favor ingrese su profesión",
        lettersonly: "Solo se permiten letras",
      },
      puesto: {
        required: "Por favor ingrese su puesto",
        lettersonly: "Solo se permiten letras",
      },
      dv: {
        required: "Por favor ingrese su dígito verificador",
        pattern: "Solo se permiten números y la letra K",
        dvMatch: "El dígito verificador no coincide",
      },
    },
  });

  // Función para validar el RUT chileno
  function validarRut(rutCompleto) {
    if (!/^[0-9\.]+-[0-9Kk]$/.test(rutCompleto)) {
      return false;
    }
    var tmp = rutCompleto.split("-");
    var digv = tmp[1];
    var rut = tmp[0].replace(/\./g, ""); // Quita los puntos
    if (digv == "K") digv = "k";
    return dv(rut) == digv;
  }

  function dv(T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) {
      S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    }
    return S ? S - 1 : "k";
  }
});
