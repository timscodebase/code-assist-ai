<script lang="ts">
	let loading = $state(false)
	let data = $state({})

	const handleSubmit = async (e) => {
		const formData = new FormData(e.target)
		const content = formData.get('content')
		loading = true
		const res = await fetch(`/api/ollama?content=${content}`)
		data = await res.json()
		loading = false
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Ask the AI:
		<textarea name="content" />
	</label>
	<button>
		{#if loading}
			Loading...
		{:else}
			Ask
		{/if}
	</button>
</form>

{#if data}
	<p>{data?.message}</p>
{/if}

<style>
</style>
