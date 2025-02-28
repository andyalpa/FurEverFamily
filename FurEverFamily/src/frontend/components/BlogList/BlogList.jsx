import React from 'react';
import { blogPosts } from '../../Mock API/blogPosts';
import BlogPost from '../BlogPost/BlogPost';

const BlogList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogPosts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;