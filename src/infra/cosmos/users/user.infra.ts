import type { Container, ItemResponse } from "@azure/cosmos";
import { cosmoDBClient } from "../../configs/cosmos.config";
import type { UserResponse } from "./response/user-response.model";

const usersContainer: Container = cosmoDBClient.database("nutripilot").container("users");

type GetUser = (userId: string) => Promise<UserResponse | null>;
const getUser: GetUser = async (userId) => {
  const querySpec = {
    query: "SELECT * FROM c WHERE c.userId = @userId",
    parameters: [{ name: "@userId", value: userId }],
  };

  try {
    const { resources } = await usersContainer.items.query<UserResponse>(querySpec).fetchAll();
    return resources.length > 0 ? resources[0] : null;
  } catch (error) {
    console.error("Error querying user by userId:", error);
    throw error;
  }
};

type CreateUser = (content: Omit<UserResponse, 'id'>) => Promise<ItemResponse<UserResponse>>;
const createUser: CreateUser = async (content) => {
  return await usersContainer.items.create({ ...content, id: crypto.randomUUID() });
};

type UpdateUser = (content: UserResponse) => Promise<ItemResponse<UserResponse>>;
const updateUser: UpdateUser = async (content) => {
  return await usersContainer.item(content.id, content.userId).replace(content);
};

type DeleteUser = (id: string, userId: string) => Promise<ItemResponse<UserResponse>>;
const deleteContent: DeleteUser = async (id, userId) => {
  return await usersContainer.item(id, userId).delete();
};

export const UsersAPI = {
  getUser,
  createUser,
  updateUser,
  deleteContent
};
