"use client";
import { generateChatResponse } from "@/utils/chat.actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (data) {
        setMessages((prev) => [...prev, data]);
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

  console.log(messages)

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">Messages</h2>
      </div>
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
          <button className="btn btn-primary join-item" type="submit">
            Ask it!
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
