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

import {
  getVendorRating,
} from "../services/ratingService";

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
    let unsubscribe: any;

    const loadData = async () => {
      const allVendors =
        await fetchVendors();

      const activeVendorNames =
        allVendors
          .filter(
            (vendor) =>
              vendor.active === true
          )
          .map(
            (vendor) =>
              vendor.vendorName
          );

      unsubscribe =
        subscribeToProducts(
          async (
            products: any[]
          ) => {
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

                        rating: 0,

                        totalReviews: 0,
                      }
                    );
                  }
                }
              }
            );

            const vendorArray =
              Array.from(
                vendorMap.values()
              );

            const updatedVendors =
              await Promise.all(
                vendorArray.map(
                  async (
                    vendor: any
                  ) => {
                    const ratingData =
                      await getVendorRating(
                        vendor.name
                      );

                    return {
                      ...vendor,
                      rating:
                        ratingData.average,
                      totalReviews:
                        ratingData.totalReviews,
                    };
                  }
                )
              );

            setVendors(
              updatedVendors
            );
          }
        );
    };

    loadData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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
                color: "#f39c12",
                marginTop: 5,
                fontWeight:
                  "bold",
                fontSize: 16,
              }}
            >
              ⭐{" "}
              {item.totalReviews >
              0
                ? item.rating.toFixed(
                    1
                  )
                : "New Vendor"}
              {"  "}
              ({item.totalReviews})
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