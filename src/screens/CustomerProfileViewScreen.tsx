import {
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
  
  export default function CustomerProfileViewScreen({
    route,
    navigation,
  }: any) {
    const customer =
      route?.params?.customer;
  
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
            marginBottom: 40,
          }}
        >
          My Profile
        </Text>
  
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 15,
            }}
          >
            👤 Name:{" "}
            {customer?.customerName}
          </Text>
  
          <Text
            style={{
              fontSize: 20,
            }}
          >
            📞 Mobile:{" "}
            {customer?.mobile}
          </Text>
        </View>
  
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={{
            backgroundColor: "#0066cc",
            padding: 18,
            borderRadius: 12,
            marginTop: 30,
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
            Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }