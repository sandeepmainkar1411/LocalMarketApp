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
    marathi: "टोमॅटो",
    price: 40,
    unit: "KG",
  },

  {
    id: "2",
    name: "Potato",
    marathi: "बटाटा",
    price: 30,
    unit: "KG",
  },

  {
    id: "3",
    name: "Onion",
    marathi: "कांदा",
    price: 35,
    unit: "KG",
  },

  {
    id: "4",
    name: "Carrot",
    marathi: "गाजर",
    price: 60,
    unit: "KG",
  },
];

export default function VendorDetailsScreen({
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
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
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
              borderRadius: 12,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {item.marathi}
            </Text>

            <Text
              style={{
                fontSize: 22,
                color: "green",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              ₹{item.price} / {item.unit}
            </Text>

            <Text
              style={{
                color: "gray",
                marginBottom: 20,
                fontSize: 16,
              }}
            >
              Fresh & Organic
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cart")
              }
              style={{
                backgroundColor: "green",
                paddingVertical: 14,
                borderRadius: 10,
                width: 120,
                alignSelf: "flex-end",
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
                Add
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}