import React, { useState, useEffect } from 'react';

const ProjectsPage: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(Array.from({ length: 12 }, (_, i) => i));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '50px',
    },
    title: {
      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '20px',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#5a6c7d',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    levelSection: {
      marginBottom: '60px',
    },
    levelTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '30px',
      paddingLeft: '20px',
      borderLeft: '4px solid #667eea',
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '30px',
    },
    projectCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #f0f0f0',
      cursor: 'pointer',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    projectHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '15px',
    },
    projectTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0',
      flex: 1,
    },
    difficultyBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
    },
    projectDescription: {
      color: '#5a6c7d',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    techStack: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
      marginBottom: '15px',
    },
    techTag: {
      padding: '4px 10px',
      background: '#f7fafc',
      color: '#4a5568',
      fontSize: '0.8rem',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
    },
    projectFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
    },
    duration: {
      color: '#718096',
      fontSize: '0.85rem',
    },
    startButton: {
      padding: '8px 20px',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    levelBadge: {
      position: 'absolute' as const,
      top: '15px',
      right: '15px',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
    },
  };

  const projects = {
    beginner: [
      {
        title: 'Todo List App',
        description: 'A simple CRUD application to manage daily tasks with React frontend and Express backend.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
        duration: '1-2 weeks',
        difficulty: 'Beginner',
        color: '#48bb78'
      },
      {
        title: 'Personal Blog',
        description: 'Create a personal blogging platform where users can write, edit, and publish articles.',
        techStack: ['React', 'Express', 'MongoDB', 'JWT'],
        duration: '2-3 weeks',
        difficulty: 'Beginner',
        color: '#48bb78'
      },
      {
        title: 'Weather Dashboard',
        description: 'Build a weather application that displays current weather and forecasts using external APIs.',
        techStack: ['React', 'Node.js', 'API Integration'],
        duration: '1 week',
        difficulty: 'Beginner',
        color: '#48bb78'
      },
      {
        title: 'Recipe Finder',
        description: 'An app to search and display recipes from various cuisines with ingredient lists.',
        techStack: ['React', 'Express', 'MongoDB', 'API'],
        duration: '2 weeks',
        difficulty: 'Beginner',
        color: '#48bb78'
      }
    ],
    intermediate: [
      {
        title: 'E-commerce Store',
        description: 'Full-featured online store with product catalog, shopping cart, user authentication, and payment integration.',
        techStack: ['React', 'Redux', 'Express', 'MongoDB', 'Stripe'],
        duration: '4-6 weeks',
        difficulty: 'Intermediate',
        color: '#ed8936'
      },
      {
        title: 'Social Media Platform',
        description: 'Build a social networking app with user profiles, posts, comments, likes, and real-time messaging.',
        techStack: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
        duration: '6-8 weeks',
        difficulty: 'Intermediate',
        color: '#ed8936'
      },
      {
        title: 'Project Management Tool',
        description: 'Create a collaborative project management application with teams, tasks, deadlines, and progress tracking.',
        techStack: ['React', 'Redux', 'Express', 'MongoDB', 'WebSockets'],
        duration: '5-7 weeks',
        difficulty: 'Intermediate',
        color: '#ed8936'
      },
      {
        title: 'Online Learning Platform',
        description: 'Educational platform with course creation, video streaming, quizzes, and progress tracking.',
        techStack: ['React', 'Express', 'MongoDB', 'AWS S3', 'JWT'],
        duration: '6-8 weeks',
        difficulty: 'Intermediate',
        color: '#ed8936'
      }
    ],
    advanced: [
      {
        title: 'Video Streaming Platform',
        description: 'Netflix-like application with video upload, streaming, user subscriptions, and content management.',
        techStack: ['React', 'Redux', 'Express', 'MongoDB', 'AWS', 'FFmpeg'],
        duration: '8-12 weeks',
        difficulty: 'Advanced',
        color: '#e53e3e'
      },
      {
        title: 'Real-time Trading Platform',
        description: 'Stock trading application with real-time data, portfolio management, and transaction history.',
        techStack: ['React', 'Redux', 'Express', 'MongoDB', 'WebSockets', 'Chart.js'],
        duration: '10-14 weeks',
        difficulty: 'Advanced',
        color: '#e53e3e'
      },
      {
        title: 'Healthcare Management System',
        description: 'Comprehensive healthcare platform with patient records, appointment scheduling, and telemedicine features.',
        techStack: ['React', 'Express', 'MongoDB', 'Socket.io', 'HIPAA Compliance'],
        duration: '12-16 weeks',
        difficulty: 'Advanced',
        color: '#e53e3e'
      },
      {
        title: 'Multi-vendor Marketplace',
        description: 'Complex marketplace with vendor management, order processing, payment splitting, and analytics.',
        techStack: ['React', 'Redux', 'Express', 'MongoDB', 'Microservices', 'Docker'],
        duration: '14-18 weeks',
        difficulty: 'Advanced',
        color: '#e53e3e'
      }
    ]
  };

  const getDifficultyStyles = (difficulty: string) => {
    const styles_diff: { [key: string]: any } = {
      'Beginner': { backgroundColor: '#c6f6d5', color: '#22543d' },
      'Intermediate': { backgroundColor: '#fed7cc', color: '#c05621' },
      'Advanced': { backgroundColor: '#fed7d7', color: '#c53030' }
    };
    return styles_diff[difficulty] || styles_diff['Beginner'];
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Project Ideas</h1>
        <p style={styles.subtitle}>
          Build your portfolio with these hands-on MERN stack projects. Start with beginner projects 
          and gradually work your way up to advanced applications.
        </p>
      </div>

      {Object.entries(projects).map(([level, projectList], sectionIndex) => (
        <div key={level} style={styles.levelSection}>
          <h2 style={styles.levelTitle}>
            {level.charAt(0).toUpperCase() + level.slice(1)} Projects
          </h2>
          <div style={styles.projectsGrid}>
            {projectList.map((project, projectIndex) => {
              const itemIndex = sectionIndex * 4 + projectIndex;
              return (
                <div
                  key={projectIndex}
                  style={{
                    ...styles.projectCard,
                    transform: visibleItems.includes(itemIndex) ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                    opacity: visibleItems.includes(itemIndex) ? 1 : 0,
                    transitionDelay: `${itemIndex * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{...styles.levelBadge, backgroundColor: project.color}}></div>
                  
                  <div style={styles.projectHeader}>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
                    <div style={{
                      ...styles.difficultyBadge,
                      ...getDifficultyStyles(project.difficulty)
                    }}>
                      {project.difficulty}
                    </div>
                  </div>
                  
                  <p style={styles.projectDescription}>{project.description}</p>
                  
                  <div style={styles.techStack}>
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} style={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                  
                  <div style={styles.projectFooter}>
                    <span style={styles.duration}>⏱️ {project.duration}</span>
                    <button
                      style={styles.startButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(45deg, #5a67d8, #6b46c1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Start Project
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsPage;