import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  fetchOrders,
} from "../services/orderService";

export default function CustomerProfileViewScreen({
  route,
  navigation,
}: any) {
  const customer =
    route?.params?.customer;

  const [
    totalOrders,
    setTotalOrders,
  ] = useState(0);

  const [
    totalSpend,
    setTotalSpend,
  ] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const orders =
          await fetchOrders();

        const customerOrders =
          orders.filter(
            (order: any) =>
              order.customerMobile ===
              customer?.mobile
          );

        setTotalOrders(
          customerOrders.length
        );

        const spend =
          customerOrders.reduce(
            (
              total: number,
              order: any
            ) =>
              total +
              (order.total || 0),
            0
          );

        setTotalSpend(spend);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
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
        My Profile
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: 15,
          }}
        >
          👤 Name:{" "}
          {customer?.customerName}
        </Text>

        <Text
          style={{
            fontSize: 20,
            marginBottom: 15,
          }}
        >
          📞 Mobile:{" "}
          {customer?.mobile}
        </Text>

        <Text
          style={{
            fontSize: 20,
            marginBottom: 15,
          }}
        >
          📅 Member Since:
          {" "}
          {customer?.createdAt
            ? new Date(
                customer.createdAt
              ).toLocaleDateString()
            : "N/A"}
        </Text>

        <Text
          style={{
            fontSize: 20,
            marginBottom: 15,
          }}
        >
          📦 Total Orders:
          {" "}
          {totalOrders}
        </Text>

        <Text
          style={{
            fontSize: 20,
            color: "green",
            fontWeight: "bold",
          }}
        >
          💰 Total Spend:
          {" "}
          ₹{totalSpend}
        </Text>
      </View>

      <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          "CustomerProfileEdit",
          {
            customer,
          }
        )
      }
      style={{
        backgroundColor:
          "#6a1b9a",
        padding: 18,
        borderRadius: 12,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Edit Profile
      </Text>
    </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
            style={{
              backgroundColor: "#0066cc",
              padding: 18,
              borderRadius: 12,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}