import { useMemo, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Drawer,
    Box,
    Chip,
    Grid,
} from '@mui/material';
import type { Meal } from '../../../../services/openAI/meal-generation/models/meal-openAI.model';
import { mealsCosmosService } from '../../../../services/cosmos/meals/meals.service';
import { useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InterpretMealButton from '../meal-interpretation-modal/meal-interpretation-modal.component';

interface MealsTableProps {
    selectedDay: string;
}

const MealsTable: React.FC<MealsTableProps> = ({ selectedDay }) => {
    const { id: userId } = useParams();

    const { data: mealsData, isFetching } = mealsCosmosService.useGetUserMeals(userId || "");

    const meals = useMemo(() => mealsData?.filter(m => m.day_of_week === selectedDay), [mealsData, selectedDay]); const { isPending } = mealsCosmosService.useCreateMeals();
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const { mutateAsync: deleteMeal } = mealsCosmosService.useDeleteMeal();
    const { mutateAsync: updateMeal } = mealsCosmosService.useUpdateMealStatus();

    const handleOpenDrawer = (meal: Meal) => {
        setSelectedMeal(meal);
    };

    const handleCloseDrawer = () => {
        setSelectedMeal(null);
    };

    const handleDeleteMeal = async (mealId: string) => {
        await deleteMeal({ mealId, userId: userId || "" });
    };

    const handleUpdateMealStatus = async (mealId: string) => {
        await updateMeal({ mealId, userId: userId || "" });
    };

    if (isFetching || isPending) {
        return "generating meals..."
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container justifyContent="space-between">
                        <Typography variant="h6" gutterBottom>
                            Meals
                        </Typography>
                        <InterpretMealButton userId={userId || ""} dayOfTheWeek={selectedDay} />
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Meal</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Calories</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Preparation Time (min)</TableCell>
                                    <TableCell align='right'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meals?.map((meal) => (
                                    <TableRow key={meal.title}>
                                        <TableCell>{meal.title}</TableCell>
                                        <TableCell>{meal.mealType}</TableCell>
                                        <TableCell>{meal.macronutrients.calories}  kcal</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={meal.status}
                                                variant='soft'
                                                icon={meal.status === 'confirmed' ? <CheckIcon /> : <CloseIcon />}
                                                color={
                                                    meal.status === 'confirmed' ? 'success' : 'default'
                                                }
                                            /></TableCell>
                                        <TableCell>{meal.time_to_prepare}</TableCell>
                                        <TableCell width={350} align="right">
                                            <Box
                                                sx={{
                                                    display: 'flex', // Flexbox layout for consistent spacing
                                                    justifyContent: 'flex-end', // Align items to the right
                                                    gap: 1, // Space between buttons
                                                }}
                                            >
                                                {meal.status !== 'confirmed' && (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => handleUpdateMealStatus(meal.id)}
                                                        endIcon={<CheckIcon />}
                                                        size="small"
                                                    >
                                                        Confirm
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDeleteMeal(meal.id)}
                                                    size="small"
                                                    endIcon={<DeleteIcon />}
                                                >
                                                    Remove
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleOpenDrawer(meal)}
                                                    size="small"
                                                    endIcon={<VisibilityIcon />}
                                                >
                                                    View
                                                </Button>
                                            </Box>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Drawer
                anchor="right"
                open={!!selectedMeal}
                onClose={handleCloseDrawer}
            >
                <Box p={3} width={400}>
                    {selectedMeal && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                {selectedMeal.title}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {selectedMeal.description}
                            </Typography>
                            <Typography variant="subtitle1">Ingredients:</Typography>
                            <ul>
                                {selectedMeal.ingredients.map((ing) => (
                                    <li key={ing.name}>
                                        {ing.quantity} of {ing.name}
                                    </li>
                                ))}
                            </ul>
                            {selectedMeal.type === 'generated' && (<>
                                <Typography variant="subtitle1">Instructions:</Typography>
                                <Typography variant="body2" paragraph>
                                    {selectedMeal.instructions}
                                </Typography></>)}
                            {selectedMeal.type === 'captured' && (<>
                                <Typography variant="subtitle1">Meal photo</Typography>
                                <img src={selectedMeal.imgURL} alt="Uploaded"
                                    style={{
                                        height: '250px',
                                        width: 'auto',
                                        display: 'block',
                                        margin: '10px',
                                    }} /></>)}

                            <Typography variant="subtitle1">Macronutrients:</Typography>
                            <Typography variant="body2">
                                Calories: {selectedMeal.macronutrients.calories} kcal
                            </Typography>
                            <Typography variant="body2">
                                Protein: {selectedMeal.macronutrients.protein} g
                            </Typography>
                            <Typography variant="body2">
                                Fat: {selectedMeal.macronutrients.fat} g
                            </Typography>
                            <Typography variant="body2">
                                Carbs: {selectedMeal.macronutrients.carbs} g
                            </Typography>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default MealsTable;
