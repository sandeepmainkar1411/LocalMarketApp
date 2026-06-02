import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    onSnapshot,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firebaseConfig";
  
  /* CREATE COMPLAINT */
  
  export const createComplaint =
    async (
      complaintData: any
    ) => {
      try {
        const docRef =
          await addDoc(
            collection(
              db,
              "complaints"
            ),
            complaintData
          );
  
        return docRef.id;
      } catch (error) {
        console.log(error);
      }
    };
  
  /* FETCH COMPLAINTS */
  
  export const fetchComplaints =
    async () => {
      try {
        const snapshot =
          await getDocs(
            collection(
              db,
              "complaints"
            )
          );
  
        const complaints: any[] =
          [];
  
        snapshot.forEach(
          (doc) => {
            complaints.push({
              firestoreId:
                doc.id,
              ...doc.data(),
            });
          }
        );
  
        return complaints;
      } catch (error) {
        console.log(error);
        return [];
      }
    };
  
  /* UPDATE COMPLAINT */
  
  export const updateComplaint =
    async (
      firestoreId: string,
      complaintData: any
    ) => {
      try {
        await updateDoc(
          doc(
            db,
            "complaints",
            firestoreId
          ),
          complaintData
        );
      } catch (error) {
        console.log(error);
      }
    };
  
  /* REALTIME */
  
  export const subscribeToComplaints =
    (callback: any) => {
      return onSnapshot(
        collection(
          db,
          "complaints"
        ),
        (snapshot) => {
          const complaints: any[] =
            [];
  
          snapshot.forEach(
            (doc) => {
              complaints.push({
                firestoreId:
                  doc.id,
                ...doc.data(),
              });
            }
          );
  
          callback(
            complaints
          );
        }
      );
    };