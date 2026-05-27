import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function VendorDashboardScreen({
  navigation,
}: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Vendor Dashboard 🛒
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VendorAddProduct")
        }
        style={{
          backgroundColor: "green",
          padding: 18,
          borderRadius: 12,
          marginBottom: 20,
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
          Manage Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VendorOrders")
        }
        style={{
          backgroundColor: "orange",
          padding: 18,
          borderRadius: 12,
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
    </View>
  );
}