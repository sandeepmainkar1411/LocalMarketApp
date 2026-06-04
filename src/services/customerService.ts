import {
    collection,
    addDoc,
    getDocs,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firebaseConfig";
  
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