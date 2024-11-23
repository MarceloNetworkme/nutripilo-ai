import { Button} from "@mui/material";
import { FAIcon } from "../fa-icon";

export interface UploadButtonProps {
    error?: boolean;
    disabled?: boolean;
    onFileSelect: (file: File) => void;
    placeholder?: string;
}

export default function UploadButton({
    disabled,
    onFileSelect,
}: UploadButtonProps) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <Button
            variant="contained"
            size="large"
            component="label"
            disabled={disabled}
        >
            Upload meal
            <FAIcon icon="upload" fontSize='inherit' sx={{ mb: 1, ml: 1 }} />
            <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                disabled={disabled}
            />
        </Button>
    );
}
