import React from 'react';
import './TechDetailsModal.css';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TechDetailsModal = ({ tech, onClose }) => {
    if (!tech) {
        return null;
    }

    return (
        <div className="tech-details-modal">
            <motion.div
                className="tech-details-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
                <h4>Skill Level: {tech.skillLevel}</h4>
                <div className="proficiency-bar">
                    <div className="proficiency-fill" style={{ width: `${tech.proficiency}%` }}>
                        {tech.proficiency}%
                    </div>
                </div>
                <h4>Related Projects:</h4>
                <Carousel showThumbs={false}>
                    {tech.projects.map((project, index) => (
                        <div key={index} className="carousel-slide">
                            <p>{project}</p>
                        </div>
                    ))}
                </Carousel>
                <button onClick={onClose} className="close-button">Close</button>
            </motion.div>
        </div>
    );
};

export default TechDetailsModal;