import {
  View,
  Text,
  FlatList,
  ScrollView,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToOrders,
} from "../services/orderService";

export default function VendorCollectionDetailsScreen({
  route,
}: any) {

  const vendorName =
    route.params.vendorName;

  const [orders, setOrders] =
    useState<any[]>([]);

  const [totalFees, setTotalFees] =
    useState(0);

  const [vendorRevenue, setVendorRevenue] =
    useState(0);

  useEffect(() => {

    const unsubscribe =
      subscribeToOrders(
        (allOrders: any[]) => {

          const vendorOrders =
            allOrders.filter(
              (order) =>
                order.vendorName ===
                  vendorName &&
                order.status ===
                  "Delivered"
            );

          setOrders(vendorOrders);

          const fees =
            vendorOrders.reduce(
              (
                sum,
                order
              ) =>
                sum +
                Number(
                  order.platformFee ||
                    0
                ),
              0
            );

            const revenue =
              vendorOrders.reduce(
                (
                  sum,
                  order
                ) =>
                  sum +
                  Number(
                    order.subtotal || 0
                  ),
                0
              );

            setVendorRevenue(
              revenue
            );

          setTotalFees(fees);
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
            marginBottom: 20,
          }}
        >
          {vendorName}
        </Text>

        {/* Summary Card */}

        <View
          style={{
            backgroundColor:
              "#fff",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Delivered Orders:
            {" "}
            {orders.length}
          </Text>

          <Text
            style={{
              fontSize: 18,
              marginTop: 10,
            }}
          >
            Vendor Revenue:
            ₹{vendorRevenue}
          </Text>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "red",
              marginTop: 10,
            }}
          >
            Platform Fee Due:
            ₹{totalFees}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Delivered Orders
        </Text>

        <FlatList
          scrollEnabled={false}
          data={orders}
          keyExtractor={(
            item,
            index
          ) =>
            `${item.id}-${index}`
          }
          renderItem={({ item }) => (

            <View
              style={{
                backgroundColor:
                  "#fff",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >

              <Text>
                Product:
                {" "}
                {item.name ||
                  item.vegetable ||
                  "Unknown Product"}
              </Text>

              <Text>
                Customer:
                {" "}
                {item.customerName ||
                  "-"}
              </Text>

              <Text>
                Date:
                {" "}
                {item.createdAt?.toDate
                  ? item.createdAt
                      .toDate()
                      .toLocaleDateString()
                  : "-"}
              </Text>

              <Text>
                Status:
                {" "}
                {item.status}
              </Text>

              <Text>
                Order Total:
                ₹{item.total}
              </Text>

              <Text
                style={{
                  color:
                    "green",
                  fontWeight:
                    "bold",
                  marginTop: 5,
                }}
              >
                Platform Fee:
                ₹
                {item.platformFee ||
                  0}
              </Text>

            </View>

          )}
        />

        {orders.length === 0 && (

          <View
            style={{
              backgroundColor:
                "#fff",
              padding: 20,
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                textAlign:
                  "center",
                color: "gray",
                fontSize: 18,
              }}
            >
              No Delivered Orders Found
            </Text>
          </View>

        )}

      </View>
    </ScrollView>
  );
}