import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    subscribeToOrders,
  } from "../services/orderService";
  
  export default function AdminVendorCollectionScreen({
    navigation,
  }: any) {
  
    const [vendors, setVendors] =
      useState<any[]>([]);
  
    useEffect(() => {
  
      const unsubscribe =
        subscribeToOrders(
          (orders: any[]) => {
  
            const vendorMap: any = {};
  
            orders.forEach((order) => {

              if (!order.vendorName) {
                return;
              }
  
                const vendor =
                  order.vendorName || "Unknown Vendor";
  
                const fee =
                  Number(
                    order.platformFee || 0
                  );
  
                if (!vendorMap[vendor]) {
  
                  vendorMap[vendor] = {
                    vendorName: vendor,
                    orders: 0,
                    platformFee: 0,
                  };
                }
  
                vendorMap[vendor].orders += 1;
  
                vendorMap[
                  vendor
                ].platformFee += fee;
              }
            );
  
            setVendors(
              Object.values(
                vendorMap
              )
            );
          }
        );
  
      return () =>
        unsubscribe();
  
    }, []);
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            "#f5f5f5",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Vendor Collection Report 💰
        </Text>
  
        <FlatList
          data={vendors}
          keyExtractor={(item, index) =>
            `${item.vendorName}-${index}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "VendorCollectionDetails",
                  {
                    vendorName:
                      item.vendorName,
                  }
                )
              }
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
            
            
              <Text
                style={{
                  fontSize: 22,
                  fontWeight:
                    "bold",
                }}
              >
                {item.vendorName}
              </Text>
  
              <Text
                style={{
                  marginTop: 10,
                }}
              >
                Orders:
                {" "}
                {item.orders}
              </Text>
  
              <Text
                style={{
                  color: "green",
                  fontWeight:
                    "bold",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Platform Fees:
                ₹{item.platformFee}
              </Text>
              </TouchableOpacity>
          )}
        />
      </View>
    );
  }