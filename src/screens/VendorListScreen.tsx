import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const vendors = [
  {
    id: "1",
    name: "Fresh Vegetable Market",
    category: "Fresh Vegetables",
    locality: "JB Nagar",
  },

  {
    id: "2",
    name: "Organic Veggie Store",
    category: "Organic Vegetables",
    locality: "Andheri",
  },

  {
    id: "3",
    name: "Farm Direct Market",
    category: "Farm Fresh Produce",
    locality: "Powai",
  },
];

export default function VendorListScreen({
  navigation,
  route,
}: any) {
  const selectedLocality =
    route?.params?.locality;

  const filteredVendors =
    vendors.filter(
      (vendor) =>
        vendor.locality ===
        selectedLocality
    );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
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

      {filteredVendors.length === 0 && (
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
        data={filteredVendors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "VendorDetails",
                {
                  vendor: item,
                }
              )
            }
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: "gray",
                marginTop: 5,
              }}
            >
              {item.category}
            </Text>

            <Text
              style={{
                color: "green",
                marginTop: 5,
                fontWeight: "bold",
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