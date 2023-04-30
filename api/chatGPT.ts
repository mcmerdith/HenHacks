import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
const API_ENDPOINT = "https://api.openai.com/v1/";

export async function makeRequest(prompt: string) {
    // const configuration = new Configuration({
    //     //apiKey: process.env.OPENAI_API_KEY,
    //    apiKey: "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",
    // });
    // const openai = new OpenAIApi(configuration);
    // return openai.createCompletion({
    //     model: "gpt-3.5-turbo",
    //     prompt: prompt,
    //     temperature: 0,
    //     max_tokens: 7,
    //     n: 1,
    //});
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
