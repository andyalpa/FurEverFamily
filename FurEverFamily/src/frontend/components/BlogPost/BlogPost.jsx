import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
      <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
        Read More
      </Link>
    </div>
  );
};

export default BlogPost;