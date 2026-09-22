import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import {
  subscribeToOrders,
  updateOrder,
} from "../services/orderService";

export default function VendorOrdersScreen({
  route,
  navigation,
}: any) {
  /*
   * ====================================================
   * VENDOR
   * ====================================================
   */

  const vendor = route?.params?.vendor;

  const vendorName =
    vendor?.vendorName || "";

  /*
   * ====================================================
   * STATE
   * ====================================================
   */

  const [
    vendorOrders,
    setVendorOrders,
  ] = useState<any[]>([]);

  /*
   * ====================================================
   * LOAD VENDOR ORDERS
   * ====================================================
   *
   * Orders are:
   *
   * 1. Filtered by vendor
   * 2. Sorted by LM order number DESC
   *
   * Example:
   *
   * LM-000011
   * LM-000010
   * LM-000009
   * LM-000008
   *
   * Older/random legacy orders without a valid
   * LM number fall back to createdAt.
   * ====================================================
   */

  useEffect(() => {
    if (!vendorName) {
      setVendorOrders([]);
      return;
    }

    const unsubscribe =
      subscribeToOrders(
        (ordersData: any[]) => {
          /*
           * --------------------------------------------
           * FILTER BY VENDOR
           * --------------------------------------------
           */

          const filteredOrders =
            ordersData.filter(
              (order: any) =>
                String(
                  order?.vendorName || ""
                )
                  .trim()
                  .toLowerCase() ===
                String(vendorName)
                  .trim()
                  .toLowerCase()
            );

          /*
           * --------------------------------------------
           * CREATED DATE HELPER
           * --------------------------------------------
           */

          const getCreatedTime = (
            order: any
          ): number => {
            const createdAt =
              order?.createdAt;

            if (!createdAt) {
              return 0;
            }

            /*
             * Firestore Timestamp
             */

            if (
              typeof createdAt.toDate ===
              "function"
            ) {
              const date =
                createdAt.toDate();

              return date instanceof Date
                ? date.getTime()
                : 0;
            }

            /*
             * JavaScript Date
             */

            if (
              createdAt instanceof Date
            ) {
              return createdAt.getTime();
            }

            /*
             * String / ISO date
             */

            const parsed =
              new Date(
                createdAt
              ).getTime();

            return Number.isNaN(parsed)
              ? 0
              : parsed;
          };

          /*
           * --------------------------------------------
           * ORDER NUMBER HELPER
           * --------------------------------------------
           *
           * LM-000011 -> 11
           * LM-000010 -> 10
           * LM-000009 -> 9
           *
           * Invalid/random legacy IDs return NaN.
           */

          const getOrderNumber = (
            order: any
          ): number => {
            const orderNumber =
              String(
                order?.orderNumber || ""
              ).trim();

            const match =
              orderNumber.match(
                /^LM-(\d+)$/i
              );

            if (!match) {
              return NaN;
            }

            const number =
              parseInt(
                match[1],
                10
              );

            return Number.isNaN(number)
              ? NaN
              : number;
          };

          /*
           * --------------------------------------------
           * SORT ORDERS
           * --------------------------------------------
           *
           * Valid LM numbers:
           *     highest number first
           *
           * Legacy/random orders:
           *     newest createdAt first
           *
           * This gives:
           *
           * LM-000011
           * LM-000010
           * LM-000009
           * LM-000008
           * ...
           */

          const sortedOrders =
            [...filteredOrders].sort(
              (
                a: any,
                b: any
              ) => {
                const numberA =
                  getOrderNumber(a);

                const numberB =
                  getOrderNumber(b);

                /*
                 * Both have valid LM numbers
                 */

                if (
                  !Number.isNaN(
                    numberA
                  ) &&
                  !Number.isNaN(
                    numberB
                  )
                ) {
                  return (
                    numberB -
                    numberA
                  );
                }

                /*
                 * A has valid LM number,
                 * B does not.
                 */

                if (
                  !Number.isNaN(
                    numberA
                  )
                ) {
                  return -1;
                }

                /*
                 * B has valid LM number,
                 * A does not.
                 */

                if (
                  !Number.isNaN(
                    numberB
                  )
                ) {
                  return 1;
                }

                /*
                 * Both are legacy/random orders.
                 * Newest first.
                 */

                return (
                  getCreatedTime(b) -
                  getCreatedTime(a)
                );
              }
            );

          console.log(
            "Vendor:",
            vendorName
          );

          console.log(
            "Vendor Orders Sorted:",
            sortedOrders.map(
              (order: any) =>
                order.orderNumber ||
                order.id
            )
          );

          setVendorOrders(
            sortedOrders
          );
        }
      );

    /*
     * Cleanup listener
     */

    return () => {
      unsubscribe();
    };
  }, [vendorName]);

  /*
   * ====================================================
   * ACCEPT ORDER
   * ====================================================
   */

  const handleAccept =
    async (
      orderId: string
    ) => {
      try {
        await updateOrder(
          orderId,
          {
            status: "Accepted",
            acceptedAt:
              new Date().toISOString(),
          }
        );

        Alert.alert(
          "Order Accepted",
          "The order has been accepted successfully."
        );
      } catch (error) {
        console.error(
          "Accept order error:",
          error
        );

        Alert.alert(
          "Error",
          "Unable to accept the order."
        );
      }
    };

  /*
   * ====================================================
   * REJECT ORDER
   * ====================================================
   */

  const handleReject =
    async (
      orderId: string
    ) => {
      try {
        await updateOrder(
          orderId,
          {
            status: "Rejected",
            rejectedAt:
              new Date().toISOString(),
          }
        );

        Alert.alert(
          "Order Rejected",
          "The order has been rejected."
        );
      } catch (error) {
        console.error(
          "Reject order error:",
          error
        );

        Alert.alert(
          "Error",
          "Unable to reject the order."
        );
      }
    };

  /*
   * ====================================================
   * CONFIRM MONEY RECEIVED
   * ====================================================
   */

  const handleSettlement =
    async (
      orderId: string
    ) => {
      try {
        await updateOrder(
          orderId,
          {
            settlementStatus:
              "Settled",

            settledAt:
              new Date().toISOString(),
          }
        );

        Alert.alert(
          "Settlement Confirmed",
          "Money received has been confirmed."
        );
      } catch (error) {
        console.error(
          "Settlement error:",
          error
        );

        Alert.alert(
          "Error",
          "Unable to confirm settlement."
        );
      }
    };

  /*
   * ====================================================
   * RENDER
   * ====================================================
   */

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
        {/* PAGE TITLE */}

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

        {/* NO ORDERS */}

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

        {/* ORDERS */}

        {vendorOrders.map(
          (order: any) => (
            <View
              key={
                order.id ||
                order.orderNumber
              }
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
              {/* ======================================
                  ORDER NUMBER + CUSTOMER
                  ====================================== */}

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
                    fontWeight:
                      "bold",
                  }}
                >
                  Order No:{" "}
                  {order.orderNumber ||
                    order.id}
                </Text>

                <Text
                  style={{
                    fontSize: 28,
                    fontWeight:
                      "bold",
                  }}
                >
                  👤{" "}
                  {order.customerName ||
                    "Unknown Customer"}
                </Text>
              </View>

              {/* ======================================
                  LOCALITY
                  ====================================== */}

              <Text
                style={{
                  color: "gray",
                  marginBottom: 10,
                  fontSize: 16,
                }}
              >
                📍{" "}
                {order.locality ||
                  "-"}
              </Text>

              {/* ======================================
                  PRODUCTS
                  ====================================== */}

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
                      🥬{" "}
                      {item.name ||
                        "Product"}{" "}
                      -{" "}
                      {item.displayQuantity ||
                        `${item.quantity || 0} ${
                          item.unit || ""
                        }`}
                    </Text>
                  )
                )}
              </View>

              {/* ======================================
                  CUSTOMER ADDRESS
                  ====================================== */}

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
                  {order.address
                    ?.flat || "-"}
                  ,{" "}
                  {order.address
                    ?.building || "-"}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                    marginBottom: 5,
                  }}
                >
                  Landmark:{" "}
                  {order.address
                    ?.landmark || "-"}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                    fontWeight:
                      "bold",
                  }}
                >
                  📞{" "}
                  {order.address
                    ?.mobile ||
                    order.customerMobile ||
                    "-"}
                </Text>
              </View>

              {/* ======================================
                  TOTAL
                  ====================================== */}

              <Text
                style={{
                  fontSize: 32,
                  color: "green",
                  fontWeight:
                    "bold",
                  marginBottom: 20,
                }}
              >
                ₹
                {Number(
                  order.total || 0
                ).toFixed(0)}
              </Text>

              {/* ======================================
                  STATUS
                  ====================================== */}

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
                      : order.status ===
                        "Cancelled"
                      ? "red"
                      : "orange",

                  fontWeight:
                    "bold",

                  marginBottom: 25,
                }}
              >
                Status:{" "}
                {order.status ||
                  "Placed"}
              </Text>

              {/* ======================================
                  AGENT INFORMATION
                  ====================================== */}

              {(order.agentName ||
                order.agentMobile) && (
                <View
                  style={{
                    backgroundColor:
                      "#F3E5F5",
                    padding: 12,
                    borderRadius: 10,
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight:
                        "bold",
                      marginBottom: 5,
                    }}
                  >
                    🚚 Agent
                  </Text>

                  <Text>
                    Name:{" "}
                    {order.agentName ||
                      "-"}
                  </Text>

                  <Text>
                    Mobile:{" "}
                    {order.agentMobile ||
                      "-"}
                  </Text>

                  <Text>
                    Delivery Status:{" "}
                    {order.deliveryStatus ||
                      order.status ||
                      "-"}
                  </Text>
                </View>
              )}

              {/* ======================================
                  SETTLEMENT
                  ====================================== */}

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
                      fontWeight:
                        "bold",
                    }}
                  >
                    Settlement:{" "}
                    {order.settlementStatus ||
                      "Pending"}
                  </Text>
                </View>
              )}

              {/* ======================================
                  CONFIRM MONEY RECEIVED
                  ====================================== */}

              {order.status ===
                "Delivered" &&
                order.settlementStatus !==
                  "Settled" && (
                  <TouchableOpacity
                    onPress={() =>
                      handleSettlement(
                        order.id
                      )
                    }
                    style={{
                      backgroundColor:
                        "#4CAF50",
                      padding: 15,
                      borderRadius: 10,
                      marginTop: 10,
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
                      Confirm Money Received
                    </Text>
                  </TouchableOpacity>
                )}

              {/* ======================================
                  PAYMENT DETAILS
                  ====================================== */}

              {order.status ===
                "Delivered" && (
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
                      fontWeight:
                        "bold",
                      marginBottom: 5,
                    }}
                  >
                    Payment Details
                  </Text>

                  <Text>
                    Mode:{" "}
                    {order.paymentMode ||
                      "-"}
                  </Text>

                  <Text>
                    Ref:{" "}
                    {order.transactionId ||
                      "-"}
                  </Text>

                  <Text>
                    Collected By:{" "}
                    {order.collectedBy ||
                      "-"}
                  </Text>

                  <Text>
                    Collected At:{" "}
                    {order.collectedAt ||
                      "-"}
                  </Text>

                  {order.paymentScreenshot && (
                    <Text
                      style={{
                        marginTop: 5,
                        color:
                          "green",
                        fontWeight:
                          "bold",
                      }}
                    >
                      📷 Payment screenshot
                      uploaded
                    </Text>
                  )}
                </View>
              )}

              {/* ======================================
                  ACCEPT / REJECT
                  ====================================== */}

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
                        color:
                          "white",
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
                        color:
                          "white",
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

              {/* ======================================
                  ASSIGN AGENT
                  ====================================== */}

              {order.status ===
                "Accepted" && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      "AgentAssignment",
                      {
                        order,
                      }
                    )
                  }
                  style={{
                    backgroundColor:
                      "#673AB7",
                    padding: 18,
                    borderRadius: 12,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color:
                        "white",
                      textAlign:
                        "center",
                      fontSize: 20,
                      fontWeight:
                        "bold",
                    }}
                  >
                    Assign Agent
                  </Text>
                </TouchableOpacity>
              )}

              {/* ======================================
                  IMPORTANT
                  ======================================

                  Vendor CANNOT directly move the
                  order to Out For Delivery.

                  Correct flow:

                  Accepted
                       ↓
                  Agent Assigned
                       ↓
                  Agent starts delivery
                       ↓
                  Out For Delivery
                       ↓
                  Agent completes delivery
                       ↓
                  Delivered
                  ====================================== */}

            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}