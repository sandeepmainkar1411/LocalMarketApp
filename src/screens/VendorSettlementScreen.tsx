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

export default function VendorSettlementScreen({
  route,
}: any) {

  const vendor =
    route?.params?.vendor;

  const vendorName =
    vendor?.vendorName ||
    vendor?.name ||
    "";

  const [
    settlements,
    setSettlements,
  ] = useState<any[]>([]);

  useEffect(() => {

    const unsubscribe =
      subscribeToOrders(
        (orders: any[]) => {

          const vendorOrders =
            orders.filter(
              (order) =>
                order.vendorName === vendorName &&
                order.status === "Delivered"
            );

          const sortedOrders =
            vendorOrders.sort(
              (a, b) => {

                const dateA =
                  new Date(
                    a.settledAt ||
                    a.createdAt ||
                    0
                  ).getTime();

                const dateB =
                  new Date(
                    b.settledAt ||
                    b.createdAt ||
                    0
                  ).getTime();

                return dateB - dateA;

              }
            );

          setSettlements(
            sortedOrders
          );

        }
      );

    return () =>
      unsubscribe();

  }, [vendorName]);

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
          💰 My Settlements
        </Text>

        {settlements.length === 0 && (

          <Text
            style={{
              textAlign: "center",
              color: "gray",
              marginTop: 40,
              fontSize: 18,
            }}
          >
            No settlement records found
          </Text>

        )}

        {settlements.map((order) => {

          const total =
            Number(order.total || 0);

          const platformFee =
            Number(order.platformFee || 0);

          const payable =
            total - platformFee;

          return (

            <View
              key={
                order.firestoreId ||
                order.id
              }
              style={{
                backgroundColor: "#ffffff",
                padding: 20,
                borderRadius: 15,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#dddddd",
              }}
            >

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                {order.orderNumber || "-"}
              </Text>

              <Text style={{ marginBottom: 8 }}>
                Customer:{" "}
                {order.customerName || "N/A"}
              </Text>

              <Text style={{ marginBottom: 8 }}>
                Agent:{" "}
                {order.collectedBy || "-"}
              </Text>

              <Text style={{ marginBottom: 8 }}>
                Amount Received: ₹{total}
              </Text>

              <Text style={{ marginBottom: 8 }}>
                Platform Fee: ₹{platformFee}
              </Text>

              <Text
                style={{
                  marginBottom: 12,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Vendor Payable: ₹{payable}
              </Text>

              <Text style={{ marginBottom: 8 }}>
                Payment Mode:{" "}
                {order.paymentMode || "Not Available"}
              </Text>

              <Text style={{ marginBottom: 8 }}>
                Transaction ID:{" "}
                {order.transactionId || "-"}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  color:
                    order.settlementStatus === "Paid"
                      ? "green"
                      : "orange",
                }}
              >
                Settlement:{" "}
                {order.settlementStatus || "Pending"}
              </Text>

              {order.settledAt && (

                <Text
                  style={{
                    color: "gray",
                    marginBottom: 5,
                  }}
                >
                  Settled At:{" "}
                  {new Date(
                    order.settledAt
                  ).toLocaleString()}
                </Text>

              )}

              {order.settledBy && (

                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  Settled By:{" "}
                  {order.settledBy}
                </Text>

              )}

            </View>

          );

        })}

      </View>

    </ScrollView>

  );

}