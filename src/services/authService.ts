import {
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";

import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);

export { auth, signInWithPhoneNumber };