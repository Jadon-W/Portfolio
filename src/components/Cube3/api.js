export const endorsementsAPI = async () => {
    return [
        { skill: 'Python', name: 'Alice', message: 'Great Python skills!' },
        { skill: 'JavaScript', name: 'Bob', message: 'Expert in JavaScript!' },
        { skill: 'SQL', name: 'Charlie', message: 'Solid SQL knowledge!' },
    ];
};

export const caseStudiesAPI = async () => {
    return {
        Python: {
            title: 'Weather App',
            problem: 'Predict weather accurately.',
            approach: 'Used NumPy and Pandas for data processing.',
            technologies: ['Python', 'NumPy', 'Pandas'],
            outcome: 'Successfully predicted weather with 90% accuracy.'
        },
        JavaScript: {
            title: 'After School Website',
            problem: 'Build a dynamic website.',
            approach: 'Used React for frontend and Node.js for backend.',
            technologies: ['JavaScript', 'React', 'Node.js'],
            outcome: 'Created a responsive website.'
        },
        SQL: {
            title: 'Bank Transaction Project',
            problem: 'Manage bank transactions.',
            approach: 'Used PostgreSQL for database management.',
            technologies: ['SQL', 'PostgreSQL'],
            outcome: 'Handled transactions efficiently.'
        }
    };
};

export const learningPathwaysAPI = async () => {
    return {
        Python: [
            { data: { id: 'Python', label: 'Python' } },
            { data: { id: 'NumPy', label: 'NumPy' } },
            { data: { id: 'Pandas', label: 'Pandas' } },
            { data: { source: 'Python', target: 'NumPy' } },
            { data: { source: 'Python', target: 'Pandas' } }
        ],
        JavaScript: [
            { data: { id: 'JavaScript', label: 'JavaScript' } },
            { data: { id: 'React', label: 'React' } },
            { data: { id: 'Node.js', label: 'Node.js' } },
            { data: { source: 'JavaScript', target: 'React' } },
            { data: { source: 'JavaScript', target: 'Node.js' } }
        ],
        SQL: [
            { data: { id: 'SQL', label: 'SQL' } },
            { data: { id: 'PostgreSQL', label: 'PostgreSQL' } },
            { data: { source: 'SQL', target: 'PostgreSQL' } }
        ]
    };
};