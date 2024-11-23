import type { Container, ItemResponse } from "@azure/cosmos";
import { cosmoDBClient } from "../../configs/cosmos.config";
import type { MealResponse } from "./response/meals-response.model";

const mealsContainer: Container = cosmoDBClient.database("nutripilot").container("meals");


type GetUserMeals = (userId: string) => Promise<MealResponse[] | null>;
const getUserMeals: GetUserMeals = async (userId) => {
  const querySpec = {
    query: "SELECT * FROM c WHERE c.userId = @userId",
    parameters: [{ name: "@userId", value: userId }],
  };

  try {
    const { resources } = await mealsContainer.items.query<MealResponse>(querySpec).fetchAll();
    return resources;
  } catch (error) {
    console.error("Error querying user by userId:", error);
    throw error;
  }
};

type createContentModelType = (content: MealResponse[]) => Promise<ItemResponse<MealResponse>[]>;

const createMeals: createContentModelType = async (contentList) => {
  const responses: ItemResponse<MealResponse>[] = [];
  for (const content of contentList) {
    const response = await mealsContainer.items.create(content);
    console.log("Response from createMeals", response);
    responses.push(response);
  }
  return responses;
};

type updateContentModelType = (id: string, userId: string) => Promise<ItemResponse<MealResponse>>;

const updateMealStatus: updateContentModelType = async (id, userId) => {
  return await mealsContainer.item(id, userId).patch([{ op: "replace", path: "/status", value: "confirmed" }]);
};

type deleteContentModelType = (id: string, userId: string) => Promise<ItemResponse<MealResponse>>;
const deleteMeal: deleteContentModelType = async (id, userId) => {
  return await mealsContainer.item(id, userId).delete();
};

export const MealsAPI = {
    getUserMeals,
    createMeals,
    updateMealStatus,
    deleteMeal
};
