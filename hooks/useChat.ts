import { Message } from "@/components/ui/chat-message";
import { useRef, useState } from "react";

type TokenType = {
  type: "chunk";
  status: "generating" | "START" | "END";
  token: string;
};
export const useChat = () => {
  const [message, setMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const isNewMessageRef = useRef<boolean>(true);
  const [token, setToken] = useState<TokenType[]>([]);
  const sendMessage = (query: string) => {
    isNewMessageRef.current = true;
    startChat(query);
  };

  const createAssistantMessage = (chunk: string) => {
    console.log("Creating assistant message with chunk", {
      chunk,
      isNewMessage: isNewMessageRef.current ,
    });
    if (!isNewMessageRef.current || !chunk) return;
    isNewMessageRef.current = false;
    const newMessage = {
      id: String(messages.length + 1),
      role: "assistant",
      content: chunk,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const appendInLastAssistantMessage = (chunk: string) => {
    if (isNewMessageRef.current || !chunk) return;
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        const updatedMessage = { ...lastMessage, content: lastMessage.content + chunk };
        return [...prev.slice(0, -1), updatedMessage];
      }
      console.log("updating", { chunk });
      return prev;
    });
  };

  const startChat = (query: string) => {
    const es = new EventSource("http://localhost:5000/chat?query=" + query);
    es.onmessage = (event) => {
      setIsStreaming(true);
      const data = JSON.parse(event.data) as TokenType;
      setToken((prev) => [...prev, data]);
      if (data.token) setMessage((prev) => prev + data.token);
      createAssistantMessage(data.token);
      appendInLastAssistantMessage(data.token);
      setIsGenerating(false);
      if (data.status === "END") {
        setIsGenerating(false);
        // es.close()
      }
    };
    es.onerror = (error) => {
      console.log({ error });
      setIsStreaming(false);
      es.close();
    };
    es.onopen = () => {
      setIsGenerating(true);
    };
  };

  return {
    sendMessage,
    token,
    isGenerating,
    setIsGenerating,
    message,
    isStreaming,
    messages,
    setMessages,
  };
};
