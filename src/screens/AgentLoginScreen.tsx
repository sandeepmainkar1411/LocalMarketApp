import React, {
    useState,
  } from "react";
  
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
  } from "react-native";
  
  import {
    getAgentByMobile,
  } from "../services/agentService";
  
  export default function AgentLoginScreen({
    navigation,
  }: any) {
  
    const [phone, setPhone] =
      useState("");
  
    const handleLogin =
      async () => {
  
        const mobile =
          phone.trim();
  
        if (
          mobile.length !== 10
        ) {
          Alert.alert(
            "Invalid Mobile Number",
            "Please enter a valid 10-digit mobile number."
          );
          return;
        }
  
        const agent =
          await getAgentByMobile(
            mobile
          );
  
        if (!agent) {
  
          Alert.alert(
            "Not Found",
            "Agent not registered."
          );
  
          return;
        }
  
        if (
          agent.active !== true
        ) {
  
          Alert.alert(
            "Inactive Agent",
            "Agent account is disabled."
          );
  
          return;
        }
  
        navigation.navigate(
          "AgentOrders",
          {
            agent,
          }
        );
      };
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            "#F5F7FA",
        }}
      >
        <StatusBar
          barStyle="dark-content"
        />
  
        <View
          style={{
            flex: 1,
            justifyContent:
              "center",
            paddingHorizontal: 25,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              textAlign:
                "center",
              marginBottom: 10,
            }}
          >
            Agent Login 🚚
          </Text>
  
          <Text
            style={{
              textAlign:
                "center",
              color: "gray",
              marginBottom: 40,
            }}
          >
            Login using your
            registered mobile
            number
          </Text>
  
          <Text
            style={{
              marginBottom: 8,
              fontWeight: "600",
            }}
          >
            Mobile Number
          </Text>
  
          <View
            style={{
              flexDirection:
                "row",
              alignItems:
                "center",
              backgroundColor:
                "#fff",
              borderWidth: 1,
              borderColor:
                "#D1D5DB",
              borderRadius: 12,
              paddingHorizontal: 15,
              height: 58,
            }}
          >
            <Text
              style={{
                marginRight: 10,
                fontWeight:
                  "bold",
              }}
            >
              +91
            </Text>
  
            <TextInput
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={(
                text
              ) =>
                setPhone(
                  text.replace(
                    /[^0-9]/g,
                    ""
                  )
                )
              }
              style={{
                flex: 1,
              }}
            />
          </View>
  
          <TouchableOpacity
            onPress={
              handleLogin
            }
            style={{
              backgroundColor:
                "#673AB7",
              height: 56,
              borderRadius: 12,
              justifyContent:
                "center",
              alignItems:
                "center",
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color:
                  "white",
                fontWeight:
                  "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }