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

import {
  subscribeToOrders,
} from "../services/orderService";

import {
  getVendorRating,
} from "../services/ratingService";



export default function VendorDashboardScreen({
  navigation,
  route,
}: any) {
  const vendor =
    route?.params?.vendor;

  console.log(
    "LOGGED IN VENDOR",
    vendor
  );

  const vendorName =
    vendor?.vendorName ||
    vendor?.name ||
    "";

  const [products, setProducts] =
    useState<any[]>([]);
  
  const [todayOrders, setTodayOrders] =
    useState(0);
  
  const [todayRevenue, setTodayRevenue] =
    useState(0);
  
  const [totalOrders, setTotalOrders] =
    useState(0);
  
  const [pendingOrders, setPendingOrders] =
    useState(0);
  
  const [averageRating, setAverageRating] =
    useState(0);
  
  const [totalReviews, setTotalReviews] =
    useState(0);

  const [topProduct,
      setTopProduct] =
      useState("");
    
  const [topProductCount,
      setTopProductCount] =
      useState(0);

  const [lifetimeRevenue,
    setLifetimeRevenue] =
    useState(0);

  const [monthRevenue, setMonthRevenue] =
  useState(0);

  const [repeatCustomers, setRepeatCustomers] =
    useState(0);

  const [vendorRank, setVendorRank] =
    useState(1);

  useEffect(() => {
    const unsubscribe =
      subscribeToProducts(
        (allProducts: any[]) => {
          const myProducts =
            allProducts.filter(
              (product) =>
                product.vendorName ===
                vendorName
            );

          setProducts(
            myProducts
          );
        }
      );

    return unsubscribe;
  }, [vendorName]);

  useEffect(() => {
    const unsubscribe =
      subscribeToOrders(
        async (orders: any[]) => {
          const vendorOrders =
            orders.filter(
              (order) =>
                order.vendorName ===
                vendorName
            );
  
          setTotalOrders(
            vendorOrders.length
          );
  
          const pending =
            vendorOrders.filter(
              (order) =>
                order.status ===
                "Placed"
            );
  
          setPendingOrders(
            pending.length
          );
  
          const today = new Date()
            .toISOString()
            .split("T")[0];

            const todaysOrdersList =
            vendorOrders.filter((order) => {
              if (!order.createdAt) {
                return false;
              }
          
              let orderDate = "";
          
              if (
                typeof order.createdAt ===
                "string"
              ) {
                orderDate =
                  order.createdAt.split("T")[0];
              } else if (
                order.createdAt?.toDate
              ) {
                orderDate =
                  order.createdAt
                    .toDate()
                    .toISOString()
                    .split("T")[0];
              }
          
              return orderDate === today;
            });
          
          setTodayOrders(
            todaysOrdersList.length
          );
          
          const revenue =
            todaysOrdersList.reduce(
              (
                sum: number,
                order: any
              ) =>
                sum +
                Number(
                  order.total || 0
                ),
              0
            );
          
          setTodayRevenue(
            revenue
          );

          const totalRevenue =
            vendorOrders.reduce(
              (
                sum: number,
                order: any
              ) =>
                sum +
                Number(
                  order.total || 0
                ),
              0
            );

          setLifetimeRevenue(
            totalRevenue
          );

          const currentMonth =
            new Date().getMonth();

          const currentYear =
            new Date().getFullYear();

          const monthlyOrders =
            vendorOrders.filter((order) => {
              if (!order.createdAt)
                return false;

              let orderDate;

              if (
                typeof order.createdAt ===
                "string"
              ) {
                orderDate = new Date(
                  order.createdAt
                );
              } else if (
                order.createdAt?.toDate
              ) {
                orderDate =
                  order.createdAt.toDate();
              } else {
                return false;
              }

              return (
                orderDate.getMonth() ===
                  currentMonth &&
                orderDate.getFullYear() ===
                  currentYear
              );
            });

          const monthlyRevenue =
            monthlyOrders.reduce(
              (sum, order) =>
                sum +
                Number(order.total || 0),
              0
            );

          setMonthRevenue(
            monthlyRevenue
          );

          const customerMap: any = {};

            vendorOrders.forEach(
              (order) => {
                const mobile =
                  order.customerMobile;

                customerMap[mobile] =
                  (customerMap[mobile] || 0) + 1;
              }
            );

            const repeatCount =
              Object.values(
                customerMap
              ).filter(
                (count: any) =>
                  Number(count) > 1
              ).length;

            setRepeatCustomers(
              repeatCount
            );

            setVendorRank(1);

          const productCounter: any = {};

            vendorOrders.forEach(
              (order) => {
                order.items?.forEach(
                  (item: any) => {
                    const productName =
                      item.name;

                    productCounter[
                      productName
                    ] =
                      (
                        productCounter[
                          productName
                        ] || 0
                      ) +
                      Number(
                        item.quantity || 0
                      );
                  }
                );
              }
            );

            let bestProduct = "";
            let bestCount = 0;

            Object.keys(
              productCounter
            ).forEach(
              (product) => {
                if (
                  productCounter[
                    product
                  ] > bestCount
                ) {
                  bestCount =
                    productCounter[
                      product
                    ];

                  bestProduct =
                    product;
                }
              }
            );

            setTopProduct(
              bestProduct
            );

            setTopProductCount(
              bestCount
            );
  
          const ratingData =
            await getVendorRating(
              vendorName
            );
  
          setAverageRating(
            ratingData.average
          );
  
          setTotalReviews(
            ratingData.totalReviews
          );
        }
      );
  
    return () =>
      unsubscribe();
  }, [vendorName]);

  

  const testVendors =
    async () => {
      const vendors =
        await fetchVendors();

      console.log(
        "VENDORS FROM FIREBASE:"
      );

      console.log(vendors);
    };

  const handleDelete =
    async (
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
            style:
              "destructive",
            onPress:
              async () => {
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
          maxWidth: 500,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign:
              "center",
          }}
        >
          {vendorName}
        </Text>

        <Text
          style={{
            textAlign:
              "center",
            color: "gray",
            marginTop: 5,
            marginBottom: 30,
          }}
        >
          Vendor Dashboard 🛒
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          {/* Today's Orders */}

          <View
            style={{
              backgroundColor: "#2196F3",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Today's Orders
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {todayOrders}
            </Text>
          </View>

          {/* Today's Revenue */}

          <View
            style={{
              backgroundColor: "#4CAF50",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Today's Revenue
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              ₹{todayRevenue}
            </Text>
          </View>

          {/* This Month Revenue */}

          <View
            style={{
              backgroundColor: "#009688",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              This Month Revenue
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              ₹{monthRevenue}
            </Text>
          </View>

          {/* Lifetime Revenue */}

          <View
            style={{
              backgroundColor: "#673AB7",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Lifetime Revenue
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              ₹{lifetimeRevenue}
            </Text>
          </View>

          {/* Total Orders */}

          <View
            style={{
              backgroundColor: "#3F51B5",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Total Orders
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {totalOrders}
            </Text>
          </View>

          {/* Pending Orders */}

          <View
            style={{
              backgroundColor: "#FF9800",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Pending
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {pendingOrders}
            </Text>
          </View>

          {/* Repeat Customers */}

          <View
            style={{
              backgroundColor: "#E91E63",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Repeat Customers
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {repeatCustomers}
            </Text>
          </View>

          {/* Vendor Rank */}

          <View
            style={{
              backgroundColor: "#795548",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Vendor Rank
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              #{vendorRank}
            </Text>
          </View>

          {/* Average Rating */}

          <View
            style={{
              backgroundColor: "#FFC107",
              width: "100%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              ⭐ Average Rating
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {averageRating > 0
                ? `⭐ ${averageRating.toFixed(1)} (${totalReviews})`
                : "No Ratings Yet"}
            </Text>
          </View>

          {/* Top Selling Product */}

          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 25,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              🏆 Top Selling Product
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "green",
              }}
            >
              {topProduct || "N/A"}
            </Text>

            <Text
              style={{
                color: "gray",
                marginTop: 5,
              }}
            >
              {topProductCount} Sold
            </Text>
          </View>
        </View>

        {/* Add Product */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorAddProduct",
              {
                vendor,
              }
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
              fontWeight:
                "bold",
            }}
          >
            Add Product
          </Text>
        </TouchableOpacity>

        {/* View Orders */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorOrders",
              {
                vendor,
              }
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
              fontWeight:
                "bold",
            }}
          >
            View Orders
          </Text>
        </TouchableOpacity>

        {/* Notifications */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorNotifications",
              {
                vendor,
              }
            )
          }
          style={{
            backgroundColor:
              "#ff5722",
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
              fontWeight:
                "bold",
            }}
          >
            🔔 Notifications
          </Text>
        </TouchableOpacity>

        {/* ⭐ Customer Reviews */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorReviews",
              {
                vendor,
              }
            )
          }
          style={{
            backgroundColor:
              "purple",
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
              fontWeight:
                "bold",
            }}
          >
            ⭐ Customer Reviews
          </Text>
        </TouchableOpacity>

        {/* My Profile */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorProfileEdit",
              {
                vendor,
              }
            )
          }
          style={{
            backgroundColor:
              "#444",
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
              fontWeight:
                "bold",
              fontSize: 18,
            }}
          >
            My Profile
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

        {products.length ===
          0 && (
          <Text
            style={{
              textAlign:
                "center",
              color: "gray",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            No products found
          </Text>
        )}

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
                {product.unit}
              </Text>

              <Text
                style={{
                  marginTop: 5,
                }}
              >
                {
                  product.locality
                }
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
                      color:
                        "white",
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
                      color:
                        "white",
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