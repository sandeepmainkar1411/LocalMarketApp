import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function AdminDashboardScreen({
  navigation,
}: any) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Admin Dashboard 👨‍💼
      </Text>

      {/* Manage Vendors */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "AdminManageVendors"
          )
        }
        style={{
          backgroundColor: "#0066cc",
          padding: 20,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Manage Vendors
        </Text>
      </TouchableOpacity>

      {/* Manage Localities */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "AdminManageLocalities"
          )
        }
        style={{
          backgroundColor: "#009688",
          padding: 20,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Manage Localities
        </Text>
      </TouchableOpacity>

      {/* Customer Complaints */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "AdminComplaints"
          )
        }
        style={{
          backgroundColor: "#f44336",
          padding: 20,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Customer Complaints
        </Text>
      </TouchableOpacity>

      {/* Statistics */}

      <TouchableOpacity
        onPress={() =>
          console.log(
            "Statistics Screen Coming Soon"
          )
        }
        style={{
          backgroundColor: "#9c27b0",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Statistics
        </Text>
      </TouchableOpacity>
    </View>
  );
}