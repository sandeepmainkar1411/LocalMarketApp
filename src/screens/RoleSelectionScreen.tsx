import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function RoleSelectionScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Local Market App
      </Text>

      <TouchableOpacity
        style={styles.customerButton}
        onPress={() =>
          navigation.navigate(
            "CustomerLogin"
          )
        }
      >
        <Text style={styles.buttonText}>
          Continue as Customer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.vendorButton}
        onPress={() =>
          navigation.navigate(
            "VendorLogin"
          )
        }
      >
        <Text style={styles.buttonText}>
          Continue as Vendor
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() =>
          navigation.navigate(
            "AdminLogin"
          )
        }
      >
        <Text style={styles.buttonText}>
          Continue as Admin
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.agentButton}
        onPress={() =>
          navigation.navigate(
            "AgentLogin"
          )
        }
      >
        <Text style={styles.buttonText}>
          Continue as Agent
        </Text>
      </TouchableOpacity>
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
    marginBottom: 60,
  },

  customerButton: {
    backgroundColor: "#2e7d32",
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

  adminButton: {
    backgroundColor: "#212121",
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

  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});