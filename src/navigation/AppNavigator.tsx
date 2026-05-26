import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import CustomerLoginScreen from '../screens/CustomerLoginScreen';
import VendorLoginScreen from '../screens/VendorLoginScreen';
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import VendorListScreen from "../screens/VendorListScreen";
import VendorDetailsScreen from "../screens/VendorDetailsScreen";

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
    </Stack.Navigator>
   
  );
}