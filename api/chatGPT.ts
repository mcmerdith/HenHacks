import axios from "axios";

export async function makeRequest(prompt: string) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
    };

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
    };

    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        { headers },
    );

    return response.data.choices[0].message.content;
}
