const eslint = require('eslint');

const lintJavaScriptCode = (code) => {
    const cli = new eslint.CLIEngine({});
    const report = cli.executeOnText(code);
    const { results } = report;

    if (results.length === 0) return 'No issues found';

    return results[0].messages.map(message => {
        return `Line ${message.line}: ${message.message} (${message.ruleId})`;
    }).join('\n');
};

const lintPythonCode = (code) => {
    // Simulated linting output for demonstration purposes
    return 'Use descriptive variable names. Avoid deep nesting of loops and conditionals.';
};

const lintCode = (language, code) => {
    if (language === 'javascript') {
        return lintJavaScriptCode(code);
    } else if (language === 'python') {
        return lintPythonCode(code);
    }
    return 'Linting not supported for this language.';
};

export default lintCode;