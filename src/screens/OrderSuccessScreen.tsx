import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function OrderSuccessScreen({
  navigation,
  route,
}: any) {
  const customer =
    route?.params?.customer;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 80,
          marginBottom: 20,
        }}
      >
        ✅
      </Text>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Order Placed Successfully!
      </Text>

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "gray",
          lineHeight: 28,
          marginBottom: 40,
        }}
      >
        Your vegetable order has been
        {"\n"}
        sent to the vendor 🚚
        {"\n\n"}
        Estimated delivery:
        {"\n"}
        30 - 45 minutes
        {"\n\n"}
        Payment Mode:
        {"\n"}
        Cash on Delivery 💵
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "CustomerDashboard",
            {
              customer,
            }
          )
        }
        style={{
          backgroundColor: "green",
          paddingVertical: 18,
          paddingHorizontal: 40,
          borderRadius: 12,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}