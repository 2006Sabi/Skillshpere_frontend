// src/utils/localStorage.ts
// Local Storage Utility Functions (merged & extended)
// Provides: typed storage helpers for profiles, courses, projects, roadmap, settings, auth, etc.
// Also provides auth token helpers used by components (getAuthToken, setAuthToken, clearAuthToken).

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  skills: string[];
  completedCourses: string[];
  currentProjects: string[];
  achievements: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  topics: string[];
  progress: number;
  completed: boolean;
  enrolledDate: string;
  lastAccessed: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "planning" | "in-progress" | "completed" | "paused";
  progress: number;
  createdDate: string;
  lastModified: string;
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
}

export interface RoadmapProgress {
  id: string;
  technology: string;
  completed: boolean;
  progress: number;
  startDate: string;
  completedDate?: string;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    completedDate?: string;
  }[];
}

export interface AppSettings {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
  autoSave: boolean;
  codeEditorPreferences: {
    fontSize: number;
    theme: string;
    tabSize: number;
    wordWrap: boolean;
  };
}

export interface AuthData {
  isAuthenticated: boolean;
  userId: string;
  username: string;
  loginTime: string;
  sessionToken: string;
}

// Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: "stackbuilder_user_profile",
  COURSES: "stackbuilder_courses",
  PROJECTS: "stackbuilder_projects",
  ROADMAP_PROGRESS: "stackbuilder_roadmap_progress",
  APP_SETTINGS: "stackbuilder_app_settings",
  AUTH_DATA: "stackbuilder_auth_data",
  RECENT_ACTIVITIES: "stackbuilder_recent_activities",
  BOOKMARKS: "stackbuilder_bookmarks",
  CODE_SNIPPETS: "stackbuilder_code_snippets",
} as const;

// Generic Local Storage Functions
export const setItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
  }
};

// ----------------------
// Auth token helpers used by UI
// ----------------------

// Read the JWT token string (or null)
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem("authToken");
  } catch (err) {
    console.error("Error reading auth token:", err);
    return null;
  }
};

// Set/replace session token and minimal auth data (keeps existing auth object fields when present)
export const setAuthToken = (
  token: string,
  opts?: { userId?: string; username?: string }
): void => {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEYS.AUTH_DATA);
    let existing: Partial<AuthData> = {};
    if (existingRaw) {
      try {
        existing = JSON.parse(existingRaw) as Partial<AuthData>;
      } catch {}
    }
    const now = new Date().toISOString();
    const authData: AuthData = {
      isAuthenticated: true,
      userId: opts?.userId ?? existing.userId ?? "",
      username: opts?.username ?? existing.username ?? "",
      loginTime: now,
      sessionToken: token,
    };
    setItem<AuthData>(STORAGE_KEYS.AUTH_DATA, authData);
  } catch (err) {
    console.error("Error saving auth token:", err);
  }
};

// Clear auth data (logs out)
export const clearAuthToken = (): void => {
  try {
    localStorage.removeItem("authToken");
    removeItem(STORAGE_KEYS.AUTH_DATA);
  } catch (err) {
    console.error("Error clearing auth token:", err);
  }
};

// ----------------------
// User Profile Functions
// ----------------------
export const saveUserProfile = (profile: UserProfile): void => {
  setItem(STORAGE_KEYS.USER_PROFILE, profile);
};

export const getUserProfile = (): UserProfile | null => {
  try {
    const p = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return p ? (JSON.parse(p) as UserProfile) : null;
  } catch (error) {
    console.error("Error reading user profile:", error);
    return null;
  }
};

export const updateUserProfile = (updates: Partial<UserProfile>): void => {
  const currentProfile = getUserProfile();
  if (currentProfile) {
    const updatedProfile = { ...currentProfile, ...updates };
    saveUserProfile(updatedProfile);
  }
};

// ----------------------
// Courses Functions
// ----------------------
export const saveCourses = (courses: Course[]): void => {
  setItem(STORAGE_KEYS.COURSES, courses);
};

export const getCourses = (): Course[] => {
  return getItem<Course[]>(STORAGE_KEYS.COURSES, []);
};

