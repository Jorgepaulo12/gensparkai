import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const API_KEY = 'AIzaSyCMomum53-8g3gNVg-gwODv6exeLFL2jVQ';
const genAI = new GoogleGenerativeAI(API_KEY);

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const CONTEXT = `Olá! Fui criado com a BlueSpark e estou aqui para ajudar você. Vou fornecer respostas precisas e úteis para suas perguntas.`;

export async function generateResponse(prompt: string, image?: string): Promise<string> {
  try {
    const enhancedPrompt = `${CONTEXT}\n\nPergunta do usuário: ${prompt}`;

    if (image) {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const base64Image = image.split(',')[1];
      const imageData = {
        inlineData: {
          data: base64Image,
          mimeType: 'image/jpeg'
        }
      };

      const result = await model.generateContent([enhancedPrompt, imageData]);
      const response = await result.response;
      return response.text();
    } else {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        generationConfig,
        safetySettings,
      });

      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    }
  } catch (error) {
    console.error('Erro ao gerar resposta:', error);
    if (error instanceof Error) {
      throw new Error(`Falha ao gerar resposta: ${error.message}`);
    }
    throw new Error('Falha ao gerar resposta');
  }
}