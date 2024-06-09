import React, { memo } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import './RealTimeAnalytics.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

const skillData = {
    labels: ['Python', 'CSS', 'HTML', 'JavaScript', 'Dart', 'PostgreSQL', 'SQLite', 'C++', 'SQL', 'Java', 'React', 'JSON', 'Linux', 'MySQL'],
    datasets: [
        {
            label: 'Proficiency Level',
            data: [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

const engagementData = {
    labels: ['Python', 'JavaScript', 'React', 'SQL', 'HTML', 'CSS', 'Java', 'C++'],
    datasets: [
        {
            label: 'Frequency',
            data: [90, 80, 60, 70, 85, 85, 40, 30],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
        {
            label: 'Recency',
            data: [30, 40, 50, 20, 60, 60, 10, 5],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        },
    ],
};

const RealTimeAnalytics = () => {
    console.log('RealTimeAnalytics skillData:', skillData); 
    console.log('RealTimeAnalytics engagementData:', engagementData);
    return (
        <div className="real-time-analytics">
            <h2>Real-Time Analytics</h2>
            <div className="chart-container">
                <h3>Proficiency Level</h3>
                <Bar data={skillData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="chart-container">
                <h3>Skills Engagement</h3>
                <Radar data={engagementData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default memo(RealTimeAnalytics);