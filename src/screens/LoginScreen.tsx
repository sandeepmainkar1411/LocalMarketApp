import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  getUserByMobile,
} from "../services/userService";

import {
  fetchVendors,
} from "../services/vendorService";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebaseConfig";

export default function LoginScreen({
  navigation,
}: any) {

  const [
    mobile,
    setMobile,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const continueLogin = async () => {

    const enteredMobile =
      mobile.trim();

    if (
      enteredMobile.length !== 10
    ) {
      alert(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    try {

      console.log(
        "================================"
      );

      console.log(
        "Entered Mobile:",
        enteredMobile
      );

      /*
       * STEP 1
       * Check users collection.
       */

      const user =
        await getUserByMobile(
          enteredMobile
        );

      console.log(
        "User Object:",
        user
      );

      /*
       * EXISTING USER
       */

      if (user) {

        console.log(
          "EXISTING USER"
        );

        console.log(
          "Active:",
          user.active
        );

        if (
          user.active === false
        ) {

          alert(
            "Your account has been disabled."
          );

          return;
        }

        console.log(
          "Approved:",
          user.approved
        );

        if (
          user.approved === false
        ) {

          alert(
            "Your account is awaiting admin approval."
          );

          return;
        }

        console.log(
          "LOGIN SUCCESS - EXISTING USER"
        );

        navigation.navigate(
          "OtpVerification",
          {
            mobile:
              enteredMobile,

            isNewUser:
              false,
          }
        );

        return;
      }

      /*
       * STEP 2
       * User was not found.
       *
       * Now check whether this
       * mobile belongs to a vendor.
       */

      console.log(
        "USER NOT FOUND - CHECKING VENDORS"
      );

      const vendors =
        await fetchVendors();

      console.log(
        "VENDORS FOUND:",
        vendors.length
      );

      const vendor =
        vendors.find(
          (item: any) =>
            item.mobile
              ?.toString()
              .trim() ===
            enteredMobile
        );

      console.log(
        "VENDOR MATCH:",
        vendor
      );

      /*
       * EXISTING VENDOR
       */

      if (vendor) {

        console.log(
          "EXISTING VENDOR FOUND"
        );

        console.log(
          "Vendor Approval:",
          vendor.approvalStatus
        );

        console.log(
          "Vendor Active:",
          vendor.active
        );

        /*
         * Vendor is waiting for
         * admin approval.
         */

        if (
          vendor.approvalStatus ===
          "Pending"
        ) {

          alert(
            "Your vendor registration is still awaiting admin approval."
          );

          return;
        }

        /*
         * Vendor was suspended
         * or deactivated.
         */

        if (
          vendor.approvalStatus ===
            "Suspended" ||
          vendor.active === false
        ) {

          alert(
            "Your vendor account is currently inactive."
          );

          return;
        }

        /*
         * Vendor is approved and active.
         *
         * Create the corresponding
         * user record so that the
         * Role Selection screen can
         * identify the Vendor role.
         */

        if (
          vendor.approvalStatus ===
            "Approved" &&
          vendor.active === true
        ) {

          console.log(
            "APPROVED ACTIVE VENDOR"
          );

          const userRef =
            doc(
              db,
              "users",
              enteredMobile
            );

          await setDoc(
            userRef,
            {
              mobile:
                enteredMobile,

              roles: {
                customer:
                  false,

                vendor:
                  true,

                agent:
                  false,

                admin:
                  false,
              },

              approved:
                true,

              active:
                true,

              createdAt:
                new Date().toISOString(),
            },
            {
              merge: true,
            }
          );

          console.log(
            "VENDOR USER RECORD CREATED"
          );

          /*
           * Now continue to OTP.
           */

          navigation.navigate(
            "OtpVerification",
            {
              mobile:
                enteredMobile,

              isNewUser:
                false,
            }
          );

          return;
        }

        /*
         * Safety fallback.
         */

        alert(
          "Your vendor account is not currently available for login."
        );

        return;
      }

      /*
       * STEP 3
       * Neither a user nor a vendor
       * exists.
       *
       * Treat as a completely new user.
       */

      console.log(
        "NEW USER"
      );

      navigation.navigate(
        "OtpVerification",
        {
          mobile:
            enteredMobile,

          isNewUser:
            true,
        }
      );

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );

      alert(
        "Something went wrong while checking your mobile number."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <View
      style={{
        flex: 1,
        justifyContent:
          "center",
        padding: 25,
        backgroundColor:
          "#ffffff",
      }}
    >

      <Text
        style={{
          fontSize: 38,
          fontWeight:
            "bold",
          textAlign:
            "center",
        }}
      >
        GROVIO
      </Text>

      <Text
        style={{
          textAlign:
            "center",
          color:
            "gray",
          marginBottom:
            50,
        }}
      >
        Fresh. Local. Delivered.
      </Text>

      <Text
        style={{
          fontWeight:
            "bold",
          marginBottom:
            10,
        }}
      >
        Mobile Number
      </Text>

      <TextInput
        value={mobile}
        keyboardType="number-pad"
        maxLength={10}
        onChangeText={
          setMobile
        }
        placeholder="Enter Mobile Number"
        style={{
          borderWidth: 1,
          borderColor:
            "#cccccc",
          borderRadius: 10,
          padding: 15,
          fontSize: 18,
        }}
      />

      <TouchableOpacity
        onPress={
          continueLogin
        }
        disabled={loading}
        style={{
          marginTop: 30,

          backgroundColor:
            loading
              ? "#999999"
              : "#2E7D32",

          padding: 18,

          borderRadius: 12,
        }}
      >

        <Text
          style={{
            color:
              "white",

            textAlign:
              "center",

            fontWeight:
              "bold",

            fontSize: 18,
          }}
        >
          {loading
            ? "Checking..."
            : "Continue"}
        </Text>

      </TouchableOpacity>

    </View>
  );
}