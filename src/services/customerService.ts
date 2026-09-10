import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebaseConfig";


/*
========================================
CREATE CUSTOMER
========================================

New customer documents use:

customers/{mobile}

Example:

customers/9920220237
*/

export const createCustomer =
  async (
    customerData: any
  ) => {

    try {

      const mobile =
        String(
          customerData?.mobile || ""
        ).trim();

      if (!mobile) {

        console.log(
          "CREATE CUSTOMER ERROR: Mobile number is missing"
        );

        return null;
      }


      const customerRef =
        doc(
          db,
          "customers",
          mobile
        );


      await setDoc(
        customerRef,
        {
          ...customerData,
          mobile,
        }
      );


      console.log(
        "CUSTOMER CREATED:",
        mobile
      );


      return mobile;

    }
    catch (error) {

      console.log(
        "Create Customer Error:",
        error
      );

      return null;
    }
  };


/*
========================================
FETCH CUSTOMERS
========================================
*/

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

            id:
              docItem.id,

            ...docItem.data(),

          });

        }
      );


      return customers;

    }
    catch (error) {

      console.log(
        "Fetch Customers Error:",
        error
      );

      return [];
    }
  };


/*
========================================
UPDATE CUSTOMER
========================================

Supports BOTH:

1. New structure:
   customers/{mobile}

2. Older structure:
   customers/{randomFirestoreId}

This allows us to work with your
existing Firestore data without
deleting anything.
*/

export const updateCustomer =
  async (
    mobile: string,
    customerData: any
  ) => {

    try {

      const customerMobile =
        String(
          mobile || ""
        ).trim();


      if (!customerMobile) {

        console.log(
          "UPDATE CUSTOMER ERROR: Mobile number is missing"
        );

        return false;
      }


      console.log(
        "================================"
      );

      console.log(
        "UPDATE CUSTOMER"
      );

      console.log(
        "Mobile:",
        customerMobile
      );


      /*
       * First try the new deterministic
       * document ID.
       */

      const directRef =
        doc(
          db,
          "customers",
          customerMobile
        );


      /*
       * getDoc is imported dynamically
       * here so we can check whether the
       * new document exists.
       */

      const {
        getDoc,
        query,
        where,
      } = await import(
        "firebase/firestore"
      );


      const directSnapshot =
        await getDoc(
          directRef
        );


      if (
        directSnapshot.exists()
      ) {

        console.log(
          "FOUND CUSTOMER USING MOBILE DOCUMENT ID"
        );


        await updateDoc(
          directRef,
          {
            ...customerData,

            mobile:
              customerMobile,

            updatedAt:
              new Date().toISOString(),
          }
        );


        console.log(
          "CUSTOMER UPDATED:",
          customerMobile
        );


        return true;
      }


      /*
       * If the new document doesn't
       * exist, search the older customer
       * records by mobile number.
       */

      console.log(
        "NEW CUSTOMER DOCUMENT NOT FOUND"
      );

      console.log(
        "SEARCHING LEGACY CUSTOMER RECORDS..."
      );


      const customersRef =
        collection(
          db,
          "customers"
        );


      const customerQuery =
        query(
          customersRef,
          where(
            "mobile",
            "==",
            customerMobile
          )
        );


      const customerSnapshot =
        await getDocs(
          customerQuery
        );


      if (
        customerSnapshot.empty
      ) {

        console.log(
          "CUSTOMER RECORD NOT FOUND"
        );

        return false;
      }


      /*
       * Use the first matching legacy
       * customer record.
       */

      const legacyDocument =
        customerSnapshot.docs[0];


      console.log(
        "FOUND LEGACY CUSTOMER DOCUMENT:",
        legacyDocument.id
      );


      await updateDoc(
        doc(
          db,
          "customers",
          legacyDocument.id
        ),
        {
          ...customerData,

          mobile:
            customerMobile,

          updatedAt:
            new Date().toISOString(),
        }
      );


      console.log(
        "LEGACY CUSTOMER UPDATED"
      );


      console.log(
        "================================"
      );


      return true;

    }
    catch (error) {

      console.log(
        "Update Customer Error:",
        error
      );

      return false;
    }
  };