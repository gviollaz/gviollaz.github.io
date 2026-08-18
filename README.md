# gviollaz.github.io

Sitio de ejemplo para el **curso de Marketing Digital**, publicado con GitHub Pages.

- **URL:** https://gviollaz.github.io/
- **Fuente:** rama `main`, carpeta raíz (`/`)
- **Motor:** archivos estáticos servidos tal cual. El archivo `.nojekyll` desactiva el
  procesamiento de Jekyll, así que cualquier HTML/CSS/JS se publica sin transformaciones
  y las carpetas que empiezan con `_` no se ignoran.

## Cómo publicar un cambio

```bash
git add .
git commit -m "descripción del cambio"
git push
```

GitHub reconstruye y publica automáticamente. El despliegue tarda entre 30 segundos
y ~2 minutos; el estado se ve en la pestaña **Actions** del repositorio.

## Estructura

```
index.html    página principal (placeholder — reemplazar por el sitio real)
.nojekyll     desactiva el procesamiento Jekyll
README.md     este archivo
```
