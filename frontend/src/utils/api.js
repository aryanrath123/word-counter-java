import axios from 'axios';

const API_URL = '/api'; // Using proxy in package.json

export const countWords = async (text) => {
  const response = await axios.post(`${API_URL}/count`, text, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  return response.data;
};

export const getTextStats = async (text) => {
  // In a real app, this would call your backend
  // For now, we'll calculate client-side
  return {
    characterCount: text.length,
    sentenceCount: text.split(/[.!?]+/).filter(Boolean).length,
    paragraphCount: text.split(/\n\s*\n/).filter(Boolean).length,
    originalText: text
  };
};