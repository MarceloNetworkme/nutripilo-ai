import { Box, Card, CardContent, Typography, Stepper, Step, StepLabel, Paper, Container, SvgIcon } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import "react-toastify/dist/ReactToastify.css";
import Chat from "./components/chat/chat.page";

interface StepConfig {
    id: string;
    label: string;
    icon: typeof ChatBubbleOutlineIcon | typeof FitnessCenterIcon | typeof RestaurantIcon;
}

// Custom StepIcon component wrapper
const CustomStepIcon = (IconComponent: StepConfig['icon']) => {
    return function CustomIcon() {


        return (
            <SvgIcon component={IconComponent} />
        );
    };
};

const steps: readonly StepConfig[] = [
    {
        id: 'personal',
        label: 'Personal Information',
        icon: ChatBubbleOutlineIcon
    },
    {
        id: 'fitness',
        label: 'Fitness Goals',
        icon: FitnessCenterIcon
    },
    {
        id: 'dietary',
        label: 'Dietary Preferences',
        icon: RestaurantIcon
    }
];


export default function Onboarding() {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                {/* Welcome Card */}
                <Card sx={{ mb: 1, bgcolor: 'primary.main', color: 'white' }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <ChatBubbleOutlineIcon fontSize="large" />
                            <Typography variant="h4" component="h1">
                                Welcome to NutriPilot.AI
                            </Typography>
                        </Box>
                        <Typography variant="body1">
                            Let's create your personalized meal plan! Our AI assistant will guide you through a few questions about your goals and preferences. This will help us design the <strong>perfect nutrition plan for you</strong>.
                        </Typography>
                        <Typography variant="body2" sx={{mt:2}}>
                        <strong> Example:</strong> I'm Marcelo, a 28-year-old male who is 180cm tall and weighs 82kg. I'm following a no preferences and my main goal is weight loss. I prefer to have two meals a day: breakfast, lunch, and dinner.
                        </Typography>
                    </CardContent>
                </Card>

                {/* Information Steps */}
                <Box sx={{ mb: 1, bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                        We'll ask you about:
                    </Typography>
                    <Stepper nonLinear activeStep={-1} alternativeLabel>
                        {steps.map((step) => (
                            <Step key={step.id}>
                                <StepLabel StepIconComponent={CustomStepIcon(step.icon)}>{step.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Chat Interface */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'background.default',
                        minHeight: '200px'
                    }}
                >
                    <Chat />
                </Paper>
            </Box>
        </Container>
    );
}