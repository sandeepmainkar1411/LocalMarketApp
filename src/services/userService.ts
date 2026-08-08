import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const getUserByMobile =
async (
  mobile: string
) => {

  try {

    const userRef =
      doc(
        db,
        "users",
        mobile
      );

    const snapshot =
      await getDoc(
        userRef
      );

    if (
      snapshot.exists()
    ) {

      return {

        id:
          snapshot.id,

        ...snapshot.data(),

      };

    }

    return null;

  }
  catch (error) {

    console.log(
      "Get User Error:",
      error
    );

    return null;

  }

};