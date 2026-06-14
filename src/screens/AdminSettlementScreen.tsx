import React, {
    useEffect,
    useState,
  } from "react";
  
  import {
    View,
    Text,
    ScrollView,
  } from "react-native";
  
  import {
    subscribeToOrders,
  } from "../services/orderService";
  
  export default function AdminSettlementScreen() {
  
    const [
      orders,
      setOrders,
    ] = useState<any[]>([]);
  
    useEffect(() => {
  
      const unsubscribe =
        subscribeToOrders(
          (ordersData: any[]) => {
  
            const deliveredOrders =
              ordersData.filter(
                (order: any) =>
                  order.status ===
                  "Delivered"
              );
  
            setOrders(
              deliveredOrders
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
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 25,
            }}
          >
            Settlement Dashboard 💰
          </Text>
  
          {orders.map(
            (order) => (
  
              <View
                key={order.id}
                style={{
                  backgroundColor:
                    "#fff",
                  padding: 15,
                  borderRadius: 12,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {order.orderNumber}
                </Text>
  
                <Text>
                  Vendor:
                  {" "}
                  {order.vendorName}
                </Text>
  
                <Text>
                  Agent:
                  {" "}
                  {order.collectedBy || "-"}
                </Text>
  
                <Text>
                  Amount:
                  {" "}
                  ₹{order.total}
                </Text>
  
                <Text>
                  Payment:
                  {" "}
                  {order.paymentMode}
                </Text>
  
                <Text
                  style={{
                    color:
                      order.settlementStatus ===
                      "Settled"
                        ? "green"
                        : "orange",
  
                    fontWeight: "bold",
                    marginTop: 8,
                  }}
                >
                  Settlement:
                  {" "}
                  {order.settlementStatus ||
                    "Pending"}
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    );
  }