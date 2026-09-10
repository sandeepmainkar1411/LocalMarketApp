import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

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

import {
  logout,
} from "../services/authService";

import {
  clearSession,
} from "../services/sessionService";


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

  const [topProduct, setTopProduct] =
    useState("");

  const [topProductCount, setTopProductCount] =
    useState(0);

  const [lifetimeRevenue, setLifetimeRevenue] =
    useState(0);

  const [monthRevenue, setMonthRevenue] =
    useState(0);

  const [repeatCustomers, setRepeatCustomers] =
    useState(0);

  const [vendorRank, setVendorRank] =
    useState(1);


  /*
   * LOAD VENDOR PRODUCTS
   */

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


  /*
   * LOAD VENDOR ORDERS
   */

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


          /*
           * TOTAL ORDERS
           */

          setTotalOrders(
            vendorOrders.length
          );


          /*
           * PENDING ORDERS
           */

          const pending =
            vendorOrders.filter(
              (order) =>
                order.status ===
                "Placed"
            );

          setPendingOrders(
            pending.length
          );


          /*
           * TODAY'S ORDERS
           */

          const today =
            new Date()
              .toISOString()
              .split("T")[0];

          const todaysOrdersList =
            vendorOrders.filter(
              (order) => {

                if (!order.createdAt) {
                  return false;
                }

                let orderDate =
                  "";

                if (
                  typeof order.createdAt ===
                  "string"
                ) {

                  orderDate =
                    order.createdAt
                      .split("T")[0];

                } else if (
                  order.createdAt?.toDate
                ) {

                  orderDate =
                    order.createdAt
                      .toDate()
                      .toISOString()
                      .split("T")[0];

                }

                return (
                  orderDate ===
                  today
                );

              }
            );


          setTodayOrders(
            todaysOrdersList.length
          );


          /*
           * TODAY'S REVENUE
           */

          const todayRevenueValue =
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
            todayRevenueValue
          );


          /*
           * LIFETIME REVENUE
           */

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


          /*
           * THIS MONTH REVENUE
           */

          const currentMonth =
            new Date().getMonth();

          const currentYear =
            new Date().getFullYear();

          const monthlyOrders =
            vendorOrders.filter(
              (order) => {

                if (!order.createdAt) {
                  return false;
                }

                let orderDate: Date;

                if (
                  typeof order.createdAt ===
                  "string"
                ) {

                  orderDate =
                    new Date(
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

              }
            );


          const monthlyRevenue =
            monthlyOrders.reduce(
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

          setMonthRevenue(
            monthlyRevenue
          );


          /*
           * REPEAT CUSTOMERS
           */

          const customerMap: any =
            {};

          vendorOrders.forEach(
            (order) => {

              const mobile =
                order.customerMobile;

              if (mobile) {

                customerMap[mobile] =
                  (
                    customerMap[mobile] ||
                    0
                  ) + 1;

              }

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


          /*
           * VENDOR RANK
           *
           * For now this is #1.
           * We can make this dynamic later.
           */

          setVendorRank(1);


          /*
           * TOP SELLING PRODUCT
           */

          const productCounter: any =
            {};

          vendorOrders.forEach(
            (order) => {

              order.items?.forEach(
                (item: any) => {

                  const productName =
                    item.name ||
                    item.vegetable ||
                    "Unknown";

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


          let bestProduct =
            "";

          let bestCount =
            0;


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


          /*
           * VENDOR RATING
           */

          try {

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

          } catch (ratingError) {

            console.log(
              "Rating Error:",
              ratingError
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, [vendorName]);


  /*
   * TEST VENDORS
   */

  const testVendors =
    async () => {

      try {

        const vendors =
          await fetchVendors();

        console.log(
          "VENDORS FROM FIREBASE:"
        );

        console.log(
          vendors
        );

      } catch (error) {

        console.log(
          "Test Vendors Error:",
          error
        );

      }

    };


  /*
   * DELETE PRODUCT
   */

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
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",

            onPress:
              async () => {

                try {

                  await deleteProduct(
                    firestoreId
                  );

                } catch (error) {

                  console.log(
                    "Delete Product Error:",
                    error
                  );

                  Alert.alert(
                    "Error",
                    "Unable to delete product."
                  );

                }

              },
          },
        ]
      );

    };


  /*
   * LOGOUT
   */

  const performLogout = async () => {

    console.log("VENDOR LOGOUT CLICKED");
  
    try {
  
      // Clear Grovio local session first
      await clearSession();
  
      console.log(
        "GROVIO SESSION CLEARED"
      );
  
    } catch (error) {
  
      console.log(
        "Session clear error:",
        error
      );
  
    }
  
    try {
  
      // Firebase logout
      await logout();
  
      console.log(
        "FIREBASE LOGOUT SUCCESS"
      );
  
    } catch (error) {
  
      // Firebase may not have an active
      // authenticated session during DEV OTP.
      console.log(
        "Firebase logout skipped:",
        error
      );
  
    }
  
    // Always return to the main Login screen
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Login",
        },
      ],
    });
  
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

        {/* VENDOR NAME */}

        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {vendorName}
        </Text>


        <Text
          style={{
            textAlign: "center",
            color: "gray",
            marginTop: 5,
            marginBottom: 30,
          }}
        >
          Vendor Dashboard 🛒
        </Text>


        {/* STATISTICS */}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:
              "space-between",
            marginBottom: 25,
          }}
        >

          {/* TODAY'S ORDERS */}

          <View
            style={{
              backgroundColor:
                "#2196F3",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* TODAY'S REVENUE */}

          <View
            style={{
              backgroundColor:
                "#4CAF50",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* THIS MONTH */}

          <View
            style={{
              backgroundColor:
                "#009688",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* LIFETIME */}

          <View
            style={{
              backgroundColor:
                "#673AB7",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* TOTAL ORDERS */}

          <View
            style={{
              backgroundColor:
                "#3F51B5",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* PENDING */}

          <View
            style={{
              backgroundColor:
                "#FF9800",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* REPEAT CUSTOMERS */}

          <View
            style={{
              backgroundColor:
                "#E91E63",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* VENDOR RANK */}

          <View
            style={{
              backgroundColor:
                "#795548",
              width: "48%",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >

            <Text
              style={{
                color: "white",
              }}
            >
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


          {/* AVERAGE RATING */}

          <View
            style={{
              backgroundColor:
                "#FFC107",
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
                ? `⭐ ${averageRating.toFixed(
                    1
                  )} (${totalReviews})`
                : "No Ratings Yet"}
            </Text>

          </View>


          {/* TOP SELLING PRODUCT */}

          <View
            style={{
              backgroundColor:
                "#ffffff",
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


        {/* ADD PRODUCT */}

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
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Add Product
          </Text>

        </TouchableOpacity>


        {/* VIEW ORDERS */}

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
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            View Orders
          </Text>

        </TouchableOpacity>


        {/* NOTIFICATIONS */}

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
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            🔔 Notifications
          </Text>

        </TouchableOpacity>


        {/* CUSTOMER REVIEWS */}

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
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            ⭐ Customer Reviews
          </Text>

        </TouchableOpacity>


        {/* SETTLEMENT HISTORY */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "VendorSettlement",
              {
                vendor,
              }
            )
          }
          style={{
            backgroundColor:
              "#00897B",
            padding: 18,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >

          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            💰 Settlement History
          </Text>

        </TouchableOpacity>


        {/* MY PROFILE */}

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
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            My Profile
          </Text>

        </TouchableOpacity>


        {/* MY PRODUCTS */}

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          My Products
        </Text>


        {products.length === 0 && (

          <Text
            style={{
              textAlign: "center",
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
                  fontWeight: "bold",
                }}
              >
                {
                  product.vegetable
                }
              </Text>


              <Text
                style={{
                  color: "green",
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

                {/* EDIT */}

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


                {/* DELETE */}

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


        {/* LOGOUT */}

        <TouchableOpacity
          onPress={performLogout}
          style={{
            backgroundColor:
              "#d32f2f",
            padding: 18,
            borderRadius: 12,
            marginBottom: 40,
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
            Logout
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );

}