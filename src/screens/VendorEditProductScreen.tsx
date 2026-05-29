import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { useState } from "react";

import {
  updateProduct,
} from "../services/productService";

const units = [
  "KG",
  "Piece",
  "Bundle",
  "Dozen",
];

export default function VendorEditProductScreen({
  route,
  navigation,
}: any) {
  const { product } =
    route.params;

  const [price, setPrice] =
    useState(
      product.price.toString()
    );

  const [selectedUnit, setSelectedUnit] =
    useState(product.unit);

  const [available, setAvailable] =
    useState(
      product.available
    );

  const handleSave = async () => {
    await updateProduct(
      product.firestoreId,
      {
        price: Number(price),
        unit: selectedUnit,
        available: available,
      }
    );

    alert(
      "Product Updated Successfully ✅"
    );

    navigation.goBack();
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
          Edit Product ✏️
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {product.vegetable}
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Price
        </Text>

        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={{
            backgroundColor: "#ffffff",
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            marginBottom: 25,
            fontSize: 18,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Select Unit
        </Text>

        {units.map((unit) => (
          <TouchableOpacity
            key={unit}
            onPress={() =>
              setSelectedUnit(unit)
            }
            style={{
              backgroundColor:
                selectedUnit === unit
                  ? "green"
                  : "#ffffff",

              padding: 15,

              borderRadius: 10,

              marginBottom: 10,

              borderWidth: 1,

              borderColor: "#ddd",
            }}
          >
            <Text
              style={{
                color:
                  selectedUnit === unit
                    ? "white"
                    : "black",

                fontWeight: "bold",

                fontSize: 18,
              }}
            >
              {unit}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() =>
            setAvailable(
              !available
            )
          }
          style={{
            backgroundColor:
              available
                ? "green"
                : "red",

            padding: 18,

            borderRadius: 10,

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
            {available
              ? "🟢 Available"
              : "🔴 Out Of Stock"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: "#0066cc",

            padding: 20,

            borderRadius: 12,

            marginTop: 30,
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
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}