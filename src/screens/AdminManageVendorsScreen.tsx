import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
  } from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    fetchVendors,
    updateVendor,
  } from "../services/vendorService";
  
  export default function AdminManageVendorsScreen() {
    const [vendors, setVendors] =
      useState<any[]>([]);
  
    const loadVendors =
      async () => {
        const data =
          await fetchVendors();
  
        setVendors(data);
      };
  
    useEffect(() => {
      loadVendors();
    }, []);
  
    const toggleVendorStatus =
      async (
        vendor: any
      ) => {
        await updateVendor(
          vendor.firestoreId,
          {
            active:
              !vendor.active,
          }
        );
  
        Alert.alert(
          "Success",
          vendor.active
            ? "Vendor Deactivated"
            : "Vendor Activated"
        );
  
        loadVendors();
      };
  
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor:
            "#f5f5f5",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Manage Vendors
        </Text>
  
        <FlatList
          data={vendors}
          keyExtractor={(item) =>
            item.firestoreId
          }
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor:
                  "white",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                borderWidth: 1,
                borderColor:
                  "#ddd",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight:
                    "bold",
                }}
              >
                {item.vendorName}
              </Text>
  
              <Text>
                👤 {item.ownerName}
              </Text>
  
              <Text>
                📞 {item.mobile}
              </Text>
  
              <Text>
                📍 {item.locality}
              </Text>
  
              <Text
                style={{
                  marginTop: 10,
                  color:
                    item.active
                      ? "green"
                      : "red",
                  fontWeight:
                    "bold",
                }}
              >
                {item.active
                  ? "🟢 Active"
                  : "🔴 Inactive"}
              </Text>
  
              <TouchableOpacity
                onPress={() =>
                  toggleVendorStatus(
                    item
                  )
                }
                style={{
                  marginTop: 15,
                  backgroundColor:
                    item.active
                      ? "red"
                      : "green",
  
                  padding: 12,
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
                  }}
                >
                  {item.active
                    ? "Deactivate"
                    : "Activate"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }