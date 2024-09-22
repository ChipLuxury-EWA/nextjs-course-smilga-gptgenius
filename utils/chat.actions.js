"use server"

export const generateChatResponse = async (chatMessage) => {
    console.log(chatMessage)
    return "fooo"
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `GPTGenius: Your AI language companion. Powered by OpenAI, it enhances your conversations, content creation, and more!\n\nUser: ${chatMessage}\nGPTGenius:`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: ["\n"],
        }),
    });
    const data = await response.json();
    return data.choices[0].text;
}