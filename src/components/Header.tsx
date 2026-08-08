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

export default function Header({
  navigation,
  title,
  userName,
}: any) {

  const performLogout = () => {

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

        backgroundColor:"#2E7D32",

        paddingTop:50,

        paddingBottom:20,

        paddingHorizontal:20,

        borderBottomLeftRadius:20,

        borderBottomRightRadius:20,

      }}
    >

      <View
        style={{

          flexDirection:"row",

          justifyContent:"space-between",

          alignItems:"center",

        }}
      >

        <View>

          <Text
            style={{
              color:"white",
              fontSize:16,
            }}
          >
            Welcome 👋
          </Text>

          <Text
            style={{
              color:"white",
              fontSize:24,
              fontWeight:"bold",
            }}
          >
            {userName || "User"}
          </Text>

        </View>

        <TouchableOpacity

          onPress={performLogout}

          style={{

            backgroundColor:"#ffffff",

            paddingHorizontal:20,

            paddingVertical:10,

            borderRadius:10,

          }}

        >

          <Text
            style={{
              color:"#2E7D32",
              fontWeight:"bold",
            }}
          >
            Logout
          </Text>

        </TouchableOpacity>

      </View>

      <Text
        style={{
          color:"white",
          fontSize:20,
          marginTop:15,
          fontWeight:"bold",
        }}
      >
        {title}
      </Text>

    </View>

  );

}