import {NextResponse} from 'next/server';
import { Configuration, OpenAIApi } from "openai";

const systemPrompt = "Your system prompt here";

export async function POST(req) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const data = await req.json();

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{role: 'system', content: systemPrompt}, ...data.messages],
    });

    return new NextResponse(JSON.stringify(completion.data.choices.map(choice => ({ content: choice.text }))), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {status: 500});
  }
}