import { findTech } from 'whats-that-tech';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { url } = body;

    if (!url) {
      throw createError({
        statusCode: 400,
        message: 'URL is required'
      });
    }

    const results = await findTech({
      url,
      categories: ['framework', 'cms', 'language', 'database', 'server', 'devops', 'ci-cd', 'cloud'],
      headless: true,
      timeout: 30000,
      onProgress: (progress) => {
        console.log(`Processing: ${progress.currentUrl}`);
      }
    });

    return {
      success: true,
      data: results
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to detect technologies'
    });
  }
}); 