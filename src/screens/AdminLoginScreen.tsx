import {
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
  
  export default function AdminLoginScreen({
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
          Admin Login 👨‍💼
        </Text>
  
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: 40,
          }}
        >
          Manage Vendors, Orders,
          Complaints & Statistics
        </Text>
  
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "AdminDashboard"
            )
          }
          style={{
            backgroundColor: "#222",
            padding: 18,
            borderRadius: 12,
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
            Continue as Admin
          </Text>
        </TouchableOpacity>
      </View>
    );
  }