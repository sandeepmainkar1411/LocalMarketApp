import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";

export default function CustomerLoginScreen({
  navigation,
}: any) {
  const [phone, setPhone] = useState("");

  const handleSendOtp = () => {
    const mobile = phone.trim();

    if (mobile.length !== 10) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    console.log(
      "Navigating to OTP with mobile:",
      mobile
    );

    navigation.navigate(
      "OtpVerification",
      {
        mobile,
      }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F5F7FA",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F7FA"
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 25,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: "#1E293B",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Welcome
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "#64748B",
            fontSize: 16,
            marginBottom: 40,
          }}
        >
          Login with your mobile number
        </Text>

        <Text
          style={{
            marginBottom: 8,
            fontSize: 14,
            fontWeight: "600",
            color: "#334155",
          }}
        >
          Mobile Number
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 12,
            paddingHorizontal: 15,
            height: 58,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#111827",
              marginRight: 10,
            }}
          >
            +91
          </Text>

          <TextInput
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={(text) =>
              setPhone(
                text.replace(
                  /[^0-9]/g,
                  ""
                )
              )
            }
            style={{
              flex: 1,
              fontSize: 16,
              color: "#111827",
            }}
          />
        </View>

        <TouchableOpacity
          disabled={phone.length !== 10}
          onPress={handleSendOtp}
          style={{
            backgroundColor:
              phone.length === 10
                ? "#16A34A"
                : "#94A3B8",
            height: 56,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Send OTP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={{
            marginTop: 25,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#2563EB",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingBottom: 25,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#94A3B8",
            fontSize: 12,
          }}
        >
          By continuing, you agree to our
          Terms & Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}