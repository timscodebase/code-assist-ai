<script lang="ts">
	import ollama from 'ollama'

	let content = $state('Why is the sky blue?')
	let loading = $state(false)
	let answer = $state('')

	$effect(() => {
		const message = { role: 'user', content }
		ollama
			.chat({ model: 'llama2', messages: [message] })
			.then(async (res) => {
				for await (const part of res) {
					answer =
						answer +
						String(part.message.content)
							.replace(/\\n/g, '')
							.replace(/"/g, '')
							.replace(/\\u0001/g, '')
							.replace(/\\u0002/g, '')
				}
			})
			.finally(() => {
				loading = false
			})
	})

	const handleSubmit = async (e) => {
		const formData = new FormData(e.target)
		content = String(formData.get('content'))
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Ask the AI:
		<textarea name="content" />
	</label>
	<button type="submit" disabled={loading}>
		{#if loading}
			Loading...
		{:else}
			Ask
		{/if}
	</button>
</form>

{#await answer}
	<p>wait</p>
{:then data}
	<p>{data}</p>
{/await}

<style>
</style>
