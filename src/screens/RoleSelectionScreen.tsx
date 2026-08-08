import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  getCustomerProfile,
  getVendorProfile,
  getAgentProfile,
} from "../services/profileService";

import {
  saveSession,
} from "../services/sessionService";

export default function RoleSelectionScreen({
  navigation,
  route,
}: any) {

  const user = route?.params?.user;

  const mobile = user?.mobile;

  const roles = user?.roles || {};

  const openCustomer = async () => {

    try {

      const customer =
        await getCustomerProfile(mobile);

      if (!customer) {

        navigation.navigate(
          "CustomerProfile",
          {
            mobile,
          }
        );

        return;

      }

      await saveSession({

        role: "Customer",

        mobile,

        profile: customer,

        loginTime:
          new Date().toISOString(),

      });

      navigation.reset({

        index: 0,

        routes: [

          {

            name: "CustomerDashboard",

            params: {

              customer,

            },

          },

        ],

      });

    }
    catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Unable to open Customer Dashboard."
      );

    }

  };

  const openVendor = async () => {

    try {

      const vendor =
        await getVendorProfile(mobile);

      if (!vendor) {

        Alert.alert(
          "Vendor profile not found."
        );

        return;

      }

      await saveSession({

        role: "Vendor",

        mobile,

        profile: vendor,

        loginTime:
          new Date().toISOString(),

      });

      navigation.reset({

        index: 0,

        routes: [

          {

            name: "VendorDashboard",

            params: {

              vendor,

            },

          },

        ],

      });

    }
    catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Unable to open Vendor Dashboard."
      );

    }

  };

  const openAgent = async () => {

    try {

      const agent =
        await getAgentProfile(mobile);

      if (!agent) {

        Alert.alert(
          "Agent profile not found."
        );

        return;

      }

      await saveSession({

        role: "Agent",

        mobile,

        profile: agent,

        loginTime:
          new Date().toISOString(),

      });

      navigation.reset({

        index: 0,

        routes: [

          {

            name: "AgentOrders",

            params: {

              agent,

            },

          },

        ],

      });

    }
    catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Unable to open Agent Dashboard."
      );

    }

  };

  const openAdmin = async () => {

    try {

      await saveSession({

        role: "Admin",

        mobile,

        profile: null,

        loginTime:
          new Date().toISOString(),

      });

      navigation.reset({

        index: 0,

        routes: [

          {

            name: "AdminDashboard",

          },

        ],

      });

    }
    catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Unable to open Admin Dashboard."
      );

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome to Grovio
      </Text>

      <Text
        style={styles.subTitle}
      >
        Choose your role
      </Text>

      {roles.Customer && (

        <TouchableOpacity
          style={styles.customerButton}
          onPress={openCustomer}
        >

          <Text style={styles.buttonText}>
            Continue as Customer
          </Text>

        </TouchableOpacity>

      )}

      {roles.Vendor && (

        <TouchableOpacity
          style={styles.vendorButton}
          onPress={openVendor}
        >

          <Text style={styles.buttonText}>
            Continue as Vendor
          </Text>

        </TouchableOpacity>

      )}

      {roles.Agent && (

        <TouchableOpacity
          style={styles.agentButton}
          onPress={openAgent}
        >

          <Text style={styles.buttonText}>
            Continue as Agent
          </Text>

        </TouchableOpacity>

      )}

      {roles.Admin && (

        <TouchableOpacity
          style={styles.adminButton}
          onPress={openAdmin}
        >

          <Text style={styles.buttonText}>
            Continue as Admin
          </Text>

        </TouchableOpacity>

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    padding: 20,

    backgroundColor: "#ffffff",

  },

  title: {

    fontSize: 34,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 10,

  },

  subTitle: {

    textAlign: "center",

    color: "gray",

    marginBottom: 40,

    fontSize: 18,

  },

  customerButton: {

    backgroundColor: "#2E7D32",

    padding: 18,

    borderRadius: 12,

    marginBottom: 20,

  },

  vendorButton: {

    backgroundColor: "#1565C0",

    padding: 18,

    borderRadius: 12,

    marginBottom: 20,

  },

  agentButton: {

    backgroundColor: "#673AB7",

    padding: 18,

    borderRadius: 12,

    marginBottom: 20,

  },

  adminButton: {

    backgroundColor: "#212121",

    padding: 18,

    borderRadius: 12,

    marginBottom: 20,

  },

  buttonText: {

    color: "#ffffff",

    fontSize: 20,

    fontWeight: "bold",

    textAlign: "center",

  },

});