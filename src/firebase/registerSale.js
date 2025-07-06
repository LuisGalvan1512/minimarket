import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function registerSale(user, cartItems, total) {
  const receiptId = crypto.randomUUID(); // o usa Date.now() si prefieres

  const userInfo = user
    ? {
        uid: user.uid || "invitado",
        email: user.email || "invitado@guest.com",
        name: user.name || "Invitado",
        role: user.role || "invitado",
      }
    : {
        uid: "invitado",
        email: "invitado@guest.com",
        name: "Invitado",
        role: "invitado",
      };

  await addDoc(collection(db, "sales"), {
    date: Timestamp.now(),
    user: userInfo,
    items: cartItems,
    total,
    receiptId,
  });
}
