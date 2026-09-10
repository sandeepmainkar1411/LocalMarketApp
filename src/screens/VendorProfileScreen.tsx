import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";

import {
  createVendor,
  vendorExists,
  mobileExists,
} from "../services/vendorService";

import {
  subscribeToLocalities,
} from "../services/localityService";

export default function VendorProfileScreen({
  navigation,
  route,
}: any) {
  // Mobile number verified through OTP
  const verifiedMobile =
    route?.params?.mobile || "";

  const [vendorName, setVendorName] =
    useState("");

  const [ownerName, setOwnerName] =
    useState("");

  const [mobile, setMobile] =
    useState(verifiedMobile);

  const [locality, setLocality] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [localities, setLocalities] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    setMobile(verifiedMobile);
  }, [verifiedMobile]);

  useEffect(() => {
    const unsubscribe =
      subscribeToLocalities(
        (data: any[]) => {
          setLocalities(data);
        }
      );

    return () => unsubscribe();
  }, []);

  const saveProfile = async () => {
    if (saving) {
      return;
    }

    if (
      !vendorName.trim() ||
      !ownerName.trim() ||
      !mobile.trim() ||
      !locality.trim() ||
      !address.trim()
    ) {
      Alert.alert(
        "Validation",
        "Please fill all fields"
      );
      return;
    }

    try {
      setSaving(true);

      console.log(
        "SAVE PROFILE CLICKED"
      );

      console.log(
        "Vendor:",
        vendorName
      );

      console.log(
        "Owner:",
        ownerName
      );

      console.log(
        "Mobile:",
        mobile
      );

      console.log(
        "Locality:",
        locality
      );

      const exists =
        await vendorExists(
          vendorName.trim(),
          locality
        );

      console.log(
        "VENDOR NAME CHECK RESULT:",
        exists
      );

      if (exists) {
        Alert.alert(
          "Duplicate Vendor",
          `${vendorName} already exists in ${locality}`
        );

        return;
      }

      const mobileAlreadyExists =
        await mobileExists(
          mobile.trim()
        );

      console.log(
        "MOBILE CHECK RESULT:",
        mobileAlreadyExists
      );

      if (mobileAlreadyExists) {
        Alert.alert(
          "Duplicate Mobile",
          `Mobile number ${mobile} is already registered`
        );

        return;
      }

      await createVendor({
        vendorName:
          vendorName.trim(),

        ownerName:
          ownerName.trim(),

        mobile:
          mobile.trim(),

        locality,

        address:
          address.trim(),

        active: false,

        approvalStatus:
          "Pending",

        createdAt:
          new Date().toISOString(),
      });

      console.log(
        "VENDOR REGISTRATION SAVED"
      );

      if (Platform.OS === "web") {
        window.alert(
          "Registration Submitted\n\nYour vendor profile has been submitted for admin approval."
        );
      
        navigation.navigate(
          "VendorApprovalPending",
          {
            mobile: mobile.trim(),
          }
        );
      } else {
        Alert.alert(
          "Registration Submitted",
          "Your vendor profile has been submitted for admin approval.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate(
                  "VendorApprovalPending",
                  {
                    mobile: mobile.trim(),
                  }
                );
              },
            },
          ]
        );
      }
    } catch (error: any) {
      console.log(
        "Vendor profile save error:",
        error
      );

      Alert.alert(
        "Error",
        error?.message ||
          "Failed to save vendor profile"
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Expo Web:
   * Use a native HTML button because
   * React Native TouchableOpacity has
   * already shown inconsistent press
   * handling on this particular screen.
   */
  const renderSaveButton = () => {
    if (Platform.OS === "web") {
      return (
        <button
          type="button"
          onClick={saveProfile}
          disabled={saving}
          style={{
            width: "100%",
            backgroundColor: saving
              ? "#777777"
              : "green",
            padding: "18px",
            borderRadius: "10px",
            border: "none",
            marginTop: "10px",
            cursor: saving
              ? "default"
              : "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {saving
            ? "Saving..."
            : "Save Profile"}
        </button>
      );
    }

    return (
      <TouchableOpacity
        disabled={saving}
        onPress={saveProfile}
        style={{
          backgroundColor:
            saving
              ? "#777777"
              : "green",
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
          {saving
            ? "Saving..."
            : "Save Profile"}
        </Text>
      </TouchableOpacity>
    );
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
            marginBottom: 25,
          }}
        >
          Vendor Profile
        </Text>

        <TextInput
          placeholder="Vendor Name"
          value={vendorName}
          onChangeText={
            setVendorName
          }
          style={inputStyle}
        />

        <TextInput
          placeholder="Owner Name"
          value={ownerName}
          onChangeText={
            setOwnerName
          }
          style={inputStyle}
        />

        <TextInput
          placeholder="Mobile Number"
          value={mobile}
          editable={false}
          keyboardType="phone-pad"
          style={{
            ...inputStyle,
            backgroundColor:
              "#e9e9e9",
            color: "#555555",
          }}
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
          {localities.map(
            (item: any) => (
              <TouchableOpacity
                key={
                  item.firestoreId
                }
                onPress={() =>
                  setLocality(
                    item.name
                  )
                }
                style={{
                  backgroundColor:
                    locality ===
                    item.name
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
                      locality ===
                      item.name
                        ? "white"
                        : "black",

                    fontWeight:
                      "bold",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={
            setAddress
          }
          style={inputStyle}
        />

        {renderSaveButton()}
      </View>
    </ScrollView>
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