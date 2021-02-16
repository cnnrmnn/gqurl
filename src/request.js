import axios from 'axios';

export default async function request(url, query, variables, headers) {
  try {
    const response = await axios.post(
      url,
      {
        query,
        variables,
      },
      {
        headers,
      },
    );
    console.dir(response.data, { depth: null });
  } catch (error) {
    console.dir(error.response.data, { depth: null });
  }
}
