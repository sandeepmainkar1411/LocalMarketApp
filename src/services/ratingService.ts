import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* SAVE RATING */

export const createRating = async (
  ratingData: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, "ratings"),
      ratingData
    );

    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

/* FETCH RATINGS */

export const fetchRatings =
  async () => {
    try {
      const snapshot =
        await getDocs(
          collection(
            db,
            "ratings"
          )
        );

      const ratings: any[] =
        [];

      snapshot.forEach(
        (docItem) => {
          ratings.push({
            id: docItem.id,
            ...docItem.data(),
          });
        }
      );

      return ratings;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

/* GET VENDOR AVERAGE */

export const getVendorRating =
  async (
    vendorName: string
  ) => {
    try {
      const ratings =
        await fetchRatings();

      const vendorRatings =
        ratings.filter(
          (rating) =>
            rating.vendorName ===
            vendorName
        );

      if (
        vendorRatings.length === 0
      ) {
        return {
          average: 0,
          totalReviews: 0,
        };
      }

      const total =
        vendorRatings.reduce(
          (
            sum,
            rating
          ) =>
            sum +
            Number(
              rating.rating
            ),
          0
        );

      return {
        average:
          total /
          vendorRatings.length,

        totalReviews:
          vendorRatings.length,
      };
    } catch (error) {
      console.log(error);

      return {
        average: 0,
        totalReviews: 0,
      };
    }
  };
  /* FETCH REVIEWS FOR VENDOR */

export const fetchVendorReviews =
  async (
    vendorName: string
  ) => {
    try {
      const ratings =
        await fetchRatings();

      return ratings.filter(
        (rating) =>
          rating.vendorName ===
          vendorName
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };