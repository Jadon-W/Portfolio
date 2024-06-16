import React, { useState, useMemo, useCallback } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [tooltipContent, setTooltipContent] = useState('');

    const handleMouseEnter = useCallback((e) => {
        setTooltipContent(`Completion: ${project.progress}%`);
        setShowTooltip(true);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
    }, [project.progress]);

    const handleMouseLeave = useCallback(() => {
        setShowTooltip(false);
        setTooltipContent('');
    }, []);

    const progressBarStyle = useMemo(() => ({
        width: `${project.progress}%`,
        transition: 'width 1s ease-in-out',
    }), [project.progress]);

    const getProgressBarClass = useCallback(() => {
        return `cube2-progress-bar ${project.progress === 100 ? 'completed' : 'in-progress'}`;
    }, [project.progress]);

    return (
        <div className={`cube2-project-card ${project.progress === 100 ? 'completed' : 'in-progress'}`}>
            <div className="cube2-project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="cube2-technologies">
                    {project.technologies.map((tech, index) => (
                        <li key={index}>
                            {tech}
                        </li>
                    ))}
                </ul>
                <p className="completion-date"><strong>Completion Date:</strong> {project.completionDate}</p>
                <p className="user-rating"><strong>User Rating:</strong> {project.userRating} / 5</p>
                <p className="development-timeline"><strong>Development Timeline:</strong> {project.developmentTimeline}</p>
                <div className="cube2-progress-bar-container">
                    <div
                        className={getProgressBarClass()}
                        style={progressBarStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseMove={(e) => setTooltipPosition({ x: e.clientX, y: e.clientY })}
                        onMouseLeave={handleMouseLeave}
                    >
                        {project.milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className="cube2-milestone-marker"
                                style={{ left: `${(index / project.milestones.length) * 100}%` }}
                                title={milestone.title}
                            ></div>
                        ))}
                    </div>
                    {showTooltip && (
                        <div
                            className="cube2-progress-bar-tooltip"
                            style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                        >
                            {tooltipContent}
                        </div>
                    )}
                    <span className="cube2-progress-bar-label">Project Completion: {project.progress}%</span>
                </div>
                <div className="cube2-milestones">
                    <h4>Milestones</h4>
                    <ul>
                        {project.milestones.map((milestone, index) => (
                            <li key={index}>{milestone.title} - {milestone.date}</li>
                        ))}
                    </ul>
                </div>
                <div className="cube2-tech-details">
                    <h4>Tech Details</h4>
                    <ul>
                        {Object.entries(project.techDetails).map(([tech, detail], index) => (
                            <li key={index}><strong>{tech}:</strong> {detail}</li>
                        ))}
                    </ul>
                </div>
                <div className="cube2-reviews">
                    <h4>Reviews</h4>
                    <ul>
                        {project.reviews.map((review, index) => (
                            <li key={index}><em>{review.feedback}</em> - {review.user}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;