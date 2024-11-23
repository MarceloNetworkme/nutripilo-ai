import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider } from '@mui/material';

const pages = [{ header: 'Meal planner', path: 'dashboard' }, { header: 'Shopping list', path: 'shopping-list' }];

function DesktopAppBar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation(); // Get the current route location
    
    return (
        <>
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Grid container alignItems="center">
                        <Grid item xs={3}>
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

                        <Grid item xs={9}>
                            {!location.pathname.includes('onboarding') && (<Grid container justifyContent="flex-end">
                                {pages.map((page) => (
                                    <Grid item key={page.header}>
                                        <Button
                                            variant="outlined"
                                            size="medium"
                                            color="primary"
                                            sx={{ mr: 2, width: 150 }}
                                            onClick={() => navigate(`/${page.path}/${id}`)}
                                            endIcon={page.header==='Shopping list'? <ShoppingCartIcon/>: <DinnerDiningIcon/>}
                                        >
                                            {page.header}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>)}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Divider/>
            <Outlet />
        </>
    );
}

export default DesktopAppBar;
