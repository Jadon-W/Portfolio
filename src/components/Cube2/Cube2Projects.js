import React, { useState, useEffect, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import './Cube2Projects.css';



const projects = [
    {
        title: "Weather App",
        description: "A Python-based weather application with a user-friendly GUI. Provides a 5-day forecast with details every 6 hours, including Temperature, Pressure, Wind Speed, Wind Direction, Humidity, Cloudiness, Rain, and Snow.",
        technologies: ["Python", "Tkinter", "API"],
        completionDate: "Completed",
        userRating: 4.7,
        contributors: 1,
        developmentTimeline: 'Jan 2023 - Mar 2023',
        milestones: [
            { title: 'Initial Development', date: '2023-01' },
            { title: 'Beta Testing', date: '2023-02' },
            { title: 'Official Release', date: '2023-03' }
        ],
        techDetails: {
            "Python": "Implemented core logic for fetching and processing weather data.",
            "Tkinter": "Used for creating the graphical user interface.",
            "API": "Integrated with a weather API to fetch real-time data."
        },
        progress: 100,
        reviews: [
            { feedback: "Very accurate and easy to use.", user: "Alex" },
            { feedback: "Great app for quick weather updates.", user: "Sam" }
        ]
    },
    {
        title: "After School Website",
        description: "A professional and user-friendly website built with HTML, CSS, and JavaScript. Designed to engage users with interactive elements and a sleek layout.",
        technologies: ["HTML", "CSS", "JavaScript"],
        completionDate: "Completed",
        userRating: 4.5,
        contributors: 1,
        developmentTimeline: 'Feb 2023 - Apr 2023',
        milestones: [
            { title: 'Design Phase', date: '2023-02' },
            { title: 'Development Phase', date: '2023-03' },
            { title: 'Launch', date: '2023-04' }
        ],
        techDetails: {
            "HTML": "Structured the content and layout.",
            "CSS": "Styled the website to make it visually appealing.",
            "JavaScript": "Added interactive features and animations."
        },
        progress: 100,
        reviews: [
            { feedback: "Looks professional and is very interactive.", user: "Charlie" },
            { feedback: "A great website for after school activities.", user: "Taylor" }
        ]
    },
    {
        title: "Bank Transaction Project",
        description: "A Python-based bank transaction simulator with a GUI. Allows users to create accounts, deposit, withdraw, and check their balance.",
        technologies: ["Python", "Tkinter"],
        completionDate: "Completed",
        userRating: 4.4,
        contributors: 1,
        developmentTimeline: 'Mar 2023 - May 2023',
        milestones: [
            { title: 'Initial Development', date: '2023-03' },
            { title: 'GUI Integration', date: '2023-04' },
            { title: 'Final Testing', date: '2023-05' }
        ],
        techDetails: {
            "Python": "Implemented core banking logic.",
            "Tkinter": "Used for creating the graphical user interface."
        },
        progress: 100,
        reviews: [
            { feedback: "Very intuitive and user-friendly.", user: "Jordan" },
            { feedback: "Helps understand basic banking operations.", user: "Casey" }
        ]
    },
    {
        title: "Stock Prediction Project",
        description: "A machine learning project using Dash and TensorFlow to predict stock prices. Users can select stocks like APPL or GOOGL and see predicted patterns versus actual patterns.",
        technologies: ["Python", "Dash", "TensorFlow"],
        completionDate: "Completed",
        userRating: 4.3,
        contributors: 1,
        developmentTimeline: 'Apr 2023 - Jul 2023',
        milestones: [
            { title: 'Data Collection', date: '2023-04' },
            { title: 'Model Training', date: '2023-05' },
            { title: 'Deployment', date: '2023-07' }
        ],
        techDetails: {
            "Python": "Used for data preprocessing and logic.",
            "Dash": "Created interactive dashboards for visualization.",
            "TensorFlow": "Implemented machine learning models for prediction."
        },
        progress: 100,
        reviews: [
            { feedback: "Highly accurate predictions.", user: "Morgan" },
            { feedback: "Great tool for stock analysis.", user: "Blake" }
        ]
    },
    {
        title: "Next Door Helpers App",
        description: "A full-stack application designed to connect neighbors and share tasks. Features sign-up/login, profile management, payment system, community forum, and more.",
        technologies: ["React", "Node.js", "MongoDB", "Flutter", "Dart", "AWS", "Google Cloud", "Firebase"],
        completionDate: "In Production",
        userRating: 4.6,
        contributors: 1,
        developmentTimeline: 'May 2023 - Ongoing',
        milestones: [
            { title: 'Prototype Development', date: '2023-05' },
            { title: 'Beta Testing', date: '2023-08' },
            { title: 'Security Update', date: '2023-11' }
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
        progress: 65,
        reviews: [
            { feedback: "Great ideas and UI/UX to match", user: "Alice M." },
            { feedback: "The layout is really nice", user: "Derrick T." }
        ]
    },
    {
        title: "BarCrawl App",
        description: "A project featuring JavaScript, Python for machine learning and data analytics, and PostgreSQL for the database. Aims to be a fully functional application with a real-world impact.",
        technologies: ["JavaScript", "Python", "PostgreSQL", "Machine Learning", "AWS", "Google Cloud", "Firebase"],
        completionDate: "In Production",
        userRating: 4.6,
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
        progress: 70,
        reviews: [
            { feedback: "Even though it's still in development, the idea is great", user: "Alex L." },
            { feedback: "The way it's being set up is really nice and has a lot of potential", user: "Joey N." }
        ]
    },
    {
        title: "Mental Health AI",
        description: "An app that uses AI to provide personalized health advice. Tracks user data to offer tips for improving mental health and overall well-being.",
        technologies: ["Node.js", "Python", "Firebase", "PostgreSQL"],
        completionDate: "In Production",
        userRating: 4.4,
        contributors: 1,
        developmentTimeline: 'Jun 2023 - Ongoing',
        milestones: [
            { title: 'AI Model Development', date: '2023-06'},
            { title: 'Beta Release', date: '2023-09' },
            { title: 'User Feedback Integration', date: '2023-11' }
        ],
        techDetails: {
            "Node.js": "Implemented server-side logic and API endpoints.",
            "Python": "Developed AI models for personalized advice.",
            "Firebase": "Managed user data synchronization and authentication.",
            "PostgreSQL": "Handled complex data queries and storage."
        },
        progress: 50,
        reviews: [
            { feedback: "This will help a lot of people when finished", user: "Chris T." },
            { feedback: "The AI is being set up to advise rather than to solve", user: "Jordan M." }
        ]
    }
];

const Cube2Projects = ({ onBack }) => {
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('title');
    const [darkMode, setDarkMode] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);

    const handleTechChange = useCallback((tech) => {
        setSelectedTechs(prev => {
            const newTechs = prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech];
            setFiltersActive(newTechs.length > 0 || selectedStatuses.length > 0);
            return newTechs;
        });
    }, [selectedStatuses]);

    const handleStatusChange = useCallback((status) => {
        setSelectedStatuses(prev => {
            const newStatuses = prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status];
            setFiltersActive(selectedTechs.length > 0 || newStatuses.length > 0);
            return newStatuses;
        });
    }, [selectedTechs]);

    const handleSortChange = (e) => {
        const criterion = e.target.value;
        setSortCriterion(criterion);
    };

    const filterProjects = useCallback((techs, statuses, criterion) => {
        let filtered = [...projects];

        if (techs.length > 0) {
            filtered = filtered.filter(project => techs.some(tech => project.technologies.includes(tech)));
        }

        if (statuses.length > 0) {
            filtered = filtered.filter(project => statuses.includes(project.completionDate === "Completed" ? "Completed" : "In Production"));
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
    }, []);

    const resetView = () => {
        setSelectedTechs([]);
        setSelectedStatuses([]);
        setSortCriterion('title');
        setFilteredProjects(projects);
        setFiltersActive(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('cube2-dark-mode', !darkMode);
    };

    useEffect(() => {
        filterProjects(selectedTechs, selectedStatuses, sortCriterion);
    }, [selectedTechs, selectedStatuses, sortCriterion, filterProjects]);

    useEffect(() => {
        const canvas = document.getElementById('cube2-background-canvas');
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        let isDarkMode = document.body.classList.contains('cube2-dark-mode');

        const createParticles = () => {
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 3 + 1,
                    color: isDarkMode ? `rgba(255, 255, 255, ${Math.random()})` : `rgba(0, 0, 0, ${Math.random() * 0.6 + 0.4})`,
                    speed: Math.random() * 2 + 0.5,
                    angle: Math.random() * 2 * Math.PI
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
                ctx.fillStyle = p.color;
                ctx.fill();
                p.x += p.speed * Math.cos(p.angle);
                p.y += p.speed * Math.sin(p.angle);
                if (p.x > width) p.x = 0;
                if (p.x < 0) p.x = width;
                if (p.y > height) p.y = 0;
                if (p.y < 0) p.y = height;
            });
        };

        const drawLines = () => {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 0.5;
            particles.forEach((p1, i) => {
                particles.forEach((p2, j) => {
                    if (i !== j) {
                        const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                        if (distance < 100) {
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                        }
                    }
                });
            });
            ctx.stroke();
        };

        const parallaxEffect = () => {
            const handleMouseMove = (e) => {
                const x = (e.clientX / width) - 0.5;
                const y = (e.clientY / height) - 0.5;

                particles.forEach(p => {
                    p.x += x * p.speed * 0.5;
                    p.y += y * p.speed * 0.5;
                });
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        };

        const addGlowEffect = () => {
            particles.forEach(p => {
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 20;
            });
        };

        createParticles();
        const animate = () => {
            drawParticles();
            drawLines();
            addGlowEffect();
            requestAnimationFrame(animate);
        };

        parallaxEffect();
        animate();
    }, [darkMode]);

    useEffect(() => {
        const handleLoad = () => {
            const elements = document.querySelectorAll('.cube2-project-card');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('in-view');
                }, index * 100);
            });
        };

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <div className={`cube2-project-showcase ${darkMode ? 'cube2-dark-mode' : 'cube2-light-mode'}`}>
            <h2 className="cube2-projects-heading" aria-label="Project List">Projects</h2>
            <div className="cube2-filter-container" role="region" aria-label="Filter Options">
                <div className="cube2-multi-select">
                    {Array.from(new Set(projects.flatMap(p => p.technologies))).map(tech => (
                        <label key={tech} className="cube2-custom-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedTechs.includes(tech)}
                                onChange={() => handleTechChange(tech)}
                            />
                            <span className="cube2-checkmark"></span>
                            {tech}
                        </label>
                    ))}
                </div>
                <div className="cube2-multi-select">
                    {["Completed", "In Production"].map(status => (
                        <label key={status} className="cube2-custom-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedStatuses.includes(status)}
                                onChange={() => handleStatusChange(status)}
                            />
                            <span className="cube2-checkmark"></span>
                            {status}
                        </label>
                    ))}
                </div>
                <div className="cube2-custom-select">
                    <select value={sortCriterion} onChange={handleSortChange}>
                        <option value="title">Sort by Title</option>
                        <option value="completionDate">Sort by Completion Date</option>
                        <option value="userRating">Sort by User Rating</option>
                    </select>
                </div>
            </div>
            <div className="cube2-projects-container">
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
            <button onClick={toggleDarkMode} className="cube2-dark-mode-toggle">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button onClick={onBack} className="cube2-back-button">Back</button>
            {filtersActive && (
                <button onClick={resetView} className="cube2-reset-view">Reset View</button>
            )}
            <canvas id="cube2-background-canvas"></canvas>
        </div>
    );
};

export default Cube2Projects;