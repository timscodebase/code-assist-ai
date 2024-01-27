import { json } from '@sveltejs/kit'
import ollama from 'ollama'

async function newModel() {
  const modelfile = `
    FROM llama2
    SYSTEM "You are an expert Fullstack Developer that is helping a junior developer with Svelte, SvelteKit, TypeScript and JavaScript problems."
  `
  return await ollama.create({ model: 'coder-assist', modelfile: modelfile })
}

export async function GET({ url }) {
  const content = url.searchParams.get('content') || 'Hello'
  const model = newModel()
  const res = await ollama.chat({
    model,
    messages: [{ role: 'user', content, streaming: true }],
  })
  
  return json({ message: res.message.content })
}
