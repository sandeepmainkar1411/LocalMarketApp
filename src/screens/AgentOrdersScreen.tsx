import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  subscribeToOrders,
  updateOrder,
} from "../services/orderService";

import {
  fetchAgents,
} from "../services/agentService";

import {
  clearSession,
} from "../services/sessionService";

import {
  logout,
} from "../services/authService";

export default function AgentOrdersScreen({
  route,
  navigation,
}: any) {

  /*
   * Get agent mobile from navigation.
   */
  const mobile =
    String(route?.params?.mobile || "").trim();

  const [
    agent,
    setAgent,
  ] = useState<any>(null);

  const [
    orders,
    setOrders,
  ] = useState<any[]>([]);

  /*
   * Load Agent Profile
   *
   * We compare mobile numbers as strings
   * so Firestore number/string differences
   * do not break the lookup.
   */
  useEffect(() => {

    const loadAgent = async () => {

      if (!mobile) {
        return;
      }

      try {

        const agents =
          await fetchAgents();

        const profile =
          agents.find(
            (item: any) =>
              String(item.mobile || "").trim() ===
              mobile
          );

        if (profile) {
          setAgent(profile);
        }

      } catch (error) {

        console.log(
          "Load Agent Error:",
          error
        );

      }
    };

    loadAgent();

  }, [mobile]);


  /*
   * Load Agent Orders
   */
  useEffect(() => {

    if (!mobile) {
      return;
    }

    const unsubscribe =
      subscribeToOrders(
        (ordersData: any[]) => {

          const assignedOrders =
            ordersData.filter(
              (order: any) =>
                String(
                  order.agentMobile || ""
                ).trim() === mobile
            );

          const sortedOrders =
            [...assignedOrders].sort(
              (a: any, b: any) => {

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

          console.log(
            "Agent Mobile:",
            mobile
          );

          console.log(
            "Assigned Orders:",
            sortedOrders
          );

          setOrders(
            sortedOrders
          );
        }
      );

    return () =>
      unsubscribe();

  }, [mobile]);


  /*
   * Start Delivery
   */
  const handleStartDelivery =
    async (
      orderId: string
    ) => {

      try {

        await updateOrder(
          orderId,
          {
            status:
              "Out For Delivery",

            deliveryStatus:
              "Out For Delivery",
          }
        );

      } catch (error) {

        console.log(
          "Start Delivery Error:",
          error
        );

        Alert.alert(
          "Error",
          "Unable to start delivery."
        );
      }
    };


  /*
   * Mark Delivered
   */
  const handleDelivered =
    async (
      order: any
    ) => {

      navigation.navigate(
        "AgentPayment",
        {
          order,
          mobile,
        }
      );
    };


  /*
   * Logout
   */
  const performLogout =
    async () => {

      console.log(
        "AGENT LOGOUT CLICKED"
      );

      try {
        await clearSession();
      } catch (error) {
        console.log(
          "Clear Session Error:",
          error
        );
      }

      try {
        await logout();
      } catch (error) {
        console.log(
          "Firebase Logout Error:",
          error
        );
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      });
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
            fontWeight:
              "bold",
            textAlign:
              "center",
            marginBottom:
              10,
          }}
        >
          My Deliveries 🚚
        </Text>


        <Text
          style={{
            textAlign:
              "center",
            marginBottom:
              15,
            color:
              "gray",
            fontSize: 18,
          }}
        >
          {agent?.agentName ||
            "Agent"}
        </Text>


        <TouchableOpacity
          onPress={
            performLogout
          }
          style={{
            backgroundColor:
              "#D32F2F",
            padding: 14,
            borderRadius: 10,
            marginBottom: 25,
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
              fontSize: 17,
            }}
          >
            Logout
          </Text>

        </TouchableOpacity>


        {orders.length === 0 && (

          <Text
            style={{
              textAlign:
                "center",
              fontSize: 18,
              color:
                "gray",
              marginTop:
                50,
            }}
          >
            No Orders Assigned
          </Text>

        )}


        {orders.map(
          (order) => (

            <View
              key={
                order.id
              }
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
                📦{" "}
                {
                  order.orderNumber
                }
              </Text>


              <Text
                style={{
                  marginTop:
                    10,
                }}
              >
                👤{" "}
                {
                  order.customerName
                }
              </Text>


              <Text>
                📍{" "}
                {
                  order.locality
                }
              </Text>


              <Text>
                📞{" "}
                {
                  order.address
                    ?.mobile
                }
              </Text>


              <Text
                style={{
                  marginTop:
                    10,
                  color:
                    "green",
                  fontWeight:
                    "bold",
                  fontSize: 22,
                }}
              >
                ₹
                {
                  order.total
                }
              </Text>


              <Text
                style={{
                  marginTop:
                    10,
                  fontWeight:
                    "bold",
                }}
              >
                Status:{" "}
                {
                  order.status
                }
              </Text>


              <Text
                style={{
                  marginTop:
                    5,
                  color:
                    "gray",
                }}
              >
                Delivery Status:{" "}
                {
                  order.deliveryStatus ||
                  "-"
                }
              </Text>


              {(order.status ===
                "Agent Assigned" ||
                order.deliveryStatus ===
                "Assigned") && (

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