import {
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { mealsCosmosService } from '../../../../services/cosmos/meals/meals.service';
import { userCosmosService } from '../../../../services/cosmos/users/users.service';
import { fNumber } from '../../../../utils/format-number.util';

interface UserProgressProps {
    selectedDay: string;
}

const UserProgress: React.FC<UserProgressProps> = ({selectedDay}) => {
    const { id: userId } = useParams();
    const { data: user, isFetching } = userCosmosService.useGetUserById(userId || "");
    const { data: mealsData, isFetching: isMealsFecthing } = mealsCosmosService.useGetUserMeals(userId || "");

    const meals = useMemo(() => mealsData?.filter(m => m.day_of_week===selectedDay), [mealsData, selectedDay]);
    const { name, macros, goal, dietary_preference, number_of_meals_per_day } = user || {};

    const progress = useMemo(() => {
        if (isMealsFecthing || !meals) {
            return {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
            };
        }
        const calories = (meals || []).filter(m => m.status === 'confirmed').reduce((acc, meal) => acc + meal.macronutrients.calories, 0);
        const protein = (meals || []).filter(m => m.status === 'confirmed').reduce((acc, meal) => acc + meal.macronutrients.protein, 0);
        const carbs = (meals || []).filter(m => m.status === 'confirmed').reduce((acc, meal) => acc + meal.macronutrients.carbs, 0);
        const fat = (meals || []).filter(m => m.status === 'confirmed').reduce((acc, meal) => acc + meal.macronutrients.fat, 0);

        return {
            calories: (calories / (macros?.calories || 1)) * 100,
            protein: (protein / (macros?.protein || 1)) * 100,
            carbs: (carbs / (macros?.carbs || 1)) * 100,
            fat: (fat / (macros?.fat || 1)) * 100,
            currentCalories:calories,
            currentProtein:protein,
            currentFat:fat,
            currentCarbs:carbs
        };
    }, [meals, macros, isMealsFecthing]);

    if (isFetching) {
        return (
            <Typography variant="subtitle2" textAlign="center">
                Loading user data...
            </Typography>
        );
    }

    if (!user) {
        return (
            <Typography variant="subtitle2" textAlign="center">
                No user data available.
            </Typography>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                    Welcome, {name}!
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Goal: {goal?.replace("_", " ")} | Diet: {dietary_preference} | Meals per day: {(number_of_meals_per_day || []).join(", ")}
                </Typography>
                {/* Calories Progress */}
                <Box mb={2}>
                    <Typography variant="body2">Calories ({progress.currentCalories}/{macros?.calories} kcal)</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={progress.calories > 100 ? 100: progress.calories}
                        sx={{ height: 10, borderRadius: 4 }}
                        color="primary"
                    />
                    <Typography variant="caption" color="textSecondary">
                        {fNumber(progress.calories)}% completed
                    </Typography>
                </Box>

                {/* Carbs, Protein, and Fats in the Same Line */}
                <Grid container spacing={2} alignItems="center">
                    {/* Protein Progress */}
                    <Grid item xs={4}>
                        <Typography variant="body2" textAlign="center">
                            Protein ({progress.currentProtein}/{macros?.protein} g)
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progress.protein > 100 ? 100: progress.protein }
                            sx={{ height: 8, borderRadius: 4 }}
                            color="secondary"
                        />
                        <Typography variant="caption" color="textSecondary" textAlign="center">
                            {fNumber(progress.protein)}%
                        </Typography>
                    </Grid>

                    {/* Carbs Progress */}
                    <Grid item xs={4}>
                        <Typography variant="body2" textAlign="center">
                            Carbs ({progress.currentCarbs}/{macros?.carbs} g)
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progress.carbs > 100 ? 100: progress.carbs }
                            sx={{ height: 8, borderRadius: 4 }}
                            color="info"
                        />
                        <Typography variant="caption" color="textSecondary" textAlign="center">
                            {fNumber(progress.carbs)}%
                        </Typography>
                    </Grid>

                    {/* Fats Progress */}
                    <Grid item xs={4}>
                        <Typography variant="body2" textAlign="center">
                            Fats ({progress.currentFat}/{macros?.fat} g)
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progress.fat > 100 ? 100: progress.fat}
                            sx={{ height: 8, borderRadius: 4 }}
                            color="warning"
                        />
                        <Typography variant="caption" color="textSecondary" textAlign="center">
                            {fNumber(progress.fat)}%
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UserProgress;
