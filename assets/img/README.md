# Fotografías del sitio

Esta carpeta está vacía a propósito. El sitio funciona hoy con ilustraciones
vectoriales dibujadas para el proyecto.

## Por qué no hay fotos de banco de imágenes

Una foto de stock de una retroexcavadora genérica no prueba nada sobre Jemky, y en
este rubro el cliente distingue enseguida un taller real de una foto comprada. Además,
presentar una foto de terceros como si fuera un trabajo propio es un problema de
licencia y de honestidad, no de diseño.

**Las fotos tienen que ser del taller y de los trabajos reales de Servicios Jemky.**

---

## La única que entra sin tocar código

| Archivo | Dónde va | Medidas | Qué debería mostrarse |
|---|---|---|---|
| `hero.jpg` | Fondo de la portada | 1920 × 1080 px, < 400 KB | Taller en actividad, maquinaria pesada o un cilindro hidráulico grande. Con espacio "vacío" a la derecha, porque el texto va sobre la izquierda |

Guardalo con ese nombre exacto en esta carpeta y aparece solo. Si el archivo no existe,
se ve el degradado industrial y **el sitio no se rompe** — está previsto así.

> La portada lleva una capa oscura encima para que el texto se lea. Una foto muy clara
> o muy cargada de detalle igual va a competir con el título: mejor una toma con zonas
> limpias.

---

## Las que necesitan un retoque de código

Estas mejoran mucho el sitio pero hay que reemplazar el ícono por una `<img>` en
`index.html`. Es un cambio de una línea por lugar.

| Archivo sugerido | Dónde | Medidas | Qué mostrar |
|---|---|---|---|
| `taller.jpg` | Tarjeta "Taller y reparaciones" | 800 × 600 px | Mecánico trabajando sobre un equipo hidráulico |
| `maquinados.jpg` | Tarjeta "Maquinados y fabricación" | 800 × 600 px | Torno o fresadora en operación, viruta a la vista |
| `productos.jpg` | Tarjeta "Productos y componentes" | 800 × 600 px | Estantería de componentes, o-rings, acoples, mangueras |
| `mangueras.jpg` | Bloque "Armado de mangueras en el acto" | 1200 × 600 px | Prensa de mangueras armando un terminal |
| `equipo.jpg` | Sección Empresa | 1000 × 700 px | El equipo de trabajo en el taller |

---

## Antes de subir cualquier foto

1. **Comprimir.** Una foto de celular pesa 4–8 MB y hace que el sitio tarde una
   eternidad en un celular con datos móviles. Bajala a menos de 400 KB con
   [Squoosh](https://squoosh.app) o [TinyPNG](https://tinypng.com). Es gratis y no
   se nota la diferencia en pantalla.
2. **Formato.** JPG para fotos. Si la herramienta ofrece WebP, mejor todavía.
3. **Horizontal.** Las fotos verticales de celular quedan mal en los espacios anchos.
4. **Sin gente identificable sin permiso.** Si aparecen empleados o clientes, pedí
   autorización antes de publicar. Es requisito de la ley de datos personales, no una
   formalidad.
5. **Que se vea el trabajo, no el desorden.** Ordenar el sector antes de la foto
   cambia por completo la percepción de la empresa.
