import React from 'react';
import SkillBar from './SkillBar';
import './EnhancedSkillsMatrix.css';

const skills = [
    { skill: 'Python', level: 90, details: 'Extensive experience with data analysis, machine learning, and web development.' },
    { skill: 'CSS', level: 85, details: 'Proficient in creating responsive and visually appealing web designs.' },
    { skill: 'HTML', level: 80, details: 'Strong foundation in semantic HTML and web accessibility principles.' },
    { skill: 'JavaScript', level: 75, details: 'Experience with front-end frameworks and libraries like React and Angular.' },
    { skill: 'Dart', level: 70, details: 'Developed cross-platform mobile applications using Flutter.' },
    { skill: 'PostgreSQL', level: 65, details: 'Skilled in database design, querying, and optimization.' },
    { skill: 'SQLite', level: 60, details: 'Used in several projects for lightweight, local database solutions.' },
    { skill: 'C++', level: 55, details: 'Understanding of object-oriented programming and systems programming.' },
    { skill: 'SQL', level: 50, details: 'Experienced in writing complex SQL queries and database management.' },
    { skill: 'Java', level: 45, details: 'Familiar with Java for backend development and Android applications.' },
    { skill: 'React', level: 40, details: 'Developed several single-page applications using React and Redux.' },
    { skill: 'JSON', level: 35, details: 'Used extensively for data interchange between client and server.' },
    { skill: 'Linux', level: 30, details: 'Basic knowledge of Linux command line and server management.' },
    { skill: 'MySQL', level: 25, details: 'Experience with MySQL in several web development projects.' }
];

const EnhancedSkillsMatrix = () => {
    return (
        <div className="enhanced-skills-matrix">
            <h2>Skills and Proficiency</h2>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <SkillBar key={index} skill={skill.skill} level={skill.level} details={skill.details} />
                ))}
            </div>
        </div>
    );
};

export default EnhancedSkillsMatrix;