import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  logout,
} from "../services/authService";

import {
  clearSession,
} from "../services/sessionService";

export default function CustomerDashboardScreen({
  navigation,
  route,
}: any) {

  const customer =
    route?.params?.customer;

    const performLogout = async () => {

      Alert.alert(
    
        "Logout",
    
        "Are you sure you want to logout?",
    
        [
    
          {
            text: "Cancel",
            style: "cancel",
          },
    
          {
    
            text: "Logout",
    
            style: "destructive",
    
            onPress: async () => {
    
              await clearSession();
    
              await logout();
    
              navigation.reset({
    
                index: 0,
    
                routes: [
    
                  {
                    name: "Login",
                  },
    
                ],
    
              });
    
            },
    
          },
    
        ]
    
      );
    
    };

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

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "CustomerProfileView",
            {
              customer,
            }
          )
        }
        style={{
          backgroundColor: "#6a1b9a",
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
          My Profile
        </Text>
      </TouchableOpacity>

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

      <TouchableOpacity
        onPress={performLogout}
        style={{
          backgroundColor:"#d32f2f",
          padding:18,
          borderRadius:12,
          marginTop:20,
        }}
      >

        <Text
          style={{
            color:"white",
            textAlign:"center",
            fontWeight:"bold",
            fontSize:20,
          }}
        >
          Logout
        </Text>

      </TouchableOpacity>

    </View>

  );

}