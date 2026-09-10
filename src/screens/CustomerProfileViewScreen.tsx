import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  fetchOrders,
} from "../services/orderService";

import {
  getCustomerProfile,
} from "../services/profileService";

import {
  getSession,
} from "../services/sessionService";


export default function CustomerProfileViewScreen({
  route,
  navigation,
}: any) {

  const [
    customer,
    setCustomer,
  ] = useState<any>(null);

  const [
    totalOrders,
    setTotalOrders,
  ] = useState(0);

  const [
    totalSpend,
    setTotalSpend,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    loadProfile();

  }, []);


  const loadProfile =
    async () => {

      try {

        setLoading(true);

        console.log(
          "================================"
        );

        console.log(
          "CUSTOMER PROFILE VIEW"
        );


        /*
         * First try to get the mobile
         * from navigation parameters.
         *
         * We will eventually pass only:
         *
         * { mobile: "9920220237" }
         */

        let mobile =
          route?.params?.mobile;


        /*
         * If mobile is not available,
         * get it from the saved session.
         *
         * This is important when the
         * browser/app is reloaded.
         */

        if (!mobile) {

          const session =
            await getSession();

          console.log(
            "SESSION:",
            session
          );

          mobile =
            session?.mobile ||
            session?.profile?.mobile;
        }


        if (!mobile) {

          console.log(
            "CUSTOMER MOBILE NOT FOUND"
          );

          setLoading(false);

          return;
        }


        console.log(
          "CUSTOMER MOBILE:",
          mobile
        );


        /*
         * Get the customer directly
         * from Firestore.
         */

        const profile =
          await getCustomerProfile(
            mobile
          );


        if (!profile) {

          console.log(
            "CUSTOMER PROFILE NOT FOUND"
          );

          setLoading(false);

          return;
        }


        console.log(
          "CUSTOMER PROFILE:",
          profile
        );


        setCustomer(
          profile
        );


        /*
         * Load customer orders.
         */

        const orders =
          await fetchOrders();


        const customerOrders =
          orders.filter(
            (order: any) =>
              String(
                order.customerMobile
              ) ===
              String(
                mobile
              )
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
              Number(
                order.total || 0
              ),
            0
          );


        setTotalSpend(
          spend
        );


        console.log(
          "TOTAL ORDERS:",
          customerOrders.length
        );

        console.log(
          "TOTAL SPEND:",
          spend
        );

        console.log(
          "================================"
        );

      }
      catch (error) {

        console.log(
          "CUSTOMER PROFILE VIEW ERROR:",
          error
        );

      }
      finally {

        setLoading(false);

      }
    };


  if (loading) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >

        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />

        <Text
          style={{
            marginTop: 15,
            fontSize: 16,
          }}
        >
          Loading Profile...
        </Text>

      </View>

    );

  }


  if (!customer) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
          backgroundColor: "#f5f5f5",
        }}
      >

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Profile Not Found
        </Text>


        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={{
            backgroundColor: "#2E7D32",
            padding: 16,
            borderRadius: 10,
          }}
        >

          <Text
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Go Back
          </Text>

        </TouchableOpacity>

      </View>

    );

  }


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
          backgroundColor: "#ffffff",
          padding: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#dddddd",
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
          📅 Member Since:{" "}
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
          📦 Total Orders:{" "}
          {totalOrders}
        </Text>


        <Text
          style={{
            fontSize: 20,
            color: "green",
            fontWeight: "bold",
          }}
        >
          💰 Total Spend: ₹
          {totalSpend}
        </Text>

      </View>


      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "CustomerProfileEdit",
            {
              mobile:
                customer.mobile,
              customer:
                customer,
            }
          )
        }
        style={{
          backgroundColor: "#6a1b9a",
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