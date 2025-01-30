import React from "react";
import "./ReactPage.css";

const ReactPage = () =>{
    return (
      <div className="timeline1">
        {/* <SiMongodb /> */}
        <h1>RoadMap for React</h1>
        <div className="container1 left-container1">
          <div className="text-box1">
            <h2>Java Script</h2>
            <p>
              JavaScript allows you to manipulate web elements, handle events,
              and perform dynamic actions
            </p>
            <span className="left-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 right-container1">
          <div className="text-box1">
            <h2>HTML & CSS</h2>
            <p>
              HTML structures the content of a webpage using elements, while CSS
              styles it with properties like color, font-size, and margin to
              enhance visual presentation.
            </p>
            <span className="right-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 left-container1">
          <div className="text-box1">
            <h2>React Fundaentals</h2>
            <p>
              React fundamentals involve components, JSX, props, state, and
              hooks for building dynamic, reusable, and declarative user
              interfaces
            </p>
            <span className="left-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 right-container1">
          <div className="text-box1">
            <h2>React Hooks</h2>
            <p>
              React hooks like useState, useEffect, useContext, useReducer, and
              useRef enable state management, side effects, context sharing, and
              references in functional components.
            </p>
            <span className="right-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 left-container1">
          <div className="text-box1">
            <h2>Routing & Statement Management</h2>
            <p>
              Routing in React is handled by libraries like React Router for
              navigation between views, while state management uses tools like
              useState, Context API, or external libraries like Redux or Zustand
              for managing global and local states.
            </p>
            <span className="left-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 right-container1">
          <div className="text-box1">
            <h2>Styling</h2>
            <p>
              Styling in React can be achieved using CSS files, CSS-in-JS
              libraries (e.g., styled-components), CSS Modules, Tailwind CSS, or
              inline styles with the style attribute.
            </p>
            <span className="right-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 left-container1">
          <div className="text-box1">
            <h2>API Integration</h2>
            <p>
              API integration in React involves using methods like fetch() or
              libraries like Axios to make HTTP requests and handle responses,
              typically within useEffect for side effects.
            </p>
            <span className="left-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 right-container1">
          <div className="text-box1">
            <h2>TypeScript</h2>
            <p>
              TypeScript adds static typing to JavaScript, enabling type safety,
              better code readability, and catching errors during development,
              making it ideal for scalable React projects.
            </p>
            <span className="right-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 left-container1">
          <div className="text-box1">
            <h2>Testing</h2>
            <p>
              Testing in React involves using libraries like Jest for unit
              tests, React Testing Library for component tests, and Cypress or
              Playwright for end-to-end testing.
            </p>
            <span className="left-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 right-container1">
          <div className="text-box1">
            <h2>Performance Optimizattion</h2>
            <p>
              Performance optimization in React involves techniques like
              memoization (React.memo), lazy loading (React.lazy), code
              splitting, avoiding unnecessary re-renders, and using useCallback
              and useMemo hooks to manage component rendering.
            </p>
            <span className="right-container1-arrow"></span>
          </div>
        </div>
        <div className="container1 left-container1">
          <div className="text-box1">
            <h2>Deployment</h2>
            <p>
              Deployment in React can be done using platforms like Netlify,
              Vercel, GitHub Pages, or Heroku, by building the app with npm run
              build and uploading the build folder to the chosen hosting
              service.
            </p>
            <span className="left-container1-arrow"></span>
          </div>
        </div>
      </div>
    );
}

export default ReactPage;