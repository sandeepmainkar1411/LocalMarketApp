import React from "react";

import {
  TouchableOpacity,
  View,
  Text,
} from "react-native";

export default function DashboardCard({
  title,
  subtitle,
  color,
  onPress,
}: any) {

  return (

    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{

        backgroundColor:
          color || "#2E7D32",

        borderRadius:18,

        padding:20,

        marginBottom:18,

        elevation:4,

      }}
    >

      <Text
        style={{

          color:"white",

          fontSize:22,

          fontWeight:"bold",

        }}
      >
        {title}
      </Text>

      <Text
        style={{

          color:"white",

          marginTop:8,

          fontSize:15,

          opacity:0.9,

        }}
      >
        {subtitle}
      </Text>

    </TouchableOpacity>

  );

}