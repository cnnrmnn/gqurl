import axios from 'axios';

export default async function request(url, data, config) {
  try {
    const response = await axios.post(url, data, config);
    console.dir(response.data, { depth: null });
  } catch (error) {
    console.dir(error.response.data, { depth: null });
  }
}
