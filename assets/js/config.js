/* =========================================================================
   SERVICIOS JEMKY — PANEL DE CONFIGURACION
   =========================================================================
   [IA 2026-08-18] Este archivo hace de "administrador" del sitio.
   GitHub Pages es hosting estatico: no hay base de datos ni panel web.
   Todo lo que este pendiente de definir se completa ACA y se refleja
   automaticamente en la pagina.

   REGLA: si un campo queda como "", el sitio OCULTA ese bloque en vez de
   mostrar un dato inventado o un espacio vacio.
   ========================================================================= */

const CONFIG = {

  /* -----------------------------------------------------------------------
     1. DATOS CONFIRMADOS (provistos por el cliente)
     -------------------------------------------------------------------- */
  empresa: {
    nombre:  "SERVICIOS JEMKY",
    rubro:   "Hidraulica · Neumática · Mecánica",
    ciudad:  "Salta Capital, Argentina",
    anios:   40
  },

  contactos: [
    {
      nombre:   "José Luis Moreno Fasola",
      cargo:    "Socio Gerente",
      telefono: "0387-6341433",
      tel_link: "+543876341433"     // formato para el boton "Llamar"
    },
    {
      nombre:   "Carlos Javier Aranda",
      cargo:    "Socio Gerente",
      telefono: "0387-4414740",
      tel_link: "+543874414740"
    }
  ],

  /* -----------------------------------------------------------------------
     2. PENDIENTES — completar cuando el cliente los provea
     -------------------------------------------------------------------- */
  pendientes: {

    // WhatsApp. FORMATO OBLIGATORIO: codigo pais + 9 + area SIN 0 + numero SIN 15.
    // Salta -> "5493874414740". NO usar guiones, espacios, "0" ni "15".
    // [IA 2026-08-18] Sin verificar cual de las dos lineas tiene WhatsApp:
    // 0387-4414740 tiene formato de telefono FIJO. Confirmar con el cliente.
    whatsapp: "",
    whatsapp_msg: "Hola, quisiera consultar por un servicio de Servicios Jemky.",

    direccion:  "",   // ej: "Av. Ejemplo 1234, Salta"
    email:      "",   // ej: "contacto@serviciosjemky.com.ar"
    horarios:   "",   // ej: "Lunes a viernes de 8 a 18 h"
    mapa_embed: "",   // URL "src" del iframe de Google Maps

    instagram:  "",
    facebook:   "",
    linkedin:   ""
  },

  /* -----------------------------------------------------------------------
     3. FORMULARIO
     -------------------------------------------------------------------- */
  formulario: {
    // GitHub Pages NO puede procesar formularios: no hay servidor.
    // Hace falta un servicio externo. Pegar aca la URL del endpoint.
    //   Formspree   -> https://formspree.io/f/XXXXXXXX
    //   Web3Forms   -> https://api.web3forms.com/submit
    //   FormSubmit  -> https://formsubmit.co/tu@email.com
    // ADJUNTOS: en Formspree y Web3Forms los archivos requieren PLAN PAGO.
    // Con el plan gratuito el formulario envia el texto, no los archivos.
    endpoint: "",

    // Si el endpoint es Web3Forms, ademas hace falta su access key:
    web3forms_key: "",

    // Con endpoint vacio el formulario entra en MODO DEMO: valida los campos,
    // muestra el mensaje de exito y ofrece enviar la consulta por WhatsApp.
    // No se pierde ninguna consulta, pero tampoco llega ningun mail.
    adjuntos_max_mb: 10
  },

  /* -----------------------------------------------------------------------
     4. PUBLICACION
     -------------------------------------------------------------------- */
  publicacion: {
    // false  -> el sitio pide a Google NO indexarlo + muestra la barra "DEMO".
    // true   -> sitio productivo: se indexa y desaparece la barra.
    // [IA 2026-08-18] Arranca en false a proposito: Servicios Jemky es una
    // empresa real y estos son telefonos reales de personas reales. Poner en
    // true recien cuando el cliente apruebe la publicacion.
    en_produccion: false
  }
};
