import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import './Cube3.css';

const ProblemSolving = lazy(() => import('./ProblemSolving'));
const TechStackExplorer = lazy(() => import('./TechStackExplorer'));

const Cube3 = () => {
    const problemSolvingRef = useRef(null);
    const techStackExplorerRef = useRef(null);

    const [activeSection, setActiveSection] = useState('problemSolving');
    const [showBackToTop, setShowBackToTop] = useState(false);

    const scrollToSection = (ref, section) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);

        const sections = [
            problemSolvingRef.current,
            techStackExplorerRef.current,
        ];

        sections.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            sections.forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
            window.removeEventListener('scroll', handleScroll);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }, []);

    return (
        <div className={`cube3-container ${activeSection}`}>
            <nav className="cube3-nav">
                <ul>
                    <li className={activeSection === 'problemSolving' ? 'active' : ''}>
                        <button onClick={() => scrollToSection(problemSolvingRef, 'problemSolving')}>Problem Solving</button>
                    </li>
                    <li className={activeSection === 'techStackExplorer' ? 'active' : ''}>
                        <button onClick={() => scrollToSection(techStackExplorerRef, 'techStackExplorer')}>Tech Stack Explorer</button>
                    </li>
                </ul>
            </nav>
            <section ref={problemSolvingRef} id="problemSolving" className="cube3-section">
                <h1>Problem Solving</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <ProblemSolving />
                </Suspense>
            </section>
            <section ref={techStackExplorerRef} id="techStackExplorer" className="cube3-section">
                <h1>Tech Stack Explorer</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <TechStackExplorer />
                </Suspense>
            </section>
            {showBackToTop && (
                <button className="back-to-top" onClick={scrollToTop}>
                    ↑ Top
                </button>
            )}
        </div>
    );
};

export default Cube3;