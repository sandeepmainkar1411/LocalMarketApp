import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  
  import { useState } from "react";
  
  export default function VendorTermsScreen({
    navigation,
  }: any) {
    const [accepted, setAccepted] =
      useState(false);
  
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
        }}
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Vendor Terms & Conditions
        </Text>
  
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 30,
            }}
          >
            1. विक्रेता केवल ताज़ी और
            अच्छी गुणवत्ता वाली
            सब्जियाँ बेचने के लिए
            सहमत है।

            {"\n\n"}

            2. विक्रेता खराब, सड़ी हुई,
            या ग्राहकों के उपयोग के
            लिए अनुपयुक्त सब्जियाँ
            नहीं बेचेगा।

            {"\n\n"}

            3. ग्राहक द्वारा की गई
            शिकायतों की समीक्षा
            प्लेटफॉर्म द्वारा की जा
            सकती है।

            {"\n\n"}

            4. यदि किसी विक्रेता के
            विरुद्ध 3 या अधिक वैध
            शिकायतें प्राप्त होती हैं,
            तो प्लेटफॉर्म उसके खाते
            को अस्थायी रूप से
            निलंबित या स्थायी रूप से
            हटा सकता है।

            {"\n\n"}

            5. विक्रेता अपने उत्पादों
            की सही कीमत और उपलब्धता
            बनाए रखने के लिए
            जिम्मेदार होगा।

            {"\n\n"}

            6. प्लेटफॉर्म को यह अधिकार
            होगा कि वह नियमों का
            उल्लंघन करने वाले
            विक्रेताओं या उत्पादों को
            हटाए।

            {"\n\n"}

            7. विक्रेता सहमत है कि
            उसकी व्यवसाय संबंधी
            जानकारी प्लेटफॉर्म पर
            सुरक्षित रूप से संग्रहीत
            की जा सकती है।

            {"\n\n"}

            8. प्लेटफॉर्म ग्राहकों और
            विक्रेताओं के बीच भरोसेमंद
            और पारदर्शी व्यापार को
            बढ़ावा देने के लिए कार्य
            करता है।

            {"\n\n"}

            9. इन नियमों एवं शर्तों को
            स्वीकार करके विक्रेता
            प्लेटफॉर्म की सभी नीतियों
            का पालन करने के लिए
            सहमत होता है।
          </Text>
        </View>
  
        <TouchableOpacity
          onPress={() =>
            setAccepted(
              !accepted
            )
          }
          style={{
            marginTop: 25,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderWidth: 2,
              borderColor: "green",
              backgroundColor:
                accepted
                  ? "green"
                  : "white",
  
              marginRight: 10,
            }}
          />
  
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            मैं नियम एवं शर्तों से सहमत हूँ
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          disabled={!accepted}
          onPress={() =>
            navigation.navigate(
              "VendorProfile"
            )
          }
          style={{
            backgroundColor:
              accepted
                ? "green"
                : "gray",
  
            padding: 18,
  
            borderRadius: 10,
  
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            आगे बढ़ें
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }