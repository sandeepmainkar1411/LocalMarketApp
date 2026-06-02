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

  const approveVendor =
    async (vendor: any) => {
      await updateVendor(
        vendor.firestoreId,
        {
          approvalStatus:
            "Approved",

          active: true,
        }
      );

      Alert.alert(
        "Success",
        "Vendor Approved"
      );

      loadVendors();
    };

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

  const getStatusText =
    (vendor: any) => {
      if (
        vendor.approvalStatus ===
        "Pending"
      ) {
        return "🟠 Pending Approval";
      }

      if (vendor.active) {
        return "🟢 Active";
      }

      return "🔴 Inactive";
    };

  const getStatusColor =
    (vendor: any) => {
      if (
        vendor.approvalStatus ===
        "Pending"
      ) {
        return "orange";
      }

      if (vendor.active) {
        return "green";
      }

      return "red";
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
                  getStatusColor(
                    item
                  ),

                fontWeight:
                  "bold",

                fontSize: 16,
              }}
            >
              {getStatusText(
                item
              )}
            </Text>

            {item.approvalStatus ===
              "Pending" && (
              <TouchableOpacity
                onPress={() =>
                  approveVendor(
                    item
                  )
                }
                style={{
                  backgroundColor:
                    "green",

                  padding: 12,

                  borderRadius: 10,

                  marginTop: 15,
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
                  Approve Vendor
                </Text>
              </TouchableOpacity>
            )}

            {item.approvalStatus !==
              "Pending" && (
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
                    ? "Deactivate Vendor"
                    : "Activate Vendor"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}