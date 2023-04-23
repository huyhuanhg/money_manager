import { db } from "@/configs/firebase";
import Category from "@/types/entities/CategoryType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchAllOwnedCategories = createAsyncThunk(
  "category/all_owned",
  async ({ email }: any) => {
    const q = query(collection(db, "categories"), where("user", "==", email));
    const querySnapshot = await getDocs(q);

    const categories = querySnapshot.docs.map((doc) => {
      const { parent_id, icon, title } = doc.data();
      return {
        id: doc.id,
        parent_id,
        icon,
        title,
      };
    });

    const parents: Record<string, any> = categories
      .filter((category) => !category.parent_id)
      .reduce((result: Record<string, Category>, category) => {
        result[category.id] = category;
        return result;
      }, {});

    categories
      .filter((category) => category.parent_id)
      .forEach((category) => {
        const child = Array.isArray(parents[category.parent_id].child)
          ? [...parents[category.parent_id].child, category]
          : [category];
        parents[category.parent_id] = {
          ...parents[category.parent_id],
          child,
        };
      });

    return Promise.resolve({ categories: Object.values(parents) });
  }
);
