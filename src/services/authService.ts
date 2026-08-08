import {
  getAuth,
  signOut,
} from "firebase/auth";

import {
  app,
} from "../firebase/firebaseConfig";

const auth =
  getAuth(app);

export const DEV_OTP =
  "123456";

export const sendOtp =
async (
  mobile: string
) => {

  console.log(
    "Sending OTP to:",
    mobile
  );

  return {
    success: true,
    message: "OTP Sent",
  };

};

export const verifyOtp =
async (
  otp: string
) => {

  if (
    otp === DEV_OTP
  ) {

    return {
      success: true,
    };

  }

  return {
    success: false,
    message: "Invalid OTP",
  };

};

export const logout =
async () => {

  try {

    await signOut(auth);

    console.log(
      "User Logged Out"
    );

    return true;

  }
  catch (error) {

    console.log(
      error
    );

    return false;

  }

};