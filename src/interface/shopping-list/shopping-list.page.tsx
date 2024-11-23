import { useMemo } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, CircularProgress, Alert } from '@mui/material';
import { mealsCosmosService } from '../../services/cosmos/meals/meals.service';
import { useParams } from 'react-router-dom';
import { generateShoppingList } from './shopping-list.service';

const ShoppingList: React.FC = () => {
  const { id: userId } = useParams();
  const { data: mealsData, isFetching } = mealsCosmosService.useGetUserMeals(userId || "");
  const shoppingList = useMemo(() => generateShoppingList(mealsData || []), [mealsData]);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!shoppingList.length) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          No items in your shopping list. Add some meals to generate a shopping list.
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Used In</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoppingList.map((item) => (
              <TableRow
                key={item.name}
                sx={{
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {item.meals.map((meal) => (
                    <Chip
                      key={meal}
                      label={meal}
                      size="small"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ShoppingList;