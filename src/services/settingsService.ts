import {
    doc,
    getDoc,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firebaseConfig";
  
  export const getPlatformFee =
    async () => {
      try {
        const docRef = doc(
          db,
          "settings",
          "appConfig"
        );
  
        const snapshot =
          await getDoc(docRef);
  
        if (
          snapshot.exists()
        ) {
          return (
            snapshot.data()
              .platformFee || 0
          );
        }
  
        return 0;
      } catch (error) {
        console.log(error);
        return 0;
      }
    };