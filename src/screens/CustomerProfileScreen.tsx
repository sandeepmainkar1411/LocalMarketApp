import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  
  import {
    useState,
  } from "react";
  
  import {
    createCustomer,
  } from "../services/customerService";
  
  export default function CustomerProfileScreen({
    route,
    navigation,
  }: any) {
    const mobile =
      route.params?.mobile;
  
    const [
      customerName,
      setCustomerName,
    ] = useState("");
  
    const saveProfile =
      async () => {
        const customer = {
          customerName,
          mobile,
          createdAt:
            new Date().toISOString(),
        };
  
        await createCustomer(
          customer
        );
  
        navigation.navigate(
          "SelectLocality",
          {
            customer,
          }
        );
      };
  
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent:
            "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Customer Profile
        </Text>
  
        <TextInput
          placeholder="Customer Name"
          value={customerName}
          onChangeText={
            setCustomerName
          }
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
          }}
        />
  
        <TouchableOpacity
          onPress={saveProfile}
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
            }}
          >
            Save Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  }