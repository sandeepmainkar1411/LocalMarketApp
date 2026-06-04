import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToLocalities,
} from "../services/localityService";

export default function SelectLocalityScreen({
  navigation,
  route,
}: any) {
  const [localities, setLocalities] =
    useState<any[]>([]);

  const customer =
    route.params?.customer;

  useEffect(() => {
    const unsubscribe =
      subscribeToLocalities(
        (data: any[]) => {
          setLocalities(data);
        }
      );

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          "#f5f5f5",
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
          (locality: any) => (
            <TouchableOpacity
              key={
                locality.firestoreId
              }
              onPress={() =>
                navigation.navigate(
                  "VendorList",
                  {
                    locality:
                      locality.name,

                    customer:
                      customer,
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
                borderColor:
                  "#ddd",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight:
                    "bold",
                }}
              >
                {locality.name}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </ScrollView>
  );
}