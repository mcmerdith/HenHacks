import { Configuration, OpenAIApi } from "openai";

export function makeRequest(prompt: string) {
    const configuration = new Configuration({
        //apiKey: process.env.OPENAI_API_KEY,
        apiKey: "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"
    });
    const openai = new OpenAIApi(configuration);
    return openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        temperature: 0,
        max_tokens: 7,
        n: 1
    });
}
