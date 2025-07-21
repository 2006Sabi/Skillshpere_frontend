import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchContent, getAllIndexedContent } from "../utils/searchIndex";
import "../style/Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allContent, setAllContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all indexed content
    setAllContent(getAllIndexedContent());
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchContent(query);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
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
        return "#4CAF50";
      case "intermediate":
        return "#FF9800";
      case "advanced":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "database":
        return "🗄️";
      case "backend":
        return "⚙️";
      case "frontend":
        return "🎨";
      default:
        return "📚";
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Learning Content</h1>
        <p>
          Find courses, roadmaps, and specific topics across our MERN stack
          learning platform
        </p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for courses, roadmaps, or topics..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>

      {/* Search Results */}
      {showResults && (
        <div className="search-results">
          {results.length > 0 ? (
            <>
              <h3>Search Results ({results.length})</h3>
              <div className="results-grid">
                {results.map((result, index) => (
                  <div
                    key={`${result.id}-${index}`}
                    className="result-card"
                    onClick={() => handleResultClick(result.url)}
                  >
                    <div className="result-header">
                      <span className="result-icon">
                        {getCategoryIcon(result.category)}
                      </span>
                      <div className="result-info">
                        <h4 className="result-title">{result.title}</h4>
                        <div className="result-meta">
                          <span className="result-type">{result.type}</span>
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

                    <div className="result-relevance">
                      Relevance: {result.relevance}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : query.trim() ? (
            <div className="no-results">
              <h3>No results found</h3>
              <p>Try different keywords or browse all content below</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Browse All Content */}
      {!showResults && (
        <div className="browse-section">
          <h3>Browse All Content</h3>
          <div className="content-grid">
            {allContent.map((item) => (
              <div
                key={item.id}
                className="content-card"
                onClick={() => handleResultClick(item.url)}
              >
                <div className="content-header">
                  <span className="content-icon">
                    {getCategoryIcon(item.category)}
                  </span>
                  <div className="content-info">
                    <h4 className="content-title">{item.title}</h4>
                    <div className="content-meta">
                      <span className="content-type">{item.type}</span>
                      <span
                        className="content-difficulty"
                        style={{
                          backgroundColor: getDifficultyColor(item.difficulty),
                        }}
                      >
                        {item.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
