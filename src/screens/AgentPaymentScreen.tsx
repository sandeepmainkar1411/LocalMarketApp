import React, {
    useState,
  } from "react";
  
  import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
  } from "react-native";
  
  import {
    updateOrder,
  } from "../services/orderService";
  
  export default function AgentPaymentScreen({
    route,
    navigation,
  }: any) {
  
    const order =
      route.params.order;
  
    const agent =
      route.params.agent;
  
    const [
      paymentMode,
      setPaymentMode,
    ] = useState("");
  
    const [
      transactionId,
      setTransactionId,
    ] = useState("");
  
    const completeDelivery =
      async () => {

        if (!paymentMode) {

          Alert.alert(
            "Validation",
            "Please select payment mode"
          );

          return;
        }

        if (
          paymentMode === "UPI"
        ) {

          if (
            !transactionId.trim()
          ) {

            Alert.alert(
              "Validation",
              "Please enter UPI reference number"
            );

            return;
          }

          if (
            transactionId.trim().length < 8
          ) {

            Alert.alert(
              "Validation",
              "UPI reference number looks invalid"
            );

            return;
          }
        }

        try {

          const updateData = {

            status:
              "Delivered",

            paymentMode,

            transactionId:
              paymentMode === "UPI"
                ? transactionId.trim()
                : "",

            collectedBy:
              agent?.agentName ||
              "Unknown Agent",

            collectedAt:
              new Date().toISOString(),

            settlementStatus:
              "Pending",
          };

          console.log(
            "DELIVERY UPDATE:",
            updateData
          );

          await updateOrder(
            order.id,
            updateData
          );

          Alert.alert(
            "Success",
            "Delivery completed successfully"
          );

          navigation.goBack();

        } catch (error) {

          console.log(
            "DELIVERY ERROR:",
            error
          );

          Alert.alert(
            "Error",
            "Failed to update delivery"
          );
        }
      };
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            "#f5f5f5",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          Collect Payment 💰
        </Text>
  
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
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Order:
            {" "}
            {order.orderNumber}
          </Text>
  
          <Text
            style={{
              marginTop: 8,
            }}
          >
            Customer:
            {" "}
            {order.customerName}
          </Text>
  
          <Text
            style={{
              marginTop: 8,
              color: "green",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            ₹{order.total}
          </Text>
        </View>
  
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 15,
          }}
        >
          Payment Mode
        </Text>
  
        <TouchableOpacity
          onPress={() =>
            setPaymentMode(
              "Cash"
            )
          }
          style={{
            backgroundColor:
              paymentMode ===
              "Cash"
                ? "#4CAF50"
                : "#fff",
  
            padding: 18,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Cash
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() =>
            setPaymentMode(
              "UPI"
            )
          }
          style={{
            backgroundColor:
              paymentMode ===
              "UPI"
                ? "#4CAF50"
                : "#fff",
  
            padding: 18,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            UPI
          </Text>
        </TouchableOpacity>
  
        {paymentMode ===
          "UPI" && (
          <TextInput
            placeholder="Enter UPI Reference Number"
            value={
              transactionId
            }
            onChangeText={
              setTransactionId
            }
            style={{
              backgroundColor:
                "#fff",
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
            }}
          />
        )}
  
        <TouchableOpacity
          onPress={
            completeDelivery
          }
          style={{
            backgroundColor:
              "#673AB7",
            padding: 18,
            borderRadius: 12,
            marginTop: 30,
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
            Complete Delivery
          </Text>
        </TouchableOpacity>
      </View>
    );
  }