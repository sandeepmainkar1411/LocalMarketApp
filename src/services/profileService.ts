import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebaseConfig";


/*
========================================
GET PROFILE
========================================

First tries the new structure:

collection/{mobile}

Example:

customers/9920220237

If that does not exist, it searches
the existing/legacy records using the
mobile field.

This allows old data and new data to
work together without deleting anything.
*/

async function getProfile(
  collectionName: string,
  mobile: string
) {

  try {

    const customerMobile =
      String(
        mobile || ""
      ).trim();


    if (!customerMobile) {

      console.log(
        `GET ${collectionName} PROFILE: Mobile number missing`
      );

      return null;
    }


    console.log(
      "================================"
    );

    console.log(
      "GET PROFILE"
    );

    console.log(
      "Collection:",
      collectionName
    );

    console.log(
      "Mobile:",
      customerMobile
    );


    /*
     * STEP 1
     * Try the new document structure.
     */

    const directRef =
      doc(
        db,
        collectionName,
        customerMobile
      );


    const directSnapshot =
      await getDoc(
        directRef
      );


    if (
      directSnapshot.exists()
    ) {

      console.log(
        "PROFILE FOUND USING MOBILE DOCUMENT ID"
      );


      return {

        id:
          directSnapshot.id,

        firestoreId:
          directSnapshot.id,

        ...directSnapshot.data(),

      };
    }


    /*
     * STEP 2
     * New document doesn't exist.
     *
     * Search existing records by mobile.
     */

    console.log(
      "DIRECT PROFILE NOT FOUND"
    );

    console.log(
      "SEARCHING EXISTING PROFILE RECORDS..."
    );


    const profileQuery =
      query(
        collection(
          db,
          collectionName
        ),
        where(
          "mobile",
          "==",
          customerMobile
        )
      );


    const snapshot =
      await getDocs(
        profileQuery
      );


    if (
      snapshot.empty
    ) {

      console.log(
        "PROFILE NOT FOUND:"
      );

      console.log(
        `${collectionName}/${customerMobile}`
      );

      return null;
    }


    /*
     * Use the first matching record.
     */

    const profileDocument =
      snapshot.docs[0];


    const profile = {

      id:
        profileDocument.id,

      firestoreId:
        profileDocument.id,

      ...profileDocument.data(),

    };


    console.log(
      "PROFILE FOUND USING MOBILE FIELD"
    );

    console.log(
      "Firestore ID:",
      profileDocument.id
    );

    console.log(
      "Profile:",
      profile
    );

    console.log(
      "================================"
    );


    return profile;

  }
  catch (error) {

    console.log(
      `Get ${collectionName} Profile Error:`,
      error
    );

    return null;
  }
}


/*
========================================
CUSTOMER
========================================
*/

export const getCustomerProfile =
  (
    mobile: string
  ) =>
    getProfile(
      "customers",
      mobile
    );


/*
========================================
VENDOR
========================================
*/

export const getVendorProfile =
  (
    mobile: string
  ) =>
    getProfile(
      "vendors",
      mobile
    );


/*
========================================
AGENT
========================================
*/

export const getAgentProfile =
  (
    mobile: string
  ) =>
    getProfile(
      "agents",
      mobile
    );