# Lista de clase 26-27

App de asistencia para 1ºD (HMC), 2ºB (H.ª España), 2ºC (H.ª España y H.ª Arte) y 2ºD (H.ª Arte).

## Publicarla (una vez, 5 minutos)

Necesita estar en una dirección `https://`. Un archivo suelto abierto desde
Archivos no vale: sin HTTPS el service worker no arranca y iOS no la trata
como app instalable.

1. Repositorio nuevo en GitHub, público, llamado por ejemplo `lista`.
2. Sube los cinco archivos **a la raíz**, no dentro de una carpeta:
   `index.html`, `sw.js`, `manifest.webmanifest`, `icon-180.png`,
   `icon-192.png`, `icon-512.png`.
3. Settings → Pages → Source: `Deploy from a branch` → rama `main`, carpeta `/ (root)`.
4. En un minuto tendrás `https://TUUSUARIO.github.io/lista/`.

## Instalarla en el iPhone

1. Abre esa dirección **en Safari** (no en Chrome: solo Safari puede añadir a
   la pantalla de inicio).
2. Botón Compartir → *Añadir a pantalla de inicio* → Añadir.
3. Ábrela **desde el icono**, no desde Safari. A partir de ahí no verás barra
   de direcciones y funcionará sin conexión.
4. Entra en Ajustes ⚙ y comprueba que las cuatro líneas de *Estado del
   guardado* están en verde.

## Publicar cambios

Sube el `index.html` nuevo y **cambia el número** de la primera línea de
`sw.js` (`lista-v1` → `lista-v2`). Sin ese cambio el teléfono seguirá
sirviendo la versión vieja desde su propia copia.

Luego, en la app: Ajustes → *Buscar actualización*, y ciérrala y ábrela.
Actualizar no borra los registros: viven en un sitio distinto de la caché.

## Uso diario

- Un toque en el nombre: falta. Dos: retraso. Tres: justificada. Cuatro: presente.
- *Confirmar* cierra el parte. El recibo verde solo aparece si el dato se ha
  releído correctamente del teléfono.
- ✎ para una nota (justificante, se marcha antes...).
- ▤ para el resumen del grupo y la exportación a CSV.

## Copias de seguridad

Los registros viven en tu iPhone. Descarga una copia `.json` al menos una vez
al mes desde Ajustes y guárdala en Archivos o Drive. Si además configuras la
copia automática en Google Sheets, cada parte confirmado se duplica solo.
