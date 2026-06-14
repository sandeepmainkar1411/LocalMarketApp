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

export default function VendorOrdersScreen({
  route,
  navigation,
}: any) {
  const vendor =
    route?.params?.vendor;

  const vendorName =
    vendor?.vendorName || "";

  const [
    vendorOrders,
    setVendorOrders,
  ] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToOrders(
        (ordersData: any[]) => {
          const filteredOrders =
            ordersData.filter(
              (order) =>
                order.vendorName ===
                vendorName
            );

          const sortedOrders =
            filteredOrders.sort(
              (a, b) => {
                const orderA = Number(
                  (a.orderNumber || "")
                    .replace("LM-", "")
                );

                const orderB = Number(
                  (b.orderNumber || "")
                    .replace("LM-", "")
                );

                return orderB - orderA;
              }
            );

          setVendorOrders(
            sortedOrders
          );
        }
      );

    return () => unsubscribe();
  }, []);

  const handleAccept =
    async (
      orderId: string
    ) => {
      await updateOrder(
        orderId,
        {
          status:
            "Accepted",
        }
      );
    };

  const handleReject =
    async (
      orderId: string
    ) => {
      await updateOrder(
        orderId,
        {
          status:
            "Rejected",
        }
      );
    };

  const handleOutForDelivery =
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
      orderId: string
    ) => {
      await updateOrder(
        orderId,
        {
          status:
            "Delivered",
        }
      );
    };

    const handleSettlement =
    async (
      orderId: string
    ) => {
  
      await updateOrder(
        orderId,
        {
          settlementStatus:
            "Settled",
  
          settledAt:
            new Date().toISOString(),
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
            fontSize: 34,
            fontWeight:
              "bold",
            textAlign:
              "center",
            marginBottom: 30,
          }}
        >
          Vendor Orders 📦
        </Text>

        {vendorOrders.length ===
          0 && (
          <Text
            style={{
              textAlign:
                "center",
              fontSize: 22,
              color: "gray",
              marginTop: 50,
            }}
          >
            No Orders Yet
          </Text>
        )}

        {vendorOrders.map(
          (order) => (
            <View
              key={order.id}
              style={{
                backgroundColor:
                  "#ffffff",
                padding: 20,
                borderRadius: 15,
                marginBottom: 20,
                borderWidth: 1,
                borderColor:
                  "#ddd",
              }}
            >
              
                <View
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "gray",
                      marginBottom: 5,
                      fontWeight: "bold",
                    }}
                  >
                    Order No:
                    {" "}
                    {order.orderNumber || order.id}
                  </Text>

                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                    }}
                  >
                    👤{" "}
                    {order.customerName}
                  </Text>
                </View>
              

              <Text
                style={{
                  color: "gray",
                  marginBottom: 10,
                  fontSize: 16,
                }}
              >
                📍{" "}
                {
                  order.locality
                }
              </Text>

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
                      key={
                        index
                      }
                      style={{
                        fontSize: 18,
                        marginBottom: 6,
                      }}
                    >
                      🥬{" "}
                      {
                        item.name
                      }{" "}
                      -{" "}
                      {
                        item.quantity
                      }{" "}
                      {
                        item.unit
                      }
                    </Text>
                  )
                )}
              </View>

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
                    order
                      .address
                      ?.flat
                  }
                  ,{" "}
                  {
                    order
                      .address
                      ?.building
                  }
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color:
                      "gray",
                    marginBottom: 5,
                  }}
                >
                  Landmark:{" "}
                  {
                    order
                      .address
                      ?.landmark
                  }
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color:
                      "gray",
                    fontWeight:
                      "bold",
                  }}
                >
                  📞{" "}
                  {
                    order
                      .address
                      ?.mobile
                  }
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 32,
                  color:
                    "green",
                  fontWeight:
                    "bold",
                  marginBottom: 20,
                }}
              >
                ₹
                {
                  order.total
                }
              </Text>

              

              <Text
                style={{
                  fontSize: 22,
                  color:
                    order.status === "Delivered"
                      ? "green"
                      : order.status === "Rejected"
                      ? "red"
                      : "orange",
                  fontWeight: "bold",
                  marginBottom: 25,
                }}
              >
                Status: {order.status}
              </Text>
              {order.status ===
                "Delivered" && (
                <View
                  style={{
                    backgroundColor:
                      "#E8F5E9",
                    padding: 12,
                    borderRadius: 10,
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Settlement:
                    {" "}
                    {order.settlementStatus ||
                      "Pending"}
                  </Text>

                 
                </View>
              )}

              {order.status === "Delivered" &&
                order.settlementStatus !== "Settled" && (
                <TouchableOpacity
                  onPress={() =>
                    handleSettlement(
                      order.id
                    )
                  }
                  style={{
                    backgroundColor: "#4CAF50",
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Confirm Money Received
                  </Text>
                </TouchableOpacity>
              )}

              {order.status === "Delivered" && (
                <View
                  style={{
                    marginTop: 15,
                    padding: 12,
                    backgroundColor: "#E8F5E9",
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
                    Mode: {order.paymentMode}
                  </Text>

                  <Text>
                    Ref: {order.transactionId || "-"}
                  </Text>

                  <Text>
                    Collected By: {order.collectedBy}
                  </Text>

                  <Text>
                    Collected At: {order.collectedAt}
                  </Text>
                </View>
              )}

              {order.status === "Placed" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      handleAccept(order.id)
                    }
                    style={{
                      backgroundColor: "green",
                      padding: 18,
                      borderRadius: 12,
                      width: "47%",
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
                      Accept
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      handleReject(order.id)
                    }
                    style={{
                      backgroundColor: "red",
                      padding: 18,
                      borderRadius: 12,
                      width: "47%",
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
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {order.status === "Accepted" && (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        "AgentAssignment",
                        { order }
                      )
                    }
                    style={{
                      backgroundColor: "#673AB7",
                      padding: 18,
                      borderRadius: 12,
                      marginBottom: 10,
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
                      Assign Agent
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      handleOutForDelivery(
                        order.id
                      )
                    }
                    style={{
                      backgroundColor: "#ff9800",
                      padding: 18,
                      borderRadius: 12,
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
                      Out For Delivery
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {order.status ===
                "Out For Delivery" && (
                <TouchableOpacity
                  onPress={() =>
                    handleDelivered(
                      order.id
                    )
                  }
                  style={{
                    backgroundColor: "#4CAF50",
                    padding: 18,
                    borderRadius: 12,
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
