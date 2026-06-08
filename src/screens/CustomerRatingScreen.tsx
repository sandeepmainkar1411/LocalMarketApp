import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
  } from "react-native";
  
  import {
    useState,
  } from "react";
  
  import {
    createRating,
  } from "../services/ratingService";
  
  export default function CustomerRatingScreen({
    route,
    navigation,
  }: any) {
    const order =
      route?.params?.order;
  
    const [rating, setRating] =
      useState(0);
  
    const [review, setReview] =
      useState("");
  
    const submitRating =
      async () => {
        if (rating === 0) {
          Alert.alert(
            "Rating Required",
            "Please select a rating."
          );
  
          return;
        }
  
        const ratingData = {
          orderId: order.id,
  
          vendorName:
            order.vendorName,
  
          customerMobile:
            order.customerMobile,
  
          rating,
  
          review,
  
          createdAt:
            new Date().toISOString(),
        };
  
        await createRating(
          ratingData
        );
  
        Alert.alert(
          "Thank You",
          "Your rating has been submitted."
        );
  
        navigation.goBack();
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
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Rate Vendor ⭐
        </Text>
  
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {order?.vendorName}
        </Text>
  
        {/* Stars */}
        <View
          style={{
            flexDirection: "row",
            justifyContent:
              "center",
            marginBottom: 30,
          }}
        >
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <TouchableOpacity
                key={star}
                onPress={() =>
                  setRating(
                    star
                  )
                }
              >
                <Text
                  style={{
                    fontSize: 45,
                    marginHorizontal: 5,
                  }}
                >
                  {star <= rating
                    ? "⭐"
                    : "☆"}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
  
        <TextInput
          placeholder="Write your review..."
          value={review}
          onChangeText={
            setReview
          }
          multiline
          numberOfLines={5}
          style={{
            backgroundColor:
              "#fff",
  
            borderWidth: 1,
  
            borderColor:
              "#ddd",
  
            borderRadius: 10,
  
            padding: 15,
  
            textAlignVertical:
              "top",
  
            marginBottom: 30,
  
            minHeight: 120,
          }}
        />
  
        <TouchableOpacity
          onPress={
            submitRating
          }
          style={{
            backgroundColor:
              "green",
  
            padding: 18,
  
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
  
              textAlign:
                "center",
  
              fontSize: 18,
  
              fontWeight:
                "bold",
            }}
          >
            Submit Rating
          </Text>
        </TouchableOpacity>
      </View>
    );
  }