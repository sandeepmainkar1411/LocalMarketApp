import {
    collection,
    addDoc,
    getDocs,
    onSnapshot,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firebaseConfig";
  
  export const createVendor = async (
    vendorData: any
  ) => {
    try {
      const docRef = await addDoc(
        collection(db, "vendors"),
        vendorData
      );
  
      console.log(
        "Vendor Created:",
        docRef.id
      );
  
      return docRef.id;
    } catch (error) {
      console.log(
        "Create Vendor Error:",
        error
      );
    }
  };
  
  export const fetchVendors = async () => {
    try {
      const querySnapshot =
        await getDocs(
          collection(db, "vendors")
        );
  
      const vendors: any[] = [];
  
      querySnapshot.forEach((doc) => {
        vendors.push({
          firestoreId: doc.id,
          ...doc.data(),
        });
      });
  
      return vendors;
    } catch (error) {
      console.log(
        "Fetch Vendors Error:",
        error
      );
  
      return [];
    }
  };
  
  export const subscribeToVendors = (
    callback: any
  ) => {
    return onSnapshot(
      collection(db, "vendors"),
      (snapshot) => {
        const vendors: any[] = [];
  
        snapshot.forEach((doc) => {
          vendors.push({
            firestoreId: doc.id,
            ...doc.data(),
          });
        });
  
        callback(vendors);
      }
    );
  };