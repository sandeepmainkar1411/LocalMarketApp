import React, { useEffect, useState } from "react";

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

import { getSession } from "../services/sessionService";

export default function CustomerOrdersScreen({
  navigation,
  route,
}: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const routeCustomer =
          route?.params?.customer;

        const mobile =
          route?.params?.mobile ||
          routeCustomer?.mobile ||
          "";

        const name =
          routeCustomer?.customerName ||
          routeCustomer?.name ||
          "";

        if (mobile) {
          setCustomerMobile(String(mobile));
          setCustomerName(String(name));
          return;
        }

        const session = await getSession();

        const sessionMobile =
          session?.mobile ||
          session?.profile?.mobile ||
          "";

        const sessionName =
          session?.profile?.customerName ||
          session?.profile?.name ||
          "";

        if (sessionMobile) {
          setCustomerMobile(
            String(sessionMobile)
          );

          setCustomerName(
            String(sessionName)
          );
        } else {
          Alert.alert(
            "Error",
            "Customer session not found."
          );
        }
      } catch (error) {
        console.log(
          "Customer Identity Error:",
          error
        );

        Alert.alert(
          "Error",
          "Unable to load customer details."
        );
      }
    };

    loadCustomer();
  }, [
    route?.params?.mobile,
    route?.params?.customer,
  ]);

  useEffect(() => {
    if (!customerMobile) {
      return;
    }

    const unsubscribe =
      subscribeToOrders(
        (ordersData: any[]) => {
          const mobile =
            String(customerMobile).trim();

          const customerOrders =
            ordersData.filter(
              (order: any) => {
                return (
                  String(
                    order?.customerMobile || ""
                  ).trim() === mobile
                );
              }
            );

          const sortedOrders =
            [...customerOrders].sort(
              (a: any, b: any) => {
                const dateA =
                  a?.createdAt?.toDate
                    ? a.createdAt.toDate()
                    : new Date(
                        a?.createdAt || 0
                      );

                const dateB =
                  b?.createdAt?.toDate
                    ? b.createdAt.toDate()
                    : new Date(
                        b?.createdAt || 0
                      );

                return (
                  dateB.getTime() -
                  dateA.getTime()
                );
              }
            );

          setOrders(sortedOrders);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [customerMobile]);

  const handleCancelOrder = async (
    order: any
  ) => {
    const status = String(
      order?.status || ""
    ).trim();

    if (
      status === "Accepted" ||
      status === "Agent Assigned" ||
      status === "Out For Delivery"
    ) {
      Alert.alert(
        "Order Cannot Be Cancelled",
        "The vendor has already accepted this order, so it cannot be cancelled."
      );

      return;
    }

    if (
      status === "Delivered" ||
      status === "Rejected" ||
      status === "Cancelled"
    ) {
      Alert.alert(
        "Order Cannot Be Cancelled",
        "This order can no longer be cancelled."
      );

      return;
    }

    if (status !== "Placed") {
      Alert.alert(
        "Order Cannot Be Cancelled",
        "This order can no longer be cancelled."
      );

      return;
    }

    const cancelOrder = async () => {
      try {
        await updateOrder(
          order.id,
          {
            status: "Cancelled",
            cancelledBy: "Customer",
            cancelledAt:
              new Date().toISOString(),
          }
        );

        if (
          typeof window !== "undefined" &&
          typeof window.alert === "function"
        ) {
          window.alert(
            `${
              order?.orderNumber ||
              "Your order"
            } has been cancelled successfully.`
          );
        } else {
          Alert.alert(
            "Order Cancelled",
            `${
              order?.orderNumber ||
              "Your order"
            } has been cancelled successfully.`
          );
        }
      } catch (error) {
        console.log(
          "Cancellation Error:",
          error
        );

        if (
          typeof window !== "undefined" &&
          typeof window.alert === "function"
        ) {
          window.alert(
            "Unable to cancel the order. Please try again."
          );
        } else {
          Alert.alert(
            "Cancellation Failed",
            "Unable to cancel the order. Please try again."
          );
        }
      }
    };

    if (
      typeof window !== "undefined" &&
      typeof window.confirm === "function"
    ) {
      const confirmed =
        window.confirm(
          `Are you sure you want to cancel ${
            order?.orderNumber ||
            "this order"
          }?`
        );

      if (confirmed) {
        await cancelOrder();
      }

      return;
    }

    Alert.alert(
      "Cancel Order?",
      `Are you sure you want to cancel ${
        order?.orderNumber ||
        "this order"
      }?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: cancelOrder,
        },
      ]
    );
  };

  const getStatusColor = (
    status: string
  ) => {
    if (status === "Delivered") {
      return "green";
    }

    if (
      status === "Cancelled" ||
      status === "Rejected"
    ) {
      return "red";
    }

    return "orange";
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
            marginBottom: 10,
          }}
        >
          My Orders 📦
        </Text>

        {customerName ? (
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: 16,
              marginBottom: 25,
            }}
          >
            {customerName}
          </Text>
        ) : null}

        {orders.length === 0 ? (
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
        ) : null}

        {orders.map((order: any) => {
          const status = String(
            order?.status || ""
          ).trim();

          const canCancel =
            status === "Placed";

          return (
            <View
              key={String(order.id)}
              style={{
                backgroundColor: "white",
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
                  marginBottom: 5,
                }}
              >
                📦 Order No:
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  color: "#1976D2",
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                {order?.orderNumber ||
                  order?.id ||
                  ""}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                  marginBottom: 15,
                }}
              >
                Vendor:{" "}
                {order?.vendorName ||
                  "Unknown Vendor"}
              </Text>

              <View
                style={{
                  marginBottom: 15,
                }}
              >
                {Array.isArray(
                  order?.items
                )
                  ? order.items.map(
                      (
                        item: any,
                        index: number
                      ) => {
                        return (
                          <Text
                            key={
                              String(
                                order.id
                              ) +
                              "-" +
                              String(index)
                            }
                            style={{
                              fontSize: 18,
                              marginBottom: 5,
                            }}
                          >
                            🥬{" "}
                            {item?.name ||
                              "Product"}{" "}
                            -{" "}
                            {item?.displayQuantity ||
                              item?.quantity ||
                              ""}
                          </Text>
                        );
                      }
                    )
                  : null}
              </View>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                  marginBottom: 5,
                }}
              >
                📍{" "}
                {order?.address?.flat ||
                  ""}
                {", "}
                {order?.address?.building ||
                  ""}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                  marginBottom: 15,
                }}
              >
                📞{" "}
                {order?.address?.mobile ||
                  order?.customerMobile ||
                  ""}
              </Text>

              <Text
                style={{
                  fontSize: 30,
                  color: "green",
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                {"₹"}
                {order?.total || 0}
              </Text>

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
                  {status === "Cancelled" ||
                  status === "Rejected"
                    ? "⚪ Placed"
                    : "🟢 Placed"}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                  }}
                >
                  {status === "Accepted" ||
                  status === "Agent Assigned" ||
                  status === "Out For Delivery" ||
                  status === "Delivered"
                    ? "🟢 Accepted"
                    : "⚪ Accepted"}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                  }}
                >
                  {status ===
                    "Out For Delivery" ||
                  status === "Delivered"
                    ? "🟢 Out For Delivery"
                    : "⚪ Out For Delivery"}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {status === "Delivered"
                    ? "🟢 Delivered"
                    : "⚪ Delivered"}
                </Text>

                {status === "Cancelled" ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: "red",
                      fontWeight: "bold",
                      marginTop: 8,
                    }}
                  >
                    ❌ Cancelled
                  </Text>
                ) : null}

                {status === "Rejected" ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: "red",
                      fontWeight: "bold",
                      marginTop: 8,
                    }}
                  >
                    ❌ Rejected
                  </Text>
                ) : null}
              </View>

              <Text
                style={{
                  fontSize: 22,
                  color: getStatusColor(
                    status
                  ),
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                {"Status: "}
                {status}
              </Text>

              {canCancel ? (
                <TouchableOpacity
                  onPress={() =>
                    handleCancelOrder(
                      order
                    )
                  }
                  style={{
                    backgroundColor:
                      "#f44336",
                    padding: 18,
                    borderRadius: 12,
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Cancel Order
                  </Text>
                </TouchableOpacity>
              ) : null}

              {order?.paymentMode ? (
                <View
                  style={{
                    marginTop: 5,
                    padding: 12,
                    backgroundColor:
                      "#f1f8e9",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {"Payment: "}
                    {order.paymentMode}
                  </Text>

                  {order?.transactionId ? (
                    <Text>
                      {"UPI Ref: "}
                      {order.transactionId}
                    </Text>
                  ) : null}
                </View>
              ) : null}

              {status === "Delivered" ? (
                <View
                  style={{
                    marginTop: 15,
                    padding: 12,
                    backgroundColor:
                      "#E8F5E9",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Payment Details
                  </Text>

                  <Text>
                    {"Mode: "}
                    {order?.paymentMode ||
                      "-"}
                  </Text>

                  <Text>
                    {"Ref: "}
                    {order?.transactionId ||
                      "-"}
                  </Text>

                  <Text>
                    {"Collected By: "}
                    {order?.collectedBy ||
                      "-"}
                  </Text>

                  <Text>
                    {"Collected At: "}
                    {order?.collectedAt ||
                      "-"}
                  </Text>
                </View>
              ) : null}

              {status === "Delivered" ? (
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
                        color: "white",
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
              ) : null}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}