import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { useState } from "react";

import { masterProducts } from "../data/masterProducts";

import {
  createProduct,
} from "../services/productService";

const units = [
  "KG",
  "Piece",
  "Bundle",
  "Dozen",
];

export default function VendorAddProductScreen() {
  const [selectedVegetable, setSelectedVegetable] =
    useState<any>(null);

  const [selectedUnit, setSelectedUnit] =
    useState("KG");

  const [price, setPrice] =
    useState("");

  const handleSaveProduct = async () => {
    if (!selectedVegetable || !price) {
      alert(
        "Please select vegetable and enter price"
      );
      return;
    }

    const newProduct = {
      id: Date.now().toString(),

      vegetable:
        selectedVegetable.marathi,

      unit: selectedUnit,

      price: Number(price),

      available: true,

      vendorName:
        "Fresh Vegetable Market",

      locality: "JB Nagar",

      createdAt: new Date(),
    };

    await createProduct(newProduct);

    alert("Product Saved Successfully ✅");

    setSelectedVegetable(null);
    setSelectedUnit("KG");
    setPrice("");
  };

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
          Add Vegetables 🥬
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Select Vegetable
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:
              "space-between",
          }}
        >
          {masterProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                setSelectedVegetable(item)
              }
              style={{
                backgroundColor:
                  selectedVegetable?.id ===
                  item.id
                    ? "green"
                    : "#ffffff",

                width: "48%",

                paddingVertical: 20,

                borderRadius: 12,

                marginBottom: 15,

                borderWidth: 1,

                borderColor: "#ddd",

                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    selectedVegetable?.id ===
                    item.id
                      ? "white"
                      : "black",

                  fontWeight: "bold",

                  fontSize: 22,
                }}
              >
                {item.marathi}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 15,
          }}
        >
          Select Unit
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:
              "space-between",
          }}
        >
          {units.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() =>
                setSelectedUnit(item)
              }
              style={{
                backgroundColor:
                  selectedUnit === item
                    ? "orange"
                    : "#ffffff",

                width: "48%",

                paddingVertical: 18,

                borderRadius: 12,

                marginBottom: 15,

                borderWidth: 1,

                borderColor: "#ddd",

                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    selectedUnit === item
                      ? "white"
                      : "black",

                  fontWeight: "bold",

                  fontSize: 18,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Enter Price (₹)
          </Text>

          <TextInput
            placeholder={`Enter Price per ${selectedUnit}`}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={{
              backgroundColor: "#ffffff",
              padding: 18,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#ddd",
              fontSize: 18,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleSaveProduct}
          style={{
            backgroundColor: "green",
            padding: 20,
            borderRadius: 12,
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Save Product
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}