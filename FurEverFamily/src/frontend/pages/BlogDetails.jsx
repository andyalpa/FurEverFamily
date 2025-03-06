import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../Mock API/blogPosts';
import { useTheme } from '../features/ThemeContext';

const BlogDetails = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const post = blogPosts.find((p) => p.id === parseInt(id));
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(likes + (isLiked ? -1 : 1));
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== parseInt(id) && p.category === post?.category)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className={`text-2xl font-heading font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-text'
        }`}>
          Post not found
        </h2>
        <Link to="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}>
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                {post.category}
              </span>
              <span className="text-white text-sm">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Article Content */}
          <article 
            className={`prose max-w-none mb-12 ${
              theme === 'dark' ? 'prose-invert' : ''
            }`}
            data-aos="fade-up"
          >
            {post.content}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8" data-aos="fade-up">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interaction Section */}
          <div 
            className={`flex items-center justify-between p-4 rounded-lg mb-12 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
            data-aos="fade-up"
          >
            <button
              onClick={handleLike}
              className="flex items-center gap-2 group"
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-400'
                } group-hover:text-red-500`}
                fill={isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className={theme === 'dark' ? 'text-white' : 'text-text'}>
                {likes} likes
              </span>
            </button>

            <div className="flex gap-4">
              {['twitter', 'facebook', 'linkedin'].map((platform) => (
                <button
                  key={platform}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label={`Share on ${platform}`}
                >
                  <i className={`bx bxl-${platform} text-xl ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}></i>
                </button>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div data-aos="fade-up">
              <h2 className={`text-2xl font-heading font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-text'
              }`}>
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className={`group block rounded-lg overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className={`font-heading font-medium mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-text'
                      }`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {relatedPost.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;