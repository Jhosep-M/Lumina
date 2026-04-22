// postcss.config.mjs
// FIX: El proyecto tiene AMBAS versiones de Tailwind instaladas:
//   - tailwindcss@3.4.19  (devDependency directo)
//   - @tailwindcss/postcss@4.2.2 (devDependency — plugin para Tailwind v4)
//
// Como tailwind.config.js usa la API de v3 (content, theme.extend, plugins),
// DEBEMOS usar el plugin de v3. El plugin @tailwindcss/postcss es para v4 y
// NO debe usarse aquí. Esta config explicita la ruta para evitar ambigüedad.
//
// ACCIÓN REQUERIDA EN TERMINAL:
//   npm uninstall @tailwindcss/postcss @tailwindcss/node @tailwindcss/oxide
//   (esos paquetes son exclusivos de Tailwind v4 y no deben coexistir con v3)

export default {
  plugins: {
    tailwindcss: {},   // usa tailwindcss@3 instalado en node_modules
    autoprefixer: {},
  },
};
