<template>
  <div class="min-h-screen bg-gradient-to-b from-red-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <!-- Add navigation bar -->
    <nav class="fixed top-0 right-0 p-4 z-50">
      <div class="flex items-center gap-4">
        <a 
          href="https://github.com/tzi-labs/whats-that-tech-demo" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
        >
          <UIcon name="i-simple-icons-github" class="w-6 h-6" />
        </a>
        <a 
          href="https://x.com/Joe_Elia" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
        >
          <UIcon name="i-simple-icons-x" class="w-6 h-6" />
        </a>
      </div>
    </nav>

    <UContainer class="py-8">
      <div class="max-w-xl mx-auto">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" class="w-16 h-16 animate-bounce" />
          </div>
          <h1 class="text-4xl font-bold mb-2 text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_0_rgb(37_99_235),_-2px_-2px_0_rgb(37_99_235),_2px_-2px_0_rgb(37_99_235),_-2px_2px_0_rgb(37_99_235)]">
            What's That Tech?
          </h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 font-medium">
            Gotta catch 'em all! Analyze any website to discover the technologies it's using
          </p>
          
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <!-- API Features Column -->
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p class="font-medium mb-2">A more robust demo is coming soon! The API supports:</p>
              <ul class="space-y-1 text-left list-disc list-inside">
                <li>Multiple detection methods (global variables, selectors, network requests)</li>
                <li>Category filtering (frameworks, CMS, analytics, etc.)</li>
                <li>Custom fingerprints support</li>
                <li>Progress tracking and timeouts</li>
                <li>Headless mode configuration</li>
              </ul>
            </div>

            <!-- Contribution Column -->
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p class="font-medium mb-2">Want to contribute? There are two ways to help:</p>
              <div class="space-y-4 text-left">
                <div>
                  <h3 class="font-medium text-yellow-600 dark:text-yellow-400">1. Add New Tech Fingerprints:</h3>
                  <p class="ml-4 mt-1">Clone the core repo locally with <code class="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">pnpm setup:local</code>, add your fingerprint JSON files, and create a PR at <a href="https://github.com/tzi-labs/whats-that-tech-core" class="text-blue-500 hover:underline" target="_blank">whats-that-tech-core</a>.</p>
                </div>
                <div>
                  <h3 class="font-medium text-yellow-600 dark:text-yellow-400">2. Improve the SDK:</h3>
                  <p class="ml-4 mt-1">Fork the <a href="https://github.com/tzi-labs/whats-that-tech-js-sdk" class="text-blue-500 hover:underline" target="_blank">JS SDK repository</a>, make your changes, and submit a PR to enhance the detection engine.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-4 mt-6">
            <button
              v-for="(test, index) in tests"
              :key="index"
              @click="loadTest(index + 1)"
              class="px-6 py-3 text-lg font-bold text-yellow-400 rounded-lg transition-all transform hover:scale-105 [text-shadow:_1px_1px_0_rgb(37_99_235),_-1px_-1px_0_rgb(37_99_235),_1px_-1px_0_rgb(37_99_235),_-1px_1px_0_rgb(37_99_235)] hover:text-yellow-300"
            >
              Test {{ index + 1 }}
            </button>
          </div>
        </div>

        <UCard class="mb-6 border-4 border-yellow-400 dark:border-yellow-500 shadow-lg">
          <form @submit.prevent="detectTech">
            <div class="flex flex-col gap-4">
              <div class="flex gap-2">
                <UInput
                  v-model="url"
                  type="url"
                  placeholder="Enter URL to analyze (e.g., https://example.com)"
                  class="flex-1"
                  :ui="{ 
                    base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-0 focus:ring-offset-0',
                    padding: { sm: 'px-4 py-4' },
                    size: { sm: 'text-lg' },
                    background: 'bg-white dark:bg-gray-800',
                    border: 'border-2 border-gray-300 dark:border-gray-700',
                    ring: 'focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400',
                    rounded: 'rounded-lg',
                    placeholder: 'placeholder-gray-500 dark:placeholder-gray-400',
                    color: 'text-gray-900 dark:text-white font-medium'
                  }"
                  required
                />
                <UButton
                  type="button"
                  color="gray"
                  variant="solid"
                  @click="addUrl"
                >
                  Add URL
                </UButton>
              </div>

              <div v-if="urls.length > 0" class="space-y-2">
                <div v-for="(url, index) in urls" :key="index" class="flex items-center gap-2">
                  <UInput
                    v-model="urls[index]"
                    type="url"
                    placeholder="Enter another URL"
                    class="flex-1"
                    :ui="{ 
                      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 focus:ring-0 focus:ring-offset-0',
                      padding: { sm: 'px-4 py-4' },
                      size: { sm: 'text-lg' },
                      background: 'bg-white dark:bg-gray-800',
                      border: 'border-2 border-gray-300 dark:border-gray-700',
                      ring: 'focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400',
                      rounded: 'rounded-lg',
                      placeholder: 'placeholder-gray-500 dark:placeholder-gray-400',
                      color: 'text-gray-900 dark:text-white font-medium'
                    }"
                    required
                  />
                  <UButton
                    type="button"
                    color="red"
                    variant="solid"
                    @click="removeUrl(index)"
                  >
                    Remove
                  </UButton>
                </div>
              </div>

              <UButton
                type="submit"
                :loading="loading"
                :disabled="loading"
                color="yellow"
                variant="solid"
                class="font-bold"
                :class="{ 'animate-bounce': highlightCatch }"
              >
                {{ loading ? 'Analyzing...' : 'Catch!' }}
              </UButton>
            </div>
          </form>
        </UCard>

        <UAlert
          v-if="error"
          type="error"
          title="Error"
          :description="error"
          class="mb-6"
        />
      </div>

      <div v-if="results" class="w-full md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Transition
          v-for="result in results" 
          :key="result.url"
          enter-active-class="transition duration-500"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <UCard 
            :data-url="result.url"
            class="overflow-hidden border-4 border-yellow-400 dark:border-yellow-500 shadow-lg transform transition-all duration-300" 
            :class="{
              'scale-100 opacity-100': !result.analyzing || result.technologies.length > 0,
              'scale-95 opacity-90': result.analyzing && result.technologies.length === 0
            }"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-red-600 dark:text-red-400">
                  {{ result.url }}
                </h2>
                <div class="flex items-center gap-2">
                  <div v-if="result.analyzing" class="flex items-center gap-2 text-yellow-500 dark:text-yellow-400 animate-pulse">
                    <UIcon name="i-heroicons-signal" class="w-5 h-5" />
                    <span class="text-sm font-medium">Analyzing...</span>
                  </div>
                  <UBadge color="yellow" variant="solid" class="font-bold">
                    {{ result.technologies.length }} technologies checked
                  </UBadge>
                </div>
              </div>
            </template>

            <div v-if="result.analyzing && result.technologies.length === 0" class="py-8">
              <div class="flex flex-col items-center justify-center gap-3">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" class="w-12 h-12 animate-bounce" />
                <p class="text-sm text-gray-600 dark:text-gray-400">Catching technologies...</p>
              </div>
            </div>

            <div v-else class="space-y-4">
              <!-- Detected Technologies -->
              <TransitionGroup 
                name="tech-item"
                tag="div"
                class="space-y-4"
              >
                <div v-for="tech in [...result.technologies].filter(t => t.detected).sort((a, b) => b.confidence - a.confidence)" 
                  :key="tech.name" 
                  class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <UIcon
                      :name="getCategoryIcon(tech.category)"
                      class="w-6 h-6 text-green-500 dark:text-green-400"
                    />
                    <div>
                      <h3 class="font-medium text-gray-900 dark:text-white">{{ tech.name }}</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ tech.category }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <UBadge
                      color="green"
                      variant="solid"
                      class="font-bold"
                    >
                      Detected
                    </UBadge>
                    <UBadge
                      :color="getConfidenceColor(tech.confidence)"
                      variant="solid"
                      class="font-bold"
                    >
                      {{ Math.round(tech.confidence * 100) }}% match
                    </UBadge>
                  </div>
                </div>
              </TransitionGroup>

              <!-- Undetected Technologies -->
              <div v-if="result.technologies.some(t => !t.detected)" class="mt-6">
                <UButton
                  color="gray"
                  variant="ghost"
                  class="w-full"
                  @click="result.showUndetected = !result.showUndetected"
                >
                  <template #leading>
                    <UIcon
                      :name="result.showUndetected ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                      class="w-5 h-5"
                    />
                  </template>
                  {{ result.showUndetected ? 'Hide Undetected Technologies' : 'Show Undetected Technologies' }}
                  <template #trailing>
                    <UBadge color="gray" variant="solid" class="ml-2">
                      {{ result.technologies.filter(t => !t.detected).length }}
                    </UBadge>
                  </template>
                </UButton>

                <div v-if="result.showUndetected" class="mt-4">
                  <TransitionGroup 
                    name="tech-item"
                    tag="div"
                    class="space-y-4"
                  >
                    <div v-for="tech in [...result.technologies].filter(t => !t.detected).sort((a, b) => b.confidence - a.confidence)" 
                      :key="tech.name" 
                      class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    >
                      <div class="flex items-center gap-3">
                        <UIcon
                          :name="getCategoryIcon(tech.category)"
                          class="w-6 h-6 text-red-500 dark:text-red-400"
                        />
                        <div>
                          <h3 class="font-medium text-gray-900 dark:text-white">{{ tech.name }}</h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ tech.category }}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <UBadge
                          color="gray"
                          variant="solid"
                          class="font-bold"
                        >
                          Not Detected
                        </UBadge>
                        <UBadge
                          :color="getConfidenceColor(tech.confidence)"
                          variant="solid"
                          class="font-bold"
                        >
                          {{ Math.round(tech.confidence * 100) }}% match
                        </UBadge>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
            </div>
          </UCard>
        </Transition>
      </div>

      <div v-if="rawResults" class="mt-6 max-w-3xl mx-auto">
        <UButton
          color="gray"
          variant="ghost"
          class="w-full"
          @click="showRawData = !showRawData"
        >
          <template #leading>
            <UIcon
              :name="showRawData ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
              class="w-5 h-5"
            />
          </template>
          {{ showRawData ? 'Hide Raw Data' : 'Show Raw Data' }}
        </UButton>

        <div v-if="showRawData" class="mt-4">
          <UCard class="bg-gray-50 dark:bg-gray-800">
            <pre class="p-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ JSON.stringify(rawResults, null, 2) }}</pre>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style>
