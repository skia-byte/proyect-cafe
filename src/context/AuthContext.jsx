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
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//Autenticación con Google

const AuthContext = createContext();

const ADMIN_EMAIL = ["fablazaromogollon@crackthecode.la"];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión con email:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // FUNCIÓN DE LOGIN CON GOOGLE
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    console.log("Cerrando sesión...");
    await signOut(auth);
  };

  const isAdmin = useMemo(() => {
    return user && ADMIN_EMAIL.includes(user.email);
  }, [user, ADMIN_EMAIL]);
  // PRUEBA DE ROL ADMIN

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
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
