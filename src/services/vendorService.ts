import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* CREATE VENDOR */

export const createVendor = async (
  vendorData: any
) => {
  try {
    const mobile =
      vendorData?.mobile
        ?.toString()
        .trim();

    if (!mobile) {
      throw new Error(
        "Vendor mobile number is required"
      );
    }

    // Use mobile as the document ID.
    // This gives us a predictable vendor record:
    // vendors/{mobile}

    const vendorRef = doc(
      db,
      "vendors",
      mobile
    );

    await setDoc(
      vendorRef,
      vendorData
    );

    console.log(
      "Vendor Created:",
      mobile
    );

    return mobile;
  } catch (error) {
    console.log(
      "Create Vendor Error:",
      error
    );

    // Send the error back to the screen
    // so the user gets an error message.

    throw error;
  }
};


/* FETCH VENDORS */

export const fetchVendors = async () => {
  try {
    const querySnapshot =
      await getDocs(
        collection(
          db,
          "vendors"
        )
      );

    const vendors: any[] = [];

    querySnapshot.forEach(
      (docItem) => {
        vendors.push({
          firestoreId:
            docItem.id,

          id:
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

    throw error;
  }
};


/* CHECK VENDOR EXISTS */

export const vendorExists = async (
  vendorName: string,
  locality: string
) => {
  try {
    const vendors =
      await fetchVendors();

    const cleanVendorName =
      vendorName
        ?.toString()
        .trim()
        .toLowerCase();

    const cleanLocality =
      locality
        ?.toString()
        .trim()
        .toLowerCase();

    const result =
      vendors.some(
        (vendor) => {
          const existingVendorName =
            vendor?.vendorName
              ?.toString()
              .trim()
              .toLowerCase() || "";

          const existingLocality =
            vendor?.locality
              ?.toString()
              .trim()
              .toLowerCase() || "";

          return (
            existingVendorName ===
              cleanVendorName &&
            existingLocality ===
              cleanLocality
          );
        }
      );

    return result;
  } catch (error) {
    console.log(
      "Vendor Exists Error:",
      error
    );

    throw error;
  }
};


/* CHECK MOBILE EXISTS */

export const mobileExists = async (
  mobile: string
) => {
  try {
    const cleanMobile =
      mobile
        .toString()
        .trim();

    // First check the new predictable
    // document ID.

    const vendorRef = doc(
      db,
      "vendors",
      cleanMobile
    );

    const vendorSnapshot =
      await getDoc(
        vendorRef
      );

    if (
      vendorSnapshot.exists()
    ) {
      return true;
    }

    // Also check older vendor records
    // that may have random Firestore IDs.

    const mobileQuery =
      query(
        collection(
          db,
          "vendors"
        ),
        where(
          "mobile",
          "==",
          cleanMobile
        )
      );

    const querySnapshot =
      await getDocs(
        mobileQuery
      );

    return !querySnapshot.empty;
  } catch (error) {
    console.log(
      "Mobile Exists Error:",
      error
    );

    throw error;
  }
};


/* REALTIME SUBSCRIPTION */

export const subscribeToVendors = (
  callback: any
) => {
  return onSnapshot(
    collection(
      db,
      "vendors"
    ),

    (snapshot) => {
      const vendors: any[] = [];

      snapshot.forEach(
        (docItem) => {
          vendors.push({
            firestoreId:
              docItem.id,

            id:
              docItem.id,

            ...docItem.data(),
          });
        }
      );

      callback(vendors);
    },

    (error) => {
      console.log(
        "Vendor Subscription Error:",
        error
      );
    }
  );
};


/* UPDATE VENDOR */

export const updateVendor = async (
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

    throw error;
  }
};


/* SUSPEND VENDOR */

export const suspendVendor = async (
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

    throw error;
  }
};