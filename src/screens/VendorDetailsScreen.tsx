import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToProducts,
} from "../services/productService";

const kgOptions = [
  {
    label: "100 gm",
    value: 0.1,
  },
  {
    label: "250 gm",
    value: 0.25,
  },
  {
    label: "500 gm",
    value: 0.5,
  },
  {
    label: "1 KG",
    value: 1,
  },
];

const pieceOptions = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "5",
    value: 5,
  },
];

export default function VendorDetailsScreen({
  route,
  navigation,
}: any) {
  const vendor =
    route?.params?.vendor || {
      name: "Fresh Vegetable Market",
      locality: "JB Nagar",
    };

  const customer =
    route?.params?.customer;

  const [products, setProducts] =
    useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("Vegetable");

  const [cartItems, setCartItems] =
    useState<any[]>(
      route?.params?.cartItems || []
    );

  const [
    selectedQuantities,
    setSelectedQuantities,
  ] = useState<any>({});

  useEffect(() => {
    const unsubscribe =
      subscribeToProducts(
        (allProducts: any[]) => {
          const vendorProducts =
            allProducts.filter(
              (product: any) =>
                product.vendorName ===
                  vendor.name &&
                product.available === true
            );

          setProducts(vendorProducts);
        }
      );

    return () => unsubscribe();
  }, []);

  const addToCart = (
    product: any,
    selectedQuantity: any
  ) => {
    const selectedValue =
      Number(
        selectedQuantity?.value || 1
      );

    const displayQuantity =
      selectedQuantity?.label ||
      (
        product.unit === "KG"
          ? "1 KG"
          : "1"
      );

    /*
     * PRICE OF ONE SELECTED PACKAGE
     *
     * Example:
     *
     * Product = ₹250 / KG
     *
     * 1 KG   = ₹250
     * 500 gm = ₹125
     * 250 gm = ₹62.50
     * 100 gm = ₹25
     *
     * For piece products:
     * ₹250 × 1 piece = ₹250
     */

    const unitPrice =
      product.unit === "KG"
        ? Number(product.price || 0) *
          selectedValue
        : Number(product.price || 0);

    const existingItem =
      cartItems.find(
        (item: any) =>
          item.id === product.id &&
          item.displayQuantity ===
            displayQuantity
      );

    let updatedCart: any[] = [];

    if (existingItem) {
      /*
       * Same product and same package size.
       *
       * Increase the number of packages,
       * but keep price as the price
       * of ONE package.
       */

      updatedCart =
        cartItems.map(
          (item: any) => {
            if (
              item.id === product.id &&
              item.displayQuantity ===
                displayQuantity
            ) {
              return {
                ...item,

                quantity:
                  Number(item.quantity || 0) +
                  1,

                price:
                  unitPrice,
              };
            }

            return item;
          }
        );
    } else {
      /*
       * First item of this
       * product/package combination.
       */

      const newItem = {
        id:
          product.id,

        name:
          product.vegetable,

        /*
         * Number of selected packages.
         */
        quantity: 1,

        /*
         * Selected package.
         */
        displayQuantity:
          displayQuantity,

        /*
         * Price of ONE selected package.
         */
        price:
          unitPrice,

        /*
         * Original product price.
         */
        basePrice:
          Number(product.price || 0),

        unit:
          product.unit,

        vendorName:
          product.vendorName,

        locality:
          product.locality,
      };

      updatedCart = [
        ...cartItems,
        newItem,
      ];
    }

    setCartItems(
      updatedCart
    );

    alert(
      "Added to Cart"
    );
  };

  const totalCartItems =
    cartItems.length;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {vendor.name}
          </Text>

          <Text
            style={{
              fontSize: 22,
              textAlign: "center",
              color: "gray",
              marginBottom: 30,
            }}
          >
            {vendor.locality}
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
                    : "#ffffff",

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
                    : "#ffffff",

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

          {products.filter(
            (product: any) =>
              (product.category ||
                "Vegetable") ===
              selectedCategory
          ).length === 0 && (
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 18,
                marginTop: 30,
                marginBottom: 30,
              }}
            >
              No {selectedCategory}s available
            </Text>
          )}

          {products
            .filter(
              (product: any) =>
                (product.category ||
                  "Vegetable") ===
                selectedCategory
            )
            .map(
              (product: any) => (
                <View
                  key={product.id}
                  style={{
                    backgroundColor:
                      "#ffffff",

                    padding: 20,

                    borderRadius: 15,

                    marginBottom: 20,

                    borderWidth: 1,

                    borderColor: "#ddd",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight:
                        "bold",
                      marginBottom: 10,
                    }}
                  >
                    {(
                      product.category ===
                      "Fruit"
                        ? "🍎 "
                        : "🥬 "
                    ) +
                      product.vegetable}
                  </Text>

                  <Text
                    style={{
                      fontSize: 24,

                      color: "green",

                      fontWeight:
                        "bold",

                      marginBottom: 10,
                    }}
                  >
                    ₹{product.price} /{" "}
                    {product.unit}
                  </Text>

                  <Text
                    style={{
                      color: "green",

                      fontWeight:
                        "bold",

                      fontSize: 18,

                      marginBottom: 15,
                    }}
                  >
                    🟢 In Stock
                  </Text>

                  <View
                    style={{
                      flexDirection:
                        "row",

                      flexWrap:
                        "wrap",

                      marginBottom: 15,
                    }}
                  >
                    {(
                      product.unit ===
                      "KG"
                        ? kgOptions
                        : pieceOptions
                    ).map(
                      (option: any) => (
                        <TouchableOpacity
                          key={
                            option.label
                          }
                          onPress={() =>
                            setSelectedQuantities(
                              {
                                ...selectedQuantities,

                                [product.id]:
                                  option,
                              }
                            )
                          }
                          style={{
                            backgroundColor:
                              selectedQuantities[
                                product.id
                              ]?.label ===
                              option.label
                                ? "orange"
                                : "#eeeeee",

                            paddingVertical:
                              10,

                            paddingHorizontal:
                              14,

                            borderRadius: 10,

                            marginRight: 10,

                            marginBottom: 10,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                selectedQuantities[
                                  product.id
                                ]?.label ===
                                option.label
                                  ? "white"
                                  : "black",

                              fontWeight:
                                "bold",
                            }}
                          >
                            {
                              option.label
                            }
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      addToCart(
                        product,
                        selectedQuantities[
                          product.id
                        ]
                      )
                    }
                    style={{
                      backgroundColor:
                        "green",

                      padding: 18,

                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",

                        textAlign:
                          "center",

                        fontWeight:
                          "bold",

                        fontSize: 20,
                      }}
                    >
                      Add To Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            )}
        </View>
      </ScrollView>

      {totalCartItems > 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Cart",
              {
                cartItems,
                customer,
              }
            )
          }
          style={{
            position: "absolute",

            bottom: 30,

            right: 20,

            backgroundColor:
              "green",

            paddingVertical: 16,

            paddingHorizontal: 24,

            borderRadius: 50,

            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "white",

              fontWeight: "bold",

              fontSize: 18,
            }}
          >
            Cart ({totalCartItems})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}