import { useMemo } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { mealsCosmosService } from '../../services/cosmos/meals/meals.service';
import { useParams } from 'react-router-dom';
import type { MealResponse } from '../../infra/cosmos/meals/response/meals-response.model';

interface ShoppingListItem{
    name: string;
    quantity: string;
  };

const generateShoppingList = (meals: MealResponse[]): ShoppingListItem[] => {
  const ingredientMap: Record<string, number> = {};

  for (const meal of meals) {
    for (const ingredient of meal.ingredients) {
      const quantity = Number.parseFloat(ingredient.quantity.split(' ')[0]) || 0;
      const unit = ingredient.quantity.split(' ').slice(1).join(' ');

      const key = `${ingredient.name} ${unit}`.trim();
      ingredientMap[key] = (ingredientMap[key] || 0) + quantity;
    }
  }

  return Object.entries(ingredientMap).map(([name, quantity]) => ({
    name,
    quantity: `${quantity}`,
  }));
};

const ShoppingList: React.FC = () => {
    const { id: userId } = useParams();

    const { data: mealsData, isFetching } = mealsCosmosService.useGetUserMeals(userId || "");
    
    const shoppingList = useMemo(() => generateShoppingList(mealsData || []), [mealsData]);

    if (isFetching) {
        return "Generating shopping list...";
    }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weekly Shopping List
      </Typography>

      {shoppingList.length > 0 && (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Shopping List
            </Typography>
            <Divider />
            <List>
              {shoppingList.map((item) => (
                <ListItem key={item.name}>
                  <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ShoppingList;
