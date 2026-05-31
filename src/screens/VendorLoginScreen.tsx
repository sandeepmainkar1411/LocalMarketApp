import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function VendorLoginScreen({
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
          marginBottom: 20,
        }}
      >
        Vendor Login 🛒
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "gray",
          marginBottom: 40,
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        Manage your vegetables, prices,
        {"\n"}
        and customer orders easily 🚀
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VendorTerms")
        }
        style={{
          backgroundColor: "green",
          padding: 18,
          borderRadius: 12,
          marginBottom: 20,
          elevation: 3,
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
          Continue as Vendor
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          color: "gray",
          fontSize: 14,
        }}
      >
        Store Timing: 8 AM – 8 PM
      </Text>
    </View>
  );
}