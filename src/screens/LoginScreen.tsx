import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  getUserByMobile,
} from "../services/userService";

export default function LoginScreen({
  navigation,
}: any) {

  const [
    mobile,
    setMobile,
  ] = useState("");

  const continueLogin = async () => {

    if (mobile.trim().length !== 10) {

      alert("Please enter a valid 10 digit mobile number.");

      return;

    }

    try {

      const user =
        await getUserByMobile(
          mobile.trim()
        );

      console.log("================================");
      console.log("Entered Mobile:", mobile.trim());
      console.log("User Object:", user);
      console.log("================================");

      if (!user) {

        console.log("USER NOT FOUND");

        alert(
          "This mobile number is not registered."
        );

        return;

      }

      console.log("Active:", user.active);

      if (!user.active) {

        console.log("ACCOUNT DISABLED");

        alert(
          "Your account has been disabled."
        );

        return;

      }

      console.log("Approved:", user.approved);

      if (!user.approved) {

        console.log("APPROVAL PENDING");

        alert(
          "Your account is awaiting admin approval."
        );

        return;

      }

      console.log("LOGIN SUCCESS");
      console.log(user);

      navigation.navigate(
        "OtpVerification",
        {
          mobile: mobile.trim(),
          user,
        }
      );

    }
    catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );

      alert(
        "Something went wrong while logging in."
      );

    }

  };

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#ffffff",
      }}
    >

      <Text
        style={{
          fontSize: 38,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        GROVIO
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "gray",
          marginBottom: 50,
        }}
      >
        Fresh. Local. Delivered.
      </Text>

      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Mobile Number
      </Text>

      <TextInput
        value={mobile}
        keyboardType="number-pad"
        maxLength={10}
        onChangeText={setMobile}
        placeholder="Enter Mobile Number"
        style={{
          borderWidth: 1,
          borderColor: "#cccccc",
          borderRadius: 10,
          padding: 15,
          fontSize: 18,
        }}
      />

      <TouchableOpacity
        onPress={continueLogin}
        style={{
          marginTop: 30,
          backgroundColor: "#2E7D32",
          padding: 18,
          borderRadius: 12,
        }}
      >

        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Continue
        </Text>

      </TouchableOpacity>

    </View>

  );

}