import React from 'react';
import PropTypes from 'prop-types';

const ProblemList = ({ problems, selectedProblem, setSelectedProblem }) => (
    <div className="problems-container">
        {problems.map((problem, index) => (
            <div
                key={index}
                className={`problem ${selectedProblem === index ? 'selected' : ''}`}
                onClick={() => setSelectedProblem(selectedProblem === index ? null : index)}
            >
                <h3>{problem.title}</h3>
            </div>
        ))}
    </div>
);

ProblemList.propTypes = {
    problems: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedProblem: PropTypes.number,
    setSelectedProblem: PropTypes.func.isRequired,
};

export default ProblemList;