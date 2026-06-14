import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    subscribeToOrders,
    updateOrder,
  } from "../services/orderService";
  
  export default function AgentOrdersScreen({
    route,
    navigation,
  }: any) {
  
    const agent =
      route?.params?.agent;
  
    const [orders, setOrders] =
      useState<any[]>([]);
  
    useEffect(() => {
  
      const unsubscribe =
        subscribeToOrders(
          (ordersData: any[]) => {
  
            const assignedOrders =
              ordersData.filter(
                (order) =>
                  order.agentMobile ===
                  agent.mobile
              );
  
            const sortedOrders =
              assignedOrders.sort(
                (a, b) => {
  
                  const dateA =
                    a.createdAt?.toDate
                      ? a.createdAt.toDate()
                      : new Date(
                          a.createdAt
                        );
  
                  const dateB =
                    b.createdAt?.toDate
                      ? b.createdAt.toDate()
                      : new Date(
                          b.createdAt
                        );
  
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
  
    const handleStartDelivery =
      async (
        orderId: string
      ) => {
  
        await updateOrder(
          orderId,
          {
            status:
              "Out For Delivery",
          }
        );
      };
  
    const handleDelivered =
      async (
        order: any
      ) => {
  
        navigation.navigate(
          "AgentPayment",
          {
            order,
            agent,
          }
        );
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
              marginBottom: 20,
            }}
          >
            My Deliveries 🚚
          </Text>
  
          <Text
            style={{
              textAlign: "center",
              marginBottom: 30,
              color: "gray",
            }}
          >
            {agent.agentName}
          </Text>
  
          {orders.length === 0 && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "gray",
                marginTop: 50,
              }}
            >
              No Orders Assigned
            </Text>
          )}
  
          {orders.map(
            (order) => (
              <View
                key={order.id}
                style={{
                  backgroundColor:
                    "#fff",
                  padding: 20,
                  borderRadius: 12,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight:
                      "bold",
                    fontSize: 18,
                  }}
                >
                  📦 {order.orderNumber}
                </Text>
  
                <Text
                  style={{
                    marginTop: 10,
                  }}
                >
                  👤 {order.customerName}
                </Text>
  
                <Text>
                  📍 {order.locality}
                </Text>
  
                <Text>
                  📞 {
                    order.address
                      ?.mobile
                  }
                </Text>
  
                <Text
                  style={{
                    marginTop: 10,
                    color:
                      "green",
                    fontWeight:
                      "bold",
                    fontSize: 22,
                  }}
                >
                  ₹{order.total}
                </Text>
  
                <Text
                  style={{
                    marginTop: 10,
                    fontWeight:
                      "bold",
                  }}
                >
                  Status:
                  {" "}
                  {order.status}
                </Text>
  
                {order.status ===
                  "Agent Assigned" && (
                  <TouchableOpacity
                    onPress={() =>
                      handleStartDelivery(
                        order.id
                      )
                    }
                    style={{
                      backgroundColor:
                        "#FF9800",
                      padding: 15,
                      borderRadius: 10,
                      marginTop: 15,
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
                      Start Delivery
                    </Text>
                  </TouchableOpacity>
                )}
  
                {order.status ===
                  "Out For Delivery" && (
                  <TouchableOpacity
                    onPress={() =>
                      handleDelivered(
                        order
                      )
                    }
                    style={{
                      backgroundColor:
                        "#4CAF50",
                      padding: 15,
                      borderRadius: 10,
                      marginTop: 15,
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
                      Mark Delivered
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          )}
        </View>
      </ScrollView>
    );
  }