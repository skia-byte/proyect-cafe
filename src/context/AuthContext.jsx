import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { auth, googleProvider } from "../FireBase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Autenticación con Google y Email
const AuthContext = createContext();

// Lista de correos que tienen el rol de admin
const ADMIN_EMAIL = ["skiarayamile@gmail.com"];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Registro con email y contraseña
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // No necesitas setUser aquí, onAuthStateChanged (en tu useEffect) lo hará.
      console.log("Usuario registrado con éxito:", userCredential.user.email);
      return userCredential.user; // Opcional: retornar el usuario
    } catch (error) {
      console.error("Error de registro:", error.message);
      throw error; // Lanza el error para que el componente lo maneje (ej: mostrar mensaje)
    }
  };

  // Login con email y contraseña
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión con email:", error.message);
      throw error;
    }
  };

  // Detectar cambios de sesión
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Login con Google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    console.log("Cerrando sesión...");
    await signOut(auth);
  };

  // Validación de rol admin
  const isAdmin = useMemo(() => {
    return user && ADMIN_EMAIL.includes(user.email);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
        register,
        loginWithEmail,
        isAdmin,
        loading,
      }}
    >
      {loading ? <p>Cargando...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
