import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import './MajorProjects.css';

const projects = [
    {
        title: "Bar Crawl App",
        description: "Discover local bars and plan crawls using advanced analytics to have the best time possible",
        technologies: ["JavaScript", "Python", "PostgreSQL", "Machine Learning", "AWS", "Google Cloud", "Firebase"],
        completionDate: "Late Production",
        userRating: 4.5,
        contributors: 1,
        developmentTimeline: 'May 2023 - Ongoing',
        milestones: [
            { title: 'Initial Release', date: '2023-06' },
            { title: 'Added Rideshare Integration', date: '2023-08' },
            { title: 'Analytics Enhancement', date: '2023-10' }
        ],
        techDetails: {
            "JavaScript": "Used for front-end development, creating interactive UI components.",
            "Python": "Implemented back-end logic and data processing algorithms.",
            "PostgreSQL": "Database management for storing and querying user data.",
            "Machine Learning": "Developed algorithms to suggest optimized bar crawl routes.",
            "AWS": "Hosted the backend services and databases on AWS infrastructure.",
            "Google Cloud": "Utilized Google Cloud for scalable storage solutions.",
            "Firebase": "Implemented real-time data synchronization and authentication."
        },
        progress: 80,
        reviews: [
            { feedback: "This app has a lot of potential and the ideas work together really well", user: "Jamie L." },
            { feedback: "The features aren't like other apps which makes this one stand apart", user: "Jay M." }
        ]
    },
    {
        title: "Next Door Helpers",
        description: "People can earn money from doing chores around the neighborhood",
        technologies: ["React", "Node.js", "MongoDB", "Flutter", "Dart", "AWS", "Google Cloud", "Firebase"],
        completionDate: "Late Production",
        userRating: 4.8,
        contributors: 1,
        developmentTimeline: 'May 2023 - Ongoing',
        milestones: [
            { title: 'Prototype Development', date: '2023-05' },
            { title: 'Parental Control Features', date: '2023-07' },
            { title: 'Security Update', date: '2023-09' }
        ],
        techDetails: {
            "React": "Built the front-end with dynamic and responsive UI components.",
            "Node.js": "Handled server-side operations and API endpoints.",
            "MongoDB": "Managed user data and tasks with a flexible NoSQL database.",
            "Flutter": "Developed cross-platform mobile applications.",
            "Dart": "Used alongside Flutter for mobile app development.",
            "AWS": "Hosted server-side operations and databases on AWS infrastructure.",
            "Google Cloud": "Implemented scalable storage and compute solutions.",
            "Firebase": "Provided real-time database and authentication services."
        },
        progress: 85,
        reviews: [
            { feedback: "It's a really good idea and can help a lot of people", user: "Alice P." },
            { feedback: "The way parents have supervision on an app of this scale is very unique", user: "Ben D." }
        ]
    }
];

const MajorProjects = () => {
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedTech, setSelectedTech] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortCriterion, setSortCriterion] = useState('title');
    const [detailedView, setDetailedView] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const handleTechChange = (e) => {
        const tech = e.target.value;
        setSelectedTech(tech);
        filterProjects(tech, selectedStatus, sortCriterion);
        setDetailedView(tech !== 'all' ? tech : null);
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setSelectedStatus(status);
        filterProjects(selectedTech, status, sortCriterion);
    };

    const handleSortChange = (e) => {
        const criterion = e.target.value;
        setSortCriterion(criterion);
        filterProjects(selectedTech, selectedStatus, criterion);
    };

    const filterProjects = (tech, status, criterion) => {
        let filtered = projects;

        if (tech !== 'all') {
            filtered = filtered.filter(project => project.technologies.includes(tech));
        }

        if (status !== 'all') {
            filtered = filtered.filter(project => project.status === status);
        }

        filtered.sort((a, b) => {
            if (criterion === 'completionDate') {
                return new Date(b.completionDate) - new Date(a.completionDate);
            } else if (criterion === 'userRating') {
                return b.userRating - a.userRating;
            } else {
                return a.title.localeCompare(b.title);
            }
        });

        setFilteredProjects(filtered);
    };

    const resetView = () => {
        setSelectedTech('all');
        setSelectedStatus('all');
        setSortCriterion('title');
        setFilteredProjects(projects);
        setDetailedView(null);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <div className={`project-showcase ${darkMode ? 'dark-mode' : ''}`}>
            <h2 className="projects-heading">Major Projects</h2>
            <div className="filter-container">
                <select value={selectedTech} onChange={handleTechChange}>
                    <option value="all">All Technologies</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="MongoDB">MongoDB</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="AWS">AWS</option>
                    <option value="Google Cloud">Google Cloud</option>
                    <option value="Firebase">Firebase</option>
                    <option value="Flutter">Flutter</option>
                    <option value="Dart">Dart</option>
                </select>
                <select value={selectedStatus} onChange={handleStatusChange}>
                    <option value="all">All Statuses</option>
                    <option value="In Production">In Production</option>
                    <option value="Completed">Completed</option>
                </select>
                <select value={sortCriterion} onChange={handleSortChange}>
                    <option value="title">Sort by Title</option>
                    <option value="completionDate">Sort by Completion Date</option>
                    <option value="userRating">Sort by User Rating</option>
                </select>
                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div className="projects-container">
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} detailedView={detailedView} />
                ))}
            </div>
            {detailedView && (
                <button onClick={resetView} className="reset-view">Reset View</button>
            )}
        </div>
    );
};

export default MajorProjects;