import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToNotifications,
  markNotificationRead,
} from "../services/notificationService";

export default function VendorNotificationsScreen({
  route,
  navigation,
}: any) {
  const vendor =
    route?.params?.vendor;

  const [
    notifications,
    setNotifications,
  ] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeToNotifications(
        (
          allNotifications: any[]
        ) => {
          const vendorNotifications =
            allNotifications
              .filter(
                (
                  item: any
                ) =>
                  item.vendorName ===
                  vendor.vendorName
              )
              .sort(
                (
                  a: any,
                  b: any
                ) =>
                  new Date(
                    b.createdAt
                  ).getTime() -
                  new Date(
                    a.createdAt
                  ).getTime()
              );

          setNotifications(
            vendorNotifications
          );
        }
      );

    return () =>
      unsubscribe();
  }, []);

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
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        🔔 Notifications
      </Text>

      {notifications.length ===
        0 && (
        <Text
          style={{
            textAlign:
              "center",
            color: "gray",
            marginTop: 40,
            fontSize: 18,
          }}
        >
          No notifications
        </Text>
      )}

      <FlatList
        data={notifications}
        keyExtractor={(
          item
        ) =>
          item.firestoreId
        }
        renderItem={({
          item,
        }) => (
          <TouchableOpacity
            onPress={async () => {
              if (
                !item.read
              ) {
                await markNotificationRead(
                  item.firestoreId
                );
              }

              navigation.navigate(
                "VendorOrders",
                {
                  vendor,
                }
              );
            }}
            style={{
              backgroundColor:
                item.read
                  ? "#ffffff"
                  : "#e8f5e9",

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
                fontWeight:
                  "bold",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 18,
                fontWeight:
                  "bold",
              }}
            >
              👤{" "}
              {item.customer ||
                "Customer"}
            </Text>

            <Text
              style={{
                marginTop: 5,
              }}
            >
              📞{" "}
              {item.mobile ||
                "N/A"}
            </Text>

            <Text
              style={{
                marginTop: 5,
              }}
            >
              📍{" "}
              {item.locality ||
                "N/A"}
            </Text>

            <Text
              style={{
                marginTop: 5,
              }}
            >
              🏠{" "}
              {item.address ||
                "N/A"}
            </Text>

            {item.items &&
              item.items.length >
                0 && (
                <View
                  style={{
                    marginTop: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight:
                        "bold",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    Ordered Items:
                  </Text>

                  {item.items.map(
                    (
                      product: any,
                      index: number
                    ) => (
                      <Text
                        key={
                          index
                        }
                        style={{
                          marginBottom: 5,
                        }}
                      >
                        🥬{" "}
                        {
                          product.name
                        }{" "}
                        -{" "}
                        {
                          product.displayQuantity
                        }
                      </Text>
                    )
                  )}
                </View>
              )}

            <Text
              style={{
                color:
                  "green",
                fontSize: 28,
                fontWeight:
                  "bold",
                marginTop: 15,
              }}
            >
              ₹
              {item.total ||
                0}
            </Text>

            {!item.read && (
              <Text
                style={{
                  color:
                    "green",
                  marginTop: 10,
                  fontWeight:
                    "bold",
                  fontSize: 16,
                }}
              >
                New
              </Text>
            )}

            <Text
              style={{
                marginTop: 10,
                color: "gray",
                fontSize: 12,
              }}
            >
              Tap to open
              Orders
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}