export const addCourse = (course: Course): void => {
  const courses = getCourses();
  courses.push(course);
  saveCourses(courses);
};

export const updateCourse = (
  courseId: string,
  updates: Partial<Course>
): void => {
  const courses = getCourses();
  const courseIndex = courses.findIndex((c) => c.id === courseId);
  if (courseIndex !== -1) {
    courses[courseIndex] = { ...courses[courseIndex], ...updates };
    saveCourses(courses);
  }
};

export const deleteCourse = (courseId: string): void => {
  const courses = getCourses();
  const filteredCourses = courses.filter((c) => c.id !== courseId);
  saveCourses(filteredCourses);
};

// ----------------------
// Projects Functions
// ----------------------
export const saveProjects = (projects: Project[]): void => {
  setItem(STORAGE_KEYS.PROJECTS, projects);
};

export const getProjects = (): Project[] => {
  return getItem<Project[]>(STORAGE_KEYS.PROJECTS, []);
};

export const addProject = (project: Project): void => {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
};

export const updateProject = (
  projectId: string,
  updates: Partial<Project>
): void => {
  const projects = getProjects();
  const projectIndex = projects.findIndex((p) => p.id === projectId);
  if (projectIndex !== -1) {
    projects[projectIndex] = { ...projects[projectIndex], ...updates };
    saveProjects(projects);
  }
};

export const deleteProject = (projectId: string): void => {
  const projects = getProjects();
  const filteredProjects = projects.filter((p) => p.id !== projectId);
  saveProjects(filteredProjects);
};

// ----------------------
// Roadmap Progress Functions
// ----------------------
export const saveRoadmapProgress = (progress: RoadmapProgress[]): void => {
  setItem(STORAGE_KEYS.ROADMAP_PROGRESS, progress);
};

export const getRoadmapProgress = (): RoadmapProgress[] => {
  return getItem<RoadmapProgress[]>(STORAGE_KEYS.ROADMAP_PROGRESS, []);
};

export const updateRoadmapProgress = (
  technologyId: string,
  updates: Partial<RoadmapProgress>
): void => {
  const progress = getRoadmapProgress();
  const progressIndex = progress.findIndex((p) => p.id === technologyId);
  if (progressIndex !== -1) {
    progress[progressIndex] = { ...progress[progressIndex], ...updates };
    saveRoadmapProgress(progress);
  } else {
    // Create new progress entry
    const newProgress: RoadmapProgress = {
      id: technologyId,
      technology: technologyId,
      completed: false,
      progress: 0,
      startDate: new Date().toISOString(),
      milestones: [],
      ...(updates as unknown as Partial<RoadmapProgress>),
    };
    progress.push(newProgress);
    saveRoadmapProgress(progress);
  }
};

// ----------------------
// App Settings Functions
// ----------------------
export const saveAppSettings = (settings: AppSettings): void => {
  setItem(STORAGE_KEYS.APP_SETTINGS, settings);
};

export const getAppSettings = (): AppSettings => {
  return getItem<AppSettings>(STORAGE_KEYS.APP_SETTINGS, {
    theme: "light",
    language: "en",
    notifications: true,
    autoSave: true,
    codeEditorPreferences: {
      fontSize: 14,
      theme: "vs-dark",
      tabSize: 2,
      wordWrap: true,
    },
  });
};

export const updateAppSettings = (updates: Partial<AppSettings>): void => {
  const currentSettings = getAppSettings();
  const updatedSettings = { ...currentSettings, ...updates };
  saveAppSettings(updatedSettings);
};

// ----------------------
// Authentication Functions (higher level)
// ----------------------
export const saveAuthData = (authData: AuthData): void => {
  setItem(STORAGE_KEYS.AUTH_DATA, authData);
};

export const getAuthData = (): AuthData | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_DATA);
    return raw ? (JSON.parse(raw) as AuthData) : null;
  } catch (err) {
    console.error("Error reading auth data:", err);
    return null;
  }
};

export const clearAuthData = (): void => {
  removeItem(STORAGE_KEYS.AUTH_DATA);
};

