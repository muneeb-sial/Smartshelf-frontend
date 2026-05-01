"use client"
import AI_Input_Search from "@/components/kokonutui/ai-input-search"
import { CopyButton } from "@/components/ui/copy-button"
import { MessageList } from "@/components/ui/message-list"
import { useChat } from "@/hooks/useChat"
import { Share, ThumbsDown, ThumbsUp } from "lucide-react"

const ChatPage = () => {
  const { messages, sendMessage, isGenerating ,setIsGenerating,setMessages } = useChat()
  const addUserMessage = (message: string) => {
    setMessages((prev) => [...prev, { id: messages.length.toString() + 1, role: "user", content: message }])
  }

  return (
    <div className="max-w-5xl mx-auto h-screen flex justify-between flex-col p-2">
      <div className="h-[calc(100%-80px)] overflow-auto py-8 no-scrollbar">

        <MessageList
          messageOptions={{
            animation: "scale",
            actions: <Actions />,
            showTimeStamp: true,
          }}
          isTyping={isGenerating}
          messages={messages}
          showTimeStamps
        />
      </div>
      <div className="">

        <AI_Input_Search
          isLoading={isGenerating}
          onSubmit={(value) => {
            if (!value.trim()) return;
            sendMessage(value)
            addUserMessage(value)
            setIsGenerating(true)
          }}

        />
      </div>
    </div>
  )
}

const Actions = () => {
  return <div className="flex gap-3 p-1 relative items-center">
    <ThumbsUp className="size-3.5 text-gray-500 hover:text-gray-700 cursor-pointer" />
    <ThumbsDown className="size-3.5 text-gray-500 hover:text-gray-700 cursor-pointer" />
    <CopyButton content="" />
    <Share className="size-3.5 text-gray-500 hover:text-gray-700 cursor-pointer" />
  </div>
}

export default ChatPage
