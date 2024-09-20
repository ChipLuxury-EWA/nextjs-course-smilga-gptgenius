"use client";
import { useState } from "react";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, text]);
    setText("");
  };
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
