import { useState } from "react";
import { Grid, Tabs, Tab, useMediaQuery } from "@mui/material";
import UserProgress from "./components/user-progress/user-progress.component";
import MealsTable from "./components/meals-table/meals-table.component";
import { capitalize } from "../../utils/capitalize.util";
import { daysOfWeek } from "../../utils/const.util";

const MealsPage = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    const handleTabChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
        setSelectedDay(newValue);
    };
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Grid container spacing={2} padding={isMobile? 0.5 : 2} justifyContent="center" sx={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
        }}>

            <Grid item xs={12}>
                <Tabs
                    value={selectedDay}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="Days of the week"
                >
                    {daysOfWeek.map((day) => (
                        <Tab key={day} label={capitalize(day)} />
                    ))}
                </Tabs>
            </Grid>

            <Grid item xs={12}>
                <UserProgress selectedDay={daysOfWeek[selectedDay]} />
            </Grid>
            <Grid item xs={12}>
                <MealsTable selectedDay={daysOfWeek[selectedDay]} />
            </Grid>
        </Grid>
    );
};

export default MealsPage;
