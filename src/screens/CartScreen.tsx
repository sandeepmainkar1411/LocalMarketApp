import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import {
  createOrder,
} from "../services/orderService";

import {
  createNotification,
} from "../services/notificationService";

import {
  getPlatformFee,
} from "../services/settingsService";

import {
  getSession,
} from "../services/sessionService";

export default function CartScreen({
  navigation,
  route,
}: any) {
  // =========================
  // CART
  // =========================

  const [cartItems, setCartItems] =
    useState<any[]>(
      route?.params?.cartItems || []
    );

  // =========================
  // DELIVERY DETAILS
  // =========================

  const [building, setBuilding] =
    useState("");

  const [flat, setFlat] =
    useState("");

  const [landmark, setLandmark] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  // =========================
  // CUSTOMER
  // =========================

  const [customer, setCustomer] =
    useState<any>(
      route?.params?.customer || null
    );

  useEffect(() => {
    const loadCustomerSession =
      async () => {
        try {
          const session =
            await getSession();

          console.log(
            "CART CUSTOMER SESSION:",
            session
          );

          if (
            session?.role === "Customer" &&
            session?.profile
          ) {
            setCustomer(
              session.profile
            );
          }
        } catch (error) {
          console.log(
            "Customer session error:",
            error
          );
        }
      };

    loadCustomerSession();
  }, []);

  // =========================
  // PLATFORM FEE
  // =========================

  const [
    platformFee,
    setPlatformFee,
  ] = useState(0);

  const [
    placingOrder,
    setPlacingOrder,
  ] = useState(false);

  useEffect(() => {
    const loadPlatformFee =
      async () => {
        try {
          const fee =
            await getPlatformFee();

          setPlatformFee(
            Number(fee) || 0
          );
        } catch (error) {
          console.log(
            "PLATFORM FEE ERROR:",
            error
          );

          // Fallback
          setPlatformFee(20);
        }
      };

    loadPlatformFee();
  }, []);

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (
    id: string
  ) => {
    const updatedItems =
      cartItems.map(
        (item: any) => {
          if (item.id === id) {
            return {
              ...item,
              quantity:
                Number(
                  item.quantity || 0
                ) + 1,
            };
          }

          return item;
        }
      );

    setCartItems(
      updatedItems
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (
    id: string
  ) => {
    const selectedItem =
      cartItems.find(
        (item: any) =>
          item.id === id
      );

    if (
      selectedItem &&
      Number(
        selectedItem.quantity
      ) === 1
    ) {
      const updatedItems =
        cartItems.filter(
          (item: any) =>
            item.id !== id
        );

      setCartItems(
        updatedItems
      );

      return;
    }

    const updatedItems =
      cartItems.map(
        (item: any) => {
          if (item.id === id) {
            return {
              ...item,
              quantity:
                Number(
                  item.quantity || 0
                ) - 1,
            };
          }

          return item;
        }
      );

    setCartItems(
      updatedItems
    );
  };

  // =========================
  // PRODUCT TOTAL
  // =========================

  const totalAmount =
    cartItems.reduce(
      (
        total: number,
        item: any
      ) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(item.quantity) || 0;

        return (
          total +
          price * quantity
        );
      },
      0
    );

  // =========================
  // GRAND TOTAL
  // =========================

  const grandTotal =
    totalAmount +
    platformFee;

  // =========================
  // PLACE ORDER
  // =========================

  const placeOrder =
    async () => {
      // Prevent double click
      if (placingOrder) {
        return;
      }

      // =========================
      // VALIDATE ADDRESS
      // =========================

      if (
        building.trim() === "" ||
        flat.trim() === "" ||
        mobile.trim() === ""
      ) {
        Alert.alert(
          "Missing Details",
          "Please enter building name, flat number and mobile number."
        );

        return;
      }

      // =========================
      // VALIDATE MINIMUM ORDER
      // =========================

      if (
        totalAmount < 200
      ) {
        Alert.alert(
          "Minimum Order",
          "Minimum order should be ₹200."
        );

        return;
      }

      setPlacingOrder(true);

      try {
        // =========================
        // CUSTOMER DETAILS
        // =========================

        const customerName =
          customer?.customerName ||
          customer?.name ||
          "Unknown Customer";

        const customerMobile =
          customer?.mobile ||
          "";

        console.log(
          "CUSTOMER NAME:",
          customerName
        );

        console.log(
          "CUSTOMER MOBILE:",
          customerMobile
        );

        // =========================
        // CREATE ORDER
        // =========================

        const newOrder = {
          customerName:
            customerName,

          customerMobile:
            customerMobile,

          vendorName:
            cartItems[0]?.vendorName ||
            "",

          locality:
            cartItems[0]?.locality ||
            "",

          items:
            cartItems.map(
              (item: any) => ({
                ...item,

                price:
                  Number(
                    item.price
                  ) || 0,

                quantity:
                  Number(
                    item.quantity
                  ) || 0,
              })
            ),

          subtotal:
            totalAmount,

          platformFee:
            platformFee,

          total:
            grandTotal,

          address: {
            building:
              building.trim(),

            flat:
              flat.trim(),

            landmark:
              landmark.trim(),

            mobile:
              mobile.trim(),
          },

          status:
            "Placed",

          createdAt:
            new Date(),
        };

        console.log(
          "================================"
        );

        console.log(
          "CREATING ORDER:"
        );

        console.log(
          newOrder
        );

        console.log(
          "================================"
        );

        // =========================
        // SAVE ORDER TO FIRESTORE
        // =========================

        const orderId =
          await createOrder(
            newOrder
          );

        console.log(
          "ORDER CREATED SUCCESSFULLY:"
        );

        console.log(
          orderId
        );

        // =========================
        // CUSTOMER SUCCESS
        // =========================
        //
        // IMPORTANT:
        // Navigate immediately after
        // Firestore confirms the order.
        //
        // Notification is handled AFTER
        // this and cannot block the customer.
        // =========================

        navigation.navigate(
          "OrderSuccess",
          {
            customer: {
              ...customer,

              mobile:
                customerMobile,

              customerName:
                customerName,
            },

            orderNumber:
              orderId,

            total:
              grandTotal,
          }
        );

        // =========================
        // VENDOR NOTIFICATION
        // =========================
        //
        // This runs after navigation.
        // If notification fails, the order
        // is still successfully placed.
        // =========================

        try {
          await createNotification({
            vendorName:
              cartItems[0]
                ?.vendorName || "",

            customer:
              customerName,

            mobile:
              customerMobile,

            customerMobile:
              customerMobile,

            locality:
              cartItems[0]
                ?.locality || "",

            address:
              building.trim(),

            items:
              cartItems,

            total:
              grandTotal,

            orderNumber:
              orderId,

            title:
              "New Order Received",

            message:
              `${customerName} placed an order worth ₹${grandTotal}`,

            read:
              false,

            createdAt:
              new Date().toISOString(),
          });

          console.log(
            "VENDOR NOTIFICATION CREATED"
          );
        } catch (
          notificationError
        ) {
          console.log(
            "NOTIFICATION ERROR:",
            notificationError
          );

          // DO NOT show order failure.
          // Order has already been created.
        }

      } catch (error) {
        console.log(
          "================================"
        );

        console.log(
          "PLACE ORDER ERROR:"
        );

        console.log(
          error
        );

        console.log(
          "================================"
        );

        Alert.alert(
          "Order Failed",
          "Unable to place the order. Please try again."
        );
      } finally {
        setPlacingOrder(
          false
        );
      }
    };

  // =========================
  // UI
  // =========================

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

        {/* =========================
            HEADER
        ========================= */}

        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          My Cart 🛒
        </Text>

        {/* =========================
            EMPTY CART
        ========================= */}

        {cartItems.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "gray",
              marginBottom: 30,
            }}
          >
            Cart is Empty
          </Text>
        )}

        {/* =========================
            CART ITEMS
        ========================= */}

        {cartItems.map(
          (item: any) => (
            <View
              key={
                item.id +
                item.displayQuantity
              }
              style={{
                backgroundColor:
                  "#ffffff",

                padding: 20,

                borderRadius: 12,

                marginBottom: 20,

                borderWidth: 1,

                borderColor: "#ddd",
              }}
            >

              <Text
                style={{
                  fontSize: 24,

                  fontWeight:
                    "bold",

                  marginBottom: 10,
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  fontSize: 20,

                  color: "orange",

                  fontWeight:
                    "bold",

                  marginBottom: 10,
                }}
              >
                {item.displayQuantity}
              </Text>

              <Text
                style={{
                  fontSize: 18,

                  color: "green",

                  fontWeight:
                    "bold",

                  marginBottom: 15,
                }}
              >
                ₹
                {Number(
                  item.price
                ) || 0}
                {" × "}
                {Number(
                  item.quantity
                ) || 0}
                {" = ₹"}
                {
                  (Number(
                    item.price
                  ) || 0) *
                  (Number(
                    item.quantity
                  ) || 0)
                }
              </Text>

              {/* QUANTITY CONTROLS */}

              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",
                }}
              >

                {/* MINUS */}

                <TouchableOpacity
                  onPress={() =>
                    decreaseQuantity(
                      item.id
                    )
                  }
                  style={{
                    backgroundColor:
                      "red",

                    width: 45,

                    height: 45,

                    borderRadius: 10,

                    justifyContent:
                      "center",

                    alignItems:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      color:
                        "white",

                      fontSize: 24,

                      fontWeight:
                        "bold",
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>

                {/* QUANTITY */}

                <Text
                  style={{
                    fontSize: 22,

                    fontWeight:
                      "bold",
                  }}
                >
                  {item.quantity}
                </Text>

                {/* PLUS */}

                <TouchableOpacity
                  onPress={() =>
                    increaseQuantity(
                      item.id
                    )
                  }
                  style={{
                    backgroundColor:
                      "green",

                    width: 45,

                    height: 45,

                    borderRadius: 10,

                    justifyContent:
                      "center",

                    alignItems:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      color:
                        "white",

                      fontSize: 24,

                      fontWeight:
                        "bold",
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          )
        )}

        {/* =========================
            CHECKOUT
        ========================= */}

        {cartItems.length > 0 && (
          <>

            {/* =========================
                DELIVERY ADDRESS
            ========================= */}

            <View
              style={{
                backgroundColor:
                  "#ffffff",

                padding: 20,

                borderRadius: 12,

                marginBottom: 30,

                borderWidth: 1,

                borderColor: "#ddd",
              }}
            >

              <Text
                style={{
                  fontSize: 24,

                  fontWeight:
                    "bold",

                  marginBottom: 20,
                }}
              >
                Delivery Address 📍
              </Text>

              <TextInput
                placeholder="Building Name"
                value={
                  building
                }
                onChangeText={
                  setBuilding
                }
                style={{
                  backgroundColor:
                    "#f5f5f5",

                  padding: 15,

                  borderRadius: 10,

                  marginBottom: 15,

                  fontSize: 16,
                }}
              />

              <TextInput
                placeholder="Flat Number"
                value={
                  flat
                }
                onChangeText={
                  setFlat
                }
                style={{
                  backgroundColor:
                    "#f5f5f5",

                  padding: 15,

                  borderRadius: 10,

                  marginBottom: 15,

                  fontSize: 16,
                }}
              />

              <TextInput
                placeholder="Landmark"
                value={
                  landmark
                }
                onChangeText={
                  setLandmark
                }
                style={{
                  backgroundColor:
                    "#f5f5f5",

                  padding: 15,

                  borderRadius: 10,

                  marginBottom: 15,

                  fontSize: 16,
                }}
              />

              <TextInput
                placeholder="Mobile Number"
                keyboardType="numeric"
                value={
                  mobile
                }
                onChangeText={
                  setMobile
                }
                style={{
                  backgroundColor:
                    "#f5f5f5",

                  padding: 15,

                  borderRadius: 10,

                  marginBottom: 15,

                  fontSize: 16,
                }}
              />

            </View>

            {/* =========================
                ORDER SUMMARY
            ========================= */}

            <View
              style={{
                backgroundColor:
                  "#ffffff",

                padding: 20,

                borderRadius: 12,

                marginBottom: 30,

                borderWidth: 1,

                borderColor: "#ddd",
              }}
            >

              <Text
                style={{
                  fontSize: 24,

                  fontWeight:
                    "bold",

                  marginBottom: 20,
                }}
              >
                Order Summary
              </Text>

              <Text
                style={{
                  fontSize: 18,

                  marginBottom: 10,
                }}
              >
                Products Total:
                {" "}
                ₹{totalAmount}
              </Text>

              <Text
                style={{
                  fontSize: 18,

                  marginBottom: 15,
                }}
              >
                Platform Fee:
                {" "}
                ₹{platformFee}
              </Text>

              <View
                style={{
                  borderBottomWidth:
                    1,

                  borderColor:
                    "#ddd",

                  marginBottom: 15,
                }}
              />

              <Text
                style={{
                  fontSize: 30,

                  color: "green",

                  fontWeight:
                    "bold",
                }}
              >
                Grand Total:
                {" "}
                ₹{grandTotal}
              </Text>

              {totalAmount < 200 && (
                <Text
                  style={{
                    color:
                      "red",

                    marginTop: 10,

                    fontWeight:
                      "bold",
                  }}
                >
                  Minimum order should
                  be ₹200
                </Text>
              )}

            </View>

            {/* =========================
                PLACE ORDER
            ========================= */}

            <TouchableOpacity
              disabled={
                totalAmount < 200 ||
                placingOrder
              }
              onPress={
                placeOrder
              }
              style={{
                backgroundColor:
                  totalAmount >= 200 &&
                  !placingOrder
                    ? "green"
                    : "gray",

                padding: 20,

                borderRadius: 12,

                marginBottom: 40,
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
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </Text>

            </TouchableOpacity>

          </>
        )}

      </View>
    </ScrollView>
  );
}