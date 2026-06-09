import { z } from "zod";

export const SophiaModeSchema = z.enum(["geral", "coroinhas"]);
export type SophiaMode = z.infer<typeof SophiaModeSchema>;

export const MessageRoleSchema = z.enum(["user", "assistant", "system"]);
export type MessageRole = z.infer<typeof MessageRoleSchema>;

export const ChatPartSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
}).passthrough();

export const MessageSchema = z.object({
  id: z.string().optional(),
  role: MessageRoleSchema,
  parts: z.array(ChatPartSchema).min(1),
});
export type ChatMessage = z.infer<typeof MessageSchema>;

export const ChatRequestSchema = z.object({
  mode: SophiaModeSchema.optional().default("geral"),
  messages: z.array(MessageSchema).min(1).max(100),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export interface ChatState {
  messages: ChatMessage[];
  status: 'idle' | 'submitted' | 'streaming' | 'error';
  error?: string;
}
