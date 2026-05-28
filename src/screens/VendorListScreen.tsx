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
}: any) {
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
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Vegetable Vendors
      </Text>

      <FlatList
        data={vendors}
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}