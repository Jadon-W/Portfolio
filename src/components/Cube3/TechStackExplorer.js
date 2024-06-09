import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './TechStackExplorer.css';
import gsap from 'gsap';
import  {Tooltip}  from 'react-tooltip';
import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'react-circular-progressbar/dist/styles.css';
import 'chartjs-plugin-annotation';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

gsap.registerPlugin(ScrollTrigger);



ChartJS.register(...registerables, ChartDataLabels, zoomPlugin);
const skillData = [
    {
        skill: 'React',
        proficiency: 91,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            {phase: 'Videos and Futher Exploration', level: 25},
            { phase: 'After School Website Project', level: 45 },
            { phase: 'Next Door Helpers App Development', level: 75 },
            { phase: 'Ongoing Learning and Refinement', level: 91 },
        ],
        projects: [
            {
                title: 'After School Website',
                impact: 'Enhanced user experience, leading to a 40% increase in engagement and a 30% reduction in load times.',
                keyFeatures: [
                    'Dynamic and interactive elements',
                    'Responsive design optimized for mobile and desktop',
                    'Seamless navigation and user-friendly interface',
                ],
                status: 'Completed'
            },
            {
                title: 'Next Door Helpers App',
                impact: 'Built a robust community platform, increasing user engagement and facilitating neighborhood interactions.',
                keyFeatures: [
                    'Real-time chat and notifications',
                    'User authentication and profile management',
                    'Task sharing and community forum features',
                ],
                status: 'In Development'
            }
        ],
        challenges: [
            { challenge: 'Complex state management', solution: 'Implemented Redux for efficient state handling, improving maintainability and performance.' },
            { challenge: 'Ensuring responsive design', solution: 'Utilized CSS flexbox and media queries to achieve a fully responsive layout.' }
        ],
        categories: 'Frontend',
    },
    {
        skill: 'Node.js',
        proficiency: 87,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Bank Transaction Project', level: 60 },
            { phase: 'Next Door Helpers App Development', level: 70 },
            { phase: 'Ongoing Learning and Refinement', level: 87 },
        ],
        projects: [
            {
                title: 'Bank Transaction Project',
                impact: 'Developed a robust system for simulating bank transactions, enhancing understanding of financial operations.',
                keyFeatures: [
                    'Account creation and management',
                    'Deposit and withdrawal functionality',
                    'Balance checking and transaction history',
                ],
                status: 'Completed'
            },
            {
                title: 'Next Door Helpers App',
                impact: 'Facilitated backend operations and real-time communication for a community-based application.',
                keyFeatures: [
                    'Server-side operations and API endpoints',
                    'Real-time data synchronization with WebSockets',
                    'Scalable architecture supporting high traffic',
                ],
                status: 'In Development'
            }
        ],
        challenges: [
            { challenge: 'Handling high concurrency', solution: 'Utilized clustering and load balancing to manage thousands of concurrent connections efficiently.' },
            { challenge: 'Ensuring data consistency', solution: 'Implemented robust error handling and data validation mechanisms.' }
        ],
        categories: 'Backend',
    },
    {
        skill: 'Python',
        proficiency: 88,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Weather App Development', level: 70 },
            { phase: 'Stock Prediction Project', level: 80 },
            { phase: 'Ongoing Learning and Refinement', level: 88 },
        ],
        projects: [
            {
                title: 'Weather App',
                impact: 'Provided accurate and detailed weather forecasts, improving user planning and decision-making.',
                keyFeatures: [
                    '5-day weather forecast with 6-hour intervals',
                    'Detailed information on temperature, wind speed, and more',
                    'User-friendly graphical interface',
                ],
                status: 'Completed'
            },
            {
                title: 'Stock Prediction Project',
                impact: 'Enabled users to make informed investment decisions with accurate stock price predictions.',
                keyFeatures: [
                    'Machine learning models for stock prediction',
                    'Interactive dashboards for visualization',
                    'Real-time data processing and updates',
                ],
                status: 'Completed'
            }
        ],
        challenges: [
            { challenge: 'NLP accuracy', solution: 'Trained the model with diverse datasets to enhance understanding and response accuracy.' },
            { challenge: 'System integration', solution: 'Developed custom APIs to ensure smooth integration with existing customer support platforms.' }
        ],
        categories: 'Fullstack'
    },
    {
        skill: 'Django',
        proficiency: 87,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Mental Health AI Development', level: 70 },
            { phase: 'Ongoing Learning and Refinement', level: 87 },
        ],
        projects: [
            {
                title: 'Mental Health AI',
                impact: 'Provided personalized health advice, improving user mental health and well-being.',
                keyFeatures: [
                    'AI-driven personalized health recommendations',
                    'Integration with user health data',
                    'Interactive and user-friendly interface',
                ],
                status: 'In Development'
            }
        ],
        challenges: [
            { challenge: 'Scaling user base', solution: 'Optimized database queries and implemented caching strategies to handle high traffic.' },
            { challenge: 'Ensuring data security', solution: 'Implemented comprehensive security measures, including data encryption and secure authentication.' }
        ],
        categories: 'Backend'
    },
    {
        skill: 'SQL',
        proficiency: 85,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Bank Transaction Project', level: 75 },
            { phase: 'Ongoing Learning and Refinement', level: 85 },
        ],
        projects: [
            {
                title: 'Bank Transaction Project',
                impact: 'Enhanced financial literacy by simulating real-world banking transactions.',
                keyFeatures: [
                    'Database management for account information',
                    'Transaction logging and reporting',
                    'Automated balance updates',
                ],
                status: 'Completed'
            }
        ],
        challenges: [
            { challenge: 'Data normalization', solution: 'Designed a normalized database schema to ensure data integrity and reduce redundancy.' },
            { challenge: 'Complex queries', solution: 'Optimized SQL queries to improve performance and reduce latency.' }
        ],
        categories: 'Backend'
    },
    {
        skill: 'AWS',
        proficiency: 84,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Further Exploration of Interworkings', level: 35 },
            { phase: 'Next Door Helpers App Deployment', level: 70 },
            { phase: 'Ongoing Learning and Refinement', level: 84 },
        ],
        projects: [
            {
                title: 'Next Door Helpers App',
                impact: 'Implemented a scalable infrastructure, ensuring high availability and fault tolerance.',
                keyFeatures: [
                    'Auto-scaling and load balancing',
                    'Continuous deployment and integration',
                    'Robust monitoring and logging',
                ],
                status: 'In Development'
            }
        ],
        challenges: [
            { challenge: 'Managing scaling', solution: 'Configured auto-scaling groups to dynamically adjust resources based on traffic.' },
            { challenge: 'Ensuring uptime', solution: 'Implemented redundancy and failover strategies to achieve high availability.' }
        ],
        categories: 'Backend'
    },
    {
      skill: 'JavaScript',
      proficiency: 87,
      developmentProgress: [
          { phase: 'Initial Learning', level: 0 },
          { phase: 'After School Website', level: 75 },
          { phase: 'BarCrawl App', level: 85 },
          { phase: 'Ongoing Learning and Refinement', level: 87 },
      ],
      projects: [
          {
              title: 'After School Website',
              impact: 'Enhanced interactivity and user engagement, leading to a more dynamic user experience.',
              keyFeatures: [
                  'Interactive elements and animations',
                  'Responsive design',
                  'Seamless integration with backend APIs',
              ],
              status: 'Completed'
          },
          {
              title: 'BarCrawl App',
              impact: 'Optimized user experience for planning bar crawls, improving engagement and usability.',
              keyFeatures: [
                  'Interactive map and route planning',
                  'Real-time updates and notifications',
                  'User-friendly interface',
              ],
              status: 'In Development'
          }
      ],
      challenges: [
          { challenge: 'Cross-browser compatibility', solution: 'Implemented polyfills and tested extensively across different browsers.' },
          { challenge: 'Performance optimization', solution: 'Used lazy loading and code splitting to improve performance.' }
      ],
      categories: 'Frontend'
    },
    {
      skill: 'Machine Learning',
      proficiency: 82,
      developmentProgress: [
          { phase: 'Initial Learning', level: 0 },
          { phase: 'Stock Prediction Project', level: 75 },
          { phase: 'Ongoing Learning and Refinement', level: 82 },
      ],
      projects: [
          {
              title: 'Stock Prediction Project',
              impact: 'Provided accurate stock price predictions, aiding in investment decision-making.',
              keyFeatures: [
                  'Machine learning models for prediction',
                  'Data preprocessing and feature engineering',
                  'Model evaluation and tuning',
              ],
              status: 'Completed'
          }
      ],
      challenges: [
          { challenge: 'Model accuracy', solution: 'Implemented hyperparameter tuning and ensemble methods to improve accuracy.' },
          { challenge: 'Handling large datasets', solution: 'Used efficient data structures and parallel processing.' }
      ],
      categories: 'Fullstack'
    },
    {
      skill: 'CSS',
      proficiency: 92,
      developmentProgress: [
          { phase: 'Initial Learning', level: 0 },
          { phase: 'After School Website', level: 70 },
          { phase: 'Next Door Helpers App', level: 80 },
          { phase: 'Ongoing Learning and Refinement', level: 92 },
      ],
      projects: [
          {
              title: 'After School Website',
              impact: 'Improved the visual appeal and user experience, increasing user engagement.',
              keyFeatures: [
                  'Custom animations and transitions',
                  'Responsive layouts',
                  'Themed styling',
              ],
              status: 'Completed'
          },
          {
              title: 'Next Door Helpers App',
              impact: 'Enhanced the UI/UX, leading to better user retention and satisfaction.',
              keyFeatures: [
                  'Custom components and design system',
                  'Responsive design for all devices',
                  'Smooth animations and transitions',
              ],
              status: 'In Development'
          }
      ],
      challenges: [
          { challenge: 'Browser compatibility', solution: 'Utilized CSS Grid and Flexbox for cross-browser support.' },
          { challenge: 'Maintaining consistency', solution: 'Developed a design system to ensure consistent styling across the app.' }
      ],
      categories: 'Frontend'
    },
    {
      skill: 'Flutter',
      proficiency: 85,
      developmentProgress: [
          { phase: 'Initial Learning', level: 0 },
          { phase: 'Exploration and Videos', level: 34 },
          { phase: 'Next Door Helpers App', level: 70 },
          { phase: 'Ongoing Learning and Refinement', level: 85 },
      ],
      projects: [
          {
              title: 'Next Door Helpers App',
              impact: 'Developed a cross-platform mobile application, enhancing accessibility and user reach.',
              keyFeatures: [
                  'Cross-platform development',
                  'High performance and smooth animations',
                  'Modern UI components',
              ],
              status: 'In Development'
          }
      ],
      challenges: [
          { challenge: 'Platform-specific issues', solution: 'Implemented platform channels for seamless integration with native code.' },
          { challenge: 'Maintaining performance', solution: 'Optimized widget usage and implemented efficient state management.' }
      ],
      categories: 'Mobile'
    },
    {
      skill: 'TensorFlow',
      proficiency: 85,
      developmentProgress: [
          { phase: 'Initial Learning', level: 0 },
          { phase: 'Exploration and Studying', level: 25},
          { phase: 'Stock Prediction Project', level: 70 },
          { phase: 'Ongoing Learning and Refinement', level: 85 },
      ],
      projects: [
          {
              title: 'Stock Prediction Project',
              impact: 'Implemented advanced machine learning models for accurate stock predictions, aiding in investment decisions.',
              keyFeatures: [
                  'Deep learning models',
                  'Data preprocessing and augmentation',
                  'Model training and evaluation',
              ],
              status: 'Completed'
          }
      ],
      challenges: [
          { challenge: 'Model training time', solution: 'Utilized distributed training and GPU acceleration to reduce training time.' },
          { challenge: 'Model accuracy', solution: 'Implemented advanced model architectures and hyperparameter tuning to improve accuracy.' }
      ],
      categories: 'AI/ML'
    },

      {
        skill: 'Kubernetes',
        proficiency: 81,
        developmentProgress: [
          { phase: 'Initial Learning', level: 0 },
          { phase: 'Container Orchestration', level: 70 },
          { phase: 'Advanced Cluster Management', level: 81 },
        ],
        projects: [
          {
            title: 'Microservices Deployment',
            impact: 'Achieved 99.99% uptime and streamlined deployment processes.',
            keyFeatures: [
              'Automated deployment pipelines',
              'Scalable microservices architecture',
              'Robust monitoring and logging',
            ],
            status: 'Completed',
          },
        ],
        challenges: [
          { challenge: 'Cluster management', solution: 'Implemented automated scaling and self-healing mechanisms.' },
          { challenge: 'Service discovery', solution: 'Utilized Kubernetes DNS for efficient service discovery.' },
        ],
        categories: 'DevOps',
      },
      {
        skill: 'Kotlin',
        proficiency: 78,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Next Door Helpers App', level: 60 },
            { phase: 'Ongoing Learning and Refinement', level: 78 },
        ],
        projects: [
            {
                title: 'Next Door Helpers App',
                impact: 'Developed Android-specific features, enhancing the app\'s performance on Android devices.',
                keyFeatures: [
                    'Native Android development',
                    'High performance and efficient memory usage',
                    'Integration with existing Flutter codebase',
                ],
                status: 'In Development'
            }
        ],
        challenges: [
            { challenge: 'Platform-specific integration', solution: 'Used platform channels to bridge between Kotlin and Flutter seamlessly.' },
            { challenge: 'Optimizing performance', solution: 'Utilized Android-specific optimizations and tools to enhance performance.' }
        ],
        categories: 'Mobile'
    },
    {
        skill: 'Vue.js',
        proficiency: 83,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Further Exploration', level: 25 },
            { phase: 'Weather App', level: 55 },
            { phase: 'Ongoing Learning and Refinement', level: 83 },
        ],
        projects: [
            {
                title: 'Weather App',
                impact: 'Improved front-end performance and user experience with efficient rendering and state management.',
                keyFeatures: [
                    'Reactive data binding',
                    'Component-based architecture',
                    'Optimized for performance',
                ],
                status: 'Completed'
            }
        ],
        challenges: [
            { challenge: 'State management', solution: 'Implemented Vuex for efficient state handling and maintainability.' },
            { challenge: 'Component reusability', solution: 'Designed modular components to enhance reusability and consistency.' }
        ],
        categories: 'Frontend'
    },
    {
        skill: 'GraphQL',
        proficiency: 78,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Next Door Helpers App', level: 65 },
            { phase: 'Ongoing Learning and Refinement', level: 78 },
        ],
        projects: [
            {
                title: 'Next Door Helpers App',
                impact: 'Enhanced data fetching efficiency, reducing load times and improving user experience.',
                keyFeatures: [
                    'Efficient data queries',
                    'Reduced network overhead',
                    'Real-time updates with subscriptions',
                ],
                status: 'In Development'
            }
        ],
        challenges: [
            { challenge: 'Data normalization', solution: 'Implemented normalized data structures and caching to optimize queries.' },
            { challenge: 'Handling complex queries', solution: 'Designed efficient query strategies and used fragments to manage complex data requirements.' }
        ],
        categories: 'Backend'
    },
    {
        skill: 'TypeScript',
        proficiency: 78,
        developmentProgress: [
            { phase: 'Initial Learning', level: 0 },
            { phase: 'Next Door Helpers App', level: 45 },
            { phase: 'Ongoing Learning and Refinement', level: 78 },
        ],
        projects: [
            {
                title: 'Next Door Helpers App',
                impact: 'Improved code quality and maintainability with type safety.',
                keyFeatures: [
                    'Static type checking',
                    'Improved code refactoring',
                    'Enhanced IDE support',
                ],
                status: 'In Development'
            }
        ],
        challenges: [
            { challenge: 'Type system complexity', solution: 'Leveraged TypeScript’s type inference and advanced types for better maintainability.' },
            { challenge: 'Legacy code integration', solution: 'Gradually migrated JavaScript codebase to TypeScript with minimal disruptions.' }
        ],
        categories: 'Frontend'
    }

];

