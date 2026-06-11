import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import React, {
  useState,
  useEffect,
} from "react";

import {
  subscribeToOrders,
} from "../services/orderService";

export default function CustomerOrdersScreen({
  navigation,
  route,
}: any) {
  const [orders, setOrders] =
    useState<any[]>([]);

    useEffect(() => {
      const customer =
        route?.params?.customer;
    
      const unsubscribe =
        subscribeToOrders(
          (ordersData: any[]) => {
            const filteredOrders =
              ordersData.filter(
                (order: any) =>
                  order.customerMobile ===
                  customer?.mobile
              );
    
            const sortedOrders =
              filteredOrders.sort(
                (a, b) => {
                  const dateA =
                    a.createdAt?.toDate
                      ? a.createdAt.toDate()
                      : new Date(a.createdAt);
    
                  const dateB =
                    b.createdAt?.toDate
                      ? b.createdAt.toDate()
                      : new Date(b.createdAt);
    
                  return (
                    dateB.getTime() -
                    dateA.getTime()
                  );
                }
              );
    
            setOrders(
              sortedOrders
            );
          }
        );
    
      return () =>
        unsubscribe();
    }, []);

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
            fontSize: 34,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          My Orders 📦
        </Text>

        {orders.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "gray",
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
              borderRadius: 15,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              📦 Order No:
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: "#1976D2",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              {order.orderNumber || order.id}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "gray",
                marginBottom: 15,
              }}
            >
              Vendor: {order.vendorName}
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
                    marginBottom: 5,
                  }}
                >
                  🥬 {item.name} - {item.displayQuantity}
                </Text>
              )
            )}
          </View>

            {/* Address */}
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                marginBottom: 5,
              }}
            >
              📍 {order.address?.flat},{" "}
              {order.address?.building}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "gray",
                marginBottom: 15,
              }}
            >
              📞 {order.address?.mobile}
            </Text>

            {/* Total */}
            <Text
              style={{
                fontSize: 30,
                color: "green",
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              ₹{order.total}
            </Text>

            {/* Tracking */}
            <View
              style={{
                backgroundColor:
                  "#f8f9fa",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Order Tracking 🚚
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                🟢 Placed
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                {order.status ===
                  "Accepted" ||
                order.status ===
                  "Out For Delivery" ||
                order.status ===
                  "Delivered"
                  ? "🟢 Accepted"
                  : "⚪ Accepted"}
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                {order.status ===
                  "Out For Delivery" ||
                order.status ===
                  "Delivered"
                  ? "🟢 Out For Delivery"
                  : "⚪ Out For Delivery"}
              </Text>

              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {order.status ===
                "Delivered"
                  ? "🟢 Delivered"
                  : "⚪ Delivered"}
              </Text>
            </View>

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
              }}
            >
              Status: {order.status}
            </Text>

            {/* Rating + Complaint */}
            {order.status ===
              "Delivered" && (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      "CustomerRating",
                      {
                        order,
                      }
                    )
                  }
                  style={{
                    backgroundColor:
                      "#4CAF50",
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 15,
                    marginBottom: 10,
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
                    ⭐ Rate Vendor
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      "CustomerComplaint",
                      {
                        order,
                      }
                    )
                  }
                  style={{
                    backgroundColor:
                      "#f44336",
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
                    }}
                  >
                    Report Complaint
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}