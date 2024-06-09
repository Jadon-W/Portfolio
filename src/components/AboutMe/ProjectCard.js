import React, { useRef, useEffect, useState } from 'react';
import './ProjectCard.css';
import { Chart, registerables } from 'chart.js';
import { Timeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';


Chart.register(...registerables);

const ProjectCard = ({ project, detailedView }) => {
    const chartRef = useRef(null);
    const timelineRef = useRef(null);
    const chartInstance = useRef(null);
    const [viewMode, setViewMode] = useState('bar');

    useEffect(() => {
        if (viewMode === 'timeline') {
            const timelineItems = new DataSet(project.milestones.map((milestone, index) => ({
                id: index + 1,
                content: milestone.title,
                start: milestone.date,
            })));
            const timelineOptions = {};
            new Timeline(timelineRef.current, timelineItems, timelineOptions);
        } else {
            const ctx = chartRef.current?.getContext('2d');
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: viewMode,
                    data: getChartData(viewMode, project),
                    options: getChartOptions()
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [viewMode, project]);

    const toggleViewMode = () => {
        if (viewMode === 'bar') {
            setViewMode('line');
        } else if (viewMode === 'line') {
            setViewMode('timeline');
        } else {
            setViewMode('bar');
        }
    };

    return (
        <div className={`project-card ${detailedView ? 'detailed-view' : ''}`}>
            <div className="project-content">
                <h3>{project.title}</h3>
                <p className={`tech-detail ${detailedView ? 'highlight' : ''}`}>
                    {detailedView ? project.techDetails[detailedView] : project.description}
                </p>
                {!detailedView && (
                    <>
                        <ul>
                            {project.technologies.map(tech => <li key={tech}>{tech}</li>)}
                        </ul>
                        <div className="project-metadata">
                            <p>State of Project: {project.completionDate}</p>
                            <p>Rating: {project.userRating} / 5</p>
                            <p>Team: {project.contributors} contributors</p>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${project.progress}%` }}>
                                {project.progress}%
                            </div>
                        </div>
                    </>
                )}
                {!detailedView && (
                    <button onClick={toggleViewMode} className="toggle-view">Toggle View</button>
                )}
                {!detailedView && (
                    <div className="reviews-container">
                        {project.reviews.map((review, index) => (
                            <blockquote key={index}>
                                <p>{review.feedback}</p>
                                <footer>- {review.user}</footer>
                            </blockquote>
                        ))}
                    </div>
                )}
            </div>
            {!detailedView && (
                <>
                    <canvas ref={chartRef} style={{ display: viewMode !== 'timeline' ? 'block' : 'none' }} className="tech-usage-chart"></canvas>
                    <div ref={timelineRef} style={{ display: viewMode === 'timeline' ? 'block' : 'none', height: '200px' }}></div>
                </>
            )}
        </div>
    );
};

export default ProjectCard;

function getChartData(chartType, project) {
    const baseColor = chartType === 'bar' ? 'rgba(54, 162, 235, 0.2)' : 'rgb(75, 192, 192)';
    const borderColor = chartType === 'bar' ? 'rgba(54, 162, 235, 1)' : 'rgb(75, 192, 192)';
    return {
        labels: chartType === 'bar' ? project.technologies : ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: chartType === 'bar' ? `${project.title} Technology Use` : `${project.title} Development Progress`,
            data: chartType === 'bar' ? getProjectData(project) : [20, 40, 60, 80, 100],
            backgroundColor: baseColor,
            borderColor: borderColor,
            borderWidth: 1,
            fill: chartType !== 'bar'
        }]
    };
}

function getChartOptions() {
    return {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
                    }
                }
            }
        }
    };
}

function getProjectData(project) {
    if (project.title === "Next Door Helpers") {
        return [90, 50, 90, 90, 70, 50, 30, 90];
    } else if (project.title === "Bar Crawl App") {
        return [90, 70, 90, 70, 50, 40, 90];
    }
    return [];
}