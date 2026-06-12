import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  fetchAgents,
} from "../services/agentService";

import {
  updateOrder,
} from "../services/orderService";

export default function AgentAssignmentScreen({
  route,
  navigation,
}: any) {

  const order =
    route?.params?.order;

  const [agents, setAgents] =
    useState<any[]>([]);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents =
    async () => {

      const allAgents =
        await fetchAgents();

      const activeAgents =
        allAgents.filter(
          (agent) =>
            agent.active === true &&
            agent.locality ===
              order.locality
        );

      setAgents(
        activeAgents
      );
    };

  const assignAgent =
    async (agent: any) => {

      try {

        await updateOrder(
          order.id,
          {
            agentName:
              agent.agentName,

            agentMobile:
              agent.mobile,

            assignedAt:
              new Date().toISOString(),

            deliveryStatus:
              "Assigned",

            status:
              "Agent Assigned",
          }
        );

        Alert.alert(
          "Success",
          `${agent.agentName} assigned successfully`
        );

        navigation.goBack();

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Failed to assign agent"
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          "#f5f5f5",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Assign Agent 🚚
      </Text>

      <View
        style={{
          backgroundColor:
            "#fff",
          padding: 15,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Order: {order.orderNumber}
        </Text>

        <Text
          style={{
            marginTop: 5,
          }}
        >
          Customer: {order.customerName}
        </Text>

        <Text>
          Locality: {order.locality}
        </Text>
      </View>

      <FlatList
        data={agents}
        keyExtractor={(item) =>
          item.firestoreId
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor:
                "#fff",
              padding: 20,
              borderRadius: 12,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {item.agentName}
            </Text>

            <Text
              style={{
                marginTop: 5,
              }}
            >
              📞 {item.mobile}
            </Text>

            <Text>
              📍 {item.locality}
            </Text>

            <TouchableOpacity
              onPress={() =>
                assignAgent(item)
              }
              style={{
                backgroundColor:
                  "#673AB7",
                padding: 14,
                borderRadius: 10,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign:
                    "center",
                  fontWeight:
                    "bold",
                }}
              >
                Assign Agent
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}