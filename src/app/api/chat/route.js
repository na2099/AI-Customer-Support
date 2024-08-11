import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

// Ensure you have a system prompt defined or use an empty string
const systemPrompt = 'Your system prompt here';

export async function POST(req) {
  // Initialize OpenAI configuration
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    // Parse the incoming request JSON
    const data = await req.json();

    // Call OpenAI API
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Ensure this is the correct model ID
      messages: [{ role: 'system', content: systemPrompt }, ...data.messages],
    });

    // Process and return the response
    return NextResponse.json(completion.data.choices.map(choice => ({
      content: choice.message?.content || '',
    })), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error in OpenAI API call:', error);

    // Enhanced error response with details
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
      details: error.response?.data || {},
    }, {
      status: error.response?.status || 500,
    });
  }
}