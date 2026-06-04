import {
    View,
    Text,
  } from "react-native";
  
  export default function VendorSuspendedScreen() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
          backgroundColor: "#fff5f5",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            marginBottom: 20,
          }}
        >
          🚫
        </Text>
  
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            color: "red",
          }}
        >
          Account Suspended
        </Text>
  
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "#555",
          }}
        >
          Your account has been suspended due to multiple approved complaints.
          Please contact the administrator.
        </Text>
      </View>
    );
  }