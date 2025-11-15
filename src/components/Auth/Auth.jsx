import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  singInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../FireBase/firebase";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const Register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      alert("Usuario registrado con éxito");
    } catch (error) {
      alert("Error de registro", error);
    }
  };
  return <div>Auth</div>;
};

export default Auth;
