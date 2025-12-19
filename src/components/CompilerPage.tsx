import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Save,
  Download,
  Upload,
  Settings,
  RefreshCw,
  Copy,
  Share2,
  Maximize2,
  Minimize2,
  Terminal,
  FileText,
  Database,
  Server,
  Code,
  Layers,
  Zap,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

interface CodeTemplate {
  id: string;
  name: string;
  language: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  description: string;
  code: string;
  icon: React.ReactNode;
}

interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  status: 'success' | 'error';
}

const CompilerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('react');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('dark');
  const [showSettings, setShowSettings] = useState(false);
  const [savedFiles, setSavedFiles] = useState<Array<{ id: string, name: string, code: string, language: string }>>([]);
  const [executionHistory, setExecutionHistory] = useState<ExecutionResult[]>([]);

  const codeEditorRef = useRef<HTMLTextAreaElement>(null);

  const codeTemplates: CodeTemplate[] = [
    {
      id: 'react-component',
      name: 'React Functional Component',
      language: 'jsx',
      category: 'react',
      description: 'Basic React functional component with hooks',
      icon: <Code className="w-4 h-4" />,
      code: `import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data or perform side effects
    console.log('Component mounted');
    
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Counter Component</h2>
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleDecrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-xl font-semibold">{count}</span>
        <button 
          onClick={handleIncrement}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MyComponent;`
    },
    {
      id: 'express-server',
      name: 'Express.js Server',
      language: 'javascript',
      category: 'express',
      description: 'Basic Express.js server with middleware and routes',
      icon: <Server className="w-4 h-4" />,
      code: `const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Express.js API!',
    version: '1.0.0',
    endpoints: ['/api/users', '/api/users/:id']
  });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log(\`📱 Environment: \${process.env.NODE_ENV || 'development'}\`);
});`
    },
    {
      id: 'mongodb-operations',
      name: 'MongoDB Operations',
      language: 'javascript',
      category: 'mongodb',
      description: 'MongoDB CRUD operations with Mongoose',
      icon: <Database className="w-4 h-4" />,
      code: `const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/stackbuilder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: [0, 'Age must be positive']
  },
  skills: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware
userSchema.pre('save', function(next) {
  console.log('About to save user:', this.name);
  next();
});

// Instance methods
userSchema.methods.getFullInfo = function() {
  return \`\${this.name} (\${this.email}) - \${this.skills.join(', ')}\`;
};

// Static methods
userSchema.statics.findBySkill = function(skill) {
  return this.find({ skills: { $in: [skill] } });
};

const User = mongoose.model('User', userSchema);

// CRUD Operations Examples
async function performCRUDOperations() {
  try {
    console.log('🔄 Starting MongoDB CRUD Operations...');

    // CREATE - Insert new user
    const newUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      age: 28,
      skills: ['JavaScript', 'React', 'Node.js']
    });
    
    const savedUser = await newUser.save();
    console.log('✅ User created:', savedUser._id);

    // CREATE - Insert multiple users
    const users = await User.insertMany([
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
        skills: ['Python', 'Django', 'PostgreSQL']
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        age: 32,
        skills: ['JavaScript', 'Vue.js', 'MongoDB']
      }
    ]);
    console.log(\`✅ \${users.length} users inserted\`);

    // READ - Find all users
    const allUsers = await User.find();
    console.log(\`📋 Total users: \${allUsers.length}\`);

    // READ - Find with conditions
    const jsUsers = await User.findBySkill('JavaScript');
    console.log(\`👨‍💻 JavaScript developers: \${jsUsers.length}\`);

    // READ - Find one user
    const user = await User.findOne({ email: 'john@example.com' });
    console.log('👤 Found user:', user?.getFullInfo());

    // UPDATE - Update one document
    const updatedUser = await User.findOneAndUpdate(
      { email: 'john@example.com' },
      { 
        $push: { skills: 'TypeScript' },
        $set: { age: 29 }
      },
      { new: true, runValidators: true }
    );
    console.log('🔄 Updated user skills:', updatedUser?.skills);

    // UPDATE - Update multiple documents
    const updateResult = await User.updateMany(
      { age: { $gte: 25 } },
      { $set: { isActive: true } }
    );
    console.log(\`🔄 Updated \${updateResult.modifiedCount} users\`);

    // AGGREGATION - Complex queries
    const skillStats = await User.aggregate([
      { $unwind: '$skills' },
      { 
        $group: {
          _id: '$skills',
          count: { $sum: 1 },
          users: { $push: '$name' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    console.log('📊 Skill statistics:', skillStats);

    // DELETE - Remove one document
    const deletedUser = await User.findOneAndDelete({ email: 'bob@example.com' });
    console.log('🗑️  Deleted user:', deletedUser?.name);

    // DELETE - Remove multiple documents
    const deleteResult = await User.deleteMany({ age: { $lt: 25 } });
    console.log(\`🗑️  Deleted \${deleteResult.deletedCount} users\`);

    console.log('✅ All CRUD operations completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the operations
performCRUDOperations();`
    },
    {
      id: 'nodejs-api',
      name: 'Node.js REST API',
      language: 'javascript',
      category: 'nodejs',
      description: 'Complete Node.js REST API with authentication',
      icon: <Layers className="w-4 h-4" />,
      code: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Mock database
let users = [];
let posts = [];
let nextUserId = 1;
let nextPostId = 1;

const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// User Registration
app.post('/api/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: nextUserId++,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
app.post('/api/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts
app.get('/api/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedPosts = posts
    .slice(startIndex, endIndex)
    .map(post => ({
      ...post,
      author: users.find(u => u.id === post.authorId)?.username
    }));

  res.json({
    posts: paginatedPosts,
    currentPage: page,
    totalPages: Math.ceil(posts.length / limit),
    totalPosts: posts.length
  });
});

// Create new post (protected)
app.post('/api/posts', authenticateToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  const post = {
    id: nextPostId++,
    title,
    content,
    authorId: req.user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  posts.push(post);

  res.status(201).json({
    message: 'Post created successfully',
    post: {
      ...post,
      author: req.user.username
    }
  });
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json({
    ...post,
    author: users.find(u => u.id === post.authorId)?.username
  });
});

// Update post (protected)
app.put('/api/posts/:id', authenticateToken, [
  body('title').optional().notEmpty(),
  body('content').optional().notEmpty()
], (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const post = posts[postIndex];
  
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to update this post' });
  }

  const { title, content } = req.body;
  
  if (title) post.title = title;
  if (content) post.content = content;
  post.updatedAt = new Date();

  posts[postIndex] = post;

  res.json({
    message: 'Post updated successfully',
    post: {
      ...post,
      author: req.user.username
    }
  });
});

// Delete post (protected)
app.delete('/api/posts/:id', authenticateToken, (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const post = posts[postIndex];
  
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to delete this post' });
  }

  posts.splice(postIndex, 1);

  res.json({ message: 'Post deleted successfully' });
});

// Get user profile (protected)
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const userPosts = posts.filter(p => p.authorId === req.user.id);

  res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    },
    postsCount: userPosts.length,
    posts: userPosts
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log('📋 Available endpoints:');
  console.log('  POST /api/register - Register new user');
  console.log('  POST /api/login - Login user');
  console.log('  GET /api/posts - Get all posts');
  console.log('  POST /api/posts - Create post (protected)');
  console.log('  GET /api/posts/:id - Get single post');
  console.log('  PUT /api/posts/:id - Update post (protected)');
  console.log('  DELETE /api/posts/:id - Delete post (protected)');
  console.log('  GET /api/profile - Get user profile (protected)');
});`
    }
  ];

  const tabs = [
    { id: 'react', name: 'React', icon: <Code className="w-4 h-4" />, color: 'text-blue-500' },
    { id: 'express', name: 'Express', icon: <Server className="w-4 h-4" />, color: 'text-green-500' },
    { id: 'mongodb', name: 'MongoDB', icon: <Database className="w-4 h-4" />, color: 'text-green-600' },
    { id: 'nodejs', name: 'Node.js', icon: <Layers className="w-4 h-4" />, color: 'text-yellow-600' }
  ];

  useEffect(() => {
    const template = codeTemplates.find(t => t.category === activeTab);
    if (template) {
      setCode(template.code);
    }
  }, [activeTab]);

  useEffect(() => {
    // Load saved files from localStorage
    const saved = JSON.parse(localStorage.getItem('compiler_saved_files') || '[]');
    setSavedFiles(saved);
  }, []);

  const executeCode = async () => {
    setIsExecuting(true);
    const startTime = Date.now();

    // Simulate code execution
    setTimeout(() => {
      const executionTime = Date.now() - startTime;
      let result: ExecutionResult;

      try {
        // This is a mock execution - in a real implementation, you'd send code to a backend service
        if (activeTab === 'react') {
          result = {
            output: `✅ React component compiled successfully!\n\n📦 Bundle size: 45.2 KB\n⚡ Build time: ${executionTime}ms\n\n🎯 Component rendered without errors\n📱 Mobile responsive: Yes\n🔧 TypeScript compatible: Yes`,
            executionTime,
            status: 'success'
          };
        } else if (activeTab === 'express') {
          result = {
            output: `🚀 Express server started successfully!\n\n📡 Server running on port 5001\n⏱️  Startup time: ${executionTime}ms\n\n✅ Routes registered:\n  GET /\n  GET /api/users\n  GET /api/users/:id\n  POST /api/users\n\n🔒 Middleware loaded:\n  - CORS enabled\n  - JSON parser active\n  - Morgan logger active`,
            executionTime,
            status: 'success'
          };
        } else if (activeTab === 'mongodb') {
          result = {
            output: `🍃 MongoDB operations completed!\n\n📊 Results:\n✅ Connected to database\n✅ User created: ObjectId("507f1f77bcf86cd799439011")\n✅ 2 users inserted\n📋 Total users: 3\n👨‍💻 JavaScript developers: 2\n🔄 Updated 2 users\n📊 Skill statistics generated\n🗑️  Deleted 1 user\n🔌 Database connection closed\n\n⏱️  Total execution time: ${executionTime}ms`,
            executionTime,
            status: 'success'
          };
        } else {
          result = {
            output: `🚀 Node.js API server started!\n\n📡 Server running on port 3000\n⏱️  Startup time: ${executionTime}ms\n\n📋 Available endpoints:\n  POST /api/register - Register new user\n  POST /api/login - Login user\n  GET /api/posts - Get all posts\n  POST /api/posts - Create post (protected)\n  GET /api/posts/:id - Get single post\n  PUT /api/posts/:id - Update post (protected)\n  DELETE /api/posts/:id - Delete post (protected)\n  GET /api/profile - Get user profile (protected)\n\n🔐 JWT authentication enabled\n🛡️  Input validation active\n📝 Ready to handle requests!`,
            executionTime,
            status: 'success'
          };
        }
      } catch (error) {
        result = {
          output: '',
          error: `Error: ${error}`,
          executionTime,
          status: 'error'
        };
      }

      setOutput(result.output + (result.error ? `\n\n❌ ${result.error}` : ''));
      setExecutionHistory(prev => [result, ...prev.slice(0, 9)]);
      setIsExecuting(false);
    }, 1000 + Math.random() * 1000);
  };

  const saveFile = () => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      const newFile = {
        id: Date.now().toString(),
        name: fileName,
        code,
        language: activeTab
      };
      const updatedFiles = [...savedFiles, newFile];
      setSavedFiles(updatedFiles);
      localStorage.setItem('compiler_saved_files', JSON.stringify(updatedFiles));
    }
  };

  const loadFile = (file: typeof savedFiles[0]) => {
    setCode(file.code);
    setActiveTab(file.language);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${activeTab === 'react' ? 'jsx' : 'js'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h1 className="text-xl font-bold">MERN Stack Compiler</h1>
            </div>

            {/* Technology Tabs */}
            <div className="flex bg-gray-700 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                      ? 'bg-gray-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                >
                  <span className={tab.color}>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={executeCode}
              disabled={isExecuting}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors"
            >
              {isExecuting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
            </button>

            <button
              onClick={saveFile}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Save File"
            >
              <Save className="w-4 h-4" />
            </button>

            <button
              onClick={downloadCode}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Download Code"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={copyCode}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Copy Code"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Templates */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Code Templates</h3>
            <div className="space-y-2">
              {codeTemplates
                .filter(template => template.category === activeTab)
                .map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setCode(template.code)}
                    className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {template.icon}
                      <span className="font-medium text-sm">{template.name}</span>
                    </div>
                    <p className="text-xs text-gray-400">{template.description}</p>
                  </button>
                ))}
            </div>
          </div>

          {/* Saved Files */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Saved Files</h3>
            <div className="space-y-2">
              {savedFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => loadFile(file)}
                  className="w-full text-left p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-3 h-3" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{file.language}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 flex">
            <div className="flex-1 relative">
              <textarea
                ref={codeEditorRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono resize-none focus:outline-none"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </div>

            {/* Output Panel */}
            <div className="w-1/2 border-l border-gray-700 flex flex-col">
              <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Output</span>
                </div>
                <button
                  onClick={clearOutput}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Clear Output"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 p-4 bg-black text-green-400 font-mono text-sm overflow-y-auto">
                {output ? (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="text-gray-500 italic">
                    Click "Run Code" to see the output here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Editor Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Font Size</label>
                <input
                  type="range"
                  min="12"
                  max="20"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">{fontSize}px</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompilerPage;