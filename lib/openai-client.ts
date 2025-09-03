// OpenAI client for AI chat integration
// Note: In production, install openai package via: npm install openai ai

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export class OpenAIClient {
  private apiKey: string
  private model: string
  private baseURL: string

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
    this.model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    this.baseURL = 'https://api.openai.com/v1'
  }

  async createChatCompletion(messages: OpenAIMessage[], stream: boolean = false): Promise<string | ReadableStream> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          max_tokens: 500,
          temperature: 0.7,
          stream,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      if (stream) {
        return response.body as ReadableStream
      } else {
        const data: OpenAIResponse = await response.json()
        return data.choices[0]?.message?.content || 'Sorry, I encountered an error. Please try again.'
      }
    } catch (error) {
      console.error('OpenAI API Error:', error)
      throw new Error('Failed to get response from OpenAI')
    }
  }
}