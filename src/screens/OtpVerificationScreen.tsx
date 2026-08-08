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
  verifyOtp,
} from "../services/authService";

export default function OtpVerificationScreen({
  navigation,
  route,
}: any) {

  const [
    otp,
    setOtp,
  ] = useState("");

  const mobile =
    route?.params?.mobile;

  const user =
    route?.params?.user;

  const verify = async () => {

    const result =
      await verifyOtp(
        otp
      );

    if (!result.success) {

      alert(
        result.message
      );

      return;

    }

    console.log(
      "OTP VERIFIED"
    );

    console.log(
      user
    );

    navigation.navigate(
      "RoleSelection",
      {
        user,
      }
    );

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
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Verify OTP
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "gray",
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        OTP sent to

        {"\n"}

        {mobile}
      </Text>

      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="Enter OTP"
        style={{
          borderWidth: 1,
          borderColor: "#cccccc",
          borderRadius: 10,
          padding: 15,
          fontSize: 18,
        }}
      />

      <TouchableOpacity
        onPress={verify}
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
          Verify OTP
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }
        style={{
          marginTop: 20,
        }}
      >

        <Text
          style={{
            color: "#1976D2",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Back
        </Text>

      </TouchableOpacity>

    </View>

  );

}