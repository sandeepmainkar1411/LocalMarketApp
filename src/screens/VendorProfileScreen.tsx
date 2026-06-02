import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import {
  useState,
  useEffect,
} from "react";

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

  const [localities, setLocalities] =
    useState<any[]>([]);

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
      const exists =
        await vendorExists(
          vendorName,
          locality
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
          mobile
        );

      if (
        mobileAlreadyExists
      ) {
        Alert.alert(
          "Duplicate Mobile",
          `Mobile number ${mobile} is already registered`
        );

        return;
      }

      await createVendor({
        vendorName,
        ownerName,
        mobile,
        locality,
        address,
      
        active: false,
      
        approvalStatus:
          "Pending",
      
        createdAt:
          new Date().toISOString(),
      });

      Alert.alert(
        "Registration Submitted",
        "Your vendor profile has been submitted for admin approval."
      );
      
      navigation.navigate(
        "VendorApprovalPending"
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
          onChangeText={
            setMobile
          }
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

        <TouchableOpacity
          onPress={
            saveProfile
          }
          style={{
            backgroundColor:
              "green",
            padding: 18,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign:
                "center",
              fontSize: 18,
              fontWeight:
                "bold",
            }}
          >
            Save Profile
          </Text>
        </TouchableOpacity>
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