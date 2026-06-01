import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { useState } from "react";

import {
  updateVendor,
} from "../services/vendorService";

export default function VendorProfileEditScreen({
  navigation,
  route,
}: any) {
  const vendor =
    route?.params?.vendor;

  const [vendorName, setVendorName] =
    useState(
      vendor?.vendorName || ""
    );

  const [ownerName, setOwnerName] =
    useState(
      vendor?.ownerName || ""
    );

  const [mobile, setMobile] =
    useState(
      vendor?.mobile || ""
    );

  const [address, setAddress] =
    useState(
      vendor?.address || ""
    );

  const [active, setActive] =
    useState(
      vendor?.active ?? true
    );

  const saveChanges =
    async () => {
      const success =
        await updateVendor(
          vendor.firestoreId,
          {
            vendorName,
            ownerName,
            mobile,
            address,
            active,
          }
        );

      if (success) {
        Alert.alert(
          "Success",
          "Profile Updated Successfully"
        );

        navigation.goBack();
      } else {
        Alert.alert(
          "Error",
          "Unable to update profile"
        );
      }
    };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          "#f5f5f5",
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Edit Profile
        </Text>

        <TextInput
          value={vendorName}
          onChangeText={
            setVendorName
          }
          placeholder="Vendor Name"
          style={{
            backgroundColor:
              "white",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        <TextInput
          value={ownerName}
          onChangeText={
            setOwnerName
          }
          placeholder="Owner Name"
          style={{
            backgroundColor:
              "white",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        <TextInput
          value={mobile}
          onChangeText={
            setMobile
          }
          keyboardType="numeric"
          placeholder="Mobile Number"
          style={{
            backgroundColor:
              "white",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        <Text
          style={{
            color: "gray",
            marginBottom: 5,
          }}
        >
          Locality
        </Text>

        <TextInput
          editable={false}
          value={
            vendor?.locality
          }
          style={{
            backgroundColor:
              "#ddd",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        <TextInput
          value={address}
          onChangeText={
            setAddress
          }
          placeholder="Address"
          style={{
            backgroundColor:
              "white",
            padding: 15,
            borderRadius: 10,
            marginBottom: 25,
          }}
        />

        <View
          style={{
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Shop Status
          </Text>

          <TouchableOpacity
            onPress={() =>
              setActive(
                !active
              )
            }
            style={{
              backgroundColor:
                active
                  ? "green"
                  : "red",

              padding: 15,

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
              {active
                ? "🟢 Shop Active"
                : "🔴 Shop Inactive"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={
            saveChanges
          }
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
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}