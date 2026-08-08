import React, {
    useEffect,
  } from "react";
  
  import {
    View,
    Text,
    ActivityIndicator,
  } from "react-native";
  
  import {
    getSession,
  } from "../services/sessionService";
  
  export default function SplashScreen({
    navigation,
  }: any) {
  
    useEffect(() => {
  
      checkSession();
  
    }, []);
  
    const checkSession =
      async () => {
  
        const session =
          await getSession();
  
        console.log(
          "Saved Session:",
          session
        );
  
        if (!session) {
  
          navigation.replace(
            "Login"
          );
  
          return;
  
        }
  
        switch (
          session.role
        ) {
  
          case "Customer":
  
            navigation.reset({
  
              index: 0,
  
              routes: [
  
                {
  
                  name:
                    "CustomerDashboard",
  
                  params: {
  
                    customer:
                      session.profile,
  
                  },
  
                },
  
              ],
  
            });
  
            break;
  
          case "Vendor":
  
            navigation.reset({
  
              index: 0,
  
              routes: [
  
                {
  
                  name:
                    "VendorDashboard",
  
                  params: {
  
                    vendor:
                      session.profile,
  
                  },
  
                },
  
              ],
  
            });
  
            break;
  
          case "Agent":
  
            navigation.reset({
  
              index: 0,
  
              routes: [
  
                {
  
                  name:
                    "AgentOrders",
  
                  params: {
  
                    agent:
                      session.profile,
  
                  },
  
                },
  
              ],
  
            });
  
            break;
  
          case "Admin":
  
            navigation.reset({
  
              index: 0,
  
              routes: [
  
                {
  
                  name:
                    "AdminDashboard",
  
                },
  
              ],
  
            });
  
            break;
  
          default:
  
            navigation.replace(
              "Login"
            );
  
        }
  
      };
  
    return (
  
      <View
        style={{
  
          flex:1,
  
          justifyContent:"center",
  
          alignItems:"center",
  
          backgroundColor:"#ffffff",
  
        }}
      >
  
        <Text
          style={{
  
            fontSize:34,
  
            fontWeight:"bold",
  
            color:"#2E7D32",
  
          }}
        >
          GROVIO
        </Text>
  
        <Text
          style={{
  
            color:"gray",
  
            marginTop:10,
  
            marginBottom:30,
  
          }}
        >
          Fresh. Local. Delivered.
        </Text>
  
        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />
  
      </View>
  
    );
  
  }