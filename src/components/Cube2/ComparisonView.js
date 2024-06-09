import React from 'react';
import './ComparisonView.css';

const ComparisonView = ({ projects, onBack }) => {
    if (!projects || projects.length === 0) {
        return (
            <div className="comparison-view">
                <button onClick={onBack} className="back-button">Back to Projects</button>
                <p>No projects selected for comparison.</p>
            </div>
        );
    }

    return (
        <div className="comparison-view">
            <button onClick={onBack} className="back-button">Back to Projects</button>
            <h2>Project Comparison</h2>
            <div className="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Technologies</th>
                            <th>Completion Date</th>
                            <th>User Rating</th>
                            <th>Development Timeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={index}>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.technologies.join(', ')}</td>
                                <td>{project.completionDate}</td>
                                <td>{project.userRating}</td>
                                <td>{project.developmentTimeline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparisonView;