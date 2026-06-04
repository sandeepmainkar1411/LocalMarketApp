import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function CustomerDashboardScreen({
  navigation,
  route,
}: any) {
  const customer =
    route?.params?.customer;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        Customer Dashboard
      </Text>

      {/* Browse Vendors */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "SelectLocality",
            {
              customer,
            }
          )
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
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Browse Local Vendors
        </Text>
      </TouchableOpacity>

      {/* My Orders */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "CustomerOrders",
            {
              customer,
            }
          )
        }
        style={{
          backgroundColor: "#0066cc",
          padding: 18,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          My Orders
        </Text>
      </TouchableOpacity>

      {/* Nearby Deals */}

      <TouchableOpacity
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
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          View Nearby Deals
        </Text>
      </TouchableOpacity>
    </View>
  );
}