import React from 'react';
import BlogList from '../components/BlogList/BlogList';

const Blog = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <BlogList />
    </div>
  );
};

export default Blog;