export const loadPyodideInstance = async () => {
    try {
        if (!window.pyodide) {
            window.pyodide = await window.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full/"
            });
            await window.pyodide.loadPackage(['micropip']);
        }
        return window.pyodide;
    } catch (error) {
        console.error('Error loading Pyodide:', error);
        throw error;
    }
};