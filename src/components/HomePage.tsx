import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BookOpen, 
  Code, 
  FolderOpen, 
  Award, 
  Calendar, 
  Clock,
  Target,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Users,
  Zap,
  BarChart3
} from 'lucide-react';
import { 
  getUserProfile, 
  getCourses, 
  getProjects, 
  getRoadmapProgress, 
  getRecentActivities 
} from '../utils/localStorage';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userProfile, setUserProfile] = useState(getUserProfile());
  const [courses, setCourses] = useState(getCourses());
  const [projects, setProjects] = useState(getProjects());
  const [roadmapProgress, setRoadmapProgress] = useState(getRoadmapProgress());
  const [recentActivities, setRecentActivities] = useState(getRecentActivities());

  useEffect(() => {
    setIsVisible(true);
    // Refresh data
    setUserProfile(getUserProfile());
    setCourses(getCourses());
    setProjects(getProjects());
    setRoadmapProgress(getRoadmapProgress());
    setRecentActivities(getRecentActivities());
  }, []);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getOverallProgress = () => {
    if (roadmapProgress.length === 0) return 0;
    const totalProgress = roadmapProgress.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / roadmapProgress.length);
  };

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your current course',
      icon: <Play className="w-6 h-6" />,
      color: 'bg-blue-500',
      href: '/dashboard/courses'
    },
    {
      title: 'Practice Coding',
      description: 'Open the code editor',
      icon: <Code className="w-6 h-6" />,
      color: 'bg-purple-500',
      href: '/dashboard/compiler'
    },
    {
      title: 'View Roadmap',
      description: 'Check your progress',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-green-500',
      href: '/dashboard/roadmap'
    },
    {
      title: 'Browse Projects',
      description: 'Explore project ideas',
      icon: <FolderOpen className="w-6 h-6" />,
      color: 'bg-orange-500',
      href: '/dashboard/projects'
    }
  ];

  const stats = [
    {
      title: 'Courses Completed',
      value: courses.filter(c => c.completed).length,
      total: courses.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Projects Built',
      value: projects.filter(p => p.status === 'completed').length,
      total: projects.length,
      icon: <FolderOpen className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Skills Acquired',
      value: userProfile?.skills?.length || 0,
      total: 20, // Target skills
      icon: <Award className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Overall Progress',
      value: getOverallProgress(),
      total: 100,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Complete React Hooks Module',
      type: 'Course',
      dueDate: 'Today',
      priority: 'high'
    },
    {
      title: 'Build Todo App with Express',
      type: 'Project',
      dueDate: 'Tomorrow',
      priority: 'medium'
    },
    {
      title: 'Review MongoDB Aggregation',
      type: 'Study',
      dueDate: '3 days',
      priority: 'low'
    }
  ];

  const learningStreak = 7; // Days
  const todayStudyTime = 2.5; // Hours

  return (
    <div className={`space-y-6 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getCurrentGreeting()}, {userProfile?.fullName || userProfile?.username || 'Developer'}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              Ready to continue your MERN stack journey? Let's build something amazing today.
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
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total && <span className="text-gray-400">/{stat.total}</span>}
                </div>
                <div className="text-sm text-gray-500">{stat.title}</div>
              </div>
            </div>
            {stat.total && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    stat.color.includes('blue') ? 'bg-blue-500' :
                    stat.color.includes('purple') ? 'bg-purple-500' :
                    stat.color.includes('green') ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${(stat.value / stat.total) * 100}%` }}
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
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              to={action.href}
              className="group p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all mt-2" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Progress */}
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
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {item.completed ? <CheckCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.technology}</h4>
                        <p className="text-sm text-gray-500">
                          {item.completed ? 'Completed' : `${item.progress}% complete`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.completed ? 'bg-green-500' : 'bg-indigo-500'}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">{item.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Learning Journey</h3>
                <p className="text-gray-600 mb-4">Begin with our structured MERN stack roadmap</p>
                <Link 
                  to="/dashboard/roadmap"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
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
                  <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900 truncate">{project.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        project.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Yet</h3>
                <p className="text-gray-600 mb-4">Start building amazing projects to showcase your skills</p>
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              Upcoming Tasks
            </h3>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{task.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{task.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/dashboard/tasks"
              className="block text-center text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-4"
            >
              View All Tasks
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              Recent Activity
            </h3>
            {recentActivities.length > 0 ? (
              <div className="space-y-3">
                {recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      activity.type === 'course_completed' ? 'bg-green-100 text-green-600' :
                      activity.type === 'project_created' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'milestone_achieved' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'course_completed' ? <CheckCircle className="w-4 h-4" /> :
                       activity.type === 'project_created' ? <FolderOpen className="w-4 h-4" /> :
                       activity.type === 'milestone_achieved' ? <Award className="w-4 h-4" /> :
                       <Users className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            )}
          </div>

          {/* Achievement Showcase */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-600 mr-2" />
              Latest Achievement
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">First Steps</h4>
              <p className="text-sm text-gray-600">Completed your first login to StackBuilder!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;