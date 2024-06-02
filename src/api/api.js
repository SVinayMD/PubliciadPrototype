import axios from 'axios';

export const generateImage = async (data) => {
  try {
    const response = await axios.post('https://thompson-spreading-somewhere-brake.trycloudflare.com/sdapi/v1/txt2img', data);
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};