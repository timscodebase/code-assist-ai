import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  getResponse: async ({request}) => {
    const formData = await request.formData();
    const content = String(formData.get('content'));

    let out = '';

    const message = { role: 'user', content };
    const res = await ollama.chat({ model: 'llama2', messages: [message], stream: true });
    for await (const part of res) {
      out = part.message.content
        .replace(/\\n/g, '')
        .replace(/"/g, '')
        .replace(/\\u0001/g, '')
        .replace(/\\u0002/g, '');
    }

    return {
      stream: {
        out
      }
    };
  }
}