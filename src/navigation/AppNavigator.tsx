import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import CustomerLoginScreen from '../screens/CustomerLoginScreen';
import VendorLoginScreen from '../screens/VendorLoginScreen';
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import VendorListScreen from "../screens/VendorListScreen";
import VendorDetailsScreen from "../screens/VendorDetailsScreen";
import VendorDashboardScreen from "../screens/VendorDashboardScreen";
import VendorAddProductScreen from "../screens/VendorAddProductScreen";
import VendorOrdersScreen from "../screens/VendorOrdersScreen";
import CartScreen from "../screens/CartScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
      />

      <Stack.Screen
        name="CustomerLogin"
        component={CustomerLoginScreen}
      />

      <Stack.Screen
        name="VendorLogin"
        component={VendorLoginScreen}
      />

      <Stack.Screen
        name="OtpVerification"
        component={OtpVerificationScreen}
      />

      <Stack.Screen
        name="CustomerDashboard"
        component={CustomerDashboardScreen}
      />

      <Stack.Screen
       name="VendorList"
       component={VendorListScreen}
      />

      <Stack.Screen
        name="VendorDetails"
        component={VendorDetailsScreen}
      />
      <Stack.Screen
        name="VendorAddProduct"
        component={VendorAddProductScreen}
      />
      <Stack.Screen
        name="VendorDashboard"
        component={VendorDashboardScreen}
      />
      <Stack.Screen
        name="VendorOrders"
        component={VendorOrdersScreen}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
      />
      
    </Stack.Navigator>
   
  );
}