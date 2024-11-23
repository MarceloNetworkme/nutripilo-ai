import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ItemResponse } from "@azure/cosmos";
import { MealsAPI } from "../../../infra/cosmos/meals/meals.infra";
import type { MealResponse } from "../../../infra/cosmos/meals/response/meals-response.model";
import { toast } from "react-toastify";

export type QuerySelectArg<TBase, TResult = TBase> = (data: TBase | undefined) => TResult | undefined;

const useGetUserMeals = (userId: string) => {
    const query = useQuery({
        queryKey: [{ base: "meals-cosmos" }],
        queryFn: async () => {
            return (await MealsAPI.getUserMeals(userId));
        },
        enabled: Boolean(userId),
    });
    return query;
};

const useCreateMeals = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (meals: MealResponse[]): Promise<MealResponse[]>  => {
            const response: ItemResponse<MealResponse>[] = await MealsAPI.createMeals(
                meals
            );

            console.log("Log response here", response)
            
            return response.map((res) => res.resource as MealResponse);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [{ base: "meals-cosmos" }],
            });
          },
    });

    return {
        mutateAsync: mutation.mutateAsync,
        isPending:mutation.isPending,
        error: mutation.error,
    };
};

const useDeleteMeal = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ mealId, userId }: { mealId: string; userId: string }): Promise<void>  => {
            toast.loading("Deleting meal...", );
            await MealsAPI.deleteMeal(
                mealId, userId
            );            
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Meal deleted successfully!");
            queryClient.invalidateQueries({
              queryKey: [{ base: "meals-cosmos" }],
            });
          },
        onError: () => {
            toast.dismiss();
            toast.success("Failed to delete meal");
        }
    });

    return {
        mutateAsync: mutation.mutateAsync,
        isPending:mutation.isPending,
        error: mutation.error,
    };
};

const useUpdateMealStatus = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ mealId, userId }: { mealId: string; userId: string }): Promise<void>  => {
            toast.loading("Confirming meal...", );
            await MealsAPI.updateMealStatus(
                mealId, userId
            );            
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Meal confirmed successfully!");
            queryClient.invalidateQueries({
              queryKey: [{ base: "meals-cosmos" }],
            });
          },
        onError: () => {
            toast.dismiss();
            toast.success("Failed to confirmed meal");
        }
    });

    return {
        mutateAsync: mutation.mutateAsync,
        isPending:mutation.isPending,
        error: mutation.error,
    };
};

export const mealsCosmosService = {
    useGetUserMeals,
    useCreateMeals,
    useDeleteMeal,
    useUpdateMealStatus
};
