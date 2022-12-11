const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('node:worker_threads');
const fs = require('fs');
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
	"trace_events",
	"tty",
	"url",
	"util",
	"v8",
	"vm",
	"worker_threads",
	"zlib"
];
let nbtins = {};
builtins.forEach(b => nbtins[b] = require(b));

const orq = require;
require = orq;

const modules = {
  neuralnet: require('brain.js'),
  math: require('mathjs'),
  "2dg": require('canvas'),
  "3dg": require('./lib/3dg'),
  ...nbtins
};

const mod = (n) => {
  if (!modules[n]) throw new Error('No module found!');
  return modules[n];
}

if (isMainThread) {
  let file = process.argv[2];
  if (!file) throw new Error('no file found');
  let f = fs.readFileSync(file).toString();
  if (!f.toString().startsWith('class ' + (file).split('/').pop().split('.').shift() + ' {') || !f.toString().endsWith('}')) throw new Error('file is not in Cyclone structure!');
  let code = eval('(' + f + ')');
  let inst = new code();
  let _athr = {};
  let call_thread = function(t) {
    if (inst[t]) {
      t = inst[t].toString();
    } else {
      throw new Error('no thread found')
    }
    const args = Array.from(arguments).slice(1);
    const worker = new Worker("./index.js", {
      workerData: { data: { thread: t }, args }
    });
    return worker;
  }
  require = mod;
  inst.main();
} else {
  require = mod;
  const args = workerData.args;
  eval('(function ' + workerData.data.thread.toString() + ')()');
}
