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
    createComplaint,
  } from "../services/complaintService";
  
  export default function CustomerComplaintScreen({
    route,
    navigation,
  }: any) {
    const order =
      route?.params?.order;
  
    const [
      complaint,
      setComplaint,
    ] = useState("");
  
    const submitComplaint = async () => {
      try {
    
        console.log("SUBMIT CLICKED");
    
        const complaintData = {
          orderId: order.id,
          vendorName: order.vendorName,
          customerName: order.customerName,
          locality: order.locality,
          total: order.total,
          mobile: order.address?.mobile,
          complaint,
          status: "Pending",
          createdAt: new Date().toISOString(),
        };
    
        console.log(
          "COMPLAINT DATA:",
          complaintData
        );
    
        const result =
          await createComplaint(
            complaintData
          );
    
        console.log(
          "CREATED ID:",
          result
        );
    
        Alert.alert(
          "Success",
          "Complaint submitted successfully"
        );
    
        navigation.goBack();
    
      } catch (error) {
    
        console.log(
          "COMPLAINT ERROR:",
          error
        );
    
        Alert.alert(
          "Error",
          JSON.stringify(error)
        );
      }
    };
  
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor:
            "#f5f5f5",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Report Complaint
        </Text>
  
        <Text
          style={{
            marginBottom: 15,
            fontWeight: "bold",
          }}
        >
          Vendor:
          {" "}
          {
            order.vendorName
          }
        </Text>
  
        <TextInput
          multiline
          numberOfLines={6}
          placeholder="Describe the issue..."
          value={complaint}
          onChangeText={
            setComplaint
          }
          style={{
            backgroundColor:
              "white",
            borderWidth: 1,
            borderColor:
              "#ddd",
            borderRadius: 10,
            padding: 15,
            textAlignVertical:
              "top",
            height: 150,
          }}
        />
  
        <TouchableOpacity
          onPress={
            submitComplaint
          }
          style={{
            backgroundColor:
              "red",
            padding: 18,
            borderRadius: 10,
            marginTop: 20,
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
            Submit Complaint
          </Text>
        </TouchableOpacity>
      </View>
    );
  }