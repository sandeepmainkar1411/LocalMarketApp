import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  subscribeToOrders,
  updateOrder,
} from "../services/orderService";


export default function AdminSettlementScreen() {


  const [
    orders,
    setOrders,
  ] = useState<any[]>([]);



  useEffect(() => {


    const unsubscribe =
      subscribeToOrders(
        (ordersData: any[]) => {


          const deliveredOrders =
            ordersData.filter(
              (order: any) =>
                order.status ===
                "Delivered"
            );


          setOrders(
            deliveredOrders
          );

        }
      );


    return () =>
      unsubscribe();


  }, []);



  const markAsPaid =
    async (
      orderId: string
    ) => {


      try {


        await updateOrder(
          orderId,
          {

            settlementStatus:
              "Paid",


            settledAt:
              new Date()
              .toISOString(),


            settledBy:
              "Admin"

          }
        );


        Alert.alert(
          "Success",
          "Settlement marked as paid"
        );


      }
      catch(error)
      {

        console.log(
          "Settlement Error",
          error
        );


        Alert.alert(
          "Error",
          "Unable to update settlement"
        );

      }

    };



  return (

    <ScrollView
      style={{
        flex:1,
        backgroundColor:
          "#f5f5f5",
      }}
    >


      <View
        style={{
          padding:20,
        }}
      >


        <Text
          style={{
            fontSize:30,
            fontWeight:"bold",
            textAlign:"center",
            marginBottom:25,
          }}
        >
          Settlement Dashboard 💰
        </Text>



        {
          orders.map(
            (
              order
            ) => (


              <View
                key={
                  order.id
                }
                style={{
                  backgroundColor:"#fff",
                  padding:20,
                  borderRadius:12,
                  marginBottom:20,
                }}
              >


                <Text
                  style={{
                    fontSize:20,
                    fontWeight:"bold",
                  }}
                >
                  {
                    order.orderNumber ||
                    order.id
                  }
                </Text>



                <Text
                  style={{
                    marginTop:8,
                  }}
                >
                  Vendor:
                  {" "}
                  {
                    order.vendorName ||
                    "-"
                  }
                </Text>



                <Text>
                  Agent:
                  {" "}
                  {
                    order.collectedBy ||
                    order.agentName ||
                    "-"
                  }
                </Text>



                <Text>
                  Amount:
                  {" "}
                  ₹
                  {
                    order.subtotal ||
                    order.total
                  }
                </Text>



                <Text>
                  Payment:
                  {" "}
                  {
                    order.paymentMode ||
                    "-"
                  }
                </Text>



                <Text
                  style={{
                    marginTop:10,
                    fontWeight:"bold",
                    color:
                    order.settlementStatus ===
                    "Paid"
                    ? "green"
                    : "orange",
                  }}
                >

                  Settlement:
                  {" "}
                  {
                    order.settlementStatus ||
                    "Pending"
                  }

                </Text>




                {
                  (
                    order.settlementStatus ||
                    "Pending"
                  )
                  !==
                  "Paid"
                  &&

                  (

                  <TouchableOpacity
                    onPress={() =>
                      markAsPaid(
                        order.id
                      )
                    }

                    style={{
                      backgroundColor:
                        "#4CAF50",

                      padding:15,

                      borderRadius:10,

                      marginTop:15,
                    }}
                  >

                    <Text
                      style={{
                        color:"white",
                        textAlign:"center",
                        fontWeight:"bold",
                        fontSize:16,
                      }}
                    >
                      Mark Paid
                    </Text>

                  </TouchableOpacity>

                  )

                }



                {
                  order.settledAt &&

                  <Text
                    style={{
                      marginTop:10,
                      color:"gray",
                    }}
                  >

                    Settled At:
                    {" "}
                    {
                      order.settledAt
                    }

                  </Text>
                }


              </View>


            )
          )
        }



      </View>


    </ScrollView>

  );

}