import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const vegetables = [
  {
    id: "1",
    name: "Tomato",
    price: "₹40 / kg",
  },
  {
    id: "2",
    name: "Potato",
    price: "₹30 / kg",
  },
  {
    id: "3",
    name: "Onion",
    price: "₹35 / kg",
  },
  {
    id: "4",
    name: "Carrot",
    price: "₹60 / kg",
  },
];

export default function VendorDetailsScreen() {
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
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Fresh Vegetable Market 🥬
      </Text>

      <FlatList
        data={vegetables}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              borderRadius: 15,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: "#e5e5e5",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
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
                marginTop: 5,
                color: "green",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {item.price}
            </Text>

            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "gray",
                }}
              >
                Fresh & Organic
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}