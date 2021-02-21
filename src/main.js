import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import readFromFile from './file';
import request from './request';

export default async function main() {
  const { argv } = yargs(hideBin(process.argv))
    .command(
      '$0 <query-path> <url>',
      'Send HTTP post request with GraphQL query at <query-path>',
    )
    .option('variables', {
      type: 'string',
      describe: 'GraphQL variables path (JSON)',
      requiresArg: true,
    })
    .option('headers', {
      type: 'string',
      describe: 'HTTP headers path (JSON)',
      requiresArg: true,
    })
    .option('all', {
      alias: 'a',
      type: 'boolean',
      describe: 'Prepend response metadata JS object to output',
    })
    .usage('$0 [options...] <query-path> <url>')
    .version(false)
    .strict();

  const {
    all,
    url,
    queryPath,
    headers: headersPath,
    variables: variablesPath,
  } = argv;

  const data = {};
  data.query = await readFromFile(queryPath);
  if (variablesPath) {
    try {
      const variablesJSON = await readFromFile(variablesPath);
      data.variables = JSON.parse(variablesJSON);
    } catch (error) {
      console.error(`Failed to parse JSON from file at path ${variablesPath}.`);
      console.error(error);
      process.exit(1);
    }
  }
  const config = {};
  if (headersPath) {
    try {
      const headersJSON = await readFromFile(headersPath);
      config.headers = JSON.parse(headersJSON);
    } catch (error) {
      console.error(`Failed to parse JSON from file at path ${headersPath}.`);
      console.error(error);
      process.exit(1);
    }
  }

  await request(url, data, config, all);
}
