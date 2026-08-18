# gviollaz.github.io

Sitio de ejemplo del **curso de Marketing Digital**, publicado con GitHub Pages.

Caso desarrollado: **Servicios Jemky** — hidráulica, neumática y mecánica industrial,
Salta Capital. Sitio de una sola página orientado a generar consultas.

- **URL:** https://gviollaz.github.io/
- **Fuente:** rama `main`, carpeta raíz (`/`)
- **Motor:** archivos estáticos. El `.nojekyll` desactiva el procesamiento de Jekyll.

> ⚠️ **Es una demostración.** El sitio muestra una barra aclarándolo y le pide a Google
> que no lo indexe. Servicios Jemky es una empresa real y los teléfonos publicados son
> de personas reales: antes de sacarle el `noindex`, el cliente tiene que aprobarlo.
> El procedimiento está en [CONTENIDO-PENDIENTE.md](CONTENIDO-PENDIENTE.md).

---

## Cómo se administra

No hay panel de administración: en un sitio estático no existe. El equivalente es un
único archivo de configuración.

**Todo lo editable vive en [`assets/js/config.js`](assets/js/config.js):** teléfonos,
WhatsApp, dirección, email, horarios, redes sociales y el endpoint del formulario.

La regla es que **lo que está vacío no se muestra**. Nada de datos inventados ni de
espacios en blanco esperando contenido. Por eso el sitio se puede publicar incompleto e
ir completando de a poco.

Qué falta y cómo completarlo: **[CONTENIDO-PENDIENTE.md](CONTENIDO-PENDIENTE.md)**.

---

## Qué tiene el sitio

| Sección | Contenido |
|---|---|
| Portada | Título, tres llamados a la acción y tres indicadores |
| Empresa | Trayectoria y cinco valores con íconos |
| Servicios | Tres categorías: taller, maquinados, productos |
| Taller | 22 servicios agrupados en 6 especialidades |
| Maquinados | 38 servicios en 9 grupos + 4 tarjetas de capacidad de mecanizado |
| Productos | 52 ítems en 11 categorías, con buscador y filtros |
| Sectores | 9 industrias |
| Diferenciales | 10 motivos |
| Contacto | Formulario de presupuesto y datos de los dos socios gerentes |

Funciona sin dependencias externas salvo las tipografías de Google Fonts. Sin
frameworks, sin build, sin `npm install`.

---

## Limitaciones reales de GitHub Pages

Documentadas acá para que nadie las descubra tarde:

1. **El formulario no envía nada por sí solo.** No hay servidor. Hace falta conectar un
   servicio externo (Formspree, Web3Forms o similar). Hoy está en modo demostración:
   valida y muestra el mensaje de gracias, pero no llega ningún correo.
2. **Los adjuntos del formulario requieren plan pago** en casi todos esos servicios.
3. **No hay base de datos ni panel web.** El contenido se edita en los archivos.

Si el proyecto necesitara formularios con archivos de verdad, el camino es mudarlo a
Netlify o Vercel, que tienen capa gratuita y sí procesan formularios.

---

## Publicar un cambio

```bash
git add .
git commit -m "descripción del cambio"
git push
```

GitHub reconstruye y publica solo. Tarda entre 30 segundos y ~2 minutos; el estado se
ve en la pestaña **Actions** del repositorio.

## Probarlo localmente

```bash
python -m http.server 4173
```

Y abrir http://localhost:4173

---

## Estructura

```
index.html                 el sitio completo
assets/css/style.css       estilos
assets/js/config.js        ← se edita esto para administrar el sitio
assets/js/app.js           menú, filtros, validación y envío del formulario
assets/img/                fotos — ver el README de esa carpeta
CONTENIDO-PENDIENTE.md     qué falta completar y cómo
.nojekyll                  desactiva el procesamiento Jekyll
```

---

*Sitio construido con asistencia de IA (Claude) como material de ejemplo del curso.*
