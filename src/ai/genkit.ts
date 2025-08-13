'use server';

import {genkit} from 'genkit';
import {openAI} from '@genkit-ai/openai';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    // The Google AI plugin is also available and can be used with a valid API key.
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || '',
    }),
  ],
  // We define the models we want to use, giving them a friendly name.
  models: [
    {
      name: 'gemini-1.5-flash',
      path: 'googleai/gemini-1.5-flash-latest',
    },
  ],
  // The default model to use for generation requests.
  model: 'gemini-1.5-flash',
  // Telemetry is enabled for debugging and monitoring.
  telemetry: {
    instrumentation: {
      llm: true,
    },
  },
});
