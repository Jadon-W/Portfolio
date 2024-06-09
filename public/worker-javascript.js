const context = self;

context.onmessage = function(e) {
    const code = e.data;
    try {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        context.postMessage({ result });
    } catch (error) {
        context.postMessage({ error: error.message });
    }
};