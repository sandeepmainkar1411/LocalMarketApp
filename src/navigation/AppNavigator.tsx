import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import CustomerLoginScreen from '../screens/CustomerLoginScreen';
import VendorLoginScreen from '../screens/VendorLoginScreen';
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";

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
    </Stack.Navigator>
   
  );
}