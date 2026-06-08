import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* CREATE CUSTOMER */
export const createCustomer =
  async (
    customerData: any
  ) => {
    try {
      const docRef =
        await addDoc(
          collection(
            db,
            "customers"
          ),
          customerData
        );

      return docRef.id;
    } catch (error) {
      console.log(error);
    }
  };

/* FETCH CUSTOMERS */
export const fetchCustomers =
  async () => {
    try {
      const snapshot =
        await getDocs(
          collection(
            db,
            "customers"
          )
        );

      const customers: any[] =
        [];

      snapshot.forEach(
        (docItem) => {
          customers.push({
            firestoreId:
              docItem.id,
            ...docItem.data(),
          });
        }
      );

      return customers;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

/* UPDATE CUSTOMER */
export const updateCustomer =
  async (
    firestoreId: string,
    customerData: any
  ) => {
    try {
      const customerRef = doc(
        db,
        "customers",
        firestoreId
      );

      await updateDoc(
        customerRef,
        customerData
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };