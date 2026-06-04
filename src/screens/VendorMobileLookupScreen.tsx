import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useState } from "react";

import {
  fetchVendors,
} from "../services/vendorService";

export default function VendorMobileLookupScreen({
  navigation,
}: any) {
  const [mobile, setMobile] =
    useState("");

  const checkVendor =
    async () => {
      if (!mobile.trim()) {
        Alert.alert(
          "Validation",
          "Please enter mobile number"
        );
        return;
      }

      try {
        const vendors =
          await fetchVendors();

        const vendor =
          vendors.find(
            (item: any) =>
              item.mobile ===
              mobile.trim()
          );

        console.log(
          "FOUND VENDOR:",
          vendor
        );

        if (!vendor) {
          Alert.alert(
            "New Vendor",
            "Please complete registration"
          );

          navigation.navigate(
            "VendorTerms"
          );

          return;
        }

        console.log(
          "APPROVAL STATUS:",
          vendor.approvalStatus
        );

        console.log(
          "ACTIVE:",
          vendor.active
        );

        /* PENDING */

        if (
          vendor.approvalStatus ===
          "Pending"
        ) {
          navigation.navigate(
            "VendorApprovalPending"
          );

          return;
        }

        /* REJECTED */

        if (
          vendor.approvalStatus ===
          "Rejected"
        ) {
          Alert.alert(
            "Registration Rejected",
            "Please contact administrator."
          );

          return;
        }

        /* SUSPENDED */

        if (
          vendor.approvalStatus ===
            "Suspended" ||
          vendor.active ===
            false
        ) {
          navigation.navigate(
            "VendorSuspended"
          );

          return;
        }

        /* APPROVED */

        Alert.alert(
          "Welcome Back",
          vendor.ownerName ||
            vendor.vendorName
        );

        navigation.navigate(
          "VendorDashboard",
          {
            vendor,
          }
        );
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Unable to verify vendor"
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent:
          "center",
        padding: 20,
        backgroundColor:
          "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Vendor Login
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "gray",
          marginBottom: 30,
          fontSize: 16,
        }}
      >
        Enter your registered mobile number
      </Text>

      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        style={{
          backgroundColor:
            "white",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={checkVendor}
        style={{
          backgroundColor:
            "green",
          padding: 18,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign:
              "center",
            fontWeight:
              "bold",
            fontSize: 18,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}