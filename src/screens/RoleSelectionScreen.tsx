import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  getUserByMobile,
} from "../services/userService";

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

  const mobile =
    route?.params?.mobile;

  const [
    user,
    setUser,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    try {

      if (!mobile) {

        Alert.alert(
          "Error",
          "Mobile number is missing."
        );

        navigation.goBack();

        return;
      }

      console.log(
        "Loading user:",
        mobile
      );

      const result =
        await getUserByMobile(
          mobile
        );

      console.log(
        "User from Firestore:",
        result
      );

      if (!result) {

        Alert.alert(
          "Error",
          "User account not found."
        );

        navigation.goBack();

        return;
      }

      setUser(result);

    } catch (error) {

      console.log(
        "Load User Error:",
        error
      );

      Alert.alert(
        "Error",
        "Unable to load user details."
      );

      navigation.goBack();

    } finally {

      setLoading(false);

    }
  };


  const roles =
    user?.roles || {};


  const openCustomer =
    async () => {

      try {

        const customer =
          await getCustomerProfile(
            mobile
          );

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
              name:
                "CustomerDashboard",

              params: {
                customer,
              },
            },

          ],

        });

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Unable to open Customer Dashboard."
        );

      }
    };


  const openVendor =
    async () => {

      try {

        const vendor =
          await getVendorProfile(
            mobile
          );

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
                mobile,
              },
            },
          ],

        });

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Unable to open Vendor Dashboard."
        );

      }
    };


  const openAgent =
    async () => {

      try {

        const agent =
          await getAgentProfile(
            mobile
          );

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
              name:
                "AgentOrders",

              params: {
                agent,
              },
            },

          ],

        });

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Unable to open Agent Dashboard."
        );

      }
    };


  const openAdmin =
    async () => {

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
              name:
                "AdminDashboard",
            },

          ],

        });

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Unable to open Admin Dashboard."
        );

      }
    };


  /*
   * OPEN ADMIN LOGIN
   *
   * This is separate from the
   * Firestore user-role system.
   */

  const openAdminLogin = () => {

    navigation.navigate(
      "AdminLogin"
    );

  };


  if (loading) {

    return (

      <View
        style={
          styles.loadingContainer
        }
      >

        <Text
          style={
            styles.loadingTitle
          }
        >
          GROVIO
        </Text>

        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Loading your roles...
        </Text>

      </View>

    );
  }


  return (

    <View
      style={styles.container}
    >

      <Text
        style={styles.title}
      >
        Welcome to Grovio
      </Text>

      <Text
        style={styles.subTitle}
      >
        Choose your role
      </Text>


      {roles.customer === true && (

        <TouchableOpacity
          style={
            styles.customerButton
          }
          onPress={
            openCustomer
          }
        >

          <Text
            style={styles.buttonText}
          >
            Continue as Customer
          </Text>

        </TouchableOpacity>

      )}


      {roles.vendor === true && (

        <TouchableOpacity
          style={
            styles.vendorButton
          }
          onPress={
            openVendor
          }
        >

          <Text
            style={styles.buttonText}
          >
            Continue as Vendor
          </Text>

        </TouchableOpacity>

      )}


      {roles.agent === true && (

        <TouchableOpacity
          style={
            styles.agentButton
          }
          onPress={
            openAgent
          }
        >

          <Text
            style={styles.buttonText}
          >
            Continue as Agent
          </Text>

        </TouchableOpacity>

      )}


      {roles.admin === true && (

        <TouchableOpacity
          style={
            styles.adminButton
          }
          onPress={
            openAdmin
          }
        >

          <Text
            style={styles.buttonText}
          >
            Continue as Admin
          </Text>

        </TouchableOpacity>

      )}


      {!roles.customer &&
        !roles.vendor &&
        !roles.agent &&
        !roles.admin && (

        <Text
          style={styles.noRoleText}
        >
          No roles are assigned
          to this account.
        </Text>

      )}


      {/* ADMIN LOGIN */}

      <TouchableOpacity
        style={
          styles.adminLoginButton
        }
        onPress={
          openAdminLogin
        }
      >

        <Text
          style={
            styles.adminLoginText
          }
        >
          Admin Login
        </Text>

      </TouchableOpacity>


    </View>

  );
}


const styles = StyleSheet.create({

  loadingContainer: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor:
      "#ffffff",

  },

  loadingTitle: {

    fontSize: 34,

    fontWeight: "bold",

    color: "#2E7D32",

    marginBottom: 30,

  },

  loadingText: {

    marginTop: 15,

    color: "gray",

    fontSize: 16,

  },

  container: {

    flex: 1,

    justifyContent: "center",

    padding: 20,

    backgroundColor:
      "#ffffff",

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

    backgroundColor:
      "#2E7D32",

    padding: 18,

    borderRadius: 12,

    marginBottom: 20,

  },

  vendorButton: {

    backgroundColor:
      "#1565C0",

    padding: 18,

    borderRadius: 12,

    marginBottom: 20,

  },

  agentButton: {

    backgroundColor:
      "#673AB7",

    padding: 18,

    borderRadius: 12,

    marginBottom: 20,

  },

  adminButton: {

    backgroundColor:
      "#212121",

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

  noRoleText: {

    textAlign: "center",

    color: "#D32F2F",

    fontSize: 16,

    marginTop: 10,

  },

  adminLoginButton: {

    marginTop: 25,

    padding: 15,

    borderRadius: 10,

    borderWidth: 2,

    borderColor: "#212121",

    backgroundColor: "#ffffff",

  },

  adminLoginText: {

    color: "#212121",

    fontSize: 18,

    fontWeight: "bold",

    textAlign: "center",

  },

});