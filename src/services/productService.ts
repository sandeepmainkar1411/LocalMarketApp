import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* CREATE PRODUCT */

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

/* FETCH PRODUCTS */

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

/* REALTIME PRODUCTS */

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

/* UPDATE PRODUCT */

export const updateProduct = async (
  firestoreId: string,
  productData: any
) => {
  try {
    const productRef = doc(
      db,
      "products",
      firestoreId
    );

    await updateDoc(
      productRef,
      productData
    );

    console.log(
      "Product Updated"
    );
  } catch (error) {
    console.log(
      "Update Product Error:",
      error
    );
  }
};

/* DELETE PRODUCT */

export const deleteProduct = async (
  firestoreId: string
) => {
  try {
    await deleteDoc(
      doc(
        db,
        "products",
        firestoreId
      )
    );

    console.log(
      "Product Deleted:",
      firestoreId
    );
  } catch (error) {
    console.log(
      "Delete Product Error:",
      error
    );
  }
};