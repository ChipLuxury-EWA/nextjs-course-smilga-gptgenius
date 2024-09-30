"use client";
import { generateChatResponse } from "@/utils/chat.actions";
import { fetchUserTokenById, subtractTokens } from "@/utils/token.actions";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
  const { userId } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentUserTokens = await fetchUserTokenById(userId);
      if (currentUserTokens < 100) {
        toast.error("Not enough tokens");
        return null;
      }
      const response = await generateChatResponse([...messages, query]);
      if (response) {
        const { message, usedTokens } = response;
        setMessages((prev) => [...prev, message]);
        const newTokens = await subtractTokens(userId, usedTokens);
        console.log(newTokens);
        toast.success(`You have ${newTokens} tokens left.`);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  const DynamicMessagesList = () => {
    return messages.map(({ role, content }, index) => {
      const avatar = role === "user" ? "👤" : "🤖";
      const chatSide = role === "user" ? "chat-start" : "chat-end";
      const chatColor = role === "user" ? "chat-bubble-primary" : "chat-bubble-secondary";

      return (
        <div className={`chat ${chatSide}`} key={content + index}>
          <div className={`chat-bubble ${chatColor} join`}>
            <span className="mr-4">{avatar}</span>
            <p className="max-w-3xl">{content}</p>
          </div>
        </div>
      );
    });
  };

  const ChatBotLoader = () => {
    if (isPending)
      return (
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-secondary w-32 flex justify-center">
            {/* <span className="mr-4">🤖</span> */}
            <div className="loading loading-dots" />
          </div>
        </div>
      );
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <ul>
        <DynamicMessagesList />
        <ChatBotLoader />
      </ul>
      <form className="max-w-4xl pt-12" onSubmit={handleSubmit}>
        <div className="join w-full ">
          <input
            className="input input-bordered join-item w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message..."
            type="text"
            required
          />
          <button className="btn btn-primary join-item" type="submit" disabled={isPending}>
            Ask it!
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
