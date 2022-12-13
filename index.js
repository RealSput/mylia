const { Command } = require('commander');
const execute = require('./lib');
const fs = require('fs');

const program = new Command();

program
  .name('mylia')
  .description('A JavaScript superset made for multithreading and intensive-CPU operations.')
  .version('1.0.0');

program.command('run')
  .description('Run a Mylia script')
  .argument('<filename>', 'script to run')
  .action((str) => {
    execute(fs.readFileSync(str).toString(), str);
  });

program.parse();
