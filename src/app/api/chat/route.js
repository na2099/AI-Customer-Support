import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `I can perform the following tasks: 
1) Offer encouraging/validating words regarding your work: You're doing the thing!
2) Lighten the mood: I can offer a joke if you're feeling stressed out.
3) Help with errors: Send me your code and I can offer helpful hints
4) I can send you a TODO list for a component you're building`;

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY  // This is also the default, can be omitted
  });

  try {
    // Parse the incoming request JSON
    const data = await req.json();

    // Call OpenAI API using the new method for chat completions
    const { data: completionData } = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ensure this is the correct model ID
      messages: [{ role: 'system', content: systemPrompt }, ...data.messages],
    }).withResponse();

    // Process and return the response
    return NextResponse.json(completionData.choices.map(choice => ({
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
      error: error.message || 'An unknown error occurred',
      details: error.response?.data || {},
    }, {
      status: error.response?.status || 500,
    });
  }
}