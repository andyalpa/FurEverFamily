import React, { useState, useEffect } from 'react';
import BlogPost from '../BlogPost/BlogPost';
import { blogPosts } from '../../Mock API/blogPosts';
import { useTheme } from '../../features/ThemeContext';

const BlogList = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadPosts = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(blogPosts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === filter);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className={`rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="aspect-[16/9] bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div 
        className="flex flex-wrap gap-4"
        data-aos="fade-up"
      >
        {['all', 'tips', 'nutrition', 'training', 'health'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === category
                ? theme === 'dark'
                  ? 'bg-primary text-white'
                  : 'bg-primary text-white'
                : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <div
            key={post.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <BlogPost post={post} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div 
          className="text-center py-16"
          data-aos="fade-up"
        >
          <div className="w-24 h-24 mx-auto mb-6">
            <svg
              className={`w-full h-full ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className={`text-xl font-heading font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-text'
          }`}>
            No posts found
          </h3>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Try adjusting your filter or check back later for new content.
          </p>
          <button
            onClick={() => setFilter('all')}
            className="btn-primary mt-6"
          >
            View All Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;