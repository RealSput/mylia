const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads');
const fs = require('fs');
const parser = require('./parser');
const builtins = [
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "timers",
  "tls",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "worker_threads",
  "trace_events",
  "zlib"
];
let nbtins = {};
builtins.forEach(b => nbtins[b] = (() => require(b)));

var orq = require;
require = orq;

const modules = {
  neuralnet: (() => orq('brain.js')),
  math: (() => orq('mathjs')),
  "2dg": (() => orq('canvas')),
  "3dg": (() => orq('./3dg')),
  ...nbtins
};

const mod = (n) => {
  if (!modules[n]) throw new Error('No module found!');
  return modules[n]();
}
if (isMainThread) {
  let exec = (f, file) => {
    if (!f.toString().startsWith('class ' + (file).split('/').pop().split('.').shift() + ' {') || !f.toString().endsWith('}')) throw new Error('file is not in Mylia structure!');
    let f_code = parser('(' + f + ')');
    let code = eval(f_code);
    let inst = new code();
    let _athr = {};
    let call_thread = function(t) {
      if (inst[t]) {
        t = inst[t].toString();
      } else {
        throw new Error('no thread found')
      }
      const args = Array.from(arguments).slice(1);
      const worker = new Worker(__filename, {
        workerData: {
          data: {
            thread: t
          },
          args
        }
      });
      return worker;
    }
    require = mod;
    inst.main();
  }
  module.exports = exec;
} else {
  require = mod;
  const args = workerData.args;
  eval('(function ' + workerData.data.thread.toString() + ')()');
}
