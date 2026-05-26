import { View, Text, TouchableOpacity } from "react-native";

export default function CustomerDashboardScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Customer Dashboard
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("VendorList")}
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Browse Local Vendors
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "orange",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          View Nearby Deals
        </Text>
      </TouchableOpacity>
    </View>
  );
}