.tech-item-enter-active,
.tech-item-leave-active {
  transition: all 0.3s ease;
}

.tech-item-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.tech-item-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.tech-item-move {
  transition: transform 0.3s ease;
}

@keyframes card-pop {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.card-detected {
  animation: card-pop 0.5s ease-out forwards;
}
</style>

<script setup>
const url = ref('')
const urls = ref([])
const results = ref(null)
const rawResults = ref(null)
const loading = ref(false)
const error = ref(null)
const showRawData = ref(false)
const highlightCatch = ref(false)
const { gtag } = useGtag()

const tests = [
  {
    urls: ['https://nuxt.com/']
  },
  {
    urls: ['https://nextjs.org/', 'https://wix.com']
  },
  {
    urls: ['https://supersaas.dev/', 'https://www.facebook.com', 'https://www.netflix.com']
  }
]

function loadTest(testNumber) {
  const test = tests[testNumber - 1]
  if (test) {
    url.value = test.urls[0]
    urls.value = test.urls.slice(1)
    highlightCatch.value = true
    setTimeout(() => {
      highlightCatch.value = false
    }, 2000)

    // Track test button click
    gtag('event', 'test_button_click', {
      test_number: testNumber,
      urls: test.urls
    })
  }
}

function addUrl() {
  if (url.value) {
    urls.value.push(url.value)
    url.value = ''
  }
}

function removeUrl(index) {
  urls.value.splice(index, 1)
}

function getCategoryIcon(category) {
  const icons = {
    framework: 'i-heroicons-code-bracket',
    cms: 'i-heroicons-document-text',
    language: 'i-heroicons-code-bracket-square',
    database: 'i-heroicons-database',
    server: 'i-heroicons-server',
    devops: 'i-heroicons-wrench-screwdriver',
    'ci-cd': 'i-heroicons-arrow-path',
    cloud: 'i-heroicons-cloud'
  }
  return icons[category] || 'i-heroicons-cube'
}

function getConfidenceColor(confidence) {
  if (confidence >= 0.8) return 'green'
  if (confidence >= 0.6) return 'yellow'
  return 'red'
}

async function detectTech() {
  loading.value = true
  error.value = null
  results.value = []
  rawResults.value = null

  // Track catch button click with domains
  const urlsToAnalyze = [url.value, ...urls.value].filter(Boolean)
  gtag('event', 'catch_button_click', {
    domains: urlsToAnalyze.map(url => new URL(url).hostname)
  })

  try {
    const response = await fetch('/api/detect-tech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({ 
        urls: urlsToAnalyze
      })
    });

    if (!response.ok) {
      throw new Error('Failed to start analysis');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');
      
      for (const line of lines) {
        if (!line.trim() || !line.startsWith('data: ')) continue;
        
        const data = JSON.parse(line.slice(6));
        
        switch (data.type) {
          case 'start':
            // Initialize results array with empty technology arrays
            results.value = data.urls.map(url => ({
              url,
              technologies: [],
              showUndetected: false,
              analyzing: true
            }));
            break;

          case 'progress':
            // Update progress for specific URL
            console.log('Progress:', data.progress);
            break;

          case 'urlComplete':
            // Update technologies for the completed URL
            const resultIndex = results.value.findIndex(r => r.url === data.url);
            if (resultIndex !== -1) {
              // First update the analyzing state
              results.value[resultIndex].analyzing = false;
              
              // Add a slight delay before showing technologies for a nice animation effect
              setTimeout(() => {
                results.value[resultIndex].technologies = data.technologies;
                // Add card-detected class temporarily
                const card = document.querySelector(`[data-url="${data.url}"]`);
                if (card) {
                  card.classList.add('card-detected');
                  setTimeout(() => card.classList.remove('card-detected'), 500);
                }

                // Track successful detection
                const detectedTechs = data.technologies.filter(t => t.detected);
                gtag('event', 'tech_detection_success', {
                  url: data.url,
                  total_technologies: data.technologies.length,
                  detected_count: detectedTechs.length,
                  detected_technologies: detectedTechs.map(t => ({
                    name: t.name,
                    confidence: Math.round(t.confidence * 100)
                  }))
                });
              }, 300);
            }
            break;

          case 'complete':
            loading.value = false;
            // Track overall completion
            gtag('event', 'analysis_complete', {
              total_urls: urlsToAnalyze.length,
              successful_urls: results.value.filter(r => !r.analyzing).length,
              total_technologies_detected: results.value.reduce((sum, r) => sum + r.technologies.filter(t => t.detected).length, 0)
            });
            return;

          case 'error':
            error.value = data.message;
            loading.value = false;
            // Track error
            gtag('event', 'tech_detection_error', {
              error_message: data.message,
              urls: urlsToAnalyze
            });
            return;
        }
      }
    }

  } catch (e) {
    console.error('Error:', e);
    error.value = e.message;
    loading.value = false;
    // Track error
    gtag('event', 'tech_detection_error', {
      error_message: e.message,
      urls: urlsToAnalyze
    });
  }
}
</script>
