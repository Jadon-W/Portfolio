import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './DataVisualizations.css';

const data = {
    labels: ['Python', 'JavaScript', 'React', 'SQL', 'HTML', 'CSS'],
    datasets: [
        {
            label: 'Projects Completed',
            data: [10, 15, 7, 8, 12, 14],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {
            label: 'Current Projects',
            data: [2, 3, 1, 1, 2, 3],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const DataVisualizations = () => {
    return (
        <div className="data-visualizations">
            <h2>Advanced Data Visualizations</h2>
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default DataVisualizations;