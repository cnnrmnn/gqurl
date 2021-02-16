import axios from 'axios';

export default async function request(url, data, config, all) {
  try {
    const response = await axios.post(url, data, config);
    if (all) console.log(response);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (all) console.error(error.response);
    console.error(JSON.stringify(error.response.data, null, 2));
  }
}
