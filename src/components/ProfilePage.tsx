// src/components/ProfilePage.tsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, clearAuthToken } from "../utils/localStorage";

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
  avatarUrl?: string | null;
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
  avatarUrl: null,
};

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || "";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileState>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // local preview for avatar file chosen by user
  const [localAvatarPreview, setLocalAvatarPreview] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        // try to parse JSON body, otherwise throw generic
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
        avatarUrl: user.avatar || user.avatarUrl || null,
      });

      // clear preview on load (if any)
      setLocalAvatarPreview(null);
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
        avatarUrl: updated.avatar || updated.avatarUrl || prev.avatarUrl,
      }));

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

  // Avatar file selected -> preview & optionally upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // preview
    const url = URL.createObjectURL(file);
    setLocalAvatarPreview(url);

    // optionally auto-upload or user can click 'Upload Avatar' button
  };

  // Upload avatar to server
  const handleAvatarUpload = async () => {
    const token = authToken();
    if (!token) {
      clearAuthToken();
      navigate("/login");
      return;
    }
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please choose an image file first.");
      return;
    }

    setUploadingAvatar(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("avatar", file);

      const res = await fetch(`${API_BASE}/api/users/me/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type here — browser will set the boundary
        },
        body: fd,
      });

      if (res.status === 401) {
        clearAuthToken();
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Upload failed");
      }

      const body = await res.json();
      // server returns { avatarUrl: '/uploads/...' , user: {...} } or user
      const avatarUrl =
        body.avatarUrl || body.user?.avatar || body.user?.avatarUrl;

      setProfileData((prev) => ({
        ...prev,
        avatarUrl: avatarUrl ?? prev.avatarUrl ?? null,
      }));

      // clear preview & file input
      setLocalAvatarPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("avatar upload error:", err);
      setError(err.message || "Avatar upload failed");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    // This relies on backend supporting removing avatar (PUT /api/users/me with avatar: null)
    const token = authToken();
    if (!token) {
      clearAuthToken();
      navigate("/login");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar: null }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to remove avatar");
      }
      const updated = await res.json();
      setProfileData((prev) => ({
        ...prev,
        avatarUrl: updated.avatar || null,
      }));
      setLocalAvatarPreview(null);
    } catch (err: any) {
      console.error("remove avatar error:", err);
      setError(err.message || "Failed to remove avatar");
    } finally {
      setSaving(false);
    }
  };

  // UI styles (kept close to your design)
  const styles: { [k: string]: React.CSSProperties } = {
    page: { maxWidth: 1100, margin: "24px auto", padding: 20 },
    card: {
      display: "grid",
      gridTemplateColumns: "320px 1fr",
      gap: 28,
      background: "linear-gradient(180deg, rgba(255,255,255,0.98), #fff)",
      borderRadius: 16,
      padding: 28,
      boxShadow: "0 18px 40px rgba(13,17,35,0.08)",
      border: "1px solid rgba(99,102,241,0.08)",
      transform: isVisible
        ? "translateY(0) scale(1)"
        : "translateY(18px) scale(0.995)",
      opacity: isVisible ? 1 : 0,
    },
    leftPanel: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      alignItems: "center",
    },
    avatarWrap: {
      width: 140,
      height: 140,
      borderRadius: 20,
      overflow: "hidden",
      position: "relative" as const,
    },
    avatar: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      display: "block",
      background: "linear-gradient(135deg,#6d28d9,#7c3aed)",
      color: "white",
      fontSize: 40,
      fontWeight: 800,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarButtons: { display: "flex", gap: 8, marginTop: 10 },
    name: {
      fontSize: 22,
      fontWeight: 800,
      color: "#0f172a",
      textAlign: "center" as const,
    },
    handle: {
      color: "#6d28d9",
      fontWeight: 700,
      marginTop: 6,
      textAlign: "center" as const,
    },
    joinedText: {
      color: "#64748b",
      fontSize: 13,
      marginTop: 6,
      textAlign: "center" as const,
    },
    statStrip: {
      display: "flex",
      gap: 12,
      width: "100%",
      justifyContent: "space-between",
      marginTop: 6,
      flexWrap: "wrap" as const,
    },
    statItem: {
      flex: "1 1 48%",
      minWidth: 120,
      background:
        "linear-gradient(90deg, rgba(103,58,183,0.06), rgba(99,102,241,0.03))",
      borderRadius: 12,
      padding: 12,
      textAlign: "center" as const,
      border: "1px solid rgba(99,102,241,0.06)",
    },
    statNumber: { fontSize: 18, fontWeight: 800, color: "#4c1d95" },
    statLabel: {
      fontSize: 12,
      color: "#475569",
      marginTop: 6,
      fontWeight: 600,
    },
    rightPanel: { display: "flex", flexDirection: "column", gap: 16 },
    section: {
      background: "#fff",
      borderRadius: 12,
      padding: 18,
      border: "1px solid #eef2ff",
      boxShadow: "0 8px 20px rgba(13,17,35,0.03)",
    },
    sectionTitleRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    sectionTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a" },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 12,
    },
    label: {
      fontSize: 13,
      color: "#334155",
      fontWeight: 700,
      marginBottom: 6,
      display: "block",
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
    hint: { fontSize: 13, color: "#94a3b8" },
    errorBox: {
      background: "#fff7f7",
      color: "#9b2c2c",
      border: "1px solid #ffdddd",
      padding: "10px 12px",
      borderRadius: 8,
      fontWeight: 600,
    },
    smallMuted: { fontSize: 12, color: "#94a3b8" },
  };

  const stats = [
    { number: String(profileData.completedProjects ?? 0), label: "Projects" },
    { number: profileData.skillLevel, label: "Skill Level" },
    { number: "12", label: "Courses" },
    { number: "85%", label: "Progress" },
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
        {/* LEFT */}
        <div style={styles.leftPanel}>
          <div style={styles.avatarWrap}>
            {localAvatarPreview ? (
              <img
                src={localAvatarPreview}
                alt="Avatar preview"
                style={styles.avatar}
              />
            ) : profileData.avatarUrl ? (
              // If avatarUrl is absolute it shows; if relative ("/uploads/..") it will work with proxy/static
              <img
                src={profileData.avatarUrl}
                alt="Avatar"
                style={styles.avatar}
              />
            ) : (
              <div style={styles.avatar}>
                {(
                  (profileData.firstName?.[0] ||
                    profileData.username?.[0] ||
                    "U") + (profileData.lastName?.[0] || "")
                ).toUpperCase()}
              </div>
            )}
          </div>

          <div style={styles.avatarButtons}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "#eef2ff",
                border: "1px solid rgba(99,102,241,0.08)",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Choose Image
            </button>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleRemoveAvatar}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                background: "#fff1f2",
                border: "1px solid #ffdddd",
                cursor: "pointer",
                color: "#ef4444",
                fontWeight: 700,
              }}
            >
              Remove
            </button>
          </div>

          <div>
            <div style={styles.name}>
              {profileData.firstName || "Unnamed"} {profileData.lastName || ""}
            </div>
            <div style={styles.handle}>@{profileData.username || "user"}</div>
            <div style={styles.joinedText}>
              Member since {profileData.joinedDate || "—"}
            </div>
          </div>

          <div style={styles.statStrip}>
            {stats.map((s, i) => (
              <div key={i} style={styles.statItem}>
                <div style={styles.statNumber}>{s.number}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ width: "100%", marginTop: 6 }}>
            <div
              style={{
                fontSize: 13,
                color: "#475569",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Contact
            </div>
            <div style={{ fontSize: 13, color: "#334155" }}>
              <div>
                <strong>Email:</strong> {profileData.email || "—"}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>Phone:</strong> {profileData.phone || "—"}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>Location:</strong> {profileData.city || "—"},{" "}
                {profileData.country || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.rightPanel}>
          {/* top toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                Profile
              </h2>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>
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
                    style={{
                      ...styles.saveButton,
                      opacity: saving ? 0.8 : 1,
                      cursor: saving ? "not-allowed" : "pointer",
                    }}
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
            <div style={styles.sectionTitleRow}>
              <div style={styles.sectionTitle}>Personal Information</div>
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
                  value={profileData.email}
                  onChange={handleInputChange}
                  style={isEditing ? styles.input : styles.inputReadonly}
                  readOnly={!isEditing}
                  type="email"
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
            <div style={styles.sectionTitleRow}>
              <div style={styles.sectionTitle}>About</div>
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
              <div style={styles.hint}>
                Tip: write a short summary of your skills and goals.
              </div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>
                Last updated: {profileData.joinedDate || "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
