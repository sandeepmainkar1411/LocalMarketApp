import AppNavigator from "../navigation/AppNavigator";

import {
  AuthProvider,
} from "../context/AuthContext";

export default function Index() {

  return (

    <AuthProvider>

      <AppNavigator />

    </AuthProvider>

  );

}