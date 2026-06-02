import {
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
  
  export default function VendorApprovalPendingScreen({
    navigation,
  }: any) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 25,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text
          style={{
            fontSize: 60,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          ⏳
        </Text>
  
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Approval Pending
        </Text>
  
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "gray",
            lineHeight: 30,
            marginBottom: 40,
          }}
        >
          Your vendor registration has
          been submitted successfully.
          {"\n\n"}
          An administrator will review
          your profile shortly.
          {"\n\n"}
          You will be able to login once
          your account is approved.
        </Text>
  
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorLogin"
            )
          }
          style={{
            backgroundColor: "green",
            padding: 18,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }