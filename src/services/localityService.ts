import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* CREATE LOCALITY */

export const createLocality =
  async (name: string) => {
    try {
      await addDoc(
        collection(
          db,
          "localities"
        ),
        {
          name,
          active: true,
        }
      );
    } catch (error) {
      console.log(
        "Create Locality Error:",
        error
      );
    }
  };

/* FETCH LOCALITIES */

export const fetchLocalities =
  async () => {
    try {
      const snapshot =
        await getDocs(
          collection(
            db,
            "localities"
          )
        );

      const localities: any[] =
        [];

      snapshot.forEach(
        (doc) => {
          localities.push({
            firestoreId:
              doc.id,
            ...doc.data(),
          });
        }
      );

      return localities;
    } catch (error) {
      console.log(
        "Fetch Localities Error:",
        error
      );

      return [];
    }
  };

/* REALTIME LOCALITIES */

export const subscribeToLocalities =
  (callback: any) => {
    return onSnapshot(
      collection(
        db,
        "localities"
      ),
      (snapshot) => {
        const localities: any[] =
          [];

        snapshot.forEach(
          (doc) => {
            localities.push({
              firestoreId:
                doc.id,
              ...doc.data(),
            });
          }
        );

        callback(localities);
      }
    );
  };