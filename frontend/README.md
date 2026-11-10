# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Portadas locales

Coloca las imágenes de portada en la carpeta `portadas` de la raíz del proyecto
Django, usando el título del anime como nombre del archivo (por ejemplo,
`Death Note.jpg` o `Attack on Titan.webp`). Luego, desde esa raíz, ejecuta:

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py importar_portadas_locales
```

El comando copia las imágenes a `frontend/public/portadas/` y actualiza las rutas
en la base de datos. También puedes pasar una carpeta distinta como argumento.
Se admiten archivos JPG, PNG y WebP.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
