import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import './LayeredMotionGraphics.css'

const LayeredMotionGraphics = () => {
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
    const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
    const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 + 150}px,0)`;

    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
    return (
        <div className="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
            <animated.div className="card1" style={{ transform: props.xy.interpolate(trans1) }} />
            <animated.div className="card2" style={{ transform: props.xy.interpolate(trans2) }} />
            <animated.div className="card3" style={{ transform: props.xy.interpolate(trans3) }} />
        </div>
    );
};

export default LayeredMotionGraphics;