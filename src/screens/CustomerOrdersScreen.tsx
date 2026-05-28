import {
    View,
    Text,
    ScrollView,
  } from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    subscribeToOrders,
  } from "../services/orderService";
  
  export default function CustomerOrdersScreen() {
    const [orders, setOrders] =
      useState<any[]>([]);
  
    useEffect(() => {
      const unsubscribe =
        subscribeToOrders(
          (ordersData: any[]) => {
            setOrders(ordersData);
          }
        );
  
      return () => unsubscribe();
    }, []);
  
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
                Order #{order.id.slice(0, 6)}
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
                      🥬 {item.name} -{" "}
                      {item.displayQuantity}
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
                📍{" "}
                {
                  order.address
                    ?.flat
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
                  marginBottom: 15,
                }}
              >
                📞{" "}
                {
                  order.address
                    ?.mobile
                }
              </Text>
  
              {/* Total */}
              <Text
                style={{
                  fontSize: 30,
  
                  color: "green",
  
                  fontWeight:
                    "bold",
  
                  marginBottom: 15,
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
  
                  fontWeight:
                    "bold",
                }}
              >
                Status: {order.status}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }