import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToOrders,
  updateOrder,
} from "../services/orderService";

export default function VendorOrdersScreen() {
  const [vendorOrders, setVendorOrders] =
    useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToOrders(
        (ordersData: any[]) => {
          setVendorOrders(ordersData);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleAccept = async (
    orderId: string
  ) => {
    await updateOrder(orderId, {
      status: "Accepted",
    });
  };

  const handleReject = async (
    orderId: string
  ) => {
    await updateOrder(orderId, {
      status: "Rejected",
    });
  };

  const handleDelivered = async (
    orderId: string
  ) => {
    await updateOrder(orderId, {
      status: "Delivered",
    });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Vendor Orders 📦
        </Text>

        {vendorOrders.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              color: "gray",
              marginTop: 50,
            }}
          >
            No Orders Yet
          </Text>
        )}

        {vendorOrders.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              borderRadius: 15,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            {/* Customer Name */}
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              👤 {order.customer}
            </Text>

            {/* Products */}
            <View
              style={{
                marginBottom: 15,
              }}
            >
              {order.items?.map(
                (
                  item: any,
                  index: number
                ) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    🥬 {item.name} -{" "}
                    {item.quantity}{" "}
                    {item.unit}
                  </Text>
                )
              )}
            </View>

            {/* Address */}
            <View
              style={{
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                📍{" "}
                {
                  order.address?.flat
                }
                ,{" "}
                {
                  order.address
                    ?.building
                }
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                  marginBottom: 5,
                }}
              >
                Landmark:{" "}
                {
                  order.address
                    ?.landmark
                }
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                📞{" "}
                {
                  order.address
                    ?.mobile
                }
              </Text>
            </View>

            {/* Total */}
            <Text
              style={{
                fontSize: 32,
                color: "green",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              ₹{order.total}
            </Text>

            {/* Status */}
            <Text
              style={{
                fontSize: 22,
                color:
                  order.status ===
                  "Delivered"
                    ? "green"
                    : order.status ===
                      "Rejected"
                    ? "red"
                    : "orange",

                fontWeight: "bold",
                marginBottom: 25,
              }}
            >
              Status: {order.status}
            </Text>

            {/* Placed Buttons */}
            {order.status ===
              "Placed" && (
              <View
                style={{
                  flexDirection:
                    "row",

                  justifyContent:
                    "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    handleAccept(
                      order.id
                    )
                  }
                  style={{
                    backgroundColor:
                      "green",

                    padding: 18,

                    borderRadius: 12,

                    width: "47%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",

                      textAlign:
                        "center",

                      fontSize: 20,

                      fontWeight:
                        "bold",
                    }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleReject(
                      order.id
                    )
                  }
                  style={{
                    backgroundColor:
                      "red",

                    padding: 18,

                    borderRadius: 12,

                    width: "47%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",

                      textAlign:
                        "center",

                      fontSize: 20,

                      fontWeight:
                        "bold",
                    }}
                  >
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Accepted Button */}
            {order.status ===
              "Accepted" && (
              <TouchableOpacity
                onPress={() =>
                  handleDelivered(
                    order.id
                  )
                }
                style={{
                  backgroundColor:
                    "#0066cc",

                  padding: 18,

                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",

                    textAlign:
                      "center",

                    fontSize: 20,

                    fontWeight:
                      "bold",
                  }}
                >
                  Mark Delivered
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}