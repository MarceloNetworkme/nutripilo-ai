// File path: src/components/UploadImageModal.tsx

import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import UploadImage from "../../../../components/upload-image/upload-image.component";
import { GridAddIcon } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close';

interface UploadImageModalProps {
    userId: string;
    dayOfTheWeek: string;
}

export default function InterpretMealButton({ userId, dayOfTheWeek }: UploadImageModalProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>

            <Button variant="outlined" color="primary" sx={{ mb: 2 }} endIcon={<GridAddIcon />} onClick={handleOpen}>
                Add Meal
            </Button>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Upload image and create meal</DialogTitle>
                <DialogContent dividers>
                    {/* Include the UploadImage component */}
                    <UploadImage userId={userId} dayOfTheWeek={dayOfTheWeek} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" endIcon={<CloseIcon/>}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
