'use server';

import { genkit } from 'genkit';
import openAI, { GenerationCommonConfigSchema } from '@genkit-ai/compat-oai';
import { ModelInfo } from 'genkit/model';
import { z } from 'genkit';

// 1) Model capabilities (minimal but accurate for DeepSeek chat/reasoner)
const chatInfo: ModelInfo = {
  label: 'DeepSeek Chat',
  supports: { multiturn: true, tools: true, media: false, systemRole: true, output: ['text', 'json'] },
};

const reasonerInfo: ModelInfo = {
  label: 'DeepSeek Reasoner',
  supports: { multiturn: true, tools: true, media: false, systemRole: true, output: ['text', 'json'] },
};

// 2) Optional per-model config schema (use if you need extra params later)
const schema = GenerationCommonConfigSchema.extend({
  // Add DeepSeek-specific toggles if you plan to use them
});

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
  // Make DeepSeek your default
  model: 'openai/deepseek-chat',
  telemetry: {
    instrumentation: {
      llm: true,
    },
  },
});
