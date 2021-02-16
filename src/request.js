import axios from 'axios';

export default async function request(url, data, config, all) {
  try {
    const response = await axios.post(url, data, config);
    console.log(all ? response : JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(
      all ? error.response : JSON.stringify(error.response.data, null, 2),
    );
  }
}
