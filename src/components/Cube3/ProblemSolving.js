import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, duotoneLight, okaidia, tomorrow, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MonacoEditor from 'react-monaco-editor';
import { diffLines } from 'diff';
import problems from './problems';
import runCode from './runCode';
import languages, { getLanguageSettings, getDocumentationLink } from './languageList';
import './ProblemSolving.css';

const editorThemes = {
    dark: 'vs-dark',
    light: 'vs-light',
    okaidia: 'okaidia',
    tomorrow: 'tomorrow',
    solarizedlight: 'solarizedlight',
};

const terminalThemes = {
    dracula,
    duotoneLight,
    okaidia,
    tomorrow,
    solarizedlight,
};

const ProblemSolving = () => {
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');
    const [editorTheme, setEditorTheme] = useState('vs-dark');
    const [terminalTheme, setTerminalTheme] = useState(dracula);
    const [versions, setVersions] = useState([]);
    const [currentVersion, setCurrentVersion] = useState(0);
    const [showHints, setShowHints] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [comparisonOutput, setComparisonOutput] = useState(null);
    const [timer, setTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [challengeActive, setChallengeActive] = useState(false);
    const [reviewFeedback, setReviewFeedback] = useState(null);
    const [debuggerOutput, setDebuggerOutput] = useState(null);
    const [refactorSuggestion, setRefactorSuggestion] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [performanceMetrics, setPerformanceMetrics] = useState(null);

    useEffect(() => {
        if (selectedProblem !== null) {
            setCode(problems[selectedProblem].languages[language].starterCode);
        }
    }, [selectedProblem, language]);

    useEffect(() => {
        let timerId;
        if (timeLeft > 0 && challengeActive) {
            timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0 && challengeActive) {
            alert("Time's up! Submit your solution to see if you passed.");
            setChallengeActive(false);
        }
        return () => clearTimeout(timerId);
    }, [timeLeft, challengeActive]);

    const handleRunCode = async () => {
        setIsRunning(true);
        const result = await runCode(language, code);
        setOutput(result);
        setIsRunning(false);
    };

    const handleSubmitSolution = async () => {
        setIsRunning(true);
        setChallengeActive(false);
        const problem = problems[selectedProblem];
        const { testCases, validateSolution } = problem;
        let allTestsPassed = true;
        for (const testCase of testCases) {
            const result = await runCode(language, code, testCase.input);
            if (!validateSolution(result, testCase.expectedOutput)) {
                allTestsPassed = false;
                setOutput(`Test failed for input: ${testCase.input}\nExpected Output: ${testCase.expectedOutput}\nYour Output: ${result}`);
                break;
            }
        }
        setIsCorrect(allTestsPassed);
        if (allTestsPassed) {
            setOutput('All test cases passed!');
        }
        setIsRunning(false);
        // Stop the timer when the solution is submitted
        setChallengeActive(false);
        clearInterval(timer);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('isDarkMode', !isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
    };

    const saveVersion = () => {
        const timestamp = new Date().toLocaleString();
        const versionName = prompt('Enter a name for this version:') || `Version ${versions.length + 1}`;
        const newVersion = { code, timestamp, name: versionName };
        setVersions([...versions, newVersion]);
        setCurrentVersion(versions.length);
    };

    const loadVersion = (index) => {
        setCode(versions[index].code);
        setCurrentVersion(index);
    };

    const shareSolution = () => {
        const url = new URL(window.location);
        url.searchParams.set('code', encodeURIComponent(code));
        navigator.clipboard.writeText(url.toString());
        alert('Link to your solution has been copied to the clipboard.');
    };

    const readProblem = () => {
        const problem = problems[selectedProblem];
        const utterance = new SpeechSynthesisUtterance(problem.description);
        window.speechSynthesis.speak(utterance);
    };

    const compareCodeWithSolution = () => {
        const problemSolution = problems[selectedProblem].languages[language].solution.trim();
        const codeToCompare = code.trim();
        const differences = diffLines(problemSolution, codeToCompare);

        const formattedDifferences = differences.map((part, index) => {
            const color = part.added ? 'green' : part.removed ? 'red' : 'inherit';
            const textDecoration = part.removed ? 'line-through' : 'none';
            return (
                <span
                    key={index}
                    style={{
                        backgroundColor: color,
                        textDecoration: textDecoration,
                        whiteSpace: 'pre-wrap',
                        display: 'inline-block',
                        width: '100%',
                    }}
                >
                    {part.value}
                </span>
            );
        });

        setComparisonOutput(
            <div className="comparison-output-container">
                <h3>User's Solution:</h3>
                <div className="comparison-code">
                    <SyntaxHighlighter language={language} style={terminalTheme}>
                        {codeToCompare}
                    </SyntaxHighlighter>
                </div>
                <h3>Optimal Solution:</h3>
                <div className="comparison-code">
                    <SyntaxHighlighter language={language} style={terminalTheme}>
                        {problemSolution}
                    </SyntaxHighlighter>
                </div>
                <h3>Differences:</h3>
                <div className="comparison-differences">
                    {formattedDifferences}
                </div>
            </div>
        );
    };

    const startTimer = () => {
        setTimer(setInterval(() => setTimeLeft(timeLeft => timeLeft - 1), 1000));
    };

    const startTimedChallenge = (duration) => {
        setTimeLeft(duration);
        setChallengeActive(true);
    };

    const handleEditorThemeChange = (e) => {
        setEditorTheme(editorThemes[e.target.value]);
    };

    const handleTerminalThemeChange = (e) => {
        setTerminalTheme(terminalThemes[e.target.value]);
    };

    const getCodeReview = async () => {
        // Mocked API call for code review
        const review = `The code looks good overall. Consider using more descriptive variable names. Also, avoid nested loops if possible for better performance.`;
        setReviewFeedback(review);
    };

    const getRefactorSuggestion = async () => {
        // Mocked API call for refactoring suggestions
        const suggestion = `Consider using a switch statement instead of multiple if-else blocks for better readability and performance.`;
        setRefactorSuggestion(suggestion);
    };

    const debugCode = async () => {
        // Mocked API call for debugging
        const debugInfo = `Line 10: The variable 'output' is not defined. Ensure you have declared all variables before using them.`;
        setDebuggerOutput(debugInfo);
    };

    const toggleSuggestions = () => {
        setShowSuggestions(!showSuggestions);
    };

    const calculatePerformanceMetrics = () => {
        // Mocked API call for performance metrics
        const metrics = {
            executionTime: '120ms',
            memoryUsage: '15MB',
            complexity: 'O(n^2)',
        };
        setPerformanceMetrics(metrics);
    };

    return (
        <div className="problem-solving-container">
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button className="sidebar-toggle" onClick={() => document.querySelector('.problem-solving-sidebar').classList.toggle('collapsed')}>
                Toggle Sidebar
            </button>
            <aside className="problem-solving-sidebar">
                <h2>Problems</h2>
                <ul>
                    {problems.map((problem, index) => (
                        <li key={index} onClick={() => setSelectedProblem(index)} className={selectedProblem === index ? 'selected' : ''}>
                            {problem.title}
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="problem-solving-content">
                {selectedProblem !== null && (
                    <>
                        <h2>{problems[selectedProblem].title}</h2>
                        <p>{problems[selectedProblem].description}</p>
                        <div className="language-selector">
                            <label htmlFor="language">Language: </label>
                            <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                {Object.keys(problems[selectedProblem].languages).map((lang) => (
                                    <option key={lang} value={lang}>{languages.find(l => l.value === lang).label}</option>
                                ))}
                            </select>
                            <a href={getDocumentationLink(language)} target="_blank" rel="noopener noreferrer">Documentation</a>
                        </div>
                        <div className="theme-selector">
                            <label htmlFor="editor-theme">Editor Theme: </label>
                            <select id="editor-theme" value={editorTheme} onChange={handleEditorThemeChange}>
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="okaidia">Okaidia</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="solarizedlight">Solarized Light</option>
                            </select>
                            <label htmlFor="terminal-theme">Terminal Theme: </label>
                            <select id="terminal-theme" value={terminalTheme} onChange={handleTerminalThemeChange}>
                                <option value="dracula">Dracula</option>
                                <option value="duotoneLight">Duotone Light</option>
                                <option value="okaidia">Okaidia</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="solarizedlight">Solarized Light</option>
                            </select>
                        </div>
                        <div className="editor-container">
                            <MonacoEditor
                                width="800"
                                height="600"
                                language={language}
                                theme={editorTheme}
                                value={code}
                                options={getLanguageSettings(language)}
                                onChange={setCode}
                            />
                        </div>
                        <div className="buttons">
                            <button onClick={handleRunCode} disabled={isRunning}>Run Code</button>
                            <button onClick={handleSubmitSolution} disabled={isRunning}>Submit Solution</button>
                            <button onClick={saveVersion}>Save Version</button>
                            <button onClick={shareSolution}>Share Solution</button>
                            <button onClick={readProblem}>Read Problem</button>
                            <button onClick={compareCodeWithSolution}>Compare with Solution</button>
                            <button onClick={getCodeReview}>Code Review</button>
                            <button onClick={getRefactorSuggestion}>Refactor Suggestion</button>
                            <button onClick={debugCode}>Debug</button>
                            <button onClick={calculatePerformanceMetrics}>Show Performance Metrics</button>
                        </div>
                        <div className="timer-container">
                            <h3>{`Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}</h3>
                            {!challengeActive && (
                                <button onClick={() => startTimedChallenge(600)} className="start-timed-challenge">Start 10 Minute Challenge</button>
                            )}
                        </div>
                        {versions.length > 0 && (
                            <div className="versions">
                                <h3>Code Versions</h3>
                                <ul>
                                    {versions.map((version, index) => (
                                        <li key={index} onClick={() => loadVersion(index)} className={currentVersion === index ? 'current-version' : ''}>
                                            {version.name} ({version.timestamp})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {isRunning && <p>Running...</p>}
                        {output && (
                            <div className="output">
                                {Array.isArray(output) ? output : (
                                    <SyntaxHighlighter language={language} style={terminalTheme}>
                                        {output}
                                    </SyntaxHighlighter>
                                )}
                            </div>
                        )}
                        {comparisonOutput && (
                            <div className="comparison-output-container">
                                {comparisonOutput}
                            </div>
                        )}
                        {isCorrect !== null && (
                            <p className={`test-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {isCorrect ? 'All test cases passed!' : 'Some test cases failed. Try again.'}
                            </p>
                        )}
                        {reviewFeedback && (
                            <div className="review-feedback">
                                <h3>Code Review:</h3>
                                <p>{reviewFeedback}</p>
                            </div>
                        )}
                        {debuggerOutput && (
                            <div className="debugger-output">
                                <h3>Debugger Output:</h3>
                                <p>{debuggerOutput}</p>
                            </div>
                        )}
                        {refactorSuggestion && (
                            <div className="refactor-suggestion">
                                <h3>Refactor Suggestion:</h3>
                                <p>{refactorSuggestion}</p>
                            </div>
                        )}
                        {performanceMetrics && (
                            <div className="performance-metrics">
                                <h3>Performance Metrics:</h3>
                                <ul>
                                    <li><strong>Execution Time:</strong> {performanceMetrics.executionTime}</li>
                                    <li><strong>Memory Usage:</strong> {performanceMetrics.memoryUsage}</li>
                                    <li><strong>Complexity:</strong> {performanceMetrics.complexity}</li>
                                </ul>
                            </div>
                        )}
                        <button onClick={toggleSuggestions}>
                            {showSuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
                        </button>
                        {showSuggestions && (
                            <div className="suggestions">
                                <button onClick={getCodeReview}>Code Review</button>
                                <button onClick={getRefactorSuggestion}>Refactor Suggestion</button>
                                <button onClick={debugCode}>Debug</button>
                            </div>
                        )}
                        <button onClick={() => setShowHints(!showHints)}>
                            {showHints ? 'Hide Hints' : 'Show Hints'}
                        </button>
                        {showHints && (
                            <div className="hints">
                                <h3>Hints</h3>
                                <ul>
                                    {problems[selectedProblem].hints.map((hint, index) => (
                                        <li key={index}>{hint}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button onClick={() => setShowExplanation(!showExplanation)}>
                            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                        </button>
                        {showExplanation && (
                            <div className="explanation">
                                <h3>Solution Explanation</h3>
                                <p>{problems[selectedProblem].explanation}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProblemSolving;