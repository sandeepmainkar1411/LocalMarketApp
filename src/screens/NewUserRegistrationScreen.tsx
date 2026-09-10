import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function NewUserRegistrationScreen({
  navigation,
  route,
}: any) {

  const mobile =
    route?.params?.mobile;


  const continueAsCustomer =
    () => {

      navigation.navigate(
        "CustomerRegistration",
        {
          mobile,
        }
      );

    };


  const continueAsVendor =
    () => {

      navigation.navigate(
        "VendorTerms",
        {
          mobile,
        }
      );

    };


  return (

    <View
      style={
        styles.container
      }
    >

      <Text
        style={
          styles.logo
        }
      >
        GROVIO
      </Text>


      <Text
        style={
          styles.tagline
        }
      >
        Fresh. Local. Delivered.
      </Text>


      <Text
        style={
          styles.title
        }
      >
        Welcome to Grovio
      </Text>


      <Text
        style={
          styles.subtitle
        }
      >
        What would you like to do?
      </Text>


      <TouchableOpacity
        style={
          styles.customerButton
        }
        onPress={
          continueAsCustomer
        }
        activeOpacity={0.85}
      >

        <Text
          style={
            styles.icon
          }
        >
          🛒
        </Text>


        <View
          style={
            styles.buttonContent
          }
        >

          <Text
            style={
              styles.buttonTitle
            }
          >
            Continue as Customer
          </Text>


          <Text
            style={
              styles.buttonSubtitle
            }
          >
            Shop fresh products
            from local vendors
          </Text>

        </View>

      </TouchableOpacity>


      <TouchableOpacity
        style={
          styles.vendorButton
        }
        onPress={
          continueAsVendor
        }
        activeOpacity={0.85}
      >

        <Text
          style={
            styles.icon
          }
        >
          🏪
        </Text>


        <View
          style={
            styles.buttonContent
          }
        >

          <Text
            style={
              styles.buttonTitle
            }
          >
            Sell on Grovio
          </Text>


          <Text
            style={
              styles.buttonSubtitle
            }
          >
            Register as a vendor
          </Text>


          <Text
            style={
              styles.approvalText
            }
          >
            Admin approval required
          </Text>

        </View>

      </TouchableOpacity>


      <Text
        style={
          styles.mobileText
        }
      >
        Mobile: {mobile}
      </Text>

    </View>

  );

}


const styles =
  StyleSheet.create({

    container: {

      flex: 1,

      justifyContent:
        "center",

      padding: 25,

      backgroundColor:
        "#ffffff",

    },


    logo: {

      fontSize: 38,

      fontWeight:
        "bold",

      textAlign:
        "center",

      color:
        "#2E7D32",

    },


    tagline: {

      textAlign:
        "center",

      color:
        "gray",

      marginBottom:
        50,

    },


    title: {

      fontSize: 28,

      fontWeight:
        "bold",

      textAlign:
        "center",

      color:
        "#212121",

    },


    subtitle: {

      fontSize: 17,

      textAlign:
        "center",

      color:
        "gray",

      marginTop: 8,

      marginBottom: 35,

    },


    customerButton: {

      flexDirection:
        "row",

      alignItems:
        "center",

      backgroundColor:
        "#2E7D32",

      padding: 20,

      borderRadius:
        16,

      marginBottom:
        20,

      elevation: 4,

    },


    vendorButton: {

      flexDirection:
        "row",

      alignItems:
        "center",

      backgroundColor:
        "#1565C0",

      padding: 20,

      borderRadius:
        16,

      elevation: 4,

    },


    icon: {

      fontSize: 35,

      marginRight: 18,

    },


    buttonContent: {

      flex: 1,

    },


    buttonTitle: {

      color:
        "#ffffff",

      fontSize: 20,

      fontWeight:
        "bold",

    },


    buttonSubtitle: {

      color:
        "#ffffff",

      fontSize: 14,

      marginTop: 5,

      opacity: 0.9,

    },


    approvalText: {

      color:
        "#ffffff",

      fontSize: 13,

      fontWeight:
        "bold",

      marginTop: 7,

    },


    mobileText: {

      textAlign:
        "center",

      color:
        "#999999",

      fontSize: 13,

      marginTop: 30,

    },

  });