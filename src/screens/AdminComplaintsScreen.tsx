import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    subscribeToComplaints,
    updateComplaint,
  } from "../services/complaintService";
  
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
        await updateComplaint(
          complaint.firestoreId,
          {
            status,
          }
        );
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
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
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
                  "white",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
              }}
            >
            <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
            }}
          >
            Order #{item.orderId?.slice(0,6)}
          </Text>

          <Text
            style={{
              marginTop: 10,
            }}
          >
            Vendor: {item.vendorName}
          </Text>

          <Text>
            Customer: {item.customerName}
          </Text>

          <Text>
            Mobile: {item.mobile}
          </Text>

          <Text>
            Locality: {item.locality}
          </Text>

          <Text>
            Amount: ₹{item.total}
          </Text>
  
              <Text
                style={{
                  marginTop: 10,
                }}
              >
                {
                  item.complaint
                }
              </Text>
  
              <Text
                style={{
                  marginTop: 10,
                  color: "orange",
                  fontWeight:
                    "bold",
                }}
              >
                Status:
                {" "}
                {
                  item.status
                }
              </Text>
  
              {item.status ===
                "Pending" && (
                <View
                  style={{
                    flexDirection:
                      "row",
                    marginTop: 15,
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
                      padding: 12,
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
                      padding: 12,
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