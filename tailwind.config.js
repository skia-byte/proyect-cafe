module.export = {
  darkMode: "class", // <--- Esto es lo más importante
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
    "./src/components/**/*.{js,ts,jsx}",
    "./src/pages/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vamos a definir tus colores aquí para usarlos fácil
        "cafe-claro": "#F5F5DC", // Tu beige actual (ejemplo)
        "cafe-oscuro": "#4A3B32", // Tu marrón oscuro actual (ejemplo)
        "cafe-crema": "#D7CCC8", // Un intermedio
        "cafe-negro": "#281E19", // Para el fondo en modo oscuro
      },
    },
  },
  plugins: [],
};
