import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

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
}
