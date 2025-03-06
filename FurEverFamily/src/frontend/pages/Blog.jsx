import React from 'react';
import { blogPosts } from '../Mock API/blogPosts';
import BlogList from '../components/BlogList/BlogList';
import { useTheme } from '../features/ThemeContext';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { theme } = useTheme();
  const featuredPost = blogPosts[0]; // Using first post as featured

  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}>
      {/* Hero Section with Featured Post */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Featured Post Content */}
              <div data-aos="fade-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'bg-primary bg-opacity-20 text-primary' : 'bg-primary text-white'
                }`}>
                  Featured Post
                </span>
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-text'
                }`}>
                  {featuredPost.title}
                </h1>
                <p className={`text-lg mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {featuredPost.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  <span>Read Article</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </Link>
              </div>

              {/* Featured Post Image */}
              <div 
                className="relative"
                data-aos="fade-left"
              >
                <div className="absolute -inset-4 bg-primary rounded-2xl opacity-10 blur-xl"></div>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="relative w-full h-[400px] object-cover rounded-2xl shadow-xl"
                />
                {/* Category Badge */}
                <div 
                  className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-white text-text'
                  }`}
                >
                  {featuredPost.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className={`text-2xl md:text-3xl font-heading font-bold ${
                theme === 'dark' ? 'text-white' : 'text-text'
              }`}>
                Latest Articles
              </h2>
              <div className="flex items-center gap-2">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Sort by:
                </span>
                <select 
                  className={`p-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-200 text-text'
                  }`}
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>

            <BlogList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;