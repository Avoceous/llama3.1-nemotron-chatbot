import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

export async function POST(req: Request) {
  if (!process.env.NVIDIA_API_KEY) {
    return NextResponse.json({ error: 'NVIDIA API key is not set' }, { status: 500 })
  }

  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-70b-instruct",
      messages: [{ role: "user", content: message }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'

    return NextResponse.json({ message: reply })
  } catch (error: any) {
    console.error('NVIDIA API error:', error)
    
    if (error.status === 402) {
      return NextResponse.json({ 
        error: 'NVIDIA API quota exceeded or payment required. Please check your API key and usage limits.',
        details: error.message
      }, { status: 402 })
    }

    return NextResponse.json({ 
      error: 'An error occurred while processing your request',
      details: error.message
    }, { status: 500 })
  }
}
