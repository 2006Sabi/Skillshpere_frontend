import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  shortDescription: string;
  thumbnail: string;
  provider: {
    name: string;
    logo: string;
    website: string;
  };
  externalUrl: string;
  category: string;
  subcategory?: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: {
    hours: number;
    weeks?: number;
  };
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
  features: string[];
  language: string;
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

  // Sample data (in production, this would come from the backend API)
  const sampleCourses: Course[] = [
    {
      _id: "1",
      title: "Complete MERN Stack Development",
      description:
        "Master MongoDB, Express.js, React, and Node.js to build full-stack web applications. This comprehensive course covers everything from basics to advanced concepts with hands-on projects.",
      shortDescription:
        "Learn to build complete web applications using the MERN stack",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
      provider: {
        name: "Guvi",
        logo: "https://www.guvi.in/build/images/logo.svg",
        website: "https://www.guvi.in",
      },
      externalUrl: "https://www.guvi.in/courses/mern-stack-development",
      category: "Full Stack",
      subcategory: "React",
      level: "intermediate",
      duration: { hours: 40, weeks: 8 },
      price: {
        original: 2999,
        discounted: 1999,
        currency: "INR",
        isFree: false,
      },
      rating: { average: 4.8, count: 1250, source: "Guvi Platform" },
      enrollmentCount: 15420,
      technologies: [
        { name: "MongoDB", icon: "🍃", color: "#47A248" },
        { name: "Express.js", icon: "⚡", color: "#000000" },
        { name: "React", icon: "⚛️", color: "#61DAFB" },
        { name: "Node.js", icon: "🟢", color: "#339933" },
      ],
      features: [
        "Video Lectures",
        "Hands-on Projects",
        "Certificate",
        "Lifetime Access",
        "Community Support",
      ],
      language: "English",
      tags: ["MERN", "Full Stack", "JavaScript", "React", "Node.js"],
      isRecommended: true,
      isTrending: true,
    },
    {
      _id: "2",
      title: "JavaScript Fundamentals for Beginners",
      description:
        "Start your programming journey with JavaScript. Learn variables, functions, objects, and DOM manipulation through interactive exercises and real-world examples.",
      shortDescription: "Master JavaScript basics with hands-on practice",
      thumbnail:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500",
      provider: {
        name: "FreeCodeCamp",
        logo: "https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg",
        website: "https://www.freecodecamp.org",
      },
      externalUrl:
        "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      category: "Frontend",
      subcategory: "JavaScript",
      level: "beginner",
      duration: { hours: 25, weeks: 5 },
      price: { isFree: true },
      rating: { average: 4.9, count: 50000, source: "FreeCodeCamp" },
      enrollmentCount: 250000,
      technologies: [
        { name: "JavaScript", icon: "📜", color: "#F7DF1E" },
        { name: "HTML", icon: "🌐", color: "#E34F26" },
        { name: "CSS", icon: "🎨", color: "#1572B6" },
      ],
      features: ["Interactive Coding", "Free Certificate", "Community Support"],
      language: "English",
      tags: ["JavaScript", "Programming", "Beginner", "Free"],
      isRecommended: true,
    },
    {
      _id: "3",
      title: "Advanced React Patterns and Performance",
      description:
        "Take your React skills to the next level with advanced patterns, performance optimization techniques, and modern React features like Suspense and Concurrent Mode.",
      shortDescription:
        "Master advanced React concepts and optimization techniques",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500",
      provider: {
        name: "Coursera",
        logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fb/a049d0d48f11e5ab95bb54825b6b60/coursera-logo.png?auto=format%2Ccompress&dpr=1",
        website: "https://www.coursera.org",
      },
      externalUrl: "https://www.coursera.org/learn/advanced-react",
      category: "Frontend",
      subcategory: "React",
      level: "advanced",
      duration: { hours: 35, weeks: 7 },
      price: { original: 49, currency: "USD", isFree: false },
      rating: { average: 4.7, count: 3200, source: "Coursera" },
      enrollmentCount: 12500,
      technologies: [
        { name: "React", icon: "⚛️", color: "#61DAFB" },
        { name: "TypeScript", icon: "🔷", color: "#3178C6" },
        { name: "Testing", icon: "🧪", color: "#E33332" },
      ],
      features: [
        "Video Lectures",
        "Peer Reviews",
        "Certificate",
        "Mobile Access",
      ],
      language: "English",
      tags: ["React", "Advanced", "Performance", "Testing"],
      isNew: true,
    },
    {
      _id: "4",
      title: "Node.js Backend Development Masterclass",
      description:
        "Build robust backend applications with Node.js and Express. Learn authentication, database integration, API design, testing, and deployment strategies.",
      shortDescription: "Master backend development with Node.js and Express",
      thumbnail:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500",
      provider: {
        name: "Udemy",
        logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
        website: "https://www.udemy.com",
      },
      externalUrl:
        "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
      category: "Backend",
      subcategory: "Node.js",
      level: "intermediate",
      duration: { hours: 42, weeks: 8 },
      price: {
        original: 84.99,
        discounted: 12.99,
        currency: "USD",
        isFree: false,
      },
      rating: { average: 4.8, count: 8500, source: "Udemy" },
      enrollmentCount: 45000,
      technologies: [
        { name: "Node.js", icon: "🟢", color: "#339933" },
        { name: "Express.js", icon: "⚡", color: "#000000" },
        { name: "MongoDB", icon: "🍃", color: "#47A248" },
      ],
      features: [
        "Video Lectures",
        "Coding Exercises",
        "Certificate",
        "Lifetime Access",
      ],
      language: "English",
      tags: ["Node.js", "Backend", "API", "Database"],
      isTrending: true,
    },
      {
        _id: "GML-FE-HTML-001",
        title: "Front End Development – HTML",
        description:
          "A beginner-friendly course that teaches HTML and basic CSS to build static and responsive web pages. Includes exercises and a completion certificate.",
        shortDescription:
          "HTML & basic CSS for front-end development (free, certificate).",
        thumbnail:
          "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=500",
        provider: {
          name: "MyGreatLearning",
          logo: "https://www.mygreatlearning.com/static/images/logo.png",
          website: "https://www.mygreatlearning.com",
        },
        externalUrl:
          "https://www.mygreatlearning.com/academy/learn-for-free/courses/front-end-development-html",
        category: "Frontend",
        subcategory: "HTML & CSS",
        level: "beginner",
        duration: { hours: 8, weeks: 1 },
        price: { original: 0, discounted: 0, currency: "USD", isFree: true },
        rating: {
          average: 4.6,
          count: 4200,
          source: "MyGreatLearning Reviews",
        },
        enrollmentCount: 45000,
        technologies: [
          { name: "HTML5", icon: "📄", color: "#E44D26" },
          { name: "CSS3", icon: "🎨", color: "#1572B6" },
        ],
        features: ["Video Lectures", "Quizzes", "Certificate of Completion"],
        language: "English",
        tags: ["HTML", "CSS", "Frontend", "Beginner"],
        isRecommended: true,
        isTrending: false,
      },
      {
        _id: "SML-FE-SKILLUP-002",
        title: "Free Front-End Developer Course (SkillUp)",
        description:
          "A free SkillUp course from Simplilearn covering HTML, CSS, JavaScript fundamentals and Git basics. Includes a free completion certificate.",
        shortDescription:
          "HTML, CSS, JS & Git — free front-end fundamentals with certificate.",
        thumbnail:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500",
        provider: {
          name: "Simplilearn (SkillUp)",
          logo: "https://www.simplilearn.com/ice9/new_logo.svg",
          website: "https://www.simplilearn.com",
        },
        externalUrl:
          "https://www.simplilearn.com/front-end-developer-free-course-skillup",
        category: "Frontend",
        subcategory: "Web Development",
        level: "beginner",
        duration: { hours: 20, weeks: 3 },
        price: { original: 0, discounted: 0, currency: "USD", isFree: true },
        rating: { average: 4.5, count: 3800, source: "Simplilearn Reviews" },
        enrollmentCount: 68000,
        technologies: [
          { name: "HTML", icon: "📄", color: "#E44D26" },
          { name: "CSS", icon: "🎨", color: "#1572B6" },
          { name: "JavaScript", icon: "✨", color: "#F7DF1E" },
          { name: "Git", icon: "🔧", color: "#F05032" },
        ],
        features: ["Self-paced", "Certificate", "Hands-on Labs"],
        language: "English",
        tags: ["Frontend", "JavaScript", "Git", "Free"],
        isRecommended: true,
        isTrending: true,
      },
      {
        _id: "GML-FS-INTRO-003",
        title: "Become Full Stack Developer",
        description:
          "An introductory full-stack program covering front-end basics, backend fundamentals, and databases — aimed at beginners wanting an end-to-end overview.",
        shortDescription:
          "Introductory full-stack course (frontend + backend basics) — free.",
        thumbnail:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
        provider: {
          name: "MyGreatLearning",
          logo: "https://www.mygreatlearning.com/static/images/logo.png",
          website: "https://www.mygreatlearning.com",
        },
        externalUrl:
          "https://www.mygreatlearning.com/academy/learn-for-free/courses/become-full-stack-developer",
        category: "Full Stack",
        subcategory: "Introductory",
        level: "beginner",
        duration: { hours: 40, weeks: 6 },
        price: { original: 0, discounted: 0, currency: "USD", isFree: true },
        rating: { average: 4.4, count: 5400, source: "MyGreatLearning" },
        enrollmentCount: 72000,
        technologies: [
          { name: "HTML", icon: "📄", color: "#E44D26" },
          { name: "JavaScript", icon: "✨", color: "#F7DF1E" },
          { name: "Node.js", icon: "🟢", color: "#339933" },
        ],
        features: ["Modules", "Project Exercises", "Certificate"],
        language: "English",
        tags: ["Full Stack", "Beginner", "MERN Intro"],
        isRecommended: true,
        isTrending: false,
      },
      {
        _id: "GML-DEVOPS-INTRO-004",
        title: "Introduction to DevOps",
        description:
          "Fundamentals of DevOps: culture, CI/CD basics, containers, and monitoring. A short free course with a certificate on completion.",
        shortDescription: "DevOps fundamentals with certificate (free).",
        thumbnail:
          "https://images.unsplash.com/photo-1526378721577-86bdf9f0d7c6?w=500",
        provider: {
          name: "MyGreatLearning",
          logo: "https://www.mygreatlearning.com/static/images/logo.png",
          website: "https://www.mygreatlearning.com",
        },
        externalUrl:
          "https://www.mygreatlearning.com/academy/learn-for-free/courses/introduction-to-devops1",
        category: "DevOps",
        subcategory: "Foundations",
        level: "beginner",
        duration: { hours: 12, weeks: 2 },
        price: { original: 0, discounted: 0, currency: "USD", isFree: true },
        rating: { average: 4.5, count: 2100, source: "MyGreatLearning" },
        enrollmentCount: 38000,
        technologies: [
          { name: "CI/CD", icon: "🔁", color: "#6C7A89" },
          { name: "Containers", icon: "📦", color: "#2496ED" },
        ],
        features: ["Video Lessons", "Certificate", "Intro Projects"],
        language: "English",
        tags: ["DevOps", "CI/CD", "Containers", "Free"],
        isRecommended: true,
        isTrending: false,
      },
      {
        _id: "KH-DEVOPS-FREE-005",
        title: "Free DevOps Certification Course",
        description:
          "A self-paced introductory DevOps course from KnowledgeHut that covers CI/CD concepts, tools overview, and a certificate on completion.",
        shortDescription:
          "KnowledgeHut free DevOps course with certificate (self-paced).",
        thumbnail:
          "https://images.unsplash.com/photo-1537432376769-00a8f44aa2f9?w=500",
        provider: {
          name: "KnowledgeHut",
          logo: "https://www.knowledgehut.com/assets/images/logo/kh-logo.png",
          website: "https://www.knowledgehut.com",
        },
        externalUrl:
          "https://www.knowledgehut.com/free-courses/free-introduction-to-devops-course-with-certificate",
        category: "DevOps",
        subcategory: "Foundations",
        level: "beginner",
        duration: { hours: 10, weeks: 2 },
        price: { original: 0, discounted: 0, currency: "USD", isFree: true },
        rating: { average: 4.3, count: 900, source: "KnowledgeHut" },
        enrollmentCount: 15000,
        technologies: [
          { name: "CI/CD", icon: "🔁", color: "#6C7A89" },
          { name: "Docker", icon: "🐳", color: "#2496ED" },
        ],
        features: ["Self-paced", "Certificate", "Tool Demos"],
        language: "English",
        tags: ["DevOps", "Free", "Certificate"],
        isRecommended: false,
        isTrending: false,
      },
      {
        _id: "META-BE-COURSE-006",
        title: "Meta Back-End Developer Professional Certificate",
        description:
          "A professional certificate program focused on backend development, APIs, databases, and production-ready services. Project-based and recognized by employers.",
        shortDescription:
          "Meta professional certificate — backend developer track (paid, Coursera).",
        thumbnail:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
        provider: {
          name: "Coursera",
          logo: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Coursera_logo.svg",
          website: "https://www.coursera.org",
        },
        externalUrl:
          "https://www.coursera.org/professional-certificates/meta-back-end-developer",
        category: "Backend",
        subcategory: "Professional Certificate",
        level: "beginner",
        duration: { hours: 200, weeks: 20 },
        price: { original: 49, discounted: 49, currency: "USD", isFree: false },
        rating: { average: 4.7, count: 18000, source: "Coursera Reviews" },
        enrollmentCount: 120000,
        technologies: [
          { name: "APIs", icon: "🔗", color: "#6C7A89" },
          { name: "Databases", icon: "🗄️", color: "#006DB6" },
          { name: "Python/JS", icon: "💻", color: "#F7DF1E" },
        ],
        features: [
          "Hands-on Projects",
          "Professional Certificate",
          "Career Resources",
        ],
        language: "English",
        tags: ["Backend", "APIs", "Database", "Professional Certificate"],
        isRecommended: true,
        isTrending: true,
      },
      {
        _id: "COURSE-DEV-WEB-007",
        title: "Web Development Courses (Coursera Collection)",
        description:
          "A curated collection of web development courses on Coursera covering frontend, backend, full-stack topics — many can be audited for free; certificates available with payment.",
        shortDescription:
          "Coursera catalog: web development (audit free, certificates paid).",
        thumbnail:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
        provider: {
          name: "Coursera",
          logo: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Coursera_logo.svg",
          website: "https://www.coursera.org",
        },
        externalUrl: "https://www.coursera.org/search?query=web%20development",
        category: "Full Stack",
        subcategory: "Catalog",
        level: "beginner",
        duration: { hours: 0, weeks: 0 },
        price: { original: 0, discounted: 0, currency: "USD", isFree: true },
        rating: { average: 4.6, count: 50000, source: "Coursera Catalog" },
        enrollmentCount: 500000,
        technologies: [
          { name: "HTML/CSS", icon: "📄", color: "#E44D26" },
          { name: "JavaScript", icon: "✨", color: "#F7DF1E" },
          { name: "Backend", icon: "🗄️", color: "#006DB6" },
        ],
        features: [
          "Audit for Free",
          "Certificates Available",
          "Specializations",
        ],
        language: "English",
        tags: ["Web Development", "Catalog", "Coursera", "Audit"],
        isRecommended: false,
        isTrending: false,
      },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(sampleCourses);
      setFilteredCourses(sampleCourses);
      setLoading(false);
    }, 1000);

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
        (course) => course.provider.name === selectedProvider
      );
    }

    // Price filter
    if (priceFilter === "free") {
      filtered = filtered.filter((course) => course.price.isFree);
    } else if (priceFilter === "paid") {
      filtered = filtered.filter((course) => !course.price.isFree);
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "duration":
        filtered.sort((a, b) => a.duration.hours - b.duration.hours);
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

    // Open external course URL
    window.open(course.externalUrl, "_blank");
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
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-white shadow"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-white shadow"
                      : "hover:bg-gray-200"
                  }`}
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
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredCourses.length} courses found
          </h2>

          {searchQuery && (
            <div className="text-sm text-gray-600">
              Showing results for "
              <span className="font-medium">{searchQuery}</span>"
            </div>
          )}
        </div>

        {/* Course Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Course Image */}
              <div
                className={`relative ${
                  viewMode === "list" ? "w-64 flex-shrink-0" : "aspect-video"
                }`}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {course.isRecommended && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Recommended
                    </span>
                  )}
                  {course.isTrending && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </span>
                  )}
                  {course.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(course._id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.has(course._id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.duration.hours}h
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 flex-1">
                {/* Provider */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getProviderColor(
                      course.provider.name
                    )}`}
                  >
                    {course.provider.name}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      <span className="mr-1">{tech.icon}</span>
                      {tech.name}
                    </span>
                  ))}
                  {course.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                      +{course.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {course.rating.average}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({course.rating.count.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {course.enrollmentCount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    {course.price.isFree ? (
                      <span className="text-2xl font-bold text-green-600">
                        Free
                      </span>
                    ) : (
                      <div className="flex items-center space-x-2">
                        {course.price.discounted && (
                          <span className="text-2xl font-bold text-indigo-600">
                            {course.price.currency} {course.price.discounted}
                          </span>
                        )}
                        <span
                          className={`${
                            course.price.discounted
                              ? "text-sm text-gray-500 line-through"
                              : "text-2xl font-bold text-indigo-600"
                          }`}
                        >
                          {course.price.currency} {course.price.original}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {enrolledCourses.has(course._id) ? (
                      <button
                        onClick={() =>
                          window.open(course.externalUrl, "_blank")
                        }
                        className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={() => enrollInCourse(course)}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find more courses.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedLevel("all");
                setSelectedProvider("all");
                setPriceFilter("all");
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
