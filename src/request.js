import axios from 'axios';

export default async function request(url, data, config) {
  try {
    const response = await axios.post(url, data, config);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(JSON.stringify(error.response.data, null, 2));
  }
}
