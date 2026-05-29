import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToProducts,
  deleteProduct,
} from "../services/productService";

import {
  fetchVendors,
} from "../services/vendorService";

export default function VendorDashboardScreen({
  navigation,
}: any) {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToProducts(
        (allProducts: any[]) => {
          setProducts(allProducts);
        }
      );

    return unsubscribe;
  }, []);

  const testVendors = async () => {
    const vendors =
      await fetchVendors();

    console.log(
      "VENDORS FROM FIREBASE:"
    );

    console.log(vendors);
  };

  const handleDelete = async (
    firestoreId: string
  ) => {
    Alert.alert(
      "Delete Product",
      "Are you sure?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteProduct(
              firestoreId
            );
          },
        },
      ]
    );
  };

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
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Vendor Dashboard 🛒
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorAddProduct"
            )
          }
          style={{
            backgroundColor:
              "green",
            padding: 18,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign:
                "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Add Product
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorOrders"
            )
          }
          style={{
            backgroundColor:
              "orange",
            padding: 18,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign:
                "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            View Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={testVendors}
          style={{
            backgroundColor:
              "purple",
            padding: 18,
            borderRadius: 12,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign:
                "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Test Vendors
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          My Products
        </Text>

        {products.map(
          (product) => (
            <View
              key={
                product.firestoreId
              }
              style={{
                backgroundColor:
                  "white",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                borderWidth: 1,
                borderColor:
                  "#ddd",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight:
                    "bold",
                }}
              >
                {
                  product.vegetable
                }
              </Text>

              <Text
                style={{
                  color:
                    "green",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                ₹
                {product.price}
                /
                {
                  product.unit
                }
              </Text>

              <Text
                style={{
                  marginTop: 5,
                }}
              >
                {product.locality}
              </Text>

              <View
                style={{
                  flexDirection:
                    "row",
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      "VendorEditProduct",
                      {
                        product,
                      }
                    )
                  }
                  style={{
                    backgroundColor:
                      "#0066cc",
                    flex: 1,
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign:
                        "center",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleDelete(
                      product.firestoreId
                    )
                  }
                  style={{
                    backgroundColor:
                      "red",
                    flex: 1,
                    padding: 12,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign:
                        "center",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}