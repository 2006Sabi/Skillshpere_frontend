import React, { useState, useEffect } from "react";

const ProjectsPage: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeProjectKey, setActiveProjectKey] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(Array.from({ length: 12 }, (_, i) => i));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "10px 20px",
    },

    header: {
      textAlign: "center",
      marginBottom: "50px",
    },

    title: {
      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
      fontWeight: 700,
      color: "#2c3e50",
      marginBottom: "20px",
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      WebkitBackgroundClip: "text" as any,
      WebkitTextFillColor: "transparent" as any,
    },

    subtitle: {
      fontSize: "1.2rem",
      color: "#5a6c7d",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: 1.6,
    },

    levelSection: {
      marginBottom: "60px",
    },

    levelTitle: {
      fontSize: "1.8rem",
      fontWeight: 700,
      color: "#2c3e50",
      marginBottom: "30px",
      paddingLeft: "20px",
      borderLeft: "4px solid #667eea",
    },

    // grid container now keeps items in fixed columns but overlay will not change layout
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "30px",
      alignItems: "start",
    },

    // Card - uniform sizing & layout
    projectCard: {
      background: "white",
      borderRadius: "16px",
      padding: "25px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      border: "1px solid #f0f0f0",
      cursor: "pointer",
      position: "relative",
      overflow: "visible", // allow overlay to appear outside card
      minHeight: "360px", // uniform card height
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    projectHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "15px",
      gap: "12px",
    },

    projectTitle: {
      fontSize: "1.3rem",
      fontWeight: 600,
      color: "#2c3e50",
      margin: 0,
      flex: 1,
      lineHeight: 1.15,
    },

    difficultyBadge: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },

    projectDescription: {
      color: "#5a6c7d",
      fontSize: "0.95rem",
      lineHeight: 1.6,
      marginBottom: "14px",
      maxHeight: "108px", // prevent long descriptions from expanding card content
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    techStack: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "12px",
    },

    techTag: {
      padding: "4px 10px",
      background: "#f7fafc",
      color: "#4a5568",
      fontSize: "0.8rem",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
    },

    // footer pinned at bottom of card
    projectFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "12px",
      flexShrink: 0,
    },

    duration: {
      color: "#718096",
      fontSize: "0.85rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },

    startButton: {
      padding: "8px 20px",
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      color: "white",
      border: "none",
      borderRadius: "20px",
      fontSize: "0.9rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "transform 0.15s ease",
    },

    levelBadge: {
      position: "absolute",
      top: "15px",
      right: "15px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
    },

    // overlay steps panel — absolute positioned so it doesn't affect grid row height
    stepsOverlay: {
      position: "absolute",
      top: "calc(100% + 12px)",
      left: 0,
      width: "100%",
      background: "white",
      borderRadius: "12px",
      padding: "18px",
      boxShadow: "0 20px 40px rgba(2,6,23,0.16)",
      border: "1px solid #e6edf3",
      zIndex: 120,
      maxHeight: "360px",
      overflowY: "auto",
    },

    stepsContainer: {
      marginTop: "16px",
      paddingTop: "12px",
      borderTop: "1px solid #e2e8f0",
    },

    stepsTitle: {
      fontSize: "0.95rem",
      fontWeight: 600,
      marginBottom: "8px",
      color: "#2d3748",
    },

    stepsList: {
      margin: 0,
      paddingLeft: "18px",
      fontSize: "0.95rem",
      color: "#4a5568",
      lineHeight: 1.8,
    },

    // small responsive helpers you can use conditionally in component
    smallCardMinHeight: {
      minHeight: "320px",
    },
    compactPadding: {
      padding: "16px",
    },
  };


  // Fetch projects from backend
  const [projectsData, setProjectsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Public endpoint to get projects
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjectsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    fetchProjects();

    const timer = setTimeout(() => {
      setVisibleItems(Array.from({ length: 12 }, (_, i) => i));
    }, 200);
    return () => clearTimeout(timer);
  }, []);


  const getDifficultyStyles = (difficulty: string) => {
    const styles_diff: { [key: string]: any } = {
      Beginner: { backgroundColor: "#c6f6d5", color: "#22543d" },
      Intermediate: { backgroundColor: "#fed7cc", color: "#c05621" },
      Advanced: { backgroundColor: "#fed7d7", color: "#c53030" },
    };
    return styles_diff[difficulty] || styles_diff["Beginner"];
  };

  const handleStartClick = (key: string) => {
    setActiveProjectKey((prev) => (prev === key ? null : key));
    setTimeout(() => {
      const el = document.getElementById(`card-${key}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Project Ideas</h1>
        <p style={styles.subtitle}>
          Build your portfolio with these hands-on MERN stack projects. Start
          with beginner projects and gradually work your way up to advanced
          applications.
        </p>
      </div>

      <div style={styles.projectsGrid}>
        {projectsData.map((project: any, index: number) => {
          const cardKey = `project-${index}`;
          const isActive = activeProjectKey === cardKey;

          return (
            <div
              id={`card-${cardKey}`}
              key={project._id || index}
              style={{
                ...styles.projectCard,
                zIndex: isActive ? 110 : 1,
                transform: visibleItems.includes(index)
                  ? "translateY(0) scale(1)"
                  : "translateY(20px) scale(0.98)",
                transitionDelay: `${index * 0.06}s`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0,0,0,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform =
                    "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                }
              }}
            >
              <div
                style={{
                  ...styles.levelBadge,
                  backgroundColor: project.color || "#48bb78",
                }}
              />

              <div style={styles.projectHeader}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <div
                  style={{
                    ...styles.difficultyBadge,
                    ...getDifficultyStyles(project.difficulty),
                  }}
                >
                  {project.difficulty}
                </div>
              </div>

              <p style={styles.projectDescription}>{project.description}</p>

              <div style={styles.techStack}>
                {/* Handle both array of strings or comma-separated string */}
                {(Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',')).map(
                  (tech: string, techIndex: number) => (
                    <span key={techIndex} style={styles.techTag}>
                      {tech}
                    </span>
                  )
                )}
              </div>

              <div style={styles.projectFooter}>
                <span style={styles.duration}>⏱️ {project.duration || "Self-paced"}</span>
                <button
                  style={styles.startButton}
                  onClick={() => handleStartClick(cardKey)}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.background =
                        "linear-gradient(45deg, #5a67d8, #6b46c1)";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.background =
                      "linear-gradient(45deg, #667eea, #764ba2)";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {isActive ? "Hide Steps" : "Start Project"}
                </button>
              </div>

              {isActive && (
                <div style={styles.stepsOverlay}>
                  <div style={styles.stepsTitle}>
                    Steps to build this project:
                  </div>
                  <ul style={styles.stepsList}>
                    {project.steps && project.steps.length > 0 ? (
                      project.steps.map((step: any, i: number) => (
                        <li key={i} style={{ marginBottom: 12 }}>
                          <span style={{ fontWeight: 700 }}>
                            Step {i + 1}: {step.title}
                          </span>
                          <div style={{ fontSize: '0.9em', marginTop: '4px' }}>{step.description}</div>
                        </li>
                      ))
                    ) : (
                      <li>No steps defined for this project yet.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
