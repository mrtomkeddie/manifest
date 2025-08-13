
import { genkit, GenerationCommonConfigSchema } from 'genkit';
import openAI from '@genkit-ai/compat-oai';
import { ModelInfo } from 'genkit/model';
import { z } from 'zod';

const chatInfo: ModelInfo = {
  label: 'DeepSeek Chat',
  supports: { multiturn: true, tools: true, media: false, systemRole: true, output: ['text', 'json'] },
};

const reasonerInfo: ModelInfo = {
  label: 'DeepSeek Reasoner',
  supports: { multiturn: true, tools: true, media: false, systemRole: true, output: ['text', 'json'] },
};
const schema = GenerationCommonConfigSchema.extend({});

export const ai = genkit({
  plugins: [
    openAI({
      apiKey: process.env.DEEPSEEK_API_KEY!,
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      models: [
        { name: 'deepseek-chat', info: chatInfo, configSchema: schema },
        { name: 'deepseek-reasoner', info: reasonerInfo, configSchema: schema },
      ],
    }),
  ],
  model: 'openai/deepseek-chat',
  telemetry: {
    instrumentation: {
      llm: true,
    },
  },
});
