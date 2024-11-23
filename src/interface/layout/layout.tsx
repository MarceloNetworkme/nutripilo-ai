import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Divider } from '@mui/material';
import { useEffect } from 'react';

const pages = [{ header: 'Meal planner', path: 'dashboard' }, { header: 'Shopping list', path: 'shopping-list' }];

function DesktopAppBar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation(); // Get the current route location

    useEffect(() => {
        const userId = sessionStorage.getItem("userId")
        if (userId && !location.pathname.includes('onboarding') && !location.pathname.includes('shopping-list')) {
            navigate(`/dashboard/${userId}`);
        }
    }, [location, navigate]);


    return (
        <>
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Grid container alignItems="center" justifyContent="space-between" sx={{mx:2}}>
                        <Grid item xs={12} md={4}>
                            <img
                                src="https://nutripilot.blob.core.windows.net/logo/NutriPilotLogo.png"
                                alt="logo"
                                style={{
                                    display: "block",
                                    height: "100%",
                                    width: "auto",
                                    maxHeight: 100,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={8}>
                            {(location.pathname.includes('dashboard') || location.pathname.includes('shopping-list')) && (<Grid container justifyContent="flex-end">
                                <Box
                                    sx={{
                                        display: 'flex', // Use flexbox for consistent spacing
                                        gap: 2, // Add spacing between buttons
                                        flexWrap: 'wrap', // Ensures wrapping on smaller screens
                                    }}
                                >
                                    {pages.map((page) => (
                                        <Button
                                            key={page.header}
                                            variant={location.pathname.includes(page.path) ? 'contained' : 'outlined'}
                                            size="medium"
                                            color="primary"
                                            sx={{ width: 150 }}
                                            onClick={() => navigate(`/${page.path}/${id}`)}
                                            endIcon={page.header === 'Shopping list' ? <ShoppingCartIcon /> : <DinnerDiningIcon />}
                                        >
                                            {page.header}
                                        </Button>
                                    ))}
                                </Box>
                            </Grid>)}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Divider sx={{py:1}}/>
            <Outlet />
        </>
    );
}

export default DesktopAppBar;
