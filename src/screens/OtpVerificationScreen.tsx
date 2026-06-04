import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import {
  fetchCustomers,
} from "../services/customerService";

export default function OtpVerificationScreen({
  navigation,
  route,
}: any) {
  const [otp, setOtp] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Verify OTP
      </Text>

      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={async () => {
          try {
            const mobile =
              route.params?.mobile;

            const customers =
              await fetchCustomers();

            const customer =
              customers.find(
                (item: any) =>
                  item.mobile ===
                  mobile
              );

            if (customer) {
              navigation.navigate(
                "SelectLocality",
                {
                  customer,
                }
              );
            } else {
              navigation.navigate(
                "CustomerProfile",
                {
                  mobile,
                }
              );
            }
          } catch (error) {
            console.log(error);
          }
        }}
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Verify OTP
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "blue",
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}