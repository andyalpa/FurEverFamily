import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../Mock API/blogPosts';

const BlogDetails = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) return <div className="container mx-auto py-10">Post not found</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        By {post.author} on {post.date}
      </p>
      <div className="prose dark:prose-invert">{post.content}</div>
    </div>
  );
};

export default BlogDetails;