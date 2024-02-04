import axios from "axios";
import { OpenAI } from 'openai';

class OpenAIService {
  openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true
  });

  endpoint = "https://api.openai.com/v1/chat/completions";

  PARAMS = {
    temperature: 0.5,
    max_tokens: 256,
    model: 'gpt-3.5-turbo',
  }

  async getAnswer(input) {
    try {
      const data = { ...this.PARAMS, messages: [{role : 'user', content: input}], };

      const res = await axios.post(
        this.endpoint,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.openai.apiKey}`
          }
        }
      );
      console.log('res==', res.data)

      return res.data;
    } catch (error) {
      return null;
    }
  }
}

const openaiService = new OpenAIService();
export default openaiService; 