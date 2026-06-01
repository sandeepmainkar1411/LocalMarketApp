import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
  } from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    createLocality,
    fetchLocalities,
  } from "../services/localityService";
  
  export default function AdminManageLocalitiesScreen() {
    const [localityName, setLocalityName] =
      useState("");
  
    const [localities, setLocalities] =
      useState<any[]>([]);
  
    const loadLocalities =
      async () => {
        const data =
          await fetchLocalities();
  
        setLocalities(data);
      };
  
    useEffect(() => {
      loadLocalities();
    }, []);
  
    const handleAddLocality =
      async () => {
        if (
          !localityName.trim()
        ) {
          Alert.alert(
            "Validation",
            "Enter locality name"
          );
  
          return;
        }
  
        const exists =
          localities.some(
            (locality) =>
              locality.name
                .toLowerCase()
                .trim() ===
              localityName
                .toLowerCase()
                .trim()
          );
  
        if (exists) {
          Alert.alert(
            "Duplicate",
            "Locality already exists"
          );
  
          return;
        }
  
        await createLocality(
          localityName.trim()
        );
  
        setLocalityName("");
  
        loadLocalities();
  
        Alert.alert(
          "Success",
          "Locality Added"
        );
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
          Manage Localities
        </Text>
  
        <TextInput
          value={localityName}
          onChangeText={
            setLocalityName
          }
          placeholder="Enter Locality Name"
          style={{
            backgroundColor:
              "white",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />
  
        <TouchableOpacity
          onPress={
            handleAddLocality
          }
          style={{
            backgroundColor:
              "green",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
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
            Add Locality
          </Text>
        </TouchableOpacity>
  
        <FlatList
          data={localities}
          keyExtractor={(item) =>
            item.firestoreId
          }
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor:
                  "white",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight:
                    "bold",
                }}
              >
                📍 {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }