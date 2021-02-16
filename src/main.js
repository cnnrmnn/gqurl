import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import readFromFile from './file';
import request from './request';

export default async function main() {
  const { argv } = yargs(hideBin(process.argv))
    .option('query', {
      type: 'string',
      describe: 'GraphQL query path',
      demandOption: true,
    })
    .option('variables', {
      type: 'string',
      describe: 'GraphQL variables path (JSON)',
    })
    .option('headers', {
      type: 'string',
      describe: 'HTTP headers path',
    })
    .demandCommand(
      1,
      1,
      'Missing required argument: <url>',
      'Too many arguments',
    )
    .usage('$0 [options...] <url>')
    .version(false)
    .strict();
  const { query, variables, headers } = argv;
  const url = argv._[0];

  const data = { query };
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

  await request(url, data, config);
}
