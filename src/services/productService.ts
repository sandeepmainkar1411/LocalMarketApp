import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const createProduct = async (
  productData: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, "products"),
      productData
    );

    console.log(
      "Product Created:",
      docRef.id
    );

    return docRef.id;
  } catch (error) {
    console.log(
      "Create Product Error:",
      error
    );
  }
};

export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    const products: any[] = [];

    querySnapshot.forEach((doc) => {
      products.push({
        firestoreId: doc.id,
        ...doc.data(),
      });
    });

    return products;
  } catch (error) {
    console.log(
      "Fetch Products Error:",
      error
    );

    return [];
  }
};

export const subscribeToProducts = (
  callback: any
) => {
  return onSnapshot(
    collection(db, "products"),
    (snapshot) => {
      const products: any[] = [];

      snapshot.forEach((doc) => {
        products.push({
          firestoreId: doc.id,
          ...doc.data(),
        });
      });

      callback(products);
    }
  );
};