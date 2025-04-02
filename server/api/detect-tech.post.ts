import { findTech } from 'whats-that-tech';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { url, urls } = body;

    // Handle both single URL and array of URLs
    const urlsToAnalyze = urls || (url ? [url] : []);
    
    if (urlsToAnalyze.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'At least one URL is required'
      });
    }

    console.log('Processing URLs:', urlsToAnalyze); // Debug log

    const results = await Promise.all(
      urlsToAnalyze.map(async (urlToAnalyze: string) => {
        console.log('Analyzing URL:', urlToAnalyze); // Debug log
        const techResults = await findTech({
          url: urlToAnalyze,
          categories: ['framework', 'cms', 'language', 'database', 'server', 'devops', 'ci-cd', 'cloud'],
          headless: true,
          timeout: 30000,
          onProgress: (progress) => {
            console.log(`Processing ${urlToAnalyze}: ${progress.currentUrl}`);
          }
        });

        return {
          url: urlToAnalyze,
          technologies: techResults.map(tech => ({
            name: tech.name,
            category: tech.categories[0] || 'unidentified',
            detected: tech.detected,
            confidence: tech.detected ? 0.8 : 0.2
          }))
        };
      })
    );

    console.log('Results:', results); // Debug log

    return {
      success: true,
      data: results
    };
  } catch (error) {
    console.error('Error:', error); // Debug log
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to detect technologies'
    });
  }
}); 