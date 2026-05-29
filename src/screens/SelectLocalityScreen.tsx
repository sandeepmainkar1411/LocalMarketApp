import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  
  const localities = [
    "JB Nagar",
    "Andheri",
    "Powai",
    "Marol",
    "Sakinaka",
    "Ghatkopar",
  ];
  
  export default function SelectLocalityScreen({
    navigation,
  }: any) {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        <View
          style={{
            padding: 20,
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
            Select Your Area 📍
          </Text>
  
          {localities.map(
            (locality) => (
              <TouchableOpacity
                key={locality}
                onPress={() =>
                  navigation.navigate(
                    "VendorList",
                    {
                      locality,
                    }
                  )
                }
                style={{
                  backgroundColor:
                    "#ffffff",
  
                  padding: 20,
  
                  borderRadius: 12,
  
                  marginBottom: 15,
  
                  borderWidth: 1,
  
                  borderColor: "#ddd",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight:
                      "bold",
                  }}
                >
                  {locality}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </ScrollView>
    );
  }