import {
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    updateDoc,
    doc,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firebaseConfig";
  
  /* CREATE NOTIFICATION */
  
  export const createNotification =
    async (
      notificationData: any
    ) => {
      try {
        await addDoc(
          collection(
            db,
            "notifications"
          ),
          notificationData
        );
      } catch (error) {
        console.log(error);
      }
    };
  
  /* FETCH */
  
  export const fetchNotifications =
    async () => {
      try {
        const snapshot =
          await getDocs(
            collection(
              db,
              "notifications"
            )
          );
  
        const notifications: any[] =
          [];
  
        snapshot.forEach(
          (doc) => {
            notifications.push({
              firestoreId:
                doc.id,
              ...doc.data(),
            });
          }
        );
  
        return notifications;
      } catch (error) {
        console.log(error);
        return [];
      }
    };
  
  /* REALTIME */
  
  export const subscribeToNotifications =
    (callback: any) => {
      return onSnapshot(
        collection(
          db,
          "notifications"
        ),
        (snapshot) => {
          const notifications: any[] =
            [];
  
          snapshot.forEach(
            (doc) => {
              notifications.push({
                firestoreId:
                  doc.id,
                ...doc.data(),
              });
            }
          );
  
          callback(
            notifications
          );
        }
      );
    };
  
  /* MARK READ */
  
  export const markNotificationRead =
    async (
      firestoreId: string
    ) => {
      await updateDoc(
        doc(
          db,
          "notifications",
          firestoreId
        ),
        {
          read: true,
        }
      );
    };