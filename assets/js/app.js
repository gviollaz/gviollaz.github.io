/* =========================================================================
   SERVICIOS JEMKY - Logica del sitio
   [IA 2026-08-18] Lee assets/js/config.js y arma la parte variable de la
   pagina. Regla central: lo que no esta configurado NO se muestra, en vez
   de aparecer vacio o con un dato inventado.
   ========================================================================= */
(function () {
  "use strict";

  if (typeof CONFIG === "undefined") {
    console.error("[Jemky] Falta assets/js/config.js. El sitio se muestra sin datos de contacto.");
    return;
  }

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  var ico = function (id, cls) {
    return '<svg aria-hidden="true"' + (cls ? ' class="' + cls + '"' : "") + '><use href="#' + id + '"/></svg>';
  };

  var P  = CONFIG.pendientes || {};
  var WA = (P.whatsapp || "").replace(/[^0-9]/g, "");   // solo digitos
  var HAY_WA = WA.length >= 10;

  function linkWA(texto) {
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(texto || P.whatsapp_msg || "");
  }

  /* ---------------------------------------------------------------------
     1. BARRA DEMO + AVISO DE CONFIGURACION
     ------------------------------------------------------------------ */
  var enProd = !!(CONFIG.publicacion && CONFIG.publicacion.en_produccion);
  if (enProd) {
    var barra = $("#barra-demo");   if (barra) barra.remove();
    var pieD  = $("#pie-demo");     if (pieD)  pieD.remove();

    // [IA 2026-08-18] El <meta robots> lo lee el buscador al parsear el HTML:
    // sacarlo desde JS no garantiza nada. Por eso avisamos en vez de "arreglarlo".
    if (document.querySelector('meta[name="robots"]')) {
      console.warn("[Jemky] en_produccion = true PERO el <meta name=\"robots\" content=\"noindex\"> " +
                   "sigue en index.html. Google no va a indexar el sitio. Borrá esa linea del <head>.");
    }
  }

  /* ---------------------------------------------------------------------
     2. TELEFONOS: cabecera, pie, acciones moviles y tarjetas de gerentes
     ------------------------------------------------------------------ */
  var contactos = CONFIG.contactos || [];

  var elTel = $("#tel-cabecera");
  if (elTel) {
    elTel.innerHTML = contactos.map(function (c) {
      return '<a href="tel:' + esc(c.tel_link) + '">' + ico("i-tel") +
             esc(c.nombre.split(" ")[0]) + ": " + esc(c.telefono) + "</a>";
    }).join("");
  }

  var elGer = $("#lista-gerentes");
  if (elGer) {
    elGer.innerHTML = contactos.map(function (c) {
      var wa = HAY_WA
        ? '<a href="' + linkWA("Hola " + c.nombre.split(" ")[0] + ", quisiera consultar por un servicio.") +
          '" class="btn btn--wa" target="_blank" rel="noopener">' + ico("i-wa") + "WhatsApp</a>"
        : "";
      return '<div class="gerente">' +
               "<h3>" + esc(c.nombre) + "</h3>" +
               '<div class="gerente__cargo">' + esc(c.cargo) + "</div>" +
               '<div class="gerente__acciones">' +
                 '<a href="tel:' + esc(c.tel_link) + '" class="btn btn--primario">' +
                   ico("i-tel") + esc(c.telefono) + "</a>" + wa +
               "</div>" +
             "</div>";
    }).join("");
  }

  var elPie = $("#pie-contacto");
  if (elPie) {
    var filas = contactos.map(function (c) {
      return "<li><a href='tel:" + esc(c.tel_link) + "'>" + esc(c.nombre) + " — " + esc(c.telefono) + "</a></li>";
    });
    filas.push("<li>" + esc((CONFIG.empresa && CONFIG.empresa.ciudad) || "") + "</li>");
    if (P.email)     filas.push("<li><a href='mailto:" + esc(P.email) + "'>" + esc(P.email) + "</a></li>");
    if (P.direccion) filas.push("<li>" + esc(P.direccion) + "</li>");
    if (P.horarios)  filas.push("<li>" + esc(P.horarios) + "</li>");
    elPie.innerHTML = filas.join("");
  }

  var elMov = $("#acciones-movil");
  if (elMov) {
    var primero = contactos[0];
    var html = "";
    if (primero) {
      html += '<a href="tel:' + esc(primero.tel_link) + '" class="btn btn--primario">' +
              ico("i-tel") + "Llamar ahora</a>";
    }
    html += HAY_WA
      ? '<a href="' + linkWA() + '" class="btn btn--wa" target="_blank" rel="noopener">' + ico("i-wa") + "WhatsApp</a>"
      : '<a href="#contacto" class="btn btn--oscuro" style="color:#FFB800">' + ico("i-doc") + "Presupuesto</a>";
    elMov.innerHTML = html;
  }

  /* ---------------------------------------------------------------------
     3. DATOS PENDIENTES: se muestran solo si estan cargados
     ------------------------------------------------------------------ */
  function mostrarDato(idCaja, valor) {
    var caja = $(idCaja);
    if (!caja || !valor) return;
    $("span", caja).textContent = valor;
    caja.classList.remove("oculto");
  }
  mostrarDato("#dato-direccion", P.direccion);
  mostrarDato("#dato-email",     P.email);
  mostrarDato("#dato-horarios",  P.horarios);

  if (P.email) {
    var s = $("#dato-email span");
    if (s) s.innerHTML = "<a href='mailto:" + esc(P.email) + "' style='color:#FFB800'>" + esc(P.email) + "</a>";
  }

  if (P.mapa_embed) {
    var m = $("#caja-mapa");
    if (m) {
      m.innerHTML = '<iframe src="' + esc(P.mapa_embed) + '" width="100%" height="240" ' +
                    'style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
                    'title="Ubicación de Servicios Jemky"></iframe>';
      m.classList.remove("oculto");
    }
  }

  var redes = [
    { k: "instagram", n: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8zm0 10.6a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zM18.9 5.1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" },
    { k: "facebook",  n: "Facebook",  d: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" },
    { k: "linkedin",  n: "LinkedIn",  d: "M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6v11.4z" }
  ].filter(function (r) { return P[r.k]; });

  if (redes.length) {
    var cajaR = $("#redes");
    if (cajaR) {
      cajaR.innerHTML = redes.map(function (r) {
        return '<a href="' + esc(P[r.k]) + '" target="_blank" rel="noopener" aria-label="' + r.n + '">' +
               '<svg viewBox="0 0 24 24" fill="currentColor"><path d="' + r.d + '"/></svg></a>';
      }).join("");
      cajaR.classList.remove("oculto");
    }
  }

  var anio = $("#anio");
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     4. MENU MOVIL
     ------------------------------------------------------------------ */
  var nav = $("#nav"), btnMenu = $("#btn-menu"), usoIcono = $("#icono-menu");

  function cerrarMenu() {
    if (!nav) return;
    nav.classList.remove("abierto");
    if (btnMenu) btnMenu.setAttribute("aria-expanded", "false");
    if (usoIcono) usoIcono.setAttribute("href", "#i-menu");
  }

  if (btnMenu && nav) {
    btnMenu.addEventListener("click", function () {
      var abierto = nav.classList.toggle("abierto");
      btnMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
      if (usoIcono) usoIcono.setAttribute("href", abierto ? "#i-x" : "#i-menu");
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", cerrarMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarMenu(); });
  }

  /* ---------------------------------------------------------------------
     5. NAV ACTIVO SEGUN SCROLL
     ------------------------------------------------------------------ */
  var enlaces  = $$('#nav a[href^="#"]').filter(function (a) { return !a.classList.contains("btn"); });
  var destinos = enlaces.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);

  if ("IntersectionObserver" in window && destinos.length) {
    var obsNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        enlaces.forEach(function (a) {
          a.classList.toggle("activo", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    destinos.forEach(function (d) { obsNav.observe(d); });
  }

  /* ---------------------------------------------------------------------
     6. ANIMACION DE ENTRADA
     ------------------------------------------------------------------ */
  var aparecen = $$(".aparece");
  if ("IntersectionObserver" in window) {
    var obsAp = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    aparecen.forEach(function (el) { obsAp.observe(el); });
  } else {
    aparecen.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------------------------------------------------------------------
     7. BOTON VOLVER ARRIBA
     ------------------------------------------------------------------ */
  var btnArriba = $("#btn-arriba");
  if (btnArriba) {
    btnArriba.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", function () {
      btnArriba.classList.toggle("visible", window.scrollY > 600);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     8. PRODUCTOS: filtro por categoria + buscador
     ------------------------------------------------------------------ */
  var tarjetas = $$("#grilla-productos .prod");
  var inputBus = $("#buscar-prod");
  var sinRes   = $("#sin-resultados");
  var catActiva = "todos";

  // guardamos el texto original de cada item para poder resaltar y restaurar
  tarjetas.forEach(function (t) {
    $$("li", t).forEach(function (li) { li.dataset.txt = li.textContent; });
  });

  function normalizar(t) {
    // Saca los acentos para que "teflón" tambien matchee escribiendo "teflon".
    // El rango U+0300-U+036F son las marcas diacriticas combinantes; va en
    // escapes y no como literal para que no se rompa al cambiar de codificacion.
    return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function filtrar() {
    var q = normalizar((inputBus && inputBus.value || "").trim());
    var visibles = 0;

    tarjetas.forEach(function (t) {
      var okCat = (catActiva === "todos") || (t.dataset.cat === catActiva);
      var items = $$("li", t);
      var hayMatch = false;

      items.forEach(function (li) {
        var original = li.dataset.txt;
        if (!q) { li.innerHTML = esc(original); li.classList.remove("oculto"); return; }

        var pos = normalizar(original).indexOf(q);
        if (pos === -1) {
          li.innerHTML = esc(original);
          li.classList.add("oculto");
        } else {
          hayMatch = true;
          li.classList.remove("oculto");
          li.innerHTML = esc(original.slice(0, pos)) +
                         "<mark>" + esc(original.slice(pos, pos + q.length)) + "</mark>" +
                         esc(original.slice(pos + q.length));
        }
      });

      // tambien buscamos en el titulo de la categoria
      var titulo = $("h3", t);
      if (q && titulo && normalizar(titulo.textContent).indexOf(q) !== -1) {
        hayMatch = true;
        items.forEach(function (li) { li.classList.remove("oculto"); });
      }

      var mostrar = okCat && (!q || hayMatch);
      t.classList.toggle("oculto", !mostrar);
      if (mostrar) visibles++;
    });

    if (sinRes) sinRes.classList.toggle("oculto", visibles > 0);
  }

  $$("#filtros .filtro").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#filtros .filtro").forEach(function (o) { o.classList.remove("activo"); });
      b.classList.add("activo");
      catActiva = b.dataset.cat;
      filtrar();
    });
  });

  if (inputBus) {
    var reloj;
    inputBus.addEventListener("input", function () {
      clearTimeout(reloj);
      reloj = setTimeout(filtrar, 130);
    });
  }

  /* ---------------------------------------------------------------------
     9. FORMULARIO
     ------------------------------------------------------------------ */
  var form      = $("#form-presupuesto");
  var cajaForm  = $("#caja-formulario");
  var exito     = $("#pantalla-exito");
  var btnEnviar = $("#btn-enviar");
  var btnOtra   = $("#btn-otra");
  var F         = CONFIG.formulario || {};
  var MODO_DEMO = !F.endpoint;
  var MAX_MB    = F.adjuntos_max_mb || 10;

  var pesoMax = $("#peso-max"); if (pesoMax) pesoMax.textContent = MAX_MB;

  // aviso de modo demo
  if (MODO_DEMO) {
    var av = $("#aviso-demo");
    if (av) av.classList.remove("oculto");
  }

  // aclaracion honesta sobre los adjuntos
  var ayudaAdj = $("#ayuda-adjuntos");
  if (ayudaAdj) {
    ayudaAdj.textContent = MODO_DEMO
      ? "Los archivos se listan acá, pero todavía no se envían: falta configurar el servicio de formularios."
      : "Si el servicio de formularios contratado no admite adjuntos, vamos a pedirte los archivos por WhatsApp o correo.";
  }

  /* --- adjuntos --- */
  var zona     = $("#zona-adjuntos");
  var inputArc = $("#f-archivos");
  var listaArc = $("#lista-adjuntos");
  var archivos = [];

  function pintarArchivos() {
    if (!listaArc) return;
    listaArc.innerHTML = archivos.map(function (a, i) {
      return '<div class="adjunto">' + ico("i-doc") +
             '<span class="adjunto__nom">' + esc(a.name) + "</span>" +
             '<span class="adjunto__peso">' + (a.size / 1048576).toFixed(1) + " MB</span>" +
             '<button type="button" aria-label="Quitar ' + esc(a.name) + '" data-i="' + i + '">&times;</button>' +
             "</div>";
    }).join("");
    $$("button", listaArc).forEach(function (b) {
      b.addEventListener("click", function () {
        archivos.splice(parseInt(b.dataset.i, 10), 1);
        pintarArchivos();
      });
    });
  }

  function agregarArchivos(lista) {
    Array.prototype.forEach.call(lista, function (a) {
      if (a.size > MAX_MB * 1048576) {
        alert('El archivo "' + a.name + '" pesa ' + (a.size / 1048576).toFixed(1) +
              " MB y el máximo es " + MAX_MB + " MB.");
        return;
      }
      archivos.push(a);
    });
    pintarArchivos();
  }

  if (zona && inputArc) {
    zona.addEventListener("click", function () { inputArc.click(); });
    zona.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputArc.click(); }
    });
    inputArc.addEventListener("change", function () { agregarArchivos(inputArc.files); inputArc.value = ""; });

    ["dragenter", "dragover"].forEach(function (ev) {
      zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.add("encima"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.remove("encima"); });
    });
    zona.addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files) agregarArchivos(e.dataTransfer.files);
    });
  }

  /* --- validacion --- */
  function ponerError(campo, msg) {
    var caja = $('[data-error-de="' + campo.id + '"]');
    if (caja) caja.textContent = msg || "";
    campo.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validar() {
    var ok = true, primero = null;

    $$("[required]", form).forEach(function (campo) {
      var v = campo.value.trim();
      var msg = "";

      if (!v) {
        msg = "Este campo es obligatorio.";
      } else if (campo.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        msg = "Revisá el formato del correo.";
      } else if (campo.type === "tel" && v.replace(/[^0-9]/g, "").length < 7) {
        msg = "Ingresá un teléfono válido.";
      } else if (campo.id === "f-detalle" && v.length < 15) {
        msg = "Contanos un poco más: marca, modelo y qué necesitás.";
      }

      ponerError(campo, msg);
      if (msg) { ok = false; if (!primero) primero = campo; }
    });

    if (primero) {
      primero.focus();
      primero.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return ok;
  }

  $$("[required]", form || document).forEach(function (campo) {
    campo.addEventListener("blur", function () {
      if (campo.getAttribute("aria-invalid") === "true") validar();
    });
  });

  /* --- resumen en texto (para WhatsApp) --- */
  function resumen() {
    var d = new FormData(form);
    var lineas = [
      "*Solicitud de presupuesto — Servicios Jemky*",
      "",
      "Nombre: "  + (d.get("nombre")   || "-"),
      "Empresa: " + (d.get("empresa")  || "-"),
      "Teléfono: " + (d.get("telefono") || "-"),
      "WhatsApp: " + (d.get("whatsapp") || "-"),
      "Email: "   + (d.get("email")    || "-"),
      "Tipo de consulta: " + (d.get("tipo") || "-"),
      "",
      "Detalle:",
      d.get("detalle") || "-"
    ];
    if (archivos.length) {
      lineas.push("", "Adjuntos a enviar: " + archivos.map(function (a) { return a.name; }).join(", "));
    }
    return lineas.join("\n");
  }

  function mostrarExito() {
    if (cajaForm) cajaForm.classList.add("oculto");
    if (exito) {
      exito.classList.remove("oculto");
      exito.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  if (btnOtra) {
    btnOtra.addEventListener("click", function () {
      form.reset();
      archivos = [];
      pintarArchivos();
      $$("[aria-invalid]", form).forEach(function (c) { ponerError(c, ""); });
      if (exito) exito.classList.add("oculto");
      if (cajaForm) {
        cajaForm.classList.remove("oculto");
        cajaForm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validar()) return;

      // --- MODO DEMO: sin endpoint no hay envio real ---
      if (MODO_DEMO) {
        console.warn("[Jemky] Formulario en modo demo. Consulta NO enviada:\n" + resumen());
        if (HAY_WA) {
          var b = $("#btn-wa-form");
          if (b) { b.href = linkWA(resumen()); b.classList.remove("oculto"); }
        }
        mostrarExito();
        return;
      }

      // --- ENVIO REAL ---
      btnEnviar.disabled = true;
      var textoOriginal = btnEnviar.innerHTML;
      btnEnviar.innerHTML = "Enviando…";

      var datos = new FormData(form);
      if (F.web3forms_key) datos.append("access_key", F.web3forms_key);
      datos.append("_subject", "Presupuesto web — " + (datos.get("nombre") || ""));
      archivos.forEach(function (a, i) { datos.append("adjunto_" + (i + 1), a, a.name); });

      fetch(F.endpoint, { method: "POST", body: datos, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          mostrarExito();
        })
        .catch(function (err) {
          console.error("[Jemky] Falló el envío del formulario:", err);
          var extra = HAY_WA ? " Probá enviarnos la consulta por WhatsApp." : " Probá llamarnos por teléfono.";
          alert("No pudimos enviar la consulta." + extra);
          if (HAY_WA) {
            var bw = $("#btn-wa-form");
            if (bw) { bw.href = linkWA(resumen()); bw.classList.remove("oculto"); }
          }
        })
        .finally(function () {
          btnEnviar.disabled = false;
          btnEnviar.innerHTML = textoOriginal;
        });
    });
  }

  /* ---------------------------------------------------------------------
     10. RESUMEN DE CONFIGURACION EN CONSOLA (ayuda para quien administra)
     ------------------------------------------------------------------ */
  var faltan = ["whatsapp", "direccion", "email", "horarios"].filter(function (k) { return !P[k]; });
  if (faltan.length || MODO_DEMO) {
    console.info(
      "%c[Servicios Jemky] Configuración pendiente",
      "background:#FFB800;color:#15171B;font-weight:bold;padding:2px 6px;border-radius:3px",
      "\n· Campos vacíos en config.js: " + (faltan.length ? faltan.join(", ") : "ninguno") +
      "\n· Formulario: " + (MODO_DEMO ? "MODO DEMO (no envía)" : "conectado a " + F.endpoint) +
      "\n· Se completa en assets/js/config.js — ver CONTENIDO-PENDIENTE.md"
    );
  }
})();
