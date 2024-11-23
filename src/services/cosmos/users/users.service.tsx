import { useMutation, useQuery } from "@tanstack/react-query";
import type { ItemResponse } from "@azure/cosmos";
import { UsersAPI } from "../../../infra/cosmos/users/user.infra";
import type { UserResponse } from "../../../infra/cosmos/users/response/user-response.model";

export type QuerySelectArg<TBase, TResult = TBase> = (data: TBase | undefined) => TResult | undefined;

const useGetUserById = (userId: string) => {
    const query = useQuery({
        queryKey: [{ base: "user-cosmos", userId }],
        queryFn: async () => {
            return (await UsersAPI.getUser(userId));
        },
        enabled: Boolean(userId),
    });
    return query;
};

const useCreateUser = () => {
    const mutation = useMutation({
        mutationFn: async (newGoal: Omit<UserResponse, "id">): Promise<UserResponse>  => {
            const response: ItemResponse<UserResponse> = await UsersAPI.createUser(
                newGoal
            );

            console.log("Log response here", response)
            return response.resource as UserResponse;
        },
    });

    return {
        mutateAsync: mutation.mutateAsync,
        error: mutation.error,
    };
};

export const userCosmosService = {
    useGetUserById,
    useCreateUser,
};
