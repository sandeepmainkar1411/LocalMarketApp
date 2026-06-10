import {
    View,
    Text,
    ScrollView,
  } from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    fetchOrders,
  } from "../services/orderService";
  
  export default function AdminRevenueDashboardScreen() {
    const [todayOrders, setTodayOrders] =
      useState(0);
  
    const [
      todayPlatformRevenue,
      setTodayPlatformRevenue,
    ] = useState(0);
  
    const [monthOrders, setMonthOrders] =
      useState(0);
  
    const [
      monthPlatformRevenue,
      setMonthPlatformRevenue,
    ] = useState(0);
  
    const [
      lifetimeOrders,
      setLifetimeOrders,
    ] = useState(0);
  
    const [
      lifetimePlatformRevenue,
      setLifetimePlatformRevenue,
    ] = useState(0);
  
    const [
      vendorSummary,
      setVendorSummary,
    ] = useState<any[]>([]);
  
    useEffect(() => {
      loadDashboard();
    }, []);
  
    const loadDashboard = async () => {
      const orders =
        await fetchOrders();
    
      const today =
        new Date();
    
      const vendorMap =
        new Map();
    
      let todayCount = 0;
      let todayRevenue = 0;
    
      let monthCount = 0;
      let monthRevenue = 0;
    
      let lifetimeRevenue = 0;
      let validOrderCount = 0;
    
      orders.forEach(
        (order: any) => {
    
          /* Ignore old test orders */
    
          if (
            !order.vendorName ||
            order.vendorName === ".com" ||
            !order.platformFee
          ) {
            return;
          }
    
          validOrderCount++;
    
          const orderDate =
            order.createdAt?.toDate
              ? order.createdAt.toDate()
              : new Date(
                  order.createdAt
                );
    
          const platformFee =
            Number(
              order.platformFee || 0
            );
    
          const subtotal =
            Number(
              order.subtotal || 0
            );
    
          lifetimeRevenue +=
            platformFee;
    
          if (
            orderDate.toDateString() ===
            today.toDateString()
          ) {
            todayCount++;
    
            todayRevenue +=
              platformFee;
          }
    
          if (
            orderDate.getMonth() ===
              today.getMonth() &&
            orderDate.getFullYear() ===
              today.getFullYear()
          ) {
            monthCount++;
    
            monthRevenue +=
              platformFee;
          }
    
          const vendorName =
            order.vendorName;
    
          if (
            !vendorMap.has(
              vendorName
            )
          ) {
            vendorMap.set(
              vendorName,
              {
                vendorName,
                orders: 0,
                vendorRevenue: 0,
                platformRevenue: 0,
              }
            );
          }
    
          const vendor =
            vendorMap.get(
              vendorName
            );
    
          vendor.orders++;
    
          vendor.vendorRevenue +=
            subtotal;
    
          vendor.platformRevenue +=
            platformFee;
        }
      );
    
      setTodayOrders(
        todayCount
      );
    
      setTodayPlatformRevenue(
        todayRevenue
      );
    
      setMonthOrders(
        monthCount
      );
    
      setMonthPlatformRevenue(
        monthRevenue
      );
    
      setLifetimeOrders(
        validOrderCount
      );
    
      setLifetimePlatformRevenue(
        lifetimeRevenue
      );
    
      setVendorSummary(
        Array.from(
          vendorMap.values()
        )
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
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 25,
            }}
          >
            📈 Revenue Dashboard
          </Text>
  
          {/* Platform Summary */}
  
          <View
            style={{
              backgroundColor:
                "#fff",
              padding: 20,
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Platform Summary
            </Text>
  
            <Text>
              Today's Orders:
              {todayOrders}
            </Text>
  
            <Text>
              Today's Revenue:
              ₹
              {
                todayPlatformRevenue
              }
            </Text>
  
            <Text
              style={{
                marginTop: 10,
              }}
            >
              Month Orders:
              {monthOrders}
            </Text>
  
            <Text>
              Month Revenue:
              ₹
              {
                monthPlatformRevenue
              }
            </Text>
  
            <Text
              style={{
                marginTop: 10,
              }}
            >
              Lifetime Orders:
              {lifetimeOrders}
            </Text>
  
            <Text>
              Lifetime Revenue:
              ₹
              {
                lifetimePlatformRevenue
              }
            </Text>
          </View>
  
          {/* Vendor Settlement */}
  
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Vendor Settlement
          </Text>
  
          {vendorSummary.map(
            (vendor) => (
              <View
                key={
                  vendor.vendorName
                }
                style={{
                  backgroundColor:
                    "#fff",
                  padding: 15,
                  borderRadius: 12,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight:
                      "bold",
                  }}
                >
                  {
                    vendor.vendorName
                  }
                </Text>
  
                <Text>
                  Orders:
                  {
                    vendor.orders
                  }
                </Text>
  
                <Text>
                  Vendor Revenue:
                  ₹
                  {
                    vendor.vendorRevenue
                  }
                </Text>
  
                <Text
                  style={{
                    color: "red",
                    fontWeight:
                      "bold",
                  }}
                >
                  Platform Fee Due:
                  ₹
                  {
                    vendor.platformRevenue
                  }
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    );
  }