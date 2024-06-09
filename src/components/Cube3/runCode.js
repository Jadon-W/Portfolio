import { loadPyodideInstance } from './loadPyodide';

const runCode = async (language, code, input = '') => {
    try {
        let result;
        switch (language) {
            case 'javascript':
                result = await runJavaScriptCode(code, input);
                break;
            case 'python':
                result = await runPythonCode(code, input);
                break;
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
        return result ?? 'Error: No output';
    } catch (error) {
        return `Error: ${error.message}`;
    }
};

const runJavaScriptCode = (code, input) => {
    try {
        const execCode = `
            const input = ${JSON.stringify(input)};
            let output = '';
            const originalLog = console.log;
            console.log = (...args) => { output += args.join(' ') + '\\n'; };
            ${code}
            console.log = originalLog;
            return output.trim();
        `;
        let output;
        eval(`output = (function() { ${execCode} })();`);
        return output || 'No output';
    } catch (error) {
        return `Error: ${error.message}`;
    }
};

const runPythonCode = async (code, input) => {
    const pyodide = await loadPyodideInstance();
    await pyodide.loadPackagesFromImports(code);
    try {
        const result = await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdin = StringIO(${JSON.stringify(input)})
sys.stdout = StringIO()
exec("""
${code}
""")
sys.stdout.getvalue().strip()
        `);
        return result || 'No output';
    } catch (error) {
        return `Error: ${error.message}`;
    }
};


export default runCode;