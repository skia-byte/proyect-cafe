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
const ADMIN_EMAIL = [
  "skiarayamile@gmail.com",
  "fablazaromogollon@crackthecode.la",
  "noealcasanchez@crackthecode.la",
];

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

      console.log("Usuario registrado con éxito:", userCredential.user.email);
      return userCredential.user; // Opcional: retornar el usuario
    } catch (error) {
      console.error("Error de registro:", error.message);
      throw error;
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
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente en Firebase.");
    } catch (error) {
      console.error("Error al cerrar sesión con Firebase:", error);

      throw error;
    }
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
