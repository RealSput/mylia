# mylia
A toy subset of JavaScript designed for multi-threading and CPU-intensive mathematical operations. Not made for use in production.

# Getting Started
Mylia is a toy subset of JavaScript made for easier multi-threading. It can get things done quicker and easier. It is named after the genus in the Myliaceae family.

While you can still do normal multi-threading in Node.js using the `worker_thread` module, I thought it was already too complicated. So this is why I made it.

Instead of normal JS in the global scope, every program HAS to be in a class, and the class has to have the same name as the file name without the extension (similar to Java).

The only difference from JS is that instead of having to call `this.function()` or `super.function()` to call a function in the class, you can just use `function()`. This is done automatically by a code generator, but it will skip the functions that do not exist.

# Example
```js
class hello_mylia {
  hello() {
    parentPort.postMessage('Hello, ' + args[0] + '!');
  }
  main() {
    let hello = hello('Mylia');
    hello.on('message', console.log);
  }
}
```
More examples can be found in the [examples](https://github.com/RealSput/mylia/tree/main/examples) folder.

# Contributing
The Mylia project welcomes (and encourages) contributions! We welcome anything, from bug fixes and broken dependencies, to enhancements and more examples. 
For more info, see [CONTRIBUTING.md](https://github.com/RealSput/mylia/blob/main/CONTRIBUTING.md).
