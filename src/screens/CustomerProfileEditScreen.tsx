import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
  } from "react-native";
  
  import {
    useState,
  } from "react";
  
  import {
    updateCustomer,
  } from "../services/customerService";
  
  export default function CustomerProfileEditScreen({
    route,
    navigation,
  }: any) {
    const customer =
      route?.params?.customer;
  
    const [
      customerName,
      setCustomerName,
    ] = useState(
      customer?.customerName || ""
    );
  
    const saveProfile =
      async () => {
        if (
          customerName.trim() === ""
        ) {
          Alert.alert(
            "Validation",
            "Please enter name"
          );
  
          return;
        }
  
        const success =
          await updateCustomer(
            customer.firestoreId,
            {
              customerName,
            }
          );
  
        if (success) {
          Alert.alert(
            "Success",
            "Profile Updated"
          );
  
          navigation.navigate(
            "CustomerProfileView",
            {
              customer: {
                ...customer,
                customerName,
              },
            }
          );
        }
      };
  
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent:
            "center",
          backgroundColor:
            "#f5f5f5",
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
          Edit Profile
        </Text>
  
        <TextInput
          value={customerName}
          onChangeText={
            setCustomerName
          }
          placeholder="Customer Name"
          style={{
            backgroundColor:
              "#fff",
  
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
              fontSize: 18,
            }}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    );
  }