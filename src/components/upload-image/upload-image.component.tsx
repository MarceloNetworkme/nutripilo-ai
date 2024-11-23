import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { BlobStorageAPI } from "../../infra/blob-storage/blob-storage.infra";
import UploadButton from "./upload-button.component";
import { mealGenerationServiceOpenAI } from "../../services/openAI/meal-generation/mealsOpenAI.service";
import { mealsCosmosService } from "../../services/cosmos/meals/meals.service";
import { toast } from "react-toastify";
import type { Meal } from "../../services/openAI/meal-generation/models/meal-openAI.model";
import { mapMealToMealResponse } from "../mapper/generate-image-meal.mapper";
import type { MealResponse } from "../../infra/cosmos/meals/response/meals-response.model";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface CloudUploadProps {
    userId: string;
    dayOfTheWeek: string
}

export default function UploadImage({ userId, dayOfTheWeek }: CloudUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { mutateAsync, isPending: isGenerationPending } = mealGenerationServiceOpenAI.useMealImageGenerationOpenAI();
    const { mutateAsync: addMealMutateAsync } = mealsCosmosService.useCreateMeals();

    const handleMealGenerationByImage = async () => {
        //call service to generate meal~
        try {
            if (!uploadedUrl) {
                throw new Error("Uploaded URL is null");
            }
            toast.loading("Interpreting image and generating meal...");

            const generatedMeal: Meal = await mutateAsync({ imageUrl: uploadedUrl });
            console.log("generatedMeal", generatedMeal)
            //call service to presist meal in DB
            const mealResponse: MealResponse[] = mapMealToMealResponse(generatedMeal, userId, 'confirmed', dayOfTheWeek, uploadedUrl);
            addMealMutateAsync(mealResponse);
            toast.dismiss();
            toast.success("Meal generated and saved successfully!");
        } catch (error) {
            // toast with error
            toast.error("Failed to generate or save meal");
            console.error(error);
        }

    }

    const handleUpload = async (file: File) => {

        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const result = await BlobStorageAPI.uploadFile({
                file,
                userName: userId,
                containerCustomName: "meal-images",
                containerPath: "",
                setProgress,
            });

            if (result.success) {
                setUploadedUrl(result.imageUrl || "");
            } else {
                setError("Failed to upload the file. Please try again.");
            }
        } catch (err) {
            setError("An error occurred during the upload process.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            {uploading && (
                <Box sx={{ mt: 2 }}>
                    <CircularProgress value={progress} sx={{ mt: 2 }} />
                </Box>
            )}
            {uploadedUrl ? (
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Center align items horizontally
                        gap: 2, // Add spacing between items
                    }}
                >
                    <Button
                        onClick={handleMealGenerationByImage}
                        disabled={isGenerationPending}
                        variant="contained"
                        endIcon={<AutoAwesomeIcon />}
                    >
                        Click to estimate meal
                    </Button>
                    <img src={uploadedUrl} alt="Uploaded"
                        style={{
                            height: '250px',
                            width: 'auto',
                            display: 'block',
                            margin: '0 auto'
                        }} />
                    {/* <Typography variant="body1">File uploaded successfully:</Typography>
                    <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                        {uploadedUrl}
                    </a> */}

                </Box>
            ) : (<UploadButton
                onFileSelect={handleUpload}
                error={!!error}
                disabled={uploading}
                placeholder="Click to upload an image"
            />)}


            {error && (
                <Typography sx={{ mt: 2, color: "error.main" }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
}
