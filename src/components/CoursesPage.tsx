
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import axios from "axios";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  ExternalLink,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  Play,
  CheckCircle,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  ChevronDown,
  Zap,
} from "lucide-react";

interface Course {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  provider: {
    name: string;
    logo: string;
    website: string;
  };
  externalUrl?: string;
  category?: string;
  subcategory?: string;
  level: "beginner" | "intermediate" | "advanced" | string;
  duration: {
    hours: number;
    weeks?: number;
  } | string;
  price: {
    original?: number;
    discounted?: number;
    currency?: string;
    isFree: boolean;
  };
  rating: {
    average: number;
    count: number;
    source: string;
  };
  enrollmentCount: number;
  technologies: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  features?: string[];
  language?: string;
  tags: string[];
  isRecommended?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE} /api/courses`);
        const backendCourses = await res.json();

        // Map backend data to frontend structure
        const mappedCourses = backendCourses.map((course: any) => ({
          _id: course._id,
          title: course.title,
          description: course.description || "No description",
          shortDescription: course.description ? course.description.substring(0, 100) + "..." : "No description",
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500", // Default
          provider: {
            name: "SkillSphere",
            logo: "https://via.placeholder.com/150",
            website: ""
          },
          externalUrl: course.externalUrl,
          level: (course.difficulty?.toLowerCase() || "beginner"),
          duration: course.duration ? { hours: parseInt(course.duration) || 10 } : { hours: 10 },
          price: { isFree: true, currency: "USD", original: 0, discounted: 0 },
          rating: { average: 5.0, count: 1, source: "SkillSphere" },
          enrollmentCount: 0,
          tags: course.tags || [],
          features: [],
          technologies: (course.techStack || []).map((tech: string) => {
            const name = tech.toLowerCase();
            let icon = "💻";
            let color = "#6B7280"; // gray-500

            if (name.includes("react")) { icon = "⚛️"; color = "#61DAFB"; }
            else if (name.includes("node")) { icon = "🟢"; color = "#339933"; }
            else if (name.includes("python")) { icon = "🐍"; color = "#3776AB"; }
            else if (name.includes("java")) { icon = "☕"; color = "#007396"; }
            else if (name.includes("mongo")) { icon = "🍃"; color = "#47A248"; }
            else if (name.includes("vue")) { icon = "💚"; color = "#4FC08D"; }
            else if (name.includes("angular")) { icon = "🅰️"; color = "#DD0031"; }
            else if (name.includes("aws")) { icon = "☁️"; color = "#FF9900"; }

            return { name: tech, icon, color };
          }),
          category: "Full Stack", // Default category
          isNew: true
        }));

        setCourses(mappedCourses);
        setFilteredCourses(mappedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    // Load wishlist and enrolled courses from localStorage
    const savedWishlist = JSON.parse(
      localStorage.getItem("course_wishlist") || "[]"
    );
    const savedEnrollments = JSON.parse(
      localStorage.getItem("enrolled_courses") || "[]"
    );
    setWishlist(new Set(savedWishlist));
    setEnrolledCourses(new Set(savedEnrollments));
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Provider filter
    if (selectedProvider !== "all") {
      filtered = filtered.filter(
        (course) => course.provider?.name === selectedProvider
      );
    }

    // Price filter
    if (priceFilter === "free") {
      filtered = filtered.filter((course) => course.price?.isFree);
    } else if (priceFilter === "paid") {
      filtered = filtered.filter((course) => !course.price?.isFree);
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setFilteredCourses(filtered);
  }, [
    courses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedProvider,
    priceFilter,
    sortBy,
  ]);

  const toggleWishlist = (courseId: string) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(courseId)) {
      newWishlist.delete(courseId);
    } else {
      newWishlist.add(courseId);
    }
    setWishlist(newWishlist);
    localStorage.setItem(
      "course_wishlist",
      JSON.stringify(Array.from(newWishlist))
    );
  };

  const enrollInCourse = (course: Course) => {
    const newEnrollments = new Set(enrolledCourses);
    newEnrollments.add(course._id);
    setEnrolledCourses(newEnrollments);
    localStorage.setItem(
      "enrolled_courses",
      JSON.stringify(Array.from(newEnrollments))
    );

    // Open external course URL if available
    if (course.externalUrl) {
      window.open(course.externalUrl, "_blank");
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "guvi":
        return "bg-purple-100 text-purple-700";
      case "coursera":
        return "bg-blue-100 text-blue-700";
      case "udemy":
        return "bg-orange-100 text-orange-700";
      case "freecodecamp":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master New Skills with
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                World-Class Courses
              </span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Learn from industry experts with courses from Guvi, Coursera,
              Udemy, and more. Build real projects and advance your career in
              tech.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, technologies, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-2xl border-0 shadow-lg focus:ring-4 focus:ring-white/20 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="hidden md:flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>

                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="duration">Shortest</option>
              </select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p - 2 rounded ${viewMode === "grid"
                      ? "bg-white shadow"
                      : "hover:bg-gray-200"
                    } `}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p - 2 rounded ${viewMode === "list"
                      ? "bg-white shadow"
                      : "hover:bg-gray-200"
                    } `}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Categories</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full Stack">Full Stack</option>
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Providers</option>
                <option value="Guvi">Guvi</option>
                <option value="Coursera">Coursera</option>
                <option value="Udemy">Udemy</option>
                <option value="FreeCodeCamp">FreeCodeCamp</option>
              </select>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Course Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`${viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
            } `}
        >
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className={`bg - white rounded - 2xl overflow - hidden shadow - lg hover: shadow - xl transition - all duration - 300 border border - gray - 100 group ${viewMode === "list" ? "flex" : ""
                } `}
            >
              <div
                className={`relative ${viewMode === "list" ? "w-72 flex-shrink-0" : ""
                  } `}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(course._id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w - 5 h - 5 ${wishlist.has(course._id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                      } `}
                  />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span
                    className={`px - 3 py - 1 rounded - full text - xs font - medium backdrop - blur - md bg - white / 90 ${getLevelColor(
                      course.level
                    )
                      } `}
                  >
                    {course.level.charAt(0).toUpperCase() +
                      course.level.slice(1)}
                  </span>
                  {course.isNew && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white shadow-lg">
                      New
                    </span>
                  )}
                  {course.isTrending && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500 text-white shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {course.provider && (
                    <>
                      <img
                        src={course.provider.logo}
                        alt={course.provider.name}
                        className="w-5 h-5 rounded-full object-contain"
                      />
                      <span
                        className={`text - xs px - 2 py - 0.5 rounded ${getProviderColor(
                          course.provider.name
                        )
                          } `}
                      >
                        {course.provider.name}
                      </span>
                    </>
                  )}

                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      +{course.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Tech Stack Icons */}
                <div className="flex items-center gap-3 mb-4 pt-4 border-t border-gray-100">
                  {course.technologies?.slice(0, 4).map((tech, index) => (
                    <div
                      key={index}
                      className="relative group/tech"
                      title={tech.name}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-gray-50 group-hover/tech:scale-110 transition-transform"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {typeof course.duration === 'string' ? course.duration : `${course.duration.hours} h`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {(course.enrollmentCount || 0).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      {course.rating?.average}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    {course.price?.isFree ? (
                      <span className="text-lg font-bold text-green-600">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          {course.price?.currency} {course.price?.discounted}
                        </span>
                        {course.price?.original && (
                          <span className="text-sm text-gray-400 line-through">
                            {course.price?.currency} {course.price?.original}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {enrolledCourses.has(course._id) ? (
                    <a
                      href={course.externalUrl || "#"}
                      target={course.externalUrl ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl font-medium hover:bg-green-100 transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Enrolled (Go to Course)
                    </a>
                  ) : (
                    course.externalUrl ? (
                      <a
                        href={course.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => enrollInCourse(course)} // Keep tracking enrollment locally if desired
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                      >
                        Enroll Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => enrollInCourse(course)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                      >
                        Enroll Now
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedLevel("all");
                setSelectedProvider("all");
                setPriceFilter("all");
              }}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
