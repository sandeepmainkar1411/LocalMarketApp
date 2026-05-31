import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useState } from "react";

import {
  createVendor,
} from "../services/vendorService";

import {
  LOCALITIES,
} from "../constants/localities";

export default function VendorProfileScreen({
  navigation,
}: any) {
  const [vendorName, setVendorName] =
    useState("");

  const [ownerName, setOwnerName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [locality, setLocality] =
    useState("");

  const [address, setAddress] =
    useState("");

  const saveProfile = async () => {
    if (
      !vendorName ||
      !ownerName ||
      !mobile ||
      !locality ||
      !address
    ) {
      Alert.alert(
        "Validation",
        "Please fill all fields"
      );
      return;
    }

    try {
      await createVendor({
        vendorName,
        ownerName,
        mobile,
        locality,
        address,
        active: true,
        createdAt:
          new Date().toISOString(),
      });

      console.log(
        "Vendor saved successfully"
      );
      
      navigation.navigate(
        "VendorDashboard"
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to save vendor profile"
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        Vendor Profile
      </Text>

      <TextInput
        placeholder="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
        style={inputStyle}
      />

      <TextInput
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
        style={inputStyle}
      />

      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        style={inputStyle}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Select Locality
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        {LOCALITIES.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setLocality(item)
            }
            style={{
              backgroundColor:
                locality === item
                  ? "green"
                  : "#dddddd",

              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 20,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color:
                  locality === item
                    ? "white"
                    : "black",
                fontWeight: "bold",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={inputStyle}
      />

      <TouchableOpacity
        onPress={saveProfile}
        style={{
          backgroundColor: "green",
          padding: 18,
          borderRadius: 10,
          marginTop: 10,
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
          Save Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  backgroundColor: "white",
  borderWidth: 1,
  borderColor: "#dddddd",
  padding: 15,
  borderRadius: 10,
  marginBottom: 15,
};