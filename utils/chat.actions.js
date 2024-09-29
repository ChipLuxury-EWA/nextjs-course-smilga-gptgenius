"use server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, ...chatMessages],
      model: "gpt-3.5-turbo-0125",
      temperature: 0.8,
      max_tokens: 100,
    });
    const { message } = response.choices[0];
    return message;
  } catch (error) {
    console.error(error);
    return null;
  }
};
