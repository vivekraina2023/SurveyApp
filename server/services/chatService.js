const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const chatService = {
  async processMessage(message) {
    try {
      const response = await hf.textGeneration({
        model: 'gpt2',
        inputs: message,
        parameters: {
          max_length: 150,
          temperature: 0.7,
        },
      });

      return response.generated_text;
    } catch (error) {
      console.error('HuggingFace API error:', error);
      throw new Error('Failed to process message');
    }
  }
};

module.exports = chatService; 