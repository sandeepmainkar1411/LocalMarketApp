import { createOrder } from "../services/orderService";
import {
  createNotification,
} from "../services/notificationService";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import {
  useState,
  useEffect,
} from "react";

import {
  getPlatformFee,
} from "../services/settingsService";

export default function CartScreen({
  navigation,
  route,
}: any) {
  const [cartItems, setCartItems] =
    useState(
      route?.params?.cartItems || []
    );

  const [building, setBuilding] =
    useState("");

  const [flat, setFlat] =
    useState("");

  const [landmark, setLandmark] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const customer =
    route?.params?.customer;

  const [platformFee,
      setPlatformFee] =
      useState(0);

  useEffect(() => {
  loadPlatformFee();
}, []);

const loadPlatformFee =
  async () => {
    const fee =
      await getPlatformFee();

    setPlatformFee(fee);
  };

  const increaseQuantity = (
    id: string
  ) => {
    const updatedItems =
      cartItems.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            quantity:
              item.quantity + 1,
          };
        }

        return item;
      });

    setCartItems(updatedItems);
  };

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
      selectedItem.quantity === 1
    ) {
      const updatedItems =
        cartItems.filter(
          (item: any) =>
            item.id !== id
        );

      setCartItems(updatedItems);

      return;
    }

    const updatedItems =
      cartItems.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            quantity:
              item.quantity - 1,
          };
        }

        return item;
      });

    setCartItems(updatedItems);
  };

  const totalAmount =
  cartItems.reduce(
    (
      total: number,
      item: any
    ) =>
      total +
      item.price *
        item.quantity,
    0
  );



const grandTotal =
  totalAmount +
  platformFee;

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
          My Cart 🛒
        </Text>

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
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                ₹{item.price} × {item.quantity}
                = ₹{item.price * item.quantity}
              </Text>

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

                <Text
                  style={{
                    fontSize: 22,

                    fontWeight:
                      "bold",
                  }}
                >
                  {item.quantity}
                </Text>

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

        {cartItems.length > 0 && (
          <>
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
                value={building}
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
                value={flat}
                onChangeText={setFlat}
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
                value={landmark}
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
                value={mobile}
                onChangeText={setMobile}
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
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                Order Summary
              </Text>

              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  Products Total:
                  ₹{totalAmount}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 10,
                  }}
                >
                  Platform Fee:
                  ₹{platformFee}
                </Text>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ddd",
                    marginVertical: 15,
                  }}
                />

                <Text
                  style={{
                    fontSize: 30,
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Grand Total:
                  ₹{grandTotal}
                </Text>
              </View>

              {totalAmount < 200 && (
                <Text
                  style={{
                    color: "red",

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

            <TouchableOpacity
              disabled={
                totalAmount < 200
              }
              onPress={async () => {
                if (
                  building.trim() ===
                    "" ||
                  flat.trim() ===
                    "" ||
                  mobile.trim() === ""
                ) {
                  alert(
                    "Please enter delivery details"
                  );

                  return;
                }

                const newOrder = {
                  customerName:
                    customer?.customerName ||
                    "Unknown Customer",

                  customerMobile:
                    customer?.mobile || "",

                  vendorName:
                    cartItems[0]?.vendorName || "",

                  locality:
                    cartItems[0]?.locality || "",

                  items: cartItems,

                  subtotal:
                    totalAmount,

                  platformFee:
                    platformFee,

                  total:
                    grandTotal,

                  address: {
                    building,
                    flat,
                    landmark,
                    mobile,
                  },

                  status: "Placed",

                  createdAt:
                    new Date(),
                };

                await createOrder(
                  newOrder
                );
                
                await createNotification({
                  vendorName:
                    cartItems[0]?.vendorName || "",

                  customer:
                    customer?.customerName ||
                    "Unknown Customer",

                  mobile:
                    mobile,

                  locality:
                    cartItems[0]?.locality || "",

                  address:
                    building,

                  items:
                    cartItems,

                  total:
                    grandTotal,

                  title:
                    "New Order Received",

                  message:
                    `${customer?.customerName || "Customer"} placed an order worth ₹${grandTotal}`,

                  read: false,

                  createdAt:
                    new Date().toISOString(),
                });

                navigation.navigate(
                  "OrderSuccess",
                  {
                    customer,
                  }
                );
                }}
                style={{
                  backgroundColor:
                    totalAmount >= 200
                      ? "green"
                      : "gray",

                  padding: 20,

                  borderRadius: 12,

                  marginBottom: 40,
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
                    Place Order
                  </Text>
                  </TouchableOpacity>
                  </>
                  )}
                  </View>
                  </ScrollView>
                  );
                  }