import fs from 'fs/promises';

export default async function readFromFile(path) {
  let data;
  try {
    data = await fs.readFile(path, { encoding: 'utf-8' });
  } catch (error) {
    console.error(`Unable to load contents of file at path ${path}`);
    console.error(error);
    process.exit(1);
  }
  return data;
}
