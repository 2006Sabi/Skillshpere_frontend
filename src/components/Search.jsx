import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search as SearchIcon,
  BookOpen,
  Map,
  Database,
  Code,
  Server,
  Target,
  Star,
  Clock,
} from "lucide-react";
import { searchContent, getAllIndexedContent } from "../utils/searchIndex";
import "../style/Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allContent, setAllContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all indexed content
    setAllContent(getAllIndexedContent());
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate search delay for better UX
      const timer = setTimeout(() => {
        const searchResults = searchContent(query);
        setResults(searchResults);
        setShowResults(true);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowResults(false);
      setIsLoading(false);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const searchResults = searchContent(query);
      setResults(searchResults);
      setShowResults(true);
    }
  };

  const handleResultClick = (url) => {
    navigate(url);
    setQuery("");
    setShowResults(false);
  };

  const handleInputFocus = () => {
    if (query.trim()) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "var(--success-600)";
      case "intermediate":
        return "var(--warning-600)";
      case "advanced":
        return "var(--error-600)";
      default:
        return "var(--gray-600)";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "database":
        return <Database size={20} />;
      case "backend":
        return <Server size={20} />;
      case "frontend":
        return <Code size={20} />;
      case "devops":
        return <Target size={20} />;
      default:
        return <BookOpen size={20} />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "course":
        return <BookOpen size={16} />;
      case "roadmap":
        return <Map size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  return (
    <div className="search-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="search-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Search Learning Content</h1>
          <p>
            Find courses, roadmaps, and specific topics across our MERN stack
            learning platform
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          className="search-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="search-input-container">
            <SearchIcon size={20} className="search-input-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Search for courses, roadmaps, or topics..."
              className="search-input"
            />
            <button
              type="submit"
              className="search-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <SearchIcon size={20} />
              )}
            </button>
          </div>
        </motion.form>

        {/* Search Results */}
        {showResults && (
          <motion.div
            className="search-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {results.length > 0 ? (
              <>
                <div className="results-header">
                  <h3>Search Results ({results.length})</h3>
                  <p>
                    Found {results.length} items matching "{query}"
                  </p>
                </div>
                <div className="results-grid">
                  {results.map((result, index) => (
                    <motion.div
                      key={`${result.id}-${index}`}
                      className="result-card"
                      onClick={() => handleResultClick(result.url)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="result-header">
                        <div className="result-icon">
                          {getCategoryIcon(result.category)}
                        </div>
                        <div className="result-info">
                          <h4 className="result-title">{result.title}</h4>
                          <div className="result-meta">
                            <span className="result-type">
                              {getTypeIcon(result.type)}
                              {result.type}
                            </span>
                            <span
                              className="result-difficulty"
                              style={{
                                backgroundColor: getDifficultyColor(
                                  result.difficulty
                                ),
                              }}
                            >
                              {result.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="result-description">{result.description}</p>

                      {result.matchedSections &&
                        result.matchedSections.length > 0 && (
                          <div className="matched-sections">
                            <strong>Matched sections:</strong>
                            <div className="section-tags">
                              {result.matchedSections
                                .slice(0, 3)
                                .map((section, idx) => (
                                  <span key={idx} className="section-tag">
                                    {section}
                                  </span>
                                ))}
                              {result.matchedSections.length > 3 && (
                                <span className="section-tag more">
                                  +{result.matchedSections.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                      <div className="result-footer">
                        <div className="result-relevance">
                          <Star size={14} fill="currentColor" />
                          Relevance: {result.relevance}
                        </div>
                        <div className="result-tags">
                          {result.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="result-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : query.trim() ? (
              <motion.div
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="no-results-icon">
                  <SearchIcon size={48} />
                </div>
                <h3>No results found</h3>
                <p>Try different keywords or browse all content below</p>
              </motion.div>
            ) : null}
          </motion.div>
        )}

        {/* Browse All Content */}
        {!showResults && (
          <motion.div
            className="browse-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="browse-header">
              <h3>Browse All Content</h3>
              <p>
                Explore our complete collection of courses and learning paths
              </p>
            </div>
            <div className="content-grid">
              {allContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="content-card"
                  onClick={() => handleResultClick(item.url)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="content-header">
                    <div className="content-icon">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="content-info">
                      <h4 className="content-title">{item.title}</h4>
                      <div className="content-meta">
                        <span className="content-type">
                          {getTypeIcon(item.type)}
                          {item.type}
                        </span>
                        <span
                          className="content-difficulty"
                          style={{
                            backgroundColor: getDifficultyColor(
                              item.difficulty
                            ),
                          }}
                        >
                          {item.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="content-description">{item.description}</p>
                  <div className="content-tags">
                    {item.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="content-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
