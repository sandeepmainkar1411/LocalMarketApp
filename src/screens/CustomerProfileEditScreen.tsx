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
  updateCustomer,
} from "../services/customerService";

import {
  saveSession,
} from "../services/sessionService";


export default function CustomerProfileEditScreen({
  route,
  navigation,
}: any) {

  const customer =
    route?.params?.customer;


  const [
    customerName,
    setCustomerName,
  ] = useState(
    customer?.customerName || ""
  );


  const [
    saving,
    setSaving,
  ] = useState(false);


  const saveProfile =
    async () => {

      const updatedName =
        customerName.trim();


      /*
       * Validation
       */

      if (!updatedName) {

        Alert.alert(
          "Validation",
          "Please enter your name."
        );

        return;
      }


      if (!customer?.mobile) {

        Alert.alert(
          "Error",
          "Customer mobile number is missing."
        );

        return;
      }


      try {

        setSaving(true);


        console.log(
          "================================"
        );

        console.log(
          "CUSTOMER PROFILE UPDATE STARTED"
        );

        console.log(
          "Mobile:",
          customer.mobile
        );

        console.log(
          "Old Name:",
          customer.customerName
        );

        console.log(
          "New Name:",
          updatedName
        );


        /*
         * STEP 1
         * Update Firestore customer record.
         */

        const success =
          await updateCustomer(
            customer.mobile,
            {
              customerName:
                updatedName,
            }
          );


        console.log(
          "FIRESTORE UPDATE RESULT:",
          success
        );


        if (!success) {

          Alert.alert(
            "Update Failed",
            "Unable to update your profile."
          );

          return;
        }


        /*
         * STEP 2
         * Build updated customer object.
         */

        const updatedCustomer = {

          ...customer,

          id:
            customer.mobile,

          firestoreId:
            customer.mobile,

          customerName:
            updatedName,

          mobile:
            customer.mobile,

        };


        /*
         * STEP 3
         * Update the saved login session.
         *
         * This is important because the
         * Splash screen uses the saved
         * session after app reload.
         */

        const sessionUpdated =
          await saveSession({

            role:
              "Customer",

            mobile:
              customer.mobile,

            profile:
              updatedCustomer,

            loginTime:
              new Date().toISOString(),

          });


        console.log(
          "SESSION UPDATE RESULT:",
          sessionUpdated
        );


        /*
         * STEP 4
         * Show success message.
         */

        Alert.alert(
          "Success",
          "Profile Updated",
          [
            {
              text: "OK",

              onPress: () => {

                /*
                 * Return to Customer Profile.
                 *
                 * We pass the updated customer
                 * so the screen immediately
                 * displays the new name.
                 */

                navigation.navigate(
                  "CustomerProfileView",
                  {
                    customer:
                      updatedCustomer,
                  }
                );

              },
            },
          ]
        );


        console.log(
          "CUSTOMER PROFILE UPDATE COMPLETE"
        );

        console.log(
          "================================"
        );

      }
      catch (error) {

        console.log(
          "CUSTOMER PROFILE UPDATE ERROR:",
          error
        );


        Alert.alert(
          "Error",
          "Something went wrong while updating your profile."
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
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Edit Profile
      </Text>


      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Mobile Number
      </Text>


      <TextInput
        value={
          customer?.mobile || ""
        }
        editable={false}
        style={{
          backgroundColor: "#eeeeee",
          borderWidth: 1,
          borderColor: "#dddddd",
          borderRadius: 10,
          padding: 15,
          fontSize: 17,
          marginBottom: 20,
        }}
      />


      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Customer Name
      </Text>


      <TextInput
        value={
          customerName
        }
        onChangeText={
          setCustomerName
        }
        placeholder="Enter your name"
        autoCapitalize="words"
        style={{
          backgroundColor: "#ffffff",
          borderWidth: 1,
          borderColor: "#dddddd",
          borderRadius: 10,
          padding: 15,
          fontSize: 17,
          marginBottom: 20,
        }}
      />


      <TouchableOpacity
        onPress={
          saveProfile
        }
        disabled={
          saving
        }
        style={{
          backgroundColor:
            saving
              ? "#9E9E9E"
              : "#2E7D32",

          padding: 18,

          borderRadius: 10,
        }}
      >

        {saving ? (

          <ActivityIndicator
            color="#ffffff"
          />

        ) : (

          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Save Changes
          </Text>

        )}

      </TouchableOpacity>


      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }
        disabled={
          saving
        }
        style={{
          backgroundColor: "#757575",
          padding: 18,
          borderRadius: 10,
          marginTop: 15,
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
          Cancel
        </Text>

      </TouchableOpacity>

    </View>
  );
}