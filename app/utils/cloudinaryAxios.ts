import axios from 'axios';

const cloudinaryAxios = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/dvj8v54gi/image/upload',
});

export default cloudinaryAxios;
