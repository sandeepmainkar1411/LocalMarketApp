import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToComplaints,
  updateComplaint,
  fetchComplaints,
} from "../services/complaintService";

import {
  fetchVendors,
  suspendVendor,
} from "../services/vendorService";

export default function AdminComplaintsScreen() {
  const [
    complaints,
    setComplaints,
  ] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToComplaints(
        setComplaints
      );

    return unsubscribe;
  }, []);

  const updateStatus =
    async (
      complaint: any,
      status: string
    ) => {
      try {
        await updateComplaint(
          complaint.firestoreId,
          {
            status,
          }
        );

        if (
          status !==
          "Approved"
        ) {
          return;
        }

        const allComplaints =
          await fetchComplaints();

        const approvedCount =
          allComplaints.filter(
            (item: any) =>
              item.vendorName ===
                complaint.vendorName &&
              item.status ===
                "Approved"
          ).length + 1;

        console.log(
          "Approved Complaints:",
          approvedCount
        );

        if (
          approvedCount >= 3
        ) {
          const vendors =
            await fetchVendors();

          const vendor =
            vendors.find(
              (item: any) =>
                item.vendorName ===
                complaint.vendorName
            );

          if (vendor) {
            await suspendVendor(
              vendor.firestoreId
            );

            Alert.alert(
              "Vendor Suspended",
              `${complaint.vendorName} has been suspended after 3 approved complaints`
            );
          }
        }
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Failed to update complaint"
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          "#f5f5f5",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        Complaints
      </Text>

      <FlatList
        data={complaints}
        keyExtractor={(
          item
        ) =>
          item.firestoreId
        }
        renderItem={({
          item,
        }) => (
          <View
            style={{
              backgroundColor:
                "#ffffff",
              padding: 20,
              borderRadius: 15,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight:
                  "bold",
                marginBottom: 15,
              }}
            >
              Order #
              {item.orderId?.slice(
                0,
                6
              )}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Vendor:{" "}
              {item.vendorName}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Customer:{" "}
              {item.customerName}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Mobile:{" "}
              {item.mobile ||
                "N/A"}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Locality:{" "}
              {item.locality ||
                "N/A"}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 15,
                color: "green",
                fontWeight:
                  "bold",
              }}
            >
              Amount: ₹
              {item.total || 0}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 15,
              }}
            >
              {item.complaint}
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight:
                  "bold",
                color:
                  item.status ===
                  "Approved"
                    ? "green"
                    : item.status ===
                      "Rejected"
                    ? "red"
                    : "orange",
                marginBottom: 15,
              }}
            >
              Status:{" "}
              {item.status}
            </Text>

            {item.status ===
              "Pending" && (
              <View
                style={{
                  flexDirection:
                    "row",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    updateStatus(
                      item,
                      "Approved"
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      "green",
                    padding: 15,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color:
                        "white",
                      textAlign:
                        "center",
                      fontWeight:
                        "bold",
                      fontSize: 18,
                    }}
                  >
                    Approve
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    updateStatus(
                      item,
                      "Rejected"
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      "red",
                    padding: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color:
                        "white",
                      textAlign:
                        "center",
                      fontWeight:
                        "bold",
                      fontSize: 18,
                    }}
                  >
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}