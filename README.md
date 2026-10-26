# Los Mangos · Visor 3D

Explora la lotización desde tu celular o computadora: gira el modelo, usa el zoom, cambia a vista superior y toca un lote para consultar su área y perímetro del plano.

**Visor público:** https://charligr.github.io/los-mangos-3d/

## Archivos

- `index.html`, `styles.css`, `app.js`: visor web adaptable a celular y computadora.
- `los-mangos.glb`: modelo 3D con 78 lotes y materiales independientes, calles, vegetación y amenidades.
- `lotes.json`: códigos, áreas y perímetros transcritos del plano.
- `vista-previa.webp`: imagen del conjunto.
- `model-viewer.min.js`: visor model-viewer 4.1.0 de Google, distribuido localmente bajo licencia Apache-2.0. Consulta `model-viewer.LICENSE` y https://github.com/google/model-viewer.

## Publicación

En Settings → Pages, selecciona Deploy from a branch, rama `main`, carpeta `/ (root)`.

## Vista local

Ejecuta `python -m http.server 8000` desde esta carpeta y abre http://localhost:8000. No abras index.html directamente: el modelo requiere HTTP.

## Actualización

Reemplaza `los-mangos.glb` y, si cambian las áreas o los nombres de los materiales, actualiza `lotes.json`. Cada lote conserva su material propio. Los visitantes pueden consultar el modelo; no modifican el estado comercial de los lotes.

La malla 3D representa visualmente el plano. Las áreas y perímetros se transcribieron del plano y no se calcularon desde la escala visual del modelo. No constituye un levantamiento topográfico certificado.
