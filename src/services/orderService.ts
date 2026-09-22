import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  runTransaction,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";


/* =========================================================
   CREATE ORDER
   ========================================================= */

export const createOrder = async (
  orderData: any
) => {

  try {

    /*
     * Firestore counter used to generate
     * sequential Grovio order numbers.
     *
     * Example:
     *
     * LM-000001
     * LM-000002
     * LM-000003
     *
     * The transaction prevents duplicate
     * order numbers when multiple orders
     * are created at the same time.
     */

    const counterRef = doc(
      db,
      "settings",
      "orderCounter"
    );


    const nextOrderNumber =
      await runTransaction(
        db,
        async (transaction) => {

          const counterSnapshot =
            await transaction.get(
              counterRef
            );


          let nextNumber = 1;


          if (
            counterSnapshot.exists()
          ) {

            const counterData =
              counterSnapshot.data();


            nextNumber =
              Number(
                counterData.lastOrderNumber || 0
              ) + 1;

          }


          transaction.set(
            counterRef,
            {
              lastOrderNumber:
                nextNumber,
            },
            {
              merge: true,
            }
          );


          return nextNumber;

        }
      );


    /*
     * Generate business-friendly
     * Grovio order number.
     *
     * Example:
     * 1      → LM-000001
     * 25     → LM-000025
     * 126    → LM-000126
     */

    const orderNumber =
      `LM-${String(
        nextOrderNumber
      ).padStart(6, "0")}`;


    /*
     * Add the generated order number
     * to the order data.
     */

    const orderToSave = {

      ...orderData,

      orderNumber,

    };


    /*
     * IMPORTANT:
     *
     * Use the Grovio order number
     * as the Firestore document ID.
     *
     * This means Firestore will show:
     *
     * orders
     *   ├── LM-000001
     *   ├── LM-000002
     *   ├── LM-000003
     *   └── ...
     */

    const orderRef =
      doc(
        db,
        "orders",
        orderNumber
      );


    await setDoc(
      orderRef,
      orderToSave
    );


    console.log(
      "Order Created:",
      orderNumber
    );


    console.log(
      "Firestore Document ID:",
      orderNumber
    );


    return orderNumber;


  } catch (error) {

    console.log(
      "Firestore Error:",
      error
    );


    /*
     * Re-throw the error so the
     * calling screen knows that
     * order creation failed.
     */

    throw error;

  }

};


/* =========================================================
   FETCH ORDERS
   ========================================================= */

export const fetchOrders =
  async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "orders"
          )
        );


      const orders: any[] = [];


      querySnapshot.forEach(
        (orderDoc) => {

          orders.push({

            id:
              orderDoc.id,

            ...orderDoc.data(),

          });

        }
      );


      return orders;


    } catch (error) {

      console.log(
        "Fetch Error:",
        error
      );


      return [];

    }

  };


/* =========================================================
   UPDATE ORDER
   ========================================================= */

export const updateOrder =
  async (
    orderId: string,
    orderData: any
  ) => {

    try {

      const orderRef =
        doc(
          db,
          "orders",
          orderId
        );


      await updateDoc(
        orderRef,
        orderData
      );


    } catch (error) {

      console.log(
        "Update Error:",
        error
      );


      /*
       * Re-throw the error so
       * the calling screen can
       * handle the failure.
       */

      throw error;

    }

  };


/* =========================================================
   REALTIME ORDER SYNC
   ========================================================= */

export const subscribeToOrders =
  (
    callback: any
  ) => {

    return onSnapshot(
      collection(
        db,
        "orders"
      ),
      (snapshot) => {

        const orders: any[] = [];


        snapshot.forEach(
          (orderDoc) => {

            orders.push({

              id:
                orderDoc.id,

              ...orderDoc.data(),

            });

          }
        );


        callback(
          orders
        );

      }
    );

  };