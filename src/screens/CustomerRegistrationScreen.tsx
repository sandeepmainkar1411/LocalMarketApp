import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebaseConfig";

import {
  saveSession,
} from "../services/sessionService";


export default function CustomerRegistrationScreen({
  navigation,
  route,
}: any) {

  const mobile =
    route?.params?.mobile;

  const [
    name,
    setName,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);


  const registerCustomer =
    async () => {

      const customerName =
        name.trim();

      if (!customerName) {

        Alert.alert(
          "Name Required",
          "Please enter your name."
        );

        return;
      }

      if (!mobile) {

        Alert.alert(
          "Error",
          "Mobile number is missing."
        );

        return;
      }


      try {

        setSaving(true);

        console.log(
          "================================"
        );

        console.log(
          "CUSTOMER REGISTRATION STARTED"
        );

        console.log(
          "Mobile:",
          mobile
        );

        console.log(
          "Name:",
          customerName
        );


        const now =
          new Date().toISOString();


        /*
         * Create the customer profile.
         *
         * IMPORTANT:
         * The mobile number is used as
         * the document ID.
         *
         * This prevents multiple customer
         * profiles being created for the
         * same mobile number.
         */

        const customerData = {

          customerName:
            customerName,

          mobile:
            mobile,

          createdAt:
            now,

          updatedAt:
            now,

        };


        await setDoc(

          doc(
            db,
            "customers",
            mobile
          ),

          customerData

        );


        console.log(
          "CUSTOMER PROFILE CREATED"
        );

        console.log(
          "Customer Document ID:",
          mobile
        );


        /*
         * Create/update the central users
         * record.
         *
         * The mobile number is also used
         * as the document ID here.
         */

        const userData = {

          mobile:
            mobile,

          name:
            customerName,

          active:
            true,

          approved:
            true,

          roles: {

            customer:
              true,

            vendor:
              false,

            agent:
              false,

            admin:
              false,

          },

          createdAt:
            now,

          updatedAt:
            now,

        };


        await setDoc(

          doc(
            db,
            "users",
            mobile
          ),

          userData

        );


        console.log(
          "USER RECORD CREATED/UPDATED"
        );


        /*
         * Build the profile that will be
         * stored in the login session.
         */

        const customerProfile = {

          id:
            mobile,

          ...customerData,

        };


        await saveSession({

          role:
            "Customer",

          mobile:
            mobile,

          profile:
            customerProfile,

          loginTime:
            now,

        });


        console.log(
          "CUSTOMER SESSION SAVED"
        );


        /*
         * Go directly to the
         * Customer Dashboard.
         */

        navigation.reset({

          index: 0,

          routes: [

            {

              name:
                "CustomerDashboard",

              params: {

                customer:
                  customerProfile,

              },

            },

          ],

        });


        console.log(
          "CUSTOMER REGISTRATION COMPLETE"
        );

        console.log(
          "================================"
        );

      }
      catch (error) {

        console.log(
          "CUSTOMER REGISTRATION ERROR:",
          error
        );

        Alert.alert(
          "Registration Failed",
          "Unable to create your Grovio account. Please try again."
        );

      }
      finally {

        setSaving(false);

      }

    };


  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#ffffff",
      }}
    >

      <Text
        style={{
          fontSize: 38,
          fontWeight: "bold",
          textAlign: "center",
          color: "#2E7D32",
        }}
      >
        GROVIO
      </Text>


      <Text
        style={{
          textAlign: "center",
          color: "gray",
          marginTop: 5,
          marginBottom: 45,
        }}
      >
        Fresh. Local. Delivered.
      </Text>


      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Create Your Account
      </Text>


      <Text
        style={{
          textAlign: "center",
          color: "gray",
          marginBottom: 35,
          fontSize: 16,
        }}
      >
        Welcome to Grovio!
      </Text>


      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Mobile Number
      </Text>


      <TextInput
        value={
          mobile || ""
        }
        editable={false}
        style={{
          borderWidth: 1,
          borderColor: "#dddddd",
          borderRadius: 10,
          padding: 15,
          fontSize: 18,
          backgroundColor: "#f5f5f5",
          marginBottom: 20,
        }}
      />


      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Your Name
      </Text>


      <TextInput
        value={
          name
        }
        onChangeText={
          setName
        }
        placeholder="Enter your name"
        autoCapitalize="words"
        style={{
          borderWidth: 1,
          borderColor: "#cccccc",
          borderRadius: 10,
          padding: 15,
          fontSize: 18,
        }}
      />


      <TouchableOpacity
        onPress={
          registerCustomer
        }
        disabled={
          saving
        }
        style={{
          marginTop: 30,
          backgroundColor:
            saving
              ? "#9E9E9E"
              : "#2E7D32",
          padding: 18,
          borderRadius: 12,
        }}
      >

        {saving ? (

          <ActivityIndicator
            color="#ffffff"
          />

        ) : (

          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Create Account
          </Text>

        )}

      </TouchableOpacity>

    </View>

  );

}