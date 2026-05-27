import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { useState } from "react";

import { orders } from "../data/orders";

export default function CartScreen({
  navigation,
}: any) {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "टोमॅटो",
      price: 40,
      quantity: 2,
      unit: "KG",
    },

    {
      id: "2",
      name: "कांदा",
      price: 35,
      quantity: 1,
      unit: "KG",
    },
  ]);

  const [building, setBuilding] =
    useState("");

  const [flat, setFlat] = useState("");

  const [landmark, setLandmark] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const increaseQuantity = (id: string) => {
    const updatedItems = cartItems.map(
      (item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      }
    );

    setCartItems(updatedItems);
  };

  const decreaseQuantity = (id: string) => {
    const selectedItem = cartItems.find(
      (item) => item.id === id
    );

    if (
      selectedItem &&
      selectedItem.quantity === 1
    ) {
      const updatedItems = cartItems.filter(
        (item) => item.id !== id
      );

      setCartItems(updatedItems);

      return;
    }

    const updatedItems = cartItems.map(
      (item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      }
    );

    setCartItems(updatedItems);
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

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

        {cartItems.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: "#ffffff",
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
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                fontSize: 18,
                color: "green",
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              ₹{item.price} / {item.unit}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  decreaseQuantity(item.id)
                }
                style={{
                  backgroundColor: "red",
                  width: 45,
                  height: 45,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  increaseQuantity(item.id)
                }
                style={{
                  backgroundColor: "green",
                  width: 45,
                  height: 45,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {cartItems.length > 0 && (
          <>
            <View
              style={{
                backgroundColor: "#ffffff",
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
                Delivery Address 📍
              </Text>

              <TextInput
                placeholder="Building Name"
                value={building}
                onChangeText={setBuilding}
                style={{
                  backgroundColor: "#f5f5f5",
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
                  backgroundColor: "#f5f5f5",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 15,
                  fontSize: 16,
                }}
              />

              <TextInput
                placeholder="Landmark"
                value={landmark}
                onChangeText={setLandmark}
                style={{
                  backgroundColor: "#f5f5f5",
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
                  backgroundColor: "#f5f5f5",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 15,
                  fontSize: 16,
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: "#ffffff",
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
                  marginBottom: 10,
                }}
              >
                Total Amount
              </Text>

              <Text
                style={{
                  fontSize: 32,
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                ₹{totalAmount}
              </Text>

              {totalAmount < 200 && (
                <Text
                  style={{
                    color: "red",
                    marginTop: 10,
                    fontWeight: "bold",
                  }}
                >
                  Minimum order should be ₹200
                </Text>
              )}
            </View>

            <TouchableOpacity
              disabled={totalAmount < 200}
              onPress={() => {
                if (
                  building.trim() === "" ||
                  flat.trim() === "" ||
                  mobile.trim() === ""
                ) {
                  alert(
                    "Please enter delivery details"
                  );

                  return;
                }

                const newOrder = {
                  id: Date.now().toString(),

                  customer: "Rahul Sharma",

                  items: cartItems
                    .map((item) => item.name)
                    .join(", "),

                  total: totalAmount,

                  address: `${flat}, ${building}`,

                  status: "Placed",
                };

                orders.push(newOrder);

                navigation.navigate(
                  "OrderSuccess"
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