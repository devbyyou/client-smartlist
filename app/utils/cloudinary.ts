/* eslint-disable no-console */
import cloudinaryAxios from './cloudinaryAxios';

const uploadImage = async (formData: FormData) : Promise<string> => {
  try {
    const response = await cloudinaryAxios.post('/', formData);
    const results = response.data;
    const logo = results.secure_url;
    return logo;
  } catch (error) {
    console.error('Error during Axios request:', error);
    throw error;
  }
};

export default uploadImage;
