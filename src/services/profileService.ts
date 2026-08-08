import {
    collection,
    getDocs,
  } from "firebase/firestore";
  
  import {
    db,
  } from "../firebase/firebaseConfig";
  
  async function getProfile(
    collectionName: string,
    mobile: string
  ) {
  
    const snapshot =
      await getDocs(
        collection(
          db,
          collectionName
        )
      );
  
    const data =
      snapshot.docs.map(
        (doc) => ({
  
          id: doc.id,
  
          ...doc.data(),
  
        })
      );
  
    return (
      data.find(
        (item: any) =>
          String(item.mobile) ===
          String(mobile)
      ) || null
    );
  
  }
  
  export const getCustomerProfile =
  (
    mobile: string
  ) =>
  getProfile(
    "customers",
    mobile
  );
  
  export const getVendorProfile =
  (
    mobile: string
  ) =>
  getProfile(
    "vendors",
    mobile
  );
  
  export const getAgentProfile =
  (
    mobile: string
  ) =>
  getProfile(
    "agents",
    mobile
  );