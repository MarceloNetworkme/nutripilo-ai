import { Box, Paper, TextField, IconButton, CircularProgress, Typography, Stack, } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatStore } from "./chat.store";
import { ChatService } from "./chat.service";

export default function Chat() {
  const useSendMessage = ChatService.useSendMessage();
  const { messages, input, setInput, isPending} = ChatStore.useChatStore();
  return (
    <Box display="flex" flexDirection="column" maxWidth="md" marginLeft={0} p={2}>
      <Box flex={1} overflow="auto" mb={2} display="flex" flexDirection="column" gap={2}>
        {messages.map((message, index) => (
          <Paper
            key={`${message.role}-${index}`}
            sx={{
              p: 2,
              maxWidth: "80%",
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              bgcolor: message.role === "user" ? "primary.main" : "grey.300",
              color:
                message.role === "user" ? "primary.contrastText" : "text.primary",
            }}
          >
            {!Array.isArray(message.content) && (<Typography>{message.content}</Typography>)}
          </Paper>
        ))}
        {isPending && (
          <Box alignSelf="flex-start" p={2}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
      <form onSubmit={(e) => { e.preventDefault(); useSendMessage(); }}>
        <Stack direction="row" spacing={1}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            fullWidth
            variant="outlined"
            size="small"
            disabled={isPending} />
          <IconButton type="submit" color="primary" disabled={isPending || !input.trim()}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
};