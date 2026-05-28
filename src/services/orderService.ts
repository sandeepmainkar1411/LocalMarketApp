import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* CREATE ORDER */
export const createOrder = async (
  orderData: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, "orders"),
      orderData
    );

    console.log(
      "Order Created:",
      docRef.id
    );

    return docRef.id;
  } catch (error) {
    console.log(
      "Firestore Error:",
      error
    );
  }
};

/* FETCH ORDERS */
export const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "orders")
    );

    const orders: any[] = [];

    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return orders;
  } catch (error) {
    console.log(
      "Fetch Error:",
      error
    );

    return [];
  }
};

/* UPDATE ORDER */
export const updateOrder = async (
  orderId: string,
  orderData: any
) => {
  try {
    const orderRef = doc(
      db,
      "orders",
      orderId
    );

    await updateDoc(
      orderRef,
      orderData
    );
  } catch (error) {
    console.log(
      "Update Error:",
      error
    );
  }
};

/* REALTIME ORDER SYNC */
export const subscribeToOrders = (
  callback: any
) => {
  return onSnapshot(
    collection(db, "orders"),
    (snapshot) => {
      const orders: any[] = [];

      snapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      callback(orders);
    }
  );
};