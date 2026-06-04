import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* CREATE VENDOR */

export const createVendor =
  async (
    vendorData: any
  ) => {
    try {
      const docRef =
        await addDoc(
          collection(
            db,
            "vendors"
          ),
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

/* FETCH VENDORS */

export const fetchVendors =
  async () => {
    try {
      const querySnapshot =
        await getDocs(
          collection(
            db,
            "vendors"
          )
        );

      const vendors: any[] =
        [];

      querySnapshot.forEach(
        (docItem) => {
          vendors.push({
            firestoreId:
              docItem.id,
            ...docItem.data(),
          });
        }
      );

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

/* CHECK VENDOR EXISTS */

export const vendorExists =
  async (
    vendorName: string,
    locality: string
  ) => {
    try {
      const vendors =
        await fetchVendors();

      const result =
        vendors.some(
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

      return result;
    } catch (error) {
      console.log(
        "Vendor Exists Error:",
        error
      );

      return false;
    }
  };

/* CHECK MOBILE EXISTS */

export const mobileExists =
  async (
    mobile: string
  ) => {
    try {
      const vendors =
        await fetchVendors();

      const result =
        vendors.some(
          (vendor) =>
            vendor.mobile?.trim() ===
            mobile.trim()
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

/* REALTIME SUBSCRIPTION */

export const subscribeToVendors =
  (
    callback: any
  ) => {
    return onSnapshot(
      collection(
        db,
        "vendors"
      ),
      (snapshot) => {
        const vendors: any[] =
          [];

        snapshot.forEach(
          (docItem) => {
            vendors.push({
              firestoreId:
                docItem.id,
              ...docItem.data(),
            });
          }
        );

        callback(vendors);
      }
    );
  };

/* UPDATE VENDOR */

export const updateVendor =
  async (
    firestoreId: string,
    vendorData: any
  ) => {
    try {
      const vendorRef = doc(
        db,
        "vendors",
        firestoreId
      );

      await updateDoc(
        vendorRef,
        vendorData
      );

      console.log(
        "Vendor Updated"
      );

      return true;
    } catch (error) {
      console.log(
        "Update Vendor Error:",
        error
      );

      return false;
    }
  };

/* SUSPEND VENDOR */

export const suspendVendor =
  async (
    firestoreId: string
  ) => {
    try {
      const vendorRef = doc(
        db,
        "vendors",
        firestoreId
      );

      await updateDoc(
        vendorRef,
        {
          active: false,
          approvalStatus:
            "Suspended",
        }
      );

      console.log(
        "Vendor Suspended"
      );

      return true;
    } catch (error) {
      console.log(
        "Suspend Vendor Error:",
        error
      );

      return false;
    }
  };