const filters = {
  search: '',
  categories: '',
  statuses: [],
  proficiency: [0, 100],
};

const calculateBadgeCounts = (skills) => {
  const counts = {
    'High Impact': 0,
    'Major Contributions': 0,
    'Key Features': 0,
  };

  skills.forEach((skill) => {
    if (skill.projects.some((project) => project.impact.includes('high impact')))
      counts['High Impact']++;
    if (skill.projects.some((project) => project.impact.includes('major contributions')))
      counts['Major Contributions']++;
    if (skill.projects.some((project) => project.keyFeatures.length > 0))
      counts['Key Features']++;
  });

  return counts;
};

const badgeCounts = calculateBadgeCounts(skillData);

const AdvancedSkillShowcase = () => {
  const [filteredSkills, setFilteredSkills] = useState(skillData);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('proficiency');

  const applyFilters = useCallback(() => {
    let filteredSkills = skillData.filter((skill) => {
      const matchesSearch = skill.skill.toLowerCase().includes(filters.search);
      const matchesCategory = !filters.categories || skill.categories === filters.categories;
      const matchesStatus =
        !filters.statuses.length ||
        filters.statuses.some((status) => skill.projects.some((project) => project.status === status));
      const matchesProficiency =
        skill.proficiency >= filters.proficiency[0] && skill.proficiency <= filters.proficiency[1];
      return matchesSearch && matchesCategory && matchesStatus && matchesProficiency;
    });

    filteredSkills.sort((a, b) => {
      if (sortCriterion === 'proficiency') {
        return b.proficiency - a.proficiency;
      }
      if (sortCriterion === 'alphabetical') {
        return a.skill.localeCompare(b.skill);
      }
      return 0;
    });

    setFilteredSkills(filteredSkills);
  }, [sortCriterion]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    gsap.fromTo(
      '.skill-card',
      { opacity: 0, y: 50 },
      {
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );

    gsap.utils.toArray('.skill-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.5,
      });
    });

    gsap.utils.toArray('.filter-tag').forEach((tag, index) => {
      gsap.from(tag, {
        opacity: 0,
        scale: 0.8,
        delay: index * 0.2,
        duration: 0.5,
        ease: 'back.out(1.7)',
        onComplete: () => gsap.to(tag, { opacity: 1, scale: 1, duration: 0.5 }),
      });
    });
  }, []);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const createRipple = (e, hold) => {
    const card = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(card.clientWidth, card.clientHeight);
    const radius = diameter / 2;
    const rect = card.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    if (hold) {
      circle.classList.add('ripple-hold');
    }

    const ripple = card.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    card.appendChild(circle);

    if (!hold) {
      setTimeout(() => circle.remove(), 1000);
    }
  };

  const handleMouseDown = (e, skill) => {
    createRipple(e, true);
  };

  const handleMouseUp = (e, skill) => {
    const card = e.currentTarget;
    const ripple = card.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    createRipple(e, false);
    handleSkillClick(skill);
  };

  const handleSearchChange = (e) => {
    filters.search = e.target.value.toLowerCase();
    applyFilters();
  };

  const handleCategoryChange = (e) => {
    filters.categories = e.target.value;
    applyFilters();
  };

  const handleStatusChange = (status) => {
    if (filters.statuses.includes(status)) {
      filters.statuses = filters.statuses.filter((s) => s !== status);
    } else {
      filters.statuses.push(status);
    }
    applyFilters();
  };

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
    applyFilters();
  };

  const handleProficiencyChange = (value) => {
    filters.proficiency = value;
    applyFilters();
  };

  const showTooltip = (index) => {
    const tooltip = document.getElementById(`tooltip-${index}`);
    if (tooltip) tooltip.classList.add('tooltip-visible');
  };

  const hideTooltip = (index) => {
    const tooltip = document.getElementById(`tooltip-${index}`);
    if (tooltip) tooltip.classList.remove('tooltip-visible');
  };

  const handleSearchDropdownChange = (e) => {
    const filter = e.target.value.toLowerCase();
    const options = document.querySelectorAll('.dropdown-content button');

    options.forEach((option) => {
      if (option.innerText.toLowerCase().includes(filter)) {
        option.style.display = '';
      } else {
        option.style.display = 'none';
      }
    });
  };

  const chartData = {
    labels: selectedSkill?.developmentProgress.map((progress) => progress.phase) || [],
    datasets: [
      {
        label: 'Development Progress',
        data: selectedSkill?.developmentProgress.map((progress) => progress.level) || [],
        fill: true,
        borderColor: '#00bcd4',
        backgroundColor: 'rgba(0, 188, 212, 0.1)',
        tension: 0.1,
        pointBackgroundColor: '#00bcd4',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00bcd4',
      },
    ],
  };

  const chartOptions = {
    plugins: {
      datalabels: {
        display: true,
        color: '#fff',
        align: 'top',
        font: {
          weight: 'bold',
        },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: (tooltipItem) => `Level: ${tooltipItem.raw}`,
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 80,
            yMax: 80,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Goal',
              enabled: true,
              position: 'center',
              backgroundColor: 'red',
            },
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          pinch: {
            enabled: true,
          },
          wheel: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Development Phases',
          color: '#00bcd4',
        },
        grid: {
          color: '#444',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Proficiency Level',
          color: '#00bcd4',
        },
        grid: {
          color: '#444',
        },
      },
    },
  };

  const handleMouseMove = (e) => {
    const button = document.querySelector('.close-button');
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const isNearButton =
      mouseX > rect.left - 80 &&
      mouseX < rect.right + 80 &&
      mouseY > rect.top - 80 &&
      mouseY < rect.bottom + 80;

    if (isNearButton) {
      button.classList.add('bounce');
    } else {
      button.classList.remove('bounce');
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <StyledSkillShowcase>
      <h2>Advanced Skill Showcase</h2>
      <div className="filter-section">
        <input type="text" placeholder="Search skills..." onChange={handleSearchChange} className="search-input" />
        <div className="dropdown">
          <button className="dropbtn">Explore Categories</button>
          <div className="dropdown-content">
            <button onClick={() => handleCategoryChange({ target: { value: '' } })}>All</button>
            <input type="text" placeholder="Search categories..." onKeyUp={handleSearchDropdownChange} />
            <button onClick={() => handleCategoryChange({ target: { value: 'Frontend' } })}>Frontend</button>
            <button onClick={() => handleCategoryChange({ target: { value: 'Backend' } })}>Backend</button>
            <button onClick={() => handleCategoryChange({ target: { value: 'Fullstack' } })}>Fullstack</button>
            <button onClick={() => handleCategoryChange({ target: { value: 'Mobile' } })}>Mobile</button>
            <button onClick={() => handleCategoryChange({ target: { value: 'AI/ML' } })}>AI/ML</button>
            <button onClick={() => handleCategoryChange({ target: { value: 'DevOps' } })}>DevOps</button>
          </div>
        </div>
        <div className="multi-select-filters">
          {['High Impact', 'Major Contributions', 'Key Features'].map((status) => (
            <div
              key={status}
              className={`filter-tag ${filters.statuses.includes(status) ? 'selected' : ''}`}
              onClick={() => handleStatusChange(status)}
            >
              {status}
              <span className="badge-count">{badgeCounts[status]}</span>
            </div>
          ))}
        </div>
        <select onChange={handleSortChange} className="sort-select">
          <option value="proficiency">Sort by Proficiency</option>
          <option value="alphabetical">Sort Alphabetically</option>
        </select>
        <div className="proficiency-slider">
          <label>Proficiency: </label>
          <Slider
            range
            min={0}
            max={100}
            defaultValue={[0, 100]}
            onChange={handleProficiencyChange}
            trackStyle={[{ backgroundColor: '#00bcd4' }]}
            handleStyle={[{ borderColor: '#00bcd4' }, { borderColor: '#00bcd4' }]}
          />
        </div>
      </div>
      <Dashboard />
      <div className="content-list">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="skill-card"
            onMouseDown={(e) => handleMouseDown(e, skill)}
            onMouseUp={(e) => handleMouseUp(e, skill)}
            onMouseEnter={() => showTooltip(index)}
            onMouseLeave={() => hideTooltip(index)}
            data-tooltip-id={`tooltip-${index}`}
          >
            <h3>{skill.skill}</h3>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${skill.proficiency}%` }}>
                <span className="progress-label">{skill.proficiency}%</span>
                <div className="tooltip-progress">{skill.proficiency}%</div>
              </div>
            </div>
            <div className="skill-badges">
              {skill.proficiency > 80 && <span className="badge high-proficiency">High Proficiency</span>}
              {skill.projects.some((project) => project.impact.includes('high impact')) && <span className="badge high-impact">High Impact</span>}
              {skill.projects.length > 1 && <span className="badge multi-project">Multiple Projects</span>}
            </div>
          </div>
        ))}
      </div>
      {selectedSkill && (
        <div className="skill-details-modal">
          <h3>{selectedSkill.skill}</h3>
          <Line data={chartData} options={chartOptions} />
          <h4>Projects:</h4>
          <ul>
            {selectedSkill.projects.map((project, index) => (
              <li key={index}>
                <strong>{project.title}</strong>
                <p>{project.impact}</p>
                <ul>
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <h4>Challenges and Solutions:</h4>
          <ul>
            {selectedSkill.challenges.map((item, index) => (
              <li key={index}>
                <strong>Challenge:</strong> {item.challenge}
                <p>
                  <strong>Solution:</strong> {item.solution}
                </p>
              </li>
            ))}
          </ul>
          <button className="close-button" onClick={() => setSelectedSkill(null)}>
            <span className="close-icon">X</span>
            <span className="close-text">Close</span>
          </button>
        </div>
      )}
    </StyledSkillShowcase>
  );
};

const ProgressRing = ({ radius, stroke, progress, color }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        stroke="#fff"
        strokeWidth="1px"
        dy=".3em"
      >
        {`${progress.toFixed(0)}%`}
      </text>
    </svg>
  );
};

const Dashboard = () => {
  const pieData = {
    labels: ['Frontend', 'Backend', 'Fullstack', 'Mobile', 'AI/ML', 'DevOps'],
    datasets: [
      {
        data: [31, 31, 13, 13, 6, 6],
        backgroundColor: ['#00bcd4', '#ff9800', '#4caf50', '#f44336', '#9c27b0', '#2196f3'],
      },
    ],
  };

  const barData = {
    labels: ['React', 'Node.js', 'Python', 'Django', 'SQL', 'CSS'],
    datasets: [
      {
        label: 'Top Proficiencies',
        data: [91, 87, 88, 87, 85, 92],
        backgroundColor: '#00bcd4',
      },
    ],
  };

  const kpiData = [
    { label: 'Average Proficiency', progress: 84.44, milestones: 16 },
    { label: 'High Proficiency Skills', progress: 56.25, milestones: 9 },
    { label: 'Active Projects', progress: 3, milestones: 3, showProgress: false }
  ];

  return (
    <StyledDashboard>
      <div className="dashboard-content">
        <div className="chart-container">
          <h4>Skills Distribution</h4>
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="chart-container">
          <h4>Top Proficiency Levels</h4>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="kpi-container">
          <h4>KPI Highlights</h4>
          <ul>
            {kpiData.map((kpi, index) => (
              <li key={index}>
                <div className="kpi-label">
                  {kpi.showProgress !== false && <ProgressRing
                    radius={70}
                    stroke={8}
                    progress={kpi.progress}
                    color={kpi.progress >= 50 ? '#4caf50' : '#f44336'}
                  />}
                  <span>{kpi.label}</span>
                </div>
                <div className="kpi-value">
                  <span>{kpi.milestones}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledSkillShowcase = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(to right, #101010, #404040);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  animation: fadeIn 1s ease-in-out;
  color: #fff;
  position: relative;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 3rem;
    color: #00bcd4;
  }

  .filter-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .search-input,
    .sort-select {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #00bcd4;
      background: #333;
      color: #fff;
      font-size: 1rem;
      margin-right: 10px;
      transition: all 0.3s;
    }

    .search-input:focus,
    .sort-select:focus {
      outline: none;
      border-color: #00bcd4;
      box-shadow: 0 0 5px rgba(0, 188, 212, 0.5);
    }

    .multi-select-filters .filter-tag {
      position: relative;
      padding: 10px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.1);
      color: #00bcd4;
      cursor: pointer;
      transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
      animation: pulse 2s infinite;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .multi-select-filters .filter-tag:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .multi-select-filters .filter-tag.selected {
      background: rgba(0, 188, 212, 0.5);
      color: #fff;
    }

    .multi-select-filters .badge-count {
      background: #ff9800;
      color: #fff;
      border-radius: 50%;
      padding: 2px 5px;
      font-size: 0.8rem;
      display: inline-block;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #2a2a2a;
      min-width: 200px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      transition: all 0.3s ease-in-out;
      border-radius: 5px;
      overflow: hidden;
    }

    .dropdown:hover .dropdown-content {
      display: block;
      transform: translateY(10px);
    }

    .dropdown-content input {
      width: calc(100% - 20px);
      padding: 5px;
      margin: 5px;
      border: none;
      border-bottom: 1px solid #ddd;
      background: #333;
      color: #fff;
    }

    .dropdown-content button {
      color: #fff;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      transition: background-color 0.3s;
    }

    .dropdown-content button:hover {
      background-color: #555;
    }

    .proficiency-slider {
      margin: 20px 0;
    }

    .rc-slider-track {
      background: #00bcd4 !important;
    }

    .rc-slider-handle {
      border-color: #00bcd4 !important;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  .content-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .skill-card {
      flex: 1 1 28%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 20px;
      margin: 15px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: transform 0.4s, box-shadow 0.4s;
      animation: zoomIn 0.5s ease-in-out;
      position: relative;
      overflow: hidden;

      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 188, 212, 0.5);
        transform: scale(0);
        animation: ripple 1s linear;
        pointer-events: none;
      }

      .ripple-hold {
        animation: ripple-hold 1s linear infinite;
      }

      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes ripple-hold {
        to {
          transform: scale(4);
          opacity: 0.5;
        }
      }

      .tooltip {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
      }

      .tooltip-visible {
        opacity: 1;
        transform: translateY(0);
      }

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
      }

      h3 {
        margin-bottom: 10px;
        font-size: 1.5rem;
        color: #00bcd4;
      }

      .progress-bar {
        background: rgba(255, 255, 255, 0.25);
        border-radius: 15px;
        height: 25px;
        margin-top: 15px;
        overflow: hidden;
        position: relative;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);

        .progress {
          background: linear-gradient(to right, #00bcd4, #00b3b3);
          height: 100%;
          position: absolute;
          transition: width 0.5s ease;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .progress-label {
          position: absolute;
          width: 100%;
          text-align: center;
          line-height: 25px;
          font-size: 1rem;
          color: #fff;
          transform: translateX(calc(100% - 50%));
        }

        .tooltip-progress {
          display: none;
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.75);
          color: #fff;
          padding: 5px;
          border-radius: 5px;
          font-size: 0.9rem;
        }

        &:hover .tooltip-progress {
          display: block;
        }

        &:before,
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.25));
          z-index: -1;
        }

        &:before {
          animation: pulse 1.5s infinite ease-in-out;
        }

        &:after {
          animation: wave 1.5s infinite ease-in-out;
          z-index: 0;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .start-icon,
        .end-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          color: #fff;
        }

        .start-icon {
          left: 5px;
        }

        .end-icon {
          right: 5px;
        }

        &.completed {
          .progress {
            animation: checkmark 1s ease-in-out;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
      }

      .skill-badges {
        display: flex;
        gap: 5px;
        margin-top: 10px;

        .badge {
          background: #00bcd4;
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.8rem;
          animation: fadeIn 0.5s ease-in-out;

          &.high-proficiency {
            background: #4caf50;
          }

          &.high-impact {
            background: #f44336;
          }

          &.multi-project {
            background: #ff9800;
          }
        }
      }
    }

    @keyframes zoomIn {
      from {
        transform: scale(0.95);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .skill-details-modal {
    background: rgba(0, 0, 0, 0.8);
    padding: 30px;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
    max-width: 800px;
    width: 90%;
    max-height: 90%;
    overflow-y: auto;
    z-index: 1000;

    h3 {
      margin-bottom: 20px;
      font-size: 2rem;
      color: #00bcd4;
    }

    ul {
      margin: 20px 0;
      padding-left: 20px;

      li {
        margin-bottom: 10px;
      }
    }

    h4 {
      margin-top: 20px;
      font-size: 1.5rem;
      color: #ff9800;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #00bcd4;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s;
      overflow: hidden;
      z-index: 1;

      &:hover {
        background: #0097a7;
        transform: scale(1.1);
      }

      &:focus {
        outline: none;
      }

      &.bounce {
        animation: bounce 0.33s infinite alternate;
      }

      @keyframes bounce {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(-5px);
        }
      }

      .close-icon {
        font-size: 1.5rem;
        transition: all 0.3s;
      }

      .close-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1rem;
        opacity: 0;
        transition: all 0.3s;
      }

      &:hover .close-icon {
        transform: scale(0.1);
        opacity: 0;
      }

      &:hover .close-text {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
`;

const StyledDashboard = styled.div`
  .dashboard-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 20px;

    .chart-container {
      width: 350px;
      height: 350px;
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }

    .kpi-container {
      width: 500px;
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

      h4 {
        text-align: center;
        color: #00bcd4;
        margin-bottom: 20px;
        font-size: 1.5rem;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #00bcd4;

          &:last-child {
            border-bottom: none;
          }

          .kpi-label {
            display: flex;
            align-items: center;
            gap: 20px;
            font-size: 1.2rem;
            color: #fff;
            span {
              font-size: 1.5rem;
            }
          }

          .kpi-value {
            font-size: 1.5rem;
            color: #fff;
            span {
              font-size: 1.8rem;
              color: #00bcd4;
            }
          }
        }
      }
    }
  }
`;

export default AdvancedSkillShowcase;