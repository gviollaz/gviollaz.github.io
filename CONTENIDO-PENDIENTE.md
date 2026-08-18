# Servicios Jemky — qué falta completar

Guía para terminar el sitio sin tocar código. Todo se edita en un solo archivo:
**`assets/js/config.js`**.

La regla del sitio: **si un campo está vacío, la sección no se muestra**. Nunca aparece
un dato inventado ni un hueco. Por eso se puede publicar incompleto e ir completando.

---

## 1. Datos que faltan (los pidió el cliente y no llegaron)

Abrí `assets/js/config.js`, buscá el bloque `pendientes` y completá entre comillas:

| Campo | Qué es | Dónde aparece cuando se completa |
|---|---|---|
| `whatsapp` | Número de WhatsApp | Barra inferior en celular, botón en cada gerente, respaldo del formulario |
| `direccion` | Dirección del taller | Tarjeta de contacto y pie de página |
| `email` | Correo de contacto | Tarjeta de contacto y pie de página |
| `horarios` | Horarios de atención | Tarjeta de contacto y pie de página |
| `mapa_embed` | URL del iframe de Google Maps | Mapa debajo de los datos de contacto |
| `instagram` / `facebook` / `linkedin` | URLs de redes | Íconos en el pie de página |

### Formato del WhatsApp — importante

El número va **sin `0`, sin `15`, sin guiones y sin espacios**, con código de país:

```
País (54) + 9 + área sin 0 (387) + número sin 15
```

Para Salta queda: `54` `9` `387` `XXXXXXX` → `5493874414740`

> **Pendiente de confirmar con el cliente:** cuál de las dos líneas tiene WhatsApp.
> `0387-4414740` tiene formato de teléfono fijo, y los fijos no tienen WhatsApp.
> Mientras `whatsapp` esté vacío, los botones de WhatsApp simplemente no aparecen.

---

## 2. El formulario todavía no envía nada

GitHub Pages sirve archivos estáticos: **no hay servidor que procese el formulario**.
Hoy está en *modo demostración* — valida los campos y muestra el mensaje de gracias,
pero la consulta **no llega a ningún correo**.

### Para activarlo

1. Crear una cuenta en un servicio de formularios. Opciones:
   - [Formspree](https://formspree.io) — 50 envíos/mes gratis
   - [Web3Forms](https://web3forms.com) — 250 envíos/mes gratis
   - [FormSubmit](https://formsubmit.co) — gratis, sin cuenta
2. Pegar la URL que te den en `formulario.endpoint` dentro de `config.js`.
3. Si usás Web3Forms, pegar además la clave en `formulario.web3forms_key`.
4. Probar enviando una consulta real y verificar que llegue el correo.

### Los adjuntos son el punto flojo

El formulario deja adjuntar fotos, PDF y planos, pero **casi todos los servicios
gratuitos descartan los archivos**: en Formspree y Web3Forms los adjuntos son función
de plan pago. Tres caminos:

- **Pagar el plan** del servicio (Formspree arranca en ~USD 10/mes).
- **Dejar que el cliente pida las fotos por WhatsApp.** Es lo más barato y en la
  práctica es lo que suele pasar igual en este rubro.
- **Migrar el sitio a otro hosting** (Netlify o Vercel, ambos con capa gratuita) que
  sí procesa formularios con archivos.

Mientras tanto, el texto de ayuda debajo del campo ya avisa que los archivos pueden
pedirse por otra vía. No se promete algo que no se cumple.

---

## 3. Fotografías

El sitio funciona hoy con ilustraciones vectoriales propias. **No se usaron fotos de
bancos de imágenes a propósito:** una foto genérica de una retroexcavadora que no es de
Jemky no demuestra nada, y en este rubro el cliente reconoce el taller de verdad.

Para poner fotos reales, ver **`assets/img/README.md`**: tiene la lista exacta de qué
foto va en cada lugar, con qué nombre y qué medidas.

La única que entra sola, sin tocar código, es la de portada: guardar el archivo como
`assets/img/hero.jpg` y listo. Si no existe, se ve el degradado y el sitio no se rompe.

---

## 4. Antes de publicarlo de verdad

El sitio está **en modo demostración**: muestra una barra arriba aclarándolo y le pide
a Google que no lo indexe. Es a propósito — Servicios Jemky es una empresa real y esos
son teléfonos de personas reales.

Para pasarlo a producción hacen falta **dos cambios**, y conviene hacerlos juntos:

1. En `index.html`, borrar del `<head>` la línea:
   ```html
   <meta name="robots" content="noindex, nofollow">
   ```
2. En `assets/js/config.js`, poner:
   ```js
   en_produccion: true
   ```

Si hacés el (2) y te olvidás del (1), la consola del navegador te avisa: el sitio queda
sin la barra de demo pero Google lo sigue ignorando.

**Antes de eso, que el cliente apruebe:** los textos, los teléfonos publicados y el
hecho de que el sitio esté online.

---

## 5. Qué conviene sumar después

Ordenado por lo que más mueve la aguja para conseguir consultas:

1. **Fotos reales del taller y de trabajos terminados.** Es lo que más convierte en
   este rubro y hoy es el hueco más grande del sitio.
2. **Un dominio propio** (`serviciosjemky.com.ar`). GitHub Pages acepta dominio propio
   gratis; se configura en Settings → Pages → Custom domain.
3. **Google Business Profile.** Para un taller local, la ficha de Google suele traer
   más consultas que el sitio mismo. Es gratis.
4. **Medición.** Sin Google Analytics o similar no se sabe si el sitio sirve. Hoy no
   tiene ninguna etiqueta de seguimiento — decisión consciente, porque instalar
   cookies de terceros sin política de privacidad es problema legal, no técnico.
5. **Casos de trabajos resueltos.** "Cilindro de retro X con tal falla, esto hicimos,
   este fue el resultado." Es el contenido que mejor funciona para vender servicio
   técnico.

---

## Estructura de archivos

```
index.html                 el sitio completo (una sola página)
assets/css/style.css       estilos
assets/js/config.js        ← EL ADMINISTRADOR: se edita esto
assets/js/app.js           lógica (menú, filtros, formulario)
assets/img/                fotos — ver el README de esa carpeta
CONTENIDO-PENDIENTE.md     este archivo
```
