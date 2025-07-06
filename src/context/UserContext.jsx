import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // usuario de auth
  const [userData, setUserData] = useState(null); // datos en firestore
  const [loading, setLoading] = useState(true);

  // Registro de cliente
  const registerWithEmail = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    // Agregar a Firestore
    await setDoc(doc(db, "users", newUser.uid), {
      email,
      name,
      role: "cliente", // ← cliente por defecto
    });

    return newUser;
  };

  // Login
  const loginWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  // Logout
  const logout = () => signOut(auth);

  // Verifica sesión y carga userData
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        loading,
        registerWithEmail,
        loginWithEmail,
        logout,
        isAdmin: userData?.role === "admin",
        isCliente: userData?.role === "cliente",
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
