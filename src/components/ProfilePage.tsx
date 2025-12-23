// src/components/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuthToken,
  clearAuthToken,
  saveUserProfile,
} from "../utils/localStorage";

type ProfileState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  bio: string;
  joinedDate: string;
  completedProjects: number;
  skillLevel: string;
  completedCourses: number;
  profileCompletion: number;
};

const emptyProfile: ProfileState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  bio: "",
  joinedDate: "",
  completedProjects: 0,
  skillLevel: "Beginner",
  completedCourses: 0,
  profileCompletion: 0,
};

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) || "http://127.0.0.1:5001";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const calculateCompletion = (data: any) => {
    const fields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "phone",
      "city",
      "country",
      "bio",
      "skillLevel",
    ];
    const filled = fields.filter((field) => data[field] && data[field].toString().trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  };
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileState>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authToken = () => getAuthToken();

  // load profile
  const loadProfile = async (abortController?: AbortController) => {
    const token = authToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: abortController?.signal,
      });

      if (res.status === 401) {
        clearAuthToken();
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to fetch profile");
      }

      const user = await res.json();

      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        country: user.country || "",
        bio: user.bio || "",
        joinedDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "",
        completedProjects: user.completedProjects ?? 0,
        skillLevel: user.skillLevel || "Beginner",
        completedCourses: user.completedCourses?.length || 0,
        profileCompletion: calculateCompletion(user),
      });
    } catch (err: any) {
      if (err.name === "AbortError") return;
      console.error("Profile load error:", err);
      setError(err.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const ac = new AbortController();
    loadProfile(ac);
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken" && e.newValue !== e.oldValue) {
        loadProfile();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = authToken();
    if (!token) {
      clearAuthToken();
      navigate("/login");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      // Only send allowed fields
      const payload = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone,
        city: profileData.city,
        country: profileData.country,
        bio: profileData.bio,
        skillLevel: profileData.skillLevel,
      };

      const res = await fetch(`${API_BASE}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        clearAuthToken();
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to save profile");
      }

      const updated = await res.json();

      setProfileData((prev) => ({
        ...prev,
        firstName: updated.firstName || prev.firstName,
        lastName: updated.lastName || prev.lastName,
        username: updated.username || prev.username,
        email: updated.email || prev.email,
        phone: updated.phone || prev.phone,
        city: updated.city || prev.city,
        country: updated.country || prev.country,
        bio: updated.bio || prev.bio,
        skillLevel: updated.skillLevel || prev.skillLevel,
        completedCourses: prev.completedCourses,
        profileCompletion: calculateCompletion({
          ...prev,
          ...updated,
        }),
      }));

      // Update localStorage and notify MainLayout
      const fullProfileForStorage: any = {
        id: updated.id,
        username: updated.username || profileData.username,
        email: updated.email || profileData.email,
        firstName: updated.firstName || profileData.firstName,
        lastName: updated.lastName || profileData.lastName,
        fullName: `${updated.firstName || profileData.firstName} ${updated.lastName || profileData.lastName || ""
          }`.trim(),
        bio: updated.bio || profileData.bio,
        avatar: updated.avatarUrl || null,
        joinedDate: updated.createdAt,
        skills: updated.skills || [],
        completedCourses: updated.completedCourses || [],
        currentProjects: [],
        achievements: [],
        skillLevel: updated.skillLevel || profileData.skillLevel,
        // completedCourses: defined above as array, do not overwrite with number
        profileCompletion: calculateCompletion({
          ...profileData,
          ...updated
        }),
      };

      saveUserProfile(fullProfileForStorage);

      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "userProfile",
          newValue: JSON.stringify(fullProfileForStorage),
        })
      );

      setIsEditing(false);
    } catch (err: any) {
      console.error("save error:", err);
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    setIsEditing(false);
    setLoading(true);
    setError(null);
    try {
      await loadProfile();
    } finally {
      setLoading(false);
    }
  };

  // styles (kept simple and consistent)
  const styles: { [k: string]: React.CSSProperties } = {
    page: { maxWidth: 1000, margin: "24px auto", padding: 20 },
    card: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 24,
      background: "#fff",
      borderRadius: 12,
      padding: 20,
      boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
      border: "1px solid #eef2ff",
      transform: isVisible ? "translateY(0)" : "translateY(8px)",
      opacity: isVisible ? 1 : 0,
      transition: "all 0.5s ease",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    title: { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
    subtitle: { color: "#94a3b8", fontSize: 13 },
    section: {
      background: "#fff",
      borderRadius: 12,
      padding: 18,
      border: "1px solid #eef2ff",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 12,
    },
    label: {
      display: "block",
      marginBottom: 6,
      fontWeight: 700,
      color: "#334155",
      fontSize: 13,
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #e6eef8",
      background: "transparent",
      outline: "none",
      fontSize: 14,
      color: "#0f172a",
      boxSizing: "border-box" as const,
    },
    inputReadonly: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px dashed transparent",
      background: "#fbfbff",
      color: "#64748b",
      fontSize: 14,
      boxSizing: "border-box" as const,
    },
    textarea: {
      width: "100%",
      minHeight: 110,
      padding: "12px",
      borderRadius: 8,
      border: "1px solid #e6eef8",
      fontSize: 14,
      color: "#0f172a",
    },
    toolbar: { display: "flex", gap: 10, alignItems: "center" },
    editButton: {
      padding: "10px 16px",
      borderRadius: 10,
      border: "none",
      background: "#6d28d9",
      color: "white",
      fontWeight: 800,
      cursor: "pointer",
    },
    saveButton: {
      padding: "10px 16px",
      borderRadius: 10,
      border: "none",
      background: "#10b981",
      color: "white",
      fontWeight: 800,
      cursor: "pointer",
    },
    cancelButton: {
      padding: "10px 14px",
      borderRadius: 10,
      border: "none",
      background: "#ef4444",
      color: "white",
      fontWeight: 700,
      cursor: "pointer",
    },
    errorBox: {
      background: "#fff7f7",
      color: "#9b2c2c",
      border: "1px solid #ffdddd",
      padding: "10px 12px",
      borderRadius: 8,
      fontWeight: 600,
    },
    statsGrid: { display: "flex", gap: 12, flexWrap: "wrap" as const },
    statCard: {
      flex: "1 1 140px",
      background: "#fbfbff",
      padding: 12,
      borderRadius: 8,
      textAlign: "center" as const,
      border: "1px solid #eef2ff",
    },
    statNumber: { fontSize: 18, fontWeight: 800, color: "#4c1d95" },
    statLabel: {
      fontSize: 12,
      color: "#475569",
      marginTop: 6,
      fontWeight: 600,
    },
  };

  const stats = [
    { number: String(profileData.completedProjects ?? 0), label: "Projects" },
    { number: profileData.skillLevel, label: "Skill Level" },
    { number: String(profileData.completedCourses ?? 0), label: "Courses" },
    { number: `${profileData.profileCompletion}%`, label: "Progress" },
  ];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              margin: "0 auto",
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "5px solid rgba(99,102,241,0.15)",
              borderTopColor: "#6d28d9",
              animation: "spin 1s linear infinite",
            }}
          />
          <div style={{ marginTop: 12, color: "#64748b" }}>
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card as React.CSSProperties}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Profile</h1>
            <div style={styles.subtitle}>
              Manage your personal information and account details
            </div>
          </div>

          <div style={styles.toolbar}>
            {!isEditing ? (
              <button
                style={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  style={{ ...styles.saveButton, opacity: saving ? 0.85 : 1 }}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.section}>
          <div
            style={{
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 800, color: "#0f172a" }}>
              Personal Information
            </div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>
              {isEditing ? "Editing mode" : "Read only"}
            </div>
          </div>

          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>First name</label>
              <input
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                style={isEditing ? styles.input : styles.inputReadonly}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={styles.label}>Last name</label>
              <input
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                style={isEditing ? styles.input : styles.inputReadonly}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={styles.label}>Username</label>
              <input
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                style={isEditing ? styles.input : styles.inputReadonly}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={styles.label}>Email</label>
              <input
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
                style={isEditing ? styles.input : styles.inputReadonly}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={styles.label}>Phone</label>
              <input
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                style={isEditing ? styles.input : styles.inputReadonly}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={styles.label}>City</label>
              <input
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                style={isEditing ? styles.input : styles.inputReadonly}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={styles.label}>Country</label>
              <input
                name="country"
                value={profileData.country}
                onChange={handleInputChange}
                style={isEditing ? styles.input : styles.inputReadonly}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={styles.label}>Skill Level</label>
              <input
                name="skillLevel"
                value={profileData.skillLevel}
                onChange={handleInputChange}
                style={
                  isEditing
                    ? styles.input
                    : { ...styles.inputReadonly, textTransform: "capitalize" }
                }
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <div
            style={{
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 800, color: "#0f172a" }}>About</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>
              Tell visitors about yourself
            </div>
          </div>

          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            style={
              isEditing
                ? styles.textarea
                : {
                  ...styles.textarea,
                  background: "#fbfbff",
                  border: "1px dashed transparent",
                  color: "#64748b",
                }
            }
            readOnly={!isEditing}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <div style={{ fontSize: 13, color: "#94a3b8" }}>
              Tip: write a short summary of your skills and goals.
            </div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>
              Member since {profileData.joinedDate || "—"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statNumber}>{s.number}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
