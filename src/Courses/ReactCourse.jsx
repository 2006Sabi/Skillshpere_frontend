import React from "react";
import "./ReactPage.css";

const ReactPage = () => {
  return (
    <div className="react-page">
      <h1>React Overview</h1>

      {/* Introduction */}
      <section className="react-section">
        <h2>Introduction</h2>
        <p>
          React is a JavaScript library for building user interfaces, maintained
          by Facebook. It allows developers to create fast and interactive UIs
          with a component-based architecture.
        </p>
      </section>

      {/* Key Features */}
      <section className="react-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Component-Based:</strong> Build encapsulated components that
            manage their own state.
          </li>
          <li>
            <strong>Virtual DOM:</strong> Efficient updates and rendering
            through a virtual representation of the DOM.
          </li>
          <li>
            <strong>Declarative UI:</strong> Describe what the UI should look
            like and React takes care of updating it.
          </li>
          <li>
            <strong>Reusable Components:</strong> Write components once and
            reuse them across the application.
          </li>
        </ul>
      </section>

      {/* JSX */}
      <section className="react-section">
        <h2>JSX (JavaScript XML)</h2>
        <p>
          JSX allows you to write HTML-like syntax in JavaScript. It helps
          create UI elements dynamically and is compiled into JavaScript.
        </p>
        <pre>{`const element = <h1>Hello, React!</h1>;`}</pre>
      </section>

      {/* Components */}
      <section className="react-section">
        <h2>Components</h2>
        <p>
          React applications are made up of reusable components. Components can
          be either **functional** or **class-based**.
        </p>
        <pre>
          {`function Welcome() {
  return <h1>Hello, World!</h1>;
}`}
        </pre>
      </section>

      {/* State and Props */}
      <section className="react-section">
        <h2>State and Props</h2>
        <p>
          State allows components to manage dynamic data, while props enable
          passing data between components.
        </p>
        <pre>
          {`function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`}
        </pre>
      </section>

      {/* Hooks */}
      <section className="react-section">
        <h2>React Hooks</h2>
        <p>
          Hooks allow functional components to use state and lifecycle features.
        </p>
        <ul>
          <li>
            <strong>useState:</strong> Manage component state.
          </li>
          <li>
            <strong>useEffect:</strong> Perform side effects in function
            components.
          </li>
        </ul>
      </section>

      {/* Routing */}
      <section className="react-section">
        <h2>Routing with React Router</h2>
        <p>
          React Router enables navigation in single-page applications (SPA).
        </p>
        <pre>
          {`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>`}
        </pre>
      </section>

      {/* Getting Started */}
      <section className="react-section">
        <h2>Getting Started</h2>
        <ol>
          <li>
            <strong>Install React:</strong> Run{" "}
            <code>npx create-react-app my-app</code>.
          </li>
          <li>
            <strong>Start Development Server:</strong> Navigate to the project
            folder and run <code>npm start</code>.
          </li>
          <li>
            <strong>Create Components:</strong> Build UI components and import
            them into your app.
          </li>
          <li>
            <strong>Use State:</strong> Manage dynamic data using{" "}
            <code>useState</code>.
          </li>
          <li>
            <strong>Set Up Routing:</strong> Use <code>react-router-dom</code>{" "}
            for navigation.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default ReactPage;
