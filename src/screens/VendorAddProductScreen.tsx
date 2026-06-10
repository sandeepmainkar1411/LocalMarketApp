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

export default function VendorAddProductScreen({
  route,
}: any) {

  const vendor =
  route?.params?.vendor;

const vendorName =
  vendor?.vendorName ||
  vendor?.name ||
  "";

const locality =
  vendor?.locality || "";

  

  const [selectedCategory, setSelectedCategory] =
    useState("Vegetable");

  const [selectedVegetable, setSelectedVegetable] =
    useState<any>(null);

  const [selectedUnit, setSelectedUnit] =
    useState("KG");

  const [price, setPrice] =
    useState("");

  const filteredProducts =
    masterProducts.filter(
      (item) =>
        item.category ===
        selectedCategory
    );

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

      category:
        selectedCategory,
    
      unit: selectedUnit,
    
      price: Number(price),
    
      available: true,
    
      vendorName,
    
      locality,
    
      createdAt: new Date(),
    };

    console.log(
      "PRODUCT TO SAVE:",
      newProduct
    );

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
            marginBottom: 20,
          }}
        >
          Add Products 🛒
        </Text>

        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setSelectedCategory(
                "Vegetable"
              )
            }
            style={{
              backgroundColor:
                selectedCategory ===
                "Vegetable"
                  ? "green"
                  : "#fff",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  selectedCategory ===
                  "Vegetable"
                    ? "white"
                    : "black",
                fontWeight: "bold",
              }}
            >
              🥬 Vegetables
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setSelectedCategory(
                "Fruit"
              )
            }
            style={{
              backgroundColor:
                selectedCategory ===
                "Fruit"
                  ? "orange"
                  : "#fff",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  selectedCategory ===
                  "Fruit"
                    ? "white"
                    : "black",
                fontWeight: "bold",
              }}
            >
              🍎 Fruits
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          {selectedCategory === "Vegetable"
            ? "Select Vegetable"
            : "Select Fruit"}
        </Text>

        
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:
              "space-between",
          }}
        >
          {filteredProducts.map((item) => (
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