export const isUserAuthenticated = (): boolean => {
  const authData = getAuthData();
  return !!(authData && authData.isAuthenticated);
};

// ----------------------
// Recent Activities Functions
// ----------------------
export interface Activity {
  id: string;
  type:
    | "course_completed"
    | "project_created"
    | "milestone_achieved"
    | "login"
    | "profile_updated";
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export const saveRecentActivities = (activities: Activity[]): void => {
  setItem(STORAGE_KEYS.RECENT_ACTIVITIES, activities);
};

export const getRecentActivities = (): Activity[] => {
  return getItem<Activity[]>(STORAGE_KEYS.RECENT_ACTIVITIES, []);
};

export const addActivity = (activity: Activity): void => {
  const activities = getRecentActivities();
  activities.unshift(activity); // Add to beginning
  // Keep only last 50 activities
  const limitedActivities = activities.slice(0, 50);
  saveRecentActivities(limitedActivities);
};

// ----------------------
// Bookmarks Functions
// ----------------------
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  createdDate: string;
}

export const saveBookmarks = (bookmarks: Bookmark[]): void => {
  setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
};

export const getBookmarks = (): Bookmark[] => {
  return getItem<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
};

export const addBookmark = (bookmark: Bookmark): void => {
  const bookmarks = getBookmarks();
  bookmarks.push(bookmark);
  saveBookmarks(bookmarks);
};

export const deleteBookmark = (bookmarkId: string): void => {
  const bookmarks = getBookmarks();
  const filteredBookmarks = bookmarks.filter((b) => b.id !== bookmarkId);
  saveBookmarks(filteredBookmarks);
};

// ----------------------
// Code Snippets Functions
// ----------------------
export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  createdDate: string;
  lastModified: string;
}

export const saveCodeSnippets = (snippets: CodeSnippet[]): void => {
  setItem(STORAGE_KEYS.CODE_SNIPPETS, snippets);
};

export const getCodeSnippets = (): CodeSnippet[] => {
  return getItem<CodeSnippet[]>(STORAGE_KEYS.CODE_SNIPPETS, []);
};

export const addCodeSnippet = (snippet: CodeSnippet): void => {
  const snippets = getCodeSnippets();
  snippets.push(snippet);
  saveCodeSnippets(snippets);
};

export const updateCodeSnippet = (
  snippetId: string,
  updates: Partial<CodeSnippet>
): void => {
  const snippets = getCodeSnippets();
  const snippetIndex = snippets.findIndex((s) => s.id === snippetId);
  if (snippetIndex !== -1) {
    snippets[snippetIndex] = {
      ...snippets[snippetIndex],
      ...updates,
      lastModified: new Date().toISOString(),
    };
    saveCodeSnippets(snippets);
  }
};

export const deleteCodeSnippet = (snippetId: string): void => {
  const snippets = getCodeSnippets();
  const filteredSnippets = snippets.filter((s) => s.id !== snippetId);
  saveCodeSnippets(filteredSnippets);
};

// ----------------------
// Utility Functions
// ----------------------
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const exportAllData = (): string => {
  const allData = {
    userProfile: getUserProfile(),
    courses: getCourses(),
    projects: getProjects(),
    roadmapProgress: getRoadmapProgress(),
    appSettings: getAppSettings(),
    recentActivities: getRecentActivities(),
    bookmarks: getBookmarks(),
    codeSnippets: getCodeSnippets(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(allData, null, 2);
};

export const importAllData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);

    if (data.userProfile) saveUserProfile(data.userProfile);
    if (data.courses) saveCourses(data.courses);
    if (data.projects) saveProjects(data.projects);
    if (data.roadmapProgress) saveRoadmapProgress(data.roadmapProgress);
    if (data.appSettings) saveAppSettings(data.appSettings);
    if (data.recentActivities) saveRecentActivities(data.recentActivities);
    if (data.bookmarks) saveBookmarks(data.bookmarks);
    if (data.codeSnippets) saveCodeSnippets(data.codeSnippets);

    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
};
