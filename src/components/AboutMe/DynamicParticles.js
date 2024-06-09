import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const DynamicParticles = () => {
    const particlesInit = async (main) => {
        // Make sure to load all sub-dependencies
        await loadFull(main);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                particles: {
                    number: {
                        value: 50,
                    },
                    links: {
                        enable: true,
                    },
                    move: {
                        enable: true,
                    },
                },
            }}
        />
    );
};

export default DynamicParticles;