export interface Message {
  role: "user" | "assistant" | "system";
  content: string | ImageContent[]
}

interface ImageContent {
  type: string
  text?: string
  image_url?: string
}