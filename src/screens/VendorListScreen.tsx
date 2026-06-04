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
  subscribeToProducts,
} from "../services/productService";

import {
  fetchVendors,
} from "../services/vendorService";

export default function VendorListScreen({
  navigation,
  route,
}: any) {
  const selectedLocality =
    route?.params?.locality;

    const customer =
      route?.params?.customer;

  const [vendors, setVendors] =
    useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const allVendors =
        await fetchVendors();

      const activeVendorNames =
        allVendors
          .filter(
            (vendor) =>
              vendor.active ===
              true
          )
          .map(
            (vendor) =>
              vendor.vendorName
          );

      const unsubscribe =
        subscribeToProducts(
          (products: any[]) => {
            const vendorMap =
              new Map();

            products.forEach(
              (product) => {
                if (
                  product.available ===
                    true &&
                  product.locality ===
                    selectedLocality &&
                  activeVendorNames.includes(
                    product.vendorName
                  )
                ) {
                  if (
                    !vendorMap.has(
                      product.vendorName
                    )
                  ) {
                    vendorMap.set(
                      product.vendorName,
                      {
                        name:
                          product.vendorName,

                        locality:
                          product.locality,
                      }
                    );
                  }
                }
              }
            );

            setVendors(
              Array.from(
                vendorMap.values()
              )
            );
          }
        );

      return unsubscribe;
    };

    loadData();
  }, [selectedLocality]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor:
          "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Vegetable Vendors
      </Text>

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "gray",
          marginBottom: 20,
        }}
      >
        📍 {selectedLocality}
      </Text>

      {vendors.length === 0 && (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "red",
            marginTop: 40,
          }}
        >
          No vendors available in
          this locality
        </Text>
      )}

      <FlatList
        data={vendors}
        keyExtractor={(
          item,
          index
        ) =>
          `${item.name}-${index}`
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "VendorDetails",
                {
                  vendor: item,
                  customer,
                }
              )
            }

            style={{
              backgroundColor:
                "#fff",
              padding: 20,
              borderRadius: 10,
              marginBottom: 15,
              borderWidth: 1,
              borderColor:
                "#ddd",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight:
                  "bold",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: "green",
                marginTop: 5,
                fontWeight:
                  "bold",
              }}
            >
              📍 {item.locality}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}