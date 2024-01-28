import { json } from '@sveltejs/kit'
import ollama from 'ollama'

export async function GET({ url }) {
  let out = ''
  const content = url.searchParams.get('content') || 'Hello'
  const message = { role: 'user', content }
  const res = await ollama.chat({ model: 'llama2', messages: [message], stream: true })
  for await (const part of res) {
    out = out + JSON.stringify(part.message.content)
  }

  const regex = out.replace(/\\n/g, '').replace(/"/g, '').replace(/\\u0001/g, '').replace(/\\u0002/g, '')
  
  return json({ message: regex })
}
