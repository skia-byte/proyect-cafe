import { useEffect, useState } from "react";

export default function useDarkMode() {
  // 1. Inicializa el estado leyendo de localStorage o de la preferencia del sistema
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      // Si hay algo guardado, úsalo. Si no, revisa el sistema.
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  // 2. Este efecto actualiza la clase 'dark' en el elemento <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // 3. Guarda la elección del usuario
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Devuelve el estado actual y la función para cambiarlo
  return [theme, setTheme];
}
