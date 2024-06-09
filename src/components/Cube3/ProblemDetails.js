import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ProblemDetails = ({
    problem,
    code,
    setCode,
    language,
    handleLanguageChange,
    handleRunCode,
    handleSubmitSolution,
    consoleOutput,
    testResult,
    showSolution,
    setShowSolution
}) => (
    <div className="problem-details">
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>
        <label htmlFor="language-select">Choose language:</label>
        <select id="language-select" value={language} onChange={handleLanguageChange}>
            {Object.keys(problem.languages).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
            ))}
        </select>
        <SyntaxHighlighter language={language} style={solarizedlight}>
            {showSolution ? problem.languages[language].solution : problem.languages[language].starterCode}
        </SyntaxHighlighter>
        <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
        ></textarea>
        <button onClick={handleRunCode}>Run Code</button>
        <button onClick={handleSubmitSolution}>Submit Solution</button>
        <pre className="output">{consoleOutput}</pre>
        {testResult && <p className={`test-result ${testResult === 'Correct' ? 'correct' : 'incorrect'}`}>{testResult}</p>}
        <button onClick={() => setShowSolution(!showSolution)}>{showSolution ? 'Hide' : 'Show'} Solution</button>
        {problem.hints && problem.hints.length > 0 && (
            <div className="hints">
                <h4>Hints</h4>
                <ul>
                    {problem.hints.map((hint, index) => (
                        <li key={index}>{hint}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

ProblemDetails.propTypes = {
    problem: PropTypes.object.isRequired,
    code: PropTypes.string.isRequired,
    setCode: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    handleLanguageChange: PropTypes.func.isRequired,
    handleRunCode: PropTypes.func.isRequired,
    handleSubmitSolution: PropTypes.func.isRequired,
    consoleOutput: PropTypes.string.isRequired,
    testResult: PropTypes.string.isRequired,
    showSolution: PropTypes.bool.isRequired,
    setShowSolution: PropTypes.func.isRequired,
};

export default ProblemDetails;