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
import VendorProfileEditScreen from "../screens/VendorProfileEditScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import AdminManageVendorsScreen from "../screens/AdminManageVendorsScreen";
import AdminManageLocalitiesScreen from "../screens/AdminManageLocalitiesScreen";
import VendorApprovalPendingScreen from "../screens/VendorApprovalPendingScreen";
import VendorNotificationsScreen from "../screens/VendorNotificationsScreen";
import CustomerComplaintScreen from "../screens/CustomerComplaintScreen";
import AdminComplaintsScreen from "../screens/AdminComplaintsScreen";
import VendorSuspendedScreen from "../screens/VendorSuspendedScreen";
import CustomerProfileScreen from "../screens/CustomerProfileScreen";
import CustomerProfileViewScreen from "../screens/CustomerProfileViewScreen";
import CustomerProfileEditScreen from "../screens/CustomerProfileEditScreen";
import CustomerRatingScreen from "../screens/CustomerRatingScreen";
import VendorReviewsScreen from "../screens/VendorReviewsScreen";
import AdminRevenueDashboardScreen from "../screens/AdminRevenueDashboardScreen";
import AdminVendorCollectionScreen from "../screens/AdminVendorCollectionScreen";
import VendorCollectionDetailsScreen from "../screens/VendorCollectionDetailsScreen";
import AgentAssignmentScreen from "../screens/AgentAssignmentScreen";
import AgentLoginScreen from "../screens/AgentLoginScreen";
import AgentOrdersScreen from "../screens/AgentOrdersScreen";
import AgentPaymentScreen from "../screens/AgentPaymentScreen";
import AdminSettlementScreen from "../screens/AdminSettlementScreen";
import VendorSettlementScreen from "../screens/VendorSettlementScreen";



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
        name="VendorSuspended"
        component={VendorSuspendedScreen}
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

      <Stack.Screen
        name="VendorCollectionDetails"
        component={
          VendorCollectionDetailsScreen
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
        name="CustomerProfile"
        component={CustomerProfileScreen}
      />

      <Stack.Screen
        name="CustomerProfileView"
        component={
          CustomerProfileViewScreen
        }
      />

      <Stack.Screen
        name="CustomerProfileEdit"
        component={
          CustomerProfileEditScreen
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

      <Stack.Screen
        name="VendorProfileEdit"
        component={VendorProfileEditScreen}
      />

      <Stack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
      />

      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
      />

      <Stack.Screen
        name="AdminManageVendors"
        component={AdminManageVendorsScreen}
      />

      <Stack.Screen
        name="AdminManageLocalities"
        component={
          AdminManageLocalitiesScreen
        }
      />

      <Stack.Screen
        name="AdminVendorCollection"
        component={
          AdminVendorCollectionScreen
        }
      />

      <Stack.Screen
        name="VendorApprovalPending"
        component={
          VendorApprovalPendingScreen
        }
      />

      <Stack.Screen
        name="VendorNotifications"
        component={
          VendorNotificationsScreen
        }
      />

      <Stack.Screen
        name="CustomerComplaint"
        component={CustomerComplaintScreen}
      />

      <Stack.Screen
        name="AdminComplaints"
        component={AdminComplaintsScreen}
      />

    <Stack.Screen
      name="AdminRevenueDashboard"
      component={
        AdminRevenueDashboardScreen
      }
    />

      <Stack.Screen
        name="CustomerRating"
        component={
          CustomerRatingScreen
        }
      />

      <Stack.Screen
        name="VendorReviews"
        component={
          VendorReviewsScreen
        }
      />

      <Stack.Screen
        name="AgentAssignment"
        component={AgentAssignmentScreen}
      />

      
      <Stack.Screen
        name="AgentOrders"
        component={AgentOrdersScreen}
      />

      <Stack.Screen
        name="AgentLogin"
        component={AgentLoginScreen}
      />

      <Stack.Screen
        name="AgentPayment"
        component={AgentPaymentScreen}
      />

      <Stack.Screen
        name="AdminSettlement"
        component={
          AdminSettlementScreen
        }
      />

      <Stack.Screen
        name="VendorSettlement"
        component={VendorSettlementScreen}
      />

    

    </Stack.Navigator>
  );
}