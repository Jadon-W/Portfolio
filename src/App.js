import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './CustomCursor';

// Lazy-loaded components
const HomeHero = lazy(() => import('./components/HomeHero'));
const AboutMe = lazy(() => import('./components/AboutMe/AboutMe'));
const Cube2Projects = lazy(() => import('./components/Cube2/Cube2Projects'));
const Cube3 = lazy(() => import('./components/Cube3/Cube3'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={loadingStyle}>
    <div className="spinner"></div>
    Loading...
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    } else {
      // Log error to a monitoring service in production
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={errorStyle}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
          <button onClick={this.handleRetry} style={buttonStyle}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Inline style for loading fallback
const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontSize: '1.5rem',
  color: '#2A4D69'
};

// Inline style for error handling
const errorStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontSize: '1.5rem',
  color: '#ff4c4c'
};

// Inline style for retry button
const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '1rem',
  color: '#fff',
  backgroundColor: '#2A4D69',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

function App() {
  return (
    <Router>
      <CustomCursor />
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomeHero />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/projects" element={<Cube2Projects />} />
            <Route path="/cube3" element={<Cube3 />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;