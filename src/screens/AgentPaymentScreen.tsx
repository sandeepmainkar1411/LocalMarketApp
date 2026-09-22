import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { updateOrder } from "../services/orderService";
import { getAgentByMobile } from "../services/agentService";

export default function AgentPaymentScreen({
  route,
  navigation,
}: any) {
  const order = route?.params?.order;

  const mobile = String(
    route?.params?.mobile || ""
  ).trim();

  const [agent, setAgent] = useState<any>(null);

  const [paymentMode, setPaymentMode] =
    useState("");

  const [transactionId, setTransactionId] =
    useState("");

  const [paymentScreenshot, setPaymentScreenshot] =
    useState<string>("");

  const [uploading, setUploading] =
    useState(false);

  /*
   * Load Agent
   */
  useEffect(() => {
    const loadAgent = async () => {
      if (!mobile) {
        return;
      }

      try {
        const profile =
          await getAgentByMobile(mobile);

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
   * Pick Payment Screenshot
   */
  const pickPaymentScreenshot =
    async () => {
      try {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            "Permission Required",
            "Please allow photo library access to upload the payment screenshot."
          );
          return;
        }

        const result =
          await ImagePicker.launchImageLibraryAsync(
            {
              mediaTypes: ["images"],
              allowsEditing: true,
              quality: 0.8,
            }
          );

        if (
          result.canceled ||
          !result.assets ||
          result.assets.length === 0
        ) {
          return;
        }

        const selectedImage =
          result.assets[0]?.uri;

        if (selectedImage) {
          setPaymentScreenshot(
            selectedImage
          );
        }
      } catch (error) {
        console.log(
          "Screenshot Picker Error:",
          error
        );

        Alert.alert(
          "Error",
          "Unable to select the payment screenshot."
        );
      }
    };

  /*
   * Complete Delivery
   */
  const completeDelivery =
    async () => {
      if (!order?.id) {
        Alert.alert(
          "Error",
          "Order information is missing."
        );
        return;
      }

      if (!paymentMode) {
        Alert.alert(
          "Validation",
          "Please select payment mode."
        );
        return;
      }

      /*
       * UPI validation
       */
      if (
        paymentMode === "UPI"
      ) {
        if (
          !transactionId.trim()
        ) {
          Alert.alert(
            "Validation",
            "Please enter UPI reference number."
          );
          return;
        }

        if (
          transactionId
            .trim()
            .length < 8
        ) {
          Alert.alert(
            "Validation",
            "UPI reference number looks invalid."
          );
          return;
        }

        if (
          !paymentScreenshot
        ) {
          Alert.alert(
            "Validation",
            "Please upload the UPI payment screenshot."
          );
          return;
        }
      }

      try {
        setUploading(true);

        const agentName =
          agent?.agentName ||
          order?.agentName ||
          "Unknown Agent";

        /*
         * IMPORTANT:
         *
         * For this first step we store the selected
         * local image URI in the order.
         *
         * Firebase Storage upload will be connected
         * separately after we verify the picker works.
         */
        const updateData: any = {
          status: "Delivered",

          deliveryStatus:
            "Delivered",

          paymentMode,

          transactionId:
            paymentMode === "UPI"
              ? transactionId.trim()
              : "",

          paymentScreenshot:
            paymentMode === "UPI"
              ? paymentScreenshot
              : "",

          collectedBy:
            agentName,

          collectedByMobile:
            mobile,

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
          "Delivery completed successfully."
        );

        navigation.goBack();
      } catch (error) {
        console.log(
          "DELIVERY ERROR:",
          error
        );

        Alert.alert(
          "Error",
          "Failed to update delivery."
        );
      } finally {
        setUploading(false);
      }
    };

  /*
   * Safety check
   */
  if (!order) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "red",
          }}
        >
          Order information not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
      contentContainerStyle={{
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

      {/* ORDER */}

      <View
        style={{
          backgroundColor: "#fff",
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
          Order: {order.orderNumber}
        </Text>

        <Text
          style={{
            marginTop: 8,
          }}
        >
          Customer:{" "}
          {order.customerName ||
            "Unknown Customer"}
        </Text>

        <Text
          style={{
            marginTop: 8,
          }}
        >
          Agent:{" "}
          {agent?.agentName ||
            order.agentName ||
            "Agent"}
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

      {/* PAYMENT MODE */}

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 15,
        }}
      >
        Payment Mode
      </Text>

      {/* CASH */}

      <TouchableOpacity
        onPress={() =>
          setPaymentMode("Cash")
        }
        style={{
          backgroundColor:
            paymentMode === "Cash"
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
            color:
              paymentMode === "Cash"
                ? "white"
                : "black",
          }}
        >
          Cash
        </Text>
      </TouchableOpacity>

      {/* UPI */}

      <TouchableOpacity
        onPress={() =>
          setPaymentMode("UPI")
        }
        style={{
          backgroundColor:
            paymentMode === "UPI"
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
            color:
              paymentMode === "UPI"
                ? "white"
                : "black",
          }}
        >
          UPI / GPay
        </Text>
      </TouchableOpacity>

      {/* UPI DETAILS */}

      {paymentMode === "UPI" && (
        <View
          style={{
            marginTop: 20,
          }}
        >
          <TextInput
            placeholder="Enter UPI Reference / Transaction Number"
            value={transactionId}
            onChangeText={
              setTransactionId
            }
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
            }}
          />

          {/* UPLOAD BUTTON */}

          <TouchableOpacity
            onPress={
              pickPaymentScreenshot
            }
            style={{
              backgroundColor:
                "#673AB7",
              padding: 18,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {paymentScreenshot
                ? "Change Payment Screenshot"
                : "Upload Payment Screenshot"}
            </Text>
          </TouchableOpacity>

          {/* PREVIEW */}

          {paymentScreenshot && (
            <View
              style={{
                marginTop: 15,
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Payment Screenshot Preview
              </Text>

              <Image
                source={{
                  uri: paymentScreenshot,
                }}
                style={{
                  width: "100%",
                  height: 350,
                  borderRadius: 8,
                }}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      )}

      {/* COMPLETE */}

      <TouchableOpacity
        disabled={uploading}
        onPress={
          completeDelivery
        }
        style={{
          backgroundColor:
            uploading
              ? "#999"
              : "#673AB7",
          padding: 18,
          borderRadius: 12,
          marginTop: 30,
          marginBottom: 20,
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
          {uploading
            ? "Processing..."
            : "Complete Delivery"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}