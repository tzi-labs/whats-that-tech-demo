<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">What's That Tech?</h1>
    
    <form @submit.prevent="detectTech" class="mb-4">
      <div class="flex gap-2">
        <input 
          v-model="url" 
          type="url" 
          placeholder="Enter URL to analyze"
          class="flex-1 p-2 border rounded"
          required
        />
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          :disabled="loading"
        >
          {{ loading ? 'Analyzing...' : 'Analyze' }}
        </button>
      </div>
    </form>

    <div v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </div>

    <div v-if="results" class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">Detected Technologies:</h2>
      <pre class="whitespace-pre-wrap">{{ JSON.stringify(results, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
const url = ref('')
const results = ref(null)
const loading = ref(false)
const error = ref(null)

async function detectTech() {
  loading.value = true
  error.value = null
  results.value = null

  try {
    const response = await fetch('/api/detect-tech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url.value }),
    })

    if (!response.ok) {
      throw new Error('Failed to detect technologies')
    }

    const data = await response.json()
    results.value = data.data
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
