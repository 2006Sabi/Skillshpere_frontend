// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  BookOpen,
  Code,
  FolderOpen,
  Award,
  Calendar,
  Target,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Zap,
  BarChart3,
} from "lucide-react";
import { getAuthToken, clearAuthToken } from "../utils/localStorage";

type UserProfile = {
  id?: string;
  username?: string;
  fullName?: string;
  skills?: string[];
  completedCourses?: string[];
  learningStreak?: number;
  todayStudyTimeHours?: number;
  createdAt?: string;
  joinedDate?: string;
};

type Course = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
};

type Project = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  technologies?: string[];
  status?: "planning" | "in-progress" | "completed" | "paused";
  progress?: number;
};

type RoadmapItem = {
  id?: string;
  technology?: string;
  completed?: boolean;
  progress?: number;
};

type ServerTask = {
  id?: string;
  title: string;
  type?: string;
  dueDate?: string | null;
  priority?: "high" | "medium" | "low" | string;
  completed?: boolean;
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [roadmapProgress, setRoadmapProgress] = useState<RoadmapItem[]>([]);
  const [tasks, setTasks] = useState<ServerTask[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchJson = async (url: string) => {
      const res = await fetch(url, { headers, signal: ac.signal });
      // propagate 401 for main endpoints
      if (res.status === 401) return { status: 401, json: null, res };

      const contentType = res.headers.get("content-type") || "";
      const text = await res.text();

      // If server returned HTML or something else, surface the body for debugging
      if (contentType.includes("text/html") || text.trim().startsWith("<")) {
        throw new Error(
          `Expected JSON from ${url} but received HTML/other. Response snippet:\n\n${text.slice(
            0,
            800
          )}`
        );
      }

      try {
        const json = text ? JSON.parse(text) : null;
        return { status: res.status, json, res };
      } catch (e) {
        throw new Error(
          `Invalid JSON from ${url}: ${
            (e as Error).message
          }. Response: ${text.slice(0, 800)}`
        );
      }
    };

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // fetch main endpoints in parallel (strict)
        const [uR, cR, pR, rR] = await Promise.all([
          fetchJson("/api/users/me"),
          fetchJson("/api/courses"),
          fetchJson("/api/projects"),
          fetchJson("/api/roadmap"),
        ]);

        // handle 401
        if ([uR, cR, pR, rR].some((x) => x && x.status === 401)) {
          clearAuthToken();
          navigate("/login");
          return;
        }

        const userJson = uR.json ?? {};
        const coursesJson = cR.json ?? [];
        const projectsJson = pR.json ?? [];
        const roadmapJson = rR.json ?? [];

        // SAFELY fetch tasks: tolerate missing endpoint / HTML responses
        let tasksJson: any = [];
        try {
          const tRes = await fetch("/api/tasks", {
            headers,
            signal: ac.signal,
          });
          if (tRes.ok) {
            const contentType = tRes.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              tasksJson = await tRes.json();
            } else {
              // Non-JSON response (HTML, etc.) -> ignore tasks
              console.warn(
                "Non-JSON response from /api/tasks; ignoring. Body:",
                await tRes.text()
              );
              tasksJson = [];
            }
          } else {
            // 404 or other -> ignore tasks (no crash)
            console.warn(
              `/api/tasks returned status ${tRes.status}; ignoring tasks`
            );
            tasksJson = [];
          }
        } catch (e: any) {
          if (e.name === "AbortError") throw e;
          console.warn(
            "Failed to fetch /api/tasks; continuing with empty tasks",
            e
          );
          tasksJson = [];
        }

        const normalize = <T extends any[]>(arr: T) =>
          Array.isArray(arr)
            ? arr.map((it: any) => ({
                ...(it || {}),
                id: it && (it.id ?? it._id),
              }))
            : [];

        setUserProfile({
          id:
            (userJson && (userJson.id ?? userJson._id ?? userJson.userId)) ??
            undefined,
          username: userJson?.username,
          fullName:
            userJson?.fullName ??
            `${userJson?.firstName ?? ""} ${userJson?.lastName ?? ""}`.trim(),
          skills: userJson?.skills ?? [],
          completedCourses: userJson?.completedCourses ?? [],
          learningStreak: userJson?.learningStreak ?? 0,
          todayStudyTimeHours:
            userJson?.todayStudyTime ?? userJson?.todayStudyTimeHours ?? 0,
          createdAt: userJson?.createdAt,
          joinedDate:
            userJson?.joinedDate ??
            (userJson?.createdAt
              ? new Date(userJson.createdAt).toLocaleDateString()
              : undefined),
        });

        setCourses(normalize(coursesJson));
        setProjects(normalize(projectsJson));
        setRoadmapProgress(normalize(roadmapJson) as unknown as RoadmapItem[]);
        setTasks(normalize(tasksJson) as unknown as ServerTask[]);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Home page load error", err);
        setError(err.message || "Failed to load dashboard (see console)");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [navigate]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getDynamicGreetingMessage = () => {
    const completedCourses = courses.filter((c) => c.completed).length;
    const totalCourses = courses.length;
    const inProgressProjects = projects.filter(
      (p) => p.status === "in-progress"
    ).length;
    const learningStreak = userProfile?.learningStreak ?? 0;
    const skillsCount = userProfile?.skills?.length ?? 0;

    if (
      totalCourses === 0 &&
      projects.length === 0 &&
      roadmapProgress.length === 0
    ) {
      return "Welcome! Your dashboard will show progress once you start learning or building.";
    }
    if (completedCourses === 0 && totalCourses > 0) {
      return "Ready to start your learning journey? Pick a course to begin.";
    } else if (completedCourses > 0 && completedCourses < totalCourses) {
      return "Great progress — keep completing courses to build skills.";
    } else if (completedCourses === totalCourses && totalCourses > 0) {
      return "Nice work — you've completed your courses. Try starting a project next.";
    } else if (inProgressProjects > 0) {
      return "You're working on projects — keep them moving forward!";
    } else if (learningStreak > 7) {
      return `You're on a ${learningStreak}-day learning streak. Keep it up!`;
    } else if (skillsCount > 5) {
      return "You've built a solid skillset. Time to apply it to projects.";
    } else {
      return "Keep learning and building — your activities will appear here.";
    }
  };

  const getDynamicAchievement = () => {
    const completedCourses = courses.filter((c) => c.completed).length;
    const totalCourses = courses.length;
    const completedProjects = projects.filter(
      (p) => p.status === "completed"
    ).length;
    const learningStreak = userProfile?.learningStreak ?? 0;
    const skillsCount = userProfile?.skills?.length ?? 0;

    if (learningStreak >= 30) {
      return {
        title: "Consistency Champion",
        description: `Maintained a ${learningStreak}-day learning streak!`,
        icon: <Award className="w-8 h-8 text-white" />,
        bgColor: "from-purple-400 to-pink-500",
      };
    } else if (learningStreak >= 7) {
      return {
        title: "Streak Master",
        description: `${learningStreak} days of consistent learning!`,
        icon: <Award className="w-8 h-8 text-white" />,
        bgColor: "from-yellow-400 to-orange-500",
      };
    } else if (completedCourses === totalCourses && totalCourses > 0) {
      return {
        title: "Course Conqueror",
        description: "Completed all available courses!",
        icon: <Award className="w-8 h-8 text-white" />,
        bgColor: "from-green-400 to-blue-500",
      };
    } else if (completedProjects >= 3) {
      return {
        title: "Project Builder",
        description: `Built ${completedProjects} projects!`,
        icon: <Award className="w-8 h-8 text-white" />,
        bgColor: "from-indigo-400 to-purple-500",
      };
    } else if (skillsCount >= 10) {
      return {
        title: "Skill Collector",
        description: `Acquired ${skillsCount} skills in your journey!`,
        icon: <Award className="w-8 h-8 text-white" />,
        bgColor: "from-red-400 to-pink-500",
      };
    } else {
      return null;
    }
  };

  const getOverallProgress = () => {
    if (!roadmapProgress || roadmapProgress.length === 0) return 0;
    const totalProgress = roadmapProgress.reduce(
      (sum, item) => sum + (item.progress ?? 0),
      0
    );
    return Math.round(totalProgress / roadmapProgress.length);
  };

  const upcomingTasks = tasks
    .filter((t) => !t.completed)
    .slice(0, 3)
    .map((t) => ({
      title: t.title,
      type: t.type ?? "Task",
      dueDate: t.dueDate ?? "Soon",
      priority: (t.priority as "high" | "medium" | "low") ?? "medium",
    }));

  const getQuickActions = () => {
    const incompleteCourses = courses.filter((c) => !c.completed);
    const inProgressProjects = projects.filter(
      (p) => p.status === "in-progress"
    );

    return [
      {
        title:
          incompleteCourses.length > 0 ? "Continue Learning" : "Browse Courses",
        description:
          incompleteCourses.length > 0
            ? "Resume your current course"
            : "Explore available courses",
        icon: <Play className="w-6 h-6" />,
        color: "bg-blue-500",
        href: "/dashboard/courses",
      },
      {
        title: "Practice Coding",
        description: "Open the code editor",
        icon: <Code className="w-6 h-6" />,
        color: "bg-purple-500",
        href: "/dashboard/compiler",
      },
      {
        title: "View Roadmap",
        description:
          roadmapProgress.length > 0
            ? "Check your progress"
            : "Start your roadmap",
        icon: <Target className="w-6 h-6" />,
        color: "bg-green-500",
        href: "/dashboard/roadmap",
      },
      {
        title:
          inProgressProjects.length > 0
            ? "Continue Projects"
            : "Browse Projects",
        description:
          inProgressProjects.length > 0
            ? "Work on your ongoing projects"
            : "Explore project ideas",
        icon: <FolderOpen className="w-6 h-6" />,
        color: "bg-orange-500",
        href: "/dashboard/projects",
      },
    ];
  };

  const quickActions = getQuickActions();

  const stats = [
    {
      title: "Courses Completed",
      value: courses.filter((c) => !!c.completed).length,
      total: courses.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Projects Built",
      value: projects.filter((p) => (p.status ?? "") === "completed").length,
      total: projects.length,
      icon: <FolderOpen className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Skills Acquired",
      value: userProfile?.skills?.length ?? 0,
      total: Math.max(20, userProfile?.skills?.length ?? 0),
      icon: <Award className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Overall Progress",
      value: getOverallProgress(),
      total: 100,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const learningStreak = userProfile?.learningStreak ?? 0;
  const todayStudyTime = userProfile?.todayStudyTimeHours ?? 0;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="mt-3 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* error banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
          <strong>Unable to load dashboard:</strong> {error}
        </div>
      )}

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getCurrentGreeting()},{" "}
              {userProfile?.fullName || userProfile?.username || "Learner"}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              {getDynamicGreetingMessage()}
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{learningStreak}</div>
              <div className="text-sm text-indigo-100">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{todayStudyTime}h</div>
              <div className="text-sm text-indigo-100">Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total !== undefined && (
                    <span className="text-gray-400">/{stat.total}</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{stat.title}</div>
              </div>
            </div>
            {stat.total !== undefined && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    stat.color.includes("blue")
                      ? "bg-blue-500"
                      : stat.color.includes("purple")
                      ? "bg-purple-500"
                      : stat.color.includes("green")
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                  style={{
                    width: `${(stat.value / Math.max(1, stat.total)) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Zap className="w-6 h-6 text-yellow-500 mr-2" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="group p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
            >
              <div
                className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}
              >
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all mt-2" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Progress & Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-6 h-6 text-indigo-600 mr-2" />
                Learning Progress
              </h2>
              <Link
                to="/dashboard/roadmap"
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {roadmapProgress.length > 0 ? (
              <div className="space-y-4">
                {roadmapProgress.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id ?? index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <BookOpen className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.technology}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.completed
                            ? "Completed"
                            : `${item.progress ?? 0}% complete`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.completed ? "bg-green-500" : "bg-indigo-500"
                          }`}
                          style={{ width: `${item.progress ?? 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {item.progress ?? 0}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No roadmap progress yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create a roadmap to track the skills you want to learn.
                </p>
                <Link
                  to="/dashboard/roadmap"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Roadmap <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            )}
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FolderOpen className="w-6 h-6 text-purple-600 mr-2" />
                Recent Projects
              </h2>
              <Link
                to="/dashboard/projects"
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {projects.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {projects.slice(0, 4).map((project) => (
                  <div
                    key={project.id ?? project._id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900 truncate">
                        {project.title}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : project.status === "planning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(project.technologies ?? []).slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress ?? 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start a project to showcase your skills and track progress.
                </p>
                <Link
                  to="/dashboard/projects"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Project <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              Upcoming Tasks
            </h3>
            <div className="space-y-3">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {task.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {task.type}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-600">
                    No upcoming tasks — add tasks in the Tasks page or create
                    roadmap items to populate tasks.
                  </p>
                  <Link
                    to="/dashboard/roadmap"
                    className="inline-flex items-center mt-4 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Manage Roadmap <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/dashboard/tasks"
              className="block text-center text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-4"
            >
              View All Tasks
            </Link>
          </div> */}

          {/* Achievement Showcase */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-600 mr-2" />
              Latest Achievement
            </h3>
            {(() => {
              const achievement = getDynamicAchievement();
              return achievement ? (
                <div className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    {achievement.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    No achievements yet — complete courses or projects to unlock
                    badges.
                  </p>
                  <Link
                    to="/dashboard/courses"
                    className="inline-flex items-center px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Browse Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
