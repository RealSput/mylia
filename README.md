# mylia
A subset of JavaScript designed for multi-threading and CPU-intensive mathematical operations.

# Example
```js
class test {
    main() {
        let thread = call_thread('classify', 'Code');
        // result: c
        thread.on('message', (m) => {
            console.log('String classified as: ' + m);
        })
    }
    classify() {
        let nn = mod('neuralnet');
        const net = new brain.recurrent.LSTMTimeStep({
            inputSize: 2,
            hiddenLayers: [10],
            outputSize: 2,
        });

        // Same test as previous, but combined on a single set
        const trainingData = [
            [
                [1, 5],
                [2, 4],
                [3, 3],
                [4, 2],
                [5, 1],
            ],
        ];

        net.train(trainingData, {
            errorThresh: 0.09
        });

        // now we're cookin' with gas!
        const forecast = net.forecast(
            [
                [1, 5],
                [2, 4],
            ],
            3
        );

        parentPort.postMessage(output);
    }
}
```
