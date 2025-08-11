import React from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection: React.FC = () => {
  const courses = [
    {
      id: 'react',
      title: 'React Mastery',
      description: 'Master React from basics to advanced patterns including hooks, context, and performance optimization',
      price: 299,
      originalPrice: 499,
      features: [
        'Complete React fundamentals',
        'Advanced hooks & patterns',
        'State management with Redux',
        'Testing with Jest & RTL',
        'Performance optimization',
        'Real-world projects'
      ],
      duration: '8 weeks',
      level: 'Beginner to Advanced',
      popular: true
    },
    {
      id: 'express',
      title: 'Express.js Backend',
      description: 'Build scalable REST APIs with Express.js, middleware, authentication, and database integration',
      price: 249,
      originalPrice: 399,
      features: [
        'RESTful API design',
        'Authentication & authorization',
        'Middleware development',
        'Database integration',
        'Error handling',
        'API documentation'
      ],
      duration: '6 weeks',
      level: 'Intermediate'
    },
    {
      id: 'mongodb',
      title: 'MongoDB Deep Dive',
      description: 'Master MongoDB from schema design to advanced queries and performance optimization',
      price: 199,
      originalPrice: 349,
      features: [
        'Schema design patterns',
        'CRUD operations',
        'Aggregation pipeline',
        'Indexing & performance',
        'Replication & sharding',
        'Real-world use cases'
      ],
      duration: '5 weeks',
      level: 'Beginner to Intermediate'
    },
    {
      id: 'nodejs',
      title: 'Node.js Fundamentals',
      description: 'Learn Node.js core concepts, async programming, and build scalable server applications',
      price: 179,
      originalPrice: 299,
      features: [
        'Node.js core concepts',
        'Async/await & promises',
        'File system operations',
        'Event-driven architecture',
        'Package management',
        'Production deployment'
      ],
      duration: '4 weeks',
      level: 'Beginner'
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-indigo-600">Learning Path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select individual courses or get the complete MERN stack bundle at a special discount
          </p>
        </div>

        {/* Bundle Offer */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="text-yellow-300 font-semibold">Most Popular</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">Complete MERN Stack Bundle</h3>
              <p className="text-indigo-100 mb-6">
                Get all 4 courses with lifetime access and save 40%
              </p>
              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-4xl font-bold">$699</span>
                <span className="text-2xl text-indigo-200 line-through">$1,546</span>
                <span className="bg-yellow-300 text-indigo-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Save $847
                </span>
              </div>
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Get Complete Bundle
              </Link>
            </div>
          </div>
        </div>

        {/* Individual Courses */}
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative ${
                course.popular ? 'border-2 border-indigo-600' : 'border border-gray-200'
              }`}
            >
              {course.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                  <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-colors block ${
                  course.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Course
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            All Courses Include
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Lifetime Access',
                description: 'Learn at your own pace with lifetime access to all course materials'
              },
              {
                title: 'Real Projects',
                description: 'Build portfolio-worthy projects that showcase your skills to employers'
              },
              {
                title: 'Certificate',
                description: 'Earn verified certificates upon completion to boost your resume'
              },
              {
                title: 'Community Access',
                description: 'Join our active community of developers for support and networking'
              },
              {
                title: 'Code Reviews',
                description: 'Get personalized feedback on your code from expert instructors'
              },
              {
                title: 'Job Support',
                description: 'Access our job board and get help with interview preparation'
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">30-Day Money Back Guarantee</span>
          </div>
          <p className="text-gray-600 mt-4">
            Not satisfied? Get a full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
