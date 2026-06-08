import {
    View,
    Text,
    ScrollView,
  } from "react-native";
  
  import {
    useEffect,
    useState,
  } from "react";
  
  import {
    fetchVendorReviews,
  } from "../services/ratingService";
  
  export default function VendorReviewsScreen({
    route,
  }: any) {
    const vendor =
      route?.params?.vendor;
  
    const vendorName =
      vendor?.vendorName ||
      vendor?.name ||
      "";
  
    const [reviews, setReviews] =
      useState<any[]>([]);
  
    useEffect(() => {
      loadReviews();
    }, []);
  
    const loadReviews =
      async () => {
        const data =
          await fetchVendorReviews(
            vendorName
          );
  
        setReviews(data);
      };
  
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
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 25,
            }}
          >
            Customer Reviews ⭐
          </Text>
  
          {reviews.length === 0 && (
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                marginTop: 50,
                fontSize: 18,
              }}
            >
              No Reviews Yet
            </Text>
          )}
  
          {reviews.map(
            (review) => (
              <View
                key={review.id}
                style={{
                  backgroundColor:
                    "#fff",
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
                    fontSize: 24,
                    color:
                      "#f39c12",
                    marginBottom: 10,
                  }}
                >
                  ⭐ {review.rating}/5
                </Text>
  
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                  }}
                >
                  {review.review ||
                    "No comments provided"}
                </Text>
  
                <Text
                  style={{
                    color: "gray",
                    marginTop: 10,
                  }}
                >
                  Reviewed on:
                  {" "}
                  {review.createdAt
                    ? new Date(
                        review.createdAt
                      ).toLocaleDateString()
                    : "Unknown"}
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    );
  }