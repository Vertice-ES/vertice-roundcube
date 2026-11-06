<div align="center">

<img src="images/logo.png" alt="Logo de Vértice Gestión Empresarial" height="110" />

# Vértice Mail — Roundcube Skin

**Skin de Vértice Gestión Empresarial para Roundcube Webmail.**
Modo oscuro nativo, paleta de marca y logos propios, listo para producción.

[![License: CC BY-SA 3.0](https://img.shields.io/badge/License-CC%20BY--SA%203.0-05406c?style=flat-square)](http://creativecommons.org/licenses/by-sa/3.0/)
[![Roundcube](https://img.shields.io/badge/Roundcube-1.7.5-032f50?style=flat-square)](https://roundcube.net/)
[![Based on Elastic](https://img.shields.io/badge/Based%20on-Elastic%20Skin-3ca5d5?style=flat-square)](https://github.com/roundcube/roundcubemail/tree/master/skins/elastic)
![Visitas](https://visitor-badge.laobi.icu/badge?page_id=Vertice-ES.vertice-roundcube&left_text=visitas&right_color=%2305406c)

</div>

---

## Capturas de pantalla

| Modo claro | Modo oscuro |
|---|---|
| ![Login, modo claro](docs/capturas/login-light.png) | ![Login, modo oscuro](docs/capturas/login-dark.png) |
| ![Bandeja de entrada, modo claro](docs/capturas/bandeja-light.png) | ![Bandeja de entrada, modo oscuro](docs/capturas/bandeja-dark.png) |
| ![Redactar, modo claro](docs/capturas/redactar-light.png) | ![Redactar, modo oscuro](docs/capturas/redactar-dark.png) |
| ![Configuración, modo claro](docs/capturas/ajustes-light.png) | ![Configuración, modo oscuro](docs/capturas/ajustes-dark.png) |

Hechas con Roundcube 1.7.5 en Docker y correos de ejemplo.

---

## Características

- **Paleta de Vértice**: azul marino `#05406c` del logo y de la web, azul celeste `#3ca5d5` de la faceta del vértice como acento y menú lateral en azul profundo `#04345a`.
- **Modo oscuro nativo** (`dark_mode_support: true`): fondos `#08131c` / `#11222f` y botones en `#0a6baf`.
- **Logos por modo**: logo completo en el login (con versión clara para el modo oscuro) y solo el vértice en el menú lateral y el favicon.
- **Sin gradientes**: diseño plano y limpio.
- **Scrollbars, foco y selección** con los colores de la marca en ambos modos.
- **Responsive**: escritorio, tableta y móvil (widescreen).
- **Hereda de Elastic** (`extends: elastic`), el skin oficial de Roundcube, a partir del tema de [NextAura](https://github.com/TheIsmael12/nextaura-roundcube). Plantillas y JavaScript siempre al día con tu Roundcube.

---

## Identidad de marca

| Rol                               | Color     | Vista |
|-----------------------------------|-----------|-------|
| Primario (azul marino)            | `#05406c` | ![](https://placehold.co/14x14/05406c/05406c.png) |
| Primario hover                    | `#0b5d95` | ![](https://placehold.co/14x14/0b5d95/0b5d95.png) |
| Primario active                   | `#032f50` | ![](https://placehold.co/14x14/032f50/032f50.png) |
| Enlaces y botones del modo oscuro | `#0a6baf` | ![](https://placehold.co/14x14/0a6baf/0a6baf.png) |
| Azul celeste del vértice (acento) | `#3ca5d5` | ![](https://placehold.co/14x14/3ca5d5/3ca5d5.png) |
| Acento suave                      | `#e2f0f9` | ![](https://placehold.co/14x14/e2f0f9/e2f0f9.png) |
| Menú lateral                      | `#04345a` | ![](https://placehold.co/14x14/04345a/04345a.png) |
| Fondo oscuro                      | `#08131c` | ![](https://placehold.co/14x14/08131c/08131c.png) |

Toda la marca está en las variables `@br-*` al principio de `styles/_styles.less` y en las `@color-*` de `styles/colors.less`.

---

## Roundcube 1.7.5: hereda de Elastic

El skin **hereda de Elastic** (`"extends": "elastic"` en `meta.json`), como recomienda la [guía de skins de Roundcube](https://github.com/roundcube/roundcubemail/wiki/Skins), en lugar de ser una copia completa.

- Las **plantillas, el JavaScript, las fuentes y los iconos** son los de Elastic de tu instalación, así que el skin recibe sus correcciones al actualizar Roundcube.
- El skin solo aporta la **paleta** (`styles/colors.less`), los **ajustes de marca** (`styles/_styles.less` y `styles/_dark.less`), los **logos** (con `skin_logo` en `meta.json`, sin tocar plantillas), el favicon, la marca de agua y `templates/includes/layout.html`, la única plantilla propia, que carga la hoja de estilos de la marca.
- Los estilos se compilan con los LESS de **Elastic 1.7.5**, y la CI comprueba que el CSS publicado está al día.
- Compatible con el plugin [Mail Scheduler](https://github.com/TheIsmael12/roundcube-mail-scheduler) (envíos programados y respuestas automáticas), que incluye estilos para este skin.

---

## Estructura

```
vertice-roundcube/
├── meta.json                 # "extends": "elastic", logos (skin_logo) y modo oscuro
├── images/                   # Logos por modo y favicon
├── styles/
│   ├── colors.less           # ★ Paleta: solo lo que cambia respecto a Elastic
│   ├── _styles.less          # ★ Ajustes de marca (variables @br-*)
│   ├── _dark.less            # Ajustes del modo oscuro
│   ├── styles.less           # Entrada: Elastic + paleta + ajustes
│   ├── embed.less            # Contenido embebido (editor y mensajes)
│   └── *.min.css             # CSS compilado
├── templates/includes/
│   └── layout.html           # Carga styles.css de la marca (copia de la de Elastic 1.7.5)
├── bin/build.mjs             # Compilación de estilos
├── watermark.html            # Marca de agua del panel vacío
├── thumbnail.png
└── docs/capturas/
```

---

## Instalación

### 1. Copiar el skin

```bash
git clone https://github.com/TheIsmael12/vertice-roundcube.git /var/www/roundcube/skins/vertice
```

O con Composer:

```bash
composer require theismael12/vertice
```

El skin necesita `skins/elastic`, que viene siempre con Roundcube.

### 2. Activar en Roundcube

```php
// config/config.inc.php
$config['skin'] = 'vertice';
```

---

## Compilar estilos

Tras tocar `colors.less`, `_styles.less` o `_dark.less`, o al actualizar Roundcube:

```bash
cd /var/www/roundcube/skins/vertice
npm install
npm run build        # usa ../elastic de la instalación
```

Fuera de una instalación de Roundcube:

```bash
ELASTIC_DIR=/ruta/a/roundcube/skins/elastic npm run build
npm run build -- --download   # descarga Elastic 1.7.5 de la release oficial
```

`npm run check -- --download` comprueba que el CSS publicado coincide con el que se generaría (es lo que ejecuta la CI).

---

## Créditos

Construido sobre el tema **Elastic** del equipo de Roundcube.

- Tema base: [Elastic Skin](https://github.com/roundcube/roundcubemail/tree/master/skins/elastic) — Aleksander Machniak
- Personalización de marca: [NextAura](https://nextaura.es) para [Vértice Gestión Empresarial](https://verticegestionempresarial.es)

| Librería         | Licencia   |
|------------------|------------|
| Bootstrap 4      | MIT        |
| FontAwesome 5    | CC BY 4.0  |
| Roboto (Google)  | Apache 2.0 |

---

## Licencia

**Creative Commons Attribution-ShareAlike 3.0**, heredada del skin Elastic.
Puedes copiar, distribuir, modificar y adaptar este trabajo siempre que mantengas los créditos al autor original (**Aleksander Machniak**) en este `README.md`.

[Ver licencia completa](http://creativecommons.org/licenses/by-sa/3.0/)
