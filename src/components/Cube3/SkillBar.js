import React, { useState } from 'react';
import {Tooltip} from 'react-tooltip';
import './SkillBar.css';

const SkillBar = ({ skill, level, details }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="skill-bar"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            data-tip={details}
            data-for={`tooltip-${skill}`}
        >
            <div className="skill-bar-label">{skill}</div>
            <div className="skill-bar-level" style={{ width: `${level}%` }}>
                <span className="skill-bar-percentage">{level}%</span>
            </div>
            {hover && <Tooltip id={`tooltip-${skill}`} effect="solid" place="top" />}
        </div>
    );
};

export default SkillBar;