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
    })
    .option('headers', {
      type: 'string',
      describe: 'HTTP headers path (JSON)',
    })
    .option('all', {
      alias: 'a',
      type: 'boolean',
      describe:
        'Output response data and metadata as JS object (only data is printed by default)',
    })
    .usage('$0 [options...] <query-path> <url>')
    .version(false)
    .strict();
  console.log(argv);
  const {
    all, headers, query, url, variables,
  } = argv;

  const data = {};
  data.query = await readFromFile(query);
  if (variables) {
    try {
      const variablesJSON = await readFromFile(variables);
      data.variables = JSON.parse(variablesJSON);
    } catch (error) {
      console.error(`Failed to parse JSON from file at path ${variables}.`);
      console.error(error);
      process.exit(1);
    }
  }
  const config = {};
  if (headers) {
    try {
      const headersJSON = await readFromFile(headers);
      config.headers = JSON.parse(headersJSON);
    } catch (error) {
      console.error(`Failed to parse JSON from file at path ${headers}.`);
      console.error(error);
      process.exit(1);
    }
  }

  await request(url, data, config, all);
}
