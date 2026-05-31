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

    console.log(
      "FETCHED VENDORS:",
      vendors
    );

    return vendors;
  } catch (error) {
    console.log(
      "Fetch Vendors Error:",
      error
    );

    return [];
  }
};

export const vendorExists = async (
  vendorName: string,
  locality: string
) => {
  try {
    const vendors =
      await fetchVendors();

    console.log(
      "Checking Vendor:",
      vendorName,
      locality
    );

    const result = vendors.some(
      (vendor) =>
        vendor.vendorName
          ?.toLowerCase()
          .trim() ===
          vendorName
            .toLowerCase()
            .trim() &&
        vendor.locality ===
          locality
    );

    console.log(
      "Vendor Exists Result:",
      result
    );

    return result;
  } catch (error) {
    console.log(
      "Vendor Exists Error:",
      error
    );

    return false;
  }
};

export const mobileExists = async (
  mobile: string
) => {
  try {
    const vendors =
      await fetchVendors();

    console.log(
      "Checking Mobile:",
      mobile
    );

    const result = vendors.some(
      (vendor) =>
        vendor.mobile
          ?.trim() ===
        mobile.trim()
    );

    console.log(
      "Mobile Exists Result:",
      result
    );

    return result;
  } catch (error) {
    console.log(
      "Mobile Exists Error:",
      error
    );

    return false;
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