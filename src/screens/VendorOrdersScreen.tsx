import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useState } from "react";

import { orders } from "../data/orders";

export default function VendorOrdersScreen() {
  const [, forceUpdate] = useState(0);

  const updateOrderStatus = (
    id: string,
    status: string
  ) => {
    const orderIndex = orders.findIndex(
      (order) => order.id === id
    );

    if (orderIndex !== -1) {
      orders[orderIndex].status = status;

      forceUpdate((prev) => prev + 1);
    }
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
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Vendor Orders 📦
        </Text>

        {orders.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: 18,
              marginTop: 50,
            }}
          >
            No Orders Yet
          </Text>
        )}

        {orders.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              borderRadius: 12,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              👤 {order.customer}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              🥬 {order.items}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              📍 {order.address}
            </Text>

            <Text
              style={{
                fontSize: 22,
                color: "green",
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              ₹{order.total}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 20,

                color:
                  order.status === "Rejected"
                    ? "red"
                    : order.status === "Delivered"
                    ? "green"
                    : "orange",
              }}
            >
              Status: {order.status}
            </Text>

            {order.status === "Placed" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    updateOrderStatus(
                      order.id,
                      "Accepted"
                    )
                  }
                  style={{
                    backgroundColor: "green",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "48%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    updateOrderStatus(
                      order.id,
                      "Rejected"
                    )
                  }
                  style={{
                    backgroundColor: "red",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "48%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {order.status === "Accepted" && (
              <TouchableOpacity
                onPress={() =>
                  updateOrderStatus(
                    order.id,
                    "Delivered"
                  )
                }
                style={{
                  backgroundColor: "orange",
                  paddingVertical: 15,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 16,
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