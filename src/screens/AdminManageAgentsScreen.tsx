import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    } from "react-native";
    
    import {
    useState,
    useEffect,
    } from "react";
    
    import {
    createAgent,
    fetchAgents,
    toggleAgentStatus,
    } from "../services/agentService";
    
    export default function AdminManageAgentsScreen() {
    
    const [agentName, setAgentName] =
    useState("");
    
    const [mobile, setMobile] =
    useState("");
    
    const [locality, setLocality] =
    useState("");
    
    const [agents, setAgents] =
    useState<any[]>([]);
    
    useEffect(() => {
    loadAgents();
    }, []);
    
    const loadAgents =
    async () => {
    const data =
    await fetchAgents();
    
    ```
      setAgents(data);
    };
    ```
    
    const handleAddAgent =
    async () => {
    
    ```
      if (
        !agentName ||
        !mobile ||
        !locality
      ) {
        Alert.alert(
          "Validation",
          "Please fill all fields"
        );
        return;
      }
    
      await createAgent({
        agentName,
        mobile,
        locality,
        active: true,
        createdAt:
          new Date()
            .toISOString()
            .split("T")[0],
      });
    
      Alert.alert(
        "Success",
        "Agent Added Successfully"
      );
    
      setAgentName("");
      setMobile("");
      setLocality("");
    
      loadAgents();
    };
    ```
    
    const handleToggle =
    async (agent: any) => {
    
    ```
      await toggleAgentStatus(
        agent.firestoreId,
        agent.active
      );
    
      loadAgents();
    };
    ```
    
    return (
    <View
    style={{
    flex: 1,
    backgroundColor:
    "#f5f5f5",
    }}
    >
    <FlatList
    data={agents}
    keyExtractor={(item) =>
    item.firestoreId
    }
    ListHeaderComponent={
    <View
    style={{
    padding: 20,
    }}
    >
    <Text
    style={{
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    }}
    >
    🚚 Manage Agents </Text>
    
    ```
            <View
              style={{
                backgroundColor:
                  "#fff",
                padding: 20,
                borderRadius: 12,
                marginBottom: 25,
              }}
            >
              <TextInput
                placeholder="Agent Name"
                value={agentName}
                onChangeText={
                  setAgentName
                }
                style={{
                  borderWidth: 1,
                  borderColor:
                    "#ddd",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
    
              <TextInput
                placeholder="Mobile Number"
                keyboardType="numeric"
                value={mobile}
                onChangeText={
                  setMobile
                }
                style={{
                  borderWidth: 1,
                  borderColor:
                    "#ddd",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
    
              <TextInput
                placeholder="Locality"
                value={locality}
                onChangeText={
                  setLocality
                }
                style={{
                  borderWidth: 1,
                  borderColor:
                    "#ddd",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
    
              <TouchableOpacity
                onPress={
                  handleAddAgent
                }
                style={{
                  backgroundColor:
                    "green",
                  padding: 18,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign:
                      "center",
                    fontWeight:
                      "bold",
                    fontSize: 18,
                  }}
                >
                  Add Agent
                </Text>
              </TouchableOpacity>
            </View>
    
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Agent List
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor:
                "#fff",
              marginHorizontal: 20,
              marginBottom: 15,
              padding: 20,
              borderRadius: 12,
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
                marginTop: 8,
              }}
            >
              📞 {item.mobile}
            </Text>
    
            <Text>
              📍 {item.locality}
            </Text>
    
            <Text
              style={{
                marginTop: 10,
                fontWeight:
                  "bold",
                color:
                  item.active
                    ? "green"
                    : "red",
              }}
            >
              {item.active
                ? "🟢 Active"
                : "🔴 Inactive"}
            </Text>
    
            <TouchableOpacity
              onPress={() =>
                handleToggle(
                  item
                )
              }
              style={{
                marginTop: 15,
                backgroundColor:
                  item.active
                    ? "red"
                    : "green",
                padding: 12,
                borderRadius: 10,
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
                {item.active
                  ? "Deactivate"
                  : "Activate"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    ```
    
    );
    }
    