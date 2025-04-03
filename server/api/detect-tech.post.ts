import { findTech } from 'whats-that-tech-js-sdk';
import { join } from 'path';

export default defineEventHandler(async (event) => {
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

  // Set headers for streaming
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendEvent = (data: any) => {
    return event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // Send initial state
    sendEvent({ type: 'start', urls: urlsToAnalyze });

    // Process each URL
    for (const urlToAnalyze of urlsToAnalyze) {
      let currentResults: any[] = [];
      
      const techResults = await findTech({
        url: urlToAnalyze,
        categories: ['framework', 'cms', 'language', 'database', 'server', 'devops', 'ci-cd', 'cloud'],
        headless: true,
        timeout: 30000,
        customFingerprintsDir: join(process.cwd(), 'node_modules/whats-that-tech-core'),
        onProgress: (progress) => {
          // Send progress updates
          sendEvent({ 
            type: 'progress',
            url: urlToAnalyze,
            progress
          });
        }
      });

      // Send URL results
      sendEvent({
        type: 'urlComplete',
        url: urlToAnalyze,
        technologies: techResults.map(tech => ({
          name: tech.name,
          category: tech.categories[0] || 'unidentified',
          detected: tech.detected,
          confidence: tech.detected ? 0.8 : 0.2
        }))
      });
    }

    // Send completion event
    sendEvent({ type: 'complete' });
    event.node.res.end();

  } catch (error) {
    // Send error event
    sendEvent({ 
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to detect technologies'
    });
    event.node.res.end();
  }
}); 