import React, { useState, useEffect } from 'react';

const ProfilePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    city: 'San Francisco',
    country: 'United States',
    bio: 'Passionate full-stack developer learning the MERN stack. Love building innovative web applications and solving complex problems.',
    joinedDate: 'January 2024',
    completedProjects: 8,
    skillLevel: 'Intermediate'
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to backend here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // In a real app, you would revert changes here
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    profileCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '40px',
      flexWrap: 'wrap' as const,
      gap: '20px',
    },
    profileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: '700',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    },
    basicInfo: {
      flex: 1,
    },
    name: {
      fontSize: '2.2rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '5px',
    },
    username: {
      fontSize: '1.1rem',
      color: '#667eea',
      marginBottom: '10px',
    },
    joinedDate: {
      color: '#718096',
      fontSize: '0.9rem',
    },
    editButton: {
      padding: '12px 24px',
      background: isEditing ? '#48bb78' : '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    cancelButton: {
      padding: '12px 24px',
      background: '#e53e3e',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginLeft: '10px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    statCard: {
      background: '#f8fafc',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center' as const,
      border: '1px solid #e2e8f0',
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#667eea',
      marginBottom: '5px',
    },
    statLabel: {
      color: '#718096',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    formSection: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '20px',
      paddingLeft: '15px',
      borderLeft: '4px solid #667eea',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#2c3e50',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: isEditing ? '2px solid #e0e6ed' : 'none',
      backgroundColor: isEditing ? 'white' : '#f8fafc',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box' as const,
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      border: isEditing ? '2px solid #e0e6ed' : 'none',
      backgroundColor: isEditing ? 'white' : '#f8fafc',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box' as const,
      resize: 'vertical' as const,
      minHeight: '100px',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '30px',
    },
  };

  const stats = [
    { number: profileData.completedProjects.toString(), label: 'Projects Completed' },
    { number: profileData.skillLevel, label: 'Skill Level' },
    { number: '12', label: 'Courses Taken' },
    { number: '85%', label: 'Progress' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.profileInfo}>
            <div style={styles.avatar}>
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <div style={styles.basicInfo}>
              <h1 style={styles.name}>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p style={styles.username}>@{profileData.username}</p>
              <p style={styles.joinedDate}>Member since {profileData.joinedDate}</p>
            </div>
          </div>
          <div>
            {!isEditing ? (
              <button
                style={styles.editButton}
                onClick={() => setIsEditing(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5a67d8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  style={styles.editButton}
                  onClick={handleSave}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#38a169';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#48bb78';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Save Changes
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={handleCancel}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c53030';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e53e3e';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                style={styles.input}
                readOnly={!isEditing}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                style={styles.input}
                readOnly={!isEditing}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                style={styles.input}
                readOnly={!isEditing}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                style={styles.input}
                readOnly={!isEditing}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                style={styles.input}
                readOnly={!isEditing}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                style={styles.input}
                readOnly={!isEditing}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Country</label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleInputChange}
                style={styles.input}
                readOnly={!isEditing}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              style={styles.textarea}
              readOnly={!isEditing}
              onFocus={(e) => {
                if (isEditing) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e6ed';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;