import React, { useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import './KnowledgeGraph.css';

const data = {
    nodes: [
        { id: 'Python', group: 'skill' },
        { id: 'JavaScript', group: 'skill' },
        { id: 'React', group: 'skill' },
        { id: 'SQL', group: 'skill' },
        { id: 'Weather App', group: 'project' },
        { id: 'After School Website', group: 'project' },
        { id: 'Bank Transaction Project', group: 'project' },
        { id: 'Visual Studio', group: 'tech' },
        { id: 'GitHub', group: 'tech' }
    ],
    links: [
        { source: 'Python', target: 'Weather App' },
        { source: 'JavaScript', target: 'After School Website' },
        { source: 'React', target: 'After School Website' },
        { source: 'Python', target: 'Bank Transaction Project' },
        { source: 'Visual Studio', target: 'Python' },
        { source: 'GitHub', target: 'JavaScript' }
    ]
};

const KnowledgeGraph = () => {
    const fgRef = useRef();

    useEffect(() => {
        fgRef.current.d3Force('link').distance(link => link.source.group === 'project' ? 200 : 100);
    }, []);

    return (
        <div className="knowledge-graph-container">
            <h2>Interactive Knowledge Graph</h2>
            <ForceGraph3D
                ref={fgRef}
                graphData={data}
                nodeAutoColorBy="group"
                nodeLabel="id"
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={d => d.value * 0.001}
                nodeThreeObject={node => {
                    const sprite = new SpriteText(node.id);
                    sprite.material.depthWrite = false; 
                    sprite.color = node.group === 'skill' ? '#00bcd4' : node.group === 'project' ? '#ff5722' : '#8bc34a';
                    sprite.textHeight = 8;
                    return sprite;
                }}
            />
        </div>
    );
};

export default KnowledgeGraph;