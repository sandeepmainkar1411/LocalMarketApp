import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RoleSelectionScreen from "../screens/RoleSelectionScreen";
import CustomerLoginScreen from "../screens/CustomerLoginScreen";
import VendorLoginScreen from "../screens/VendorLoginScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";

import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import CustomerOrdersScreen from "../screens/CustomerOrdersScreen";

import VendorListScreen from "../screens/VendorListScreen";
import VendorDetailsScreen from "../screens/VendorDetailsScreen";

import VendorDashboardScreen from "../screens/VendorDashboardScreen";
import VendorAddProductScreen from "../screens/VendorAddProductScreen";
import VendorOrdersScreen from "../screens/VendorOrdersScreen";

import CartScreen from "../screens/CartScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import VendorEditProductScreen from "../screens/VendorEditProductScreen";
import SelectLocalityScreen from "../screens/SelectLocalityScreen";
import VendorProfileScreen from "../screens/VendorProfileScreen";
import VendorTermsScreen from "../screens/VendorTermsScreen";
import VendorMobileLookupScreen from "../screens/VendorMobileLookupScreen";

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* ROLE SELECTION */}
      <Stack.Screen
        name="RoleSelection"
        component={
          RoleSelectionScreen
        }
      />

      {/* CUSTOMER */}
      <Stack.Screen
        name="CustomerLogin"
        component={
          CustomerLoginScreen
        }
      />

      <Stack.Screen
        name="CustomerDashboard"
        component={
          CustomerDashboardScreen
        }
      />

      <Stack.Screen
        name="CustomerOrders"
        component={
          CustomerOrdersScreen
        }
      />

      <Stack.Screen
        name="SelectLocality"
         component={
           SelectLocalityScreen
         }
      />

      {/* VENDOR */}
      <Stack.Screen
        name="VendorLogin"
        component={
          VendorLoginScreen
        }
      />

      <Stack.Screen
        name="VendorMobileLookup"
        component={
          VendorMobileLookupScreen
        }
      />

      <Stack.Screen
        name="VendorTerms"
        component={
          VendorTermsScreen
        }
      />

      <Stack.Screen
        name="VendorProfile"
        component={
          VendorProfileScreen
        }
      />

      <Stack.Screen
        name="VendorDashboard"
        component={
          VendorDashboardScreen
        }
      />

      <Stack.Screen
        name="VendorAddProduct"
        component={
          VendorAddProductScreen
        }
      />

      <Stack.Screen
        name="VendorEditProduct"
        component={
          VendorEditProductScreen
        }
      />

      <Stack.Screen
        name="VendorOrders"
        component={
          VendorOrdersScreen
        }
      />

      {/* OTP */}
      <Stack.Screen
        name="OtpVerification"
        component={
          OtpVerificationScreen
        }
      />

      {/* PRODUCTS */}
      <Stack.Screen
        name="VendorList"
        component={
          VendorListScreen
        }
      />

      <Stack.Screen
        name="VendorDetails"
        component={
          VendorDetailsScreen
        }
      />

      {/* CART */}
      <Stack.Screen
        name="Cart"
        component={CartScreen}
      />

      <Stack.Screen
        name="OrderSuccess"
        component={
          OrderSuccessScreen
        }
      />


    </Stack.Navigator>
  );
}