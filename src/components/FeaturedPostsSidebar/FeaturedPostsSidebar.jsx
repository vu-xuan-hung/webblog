import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff
  ;
`;

const SidebarTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
  color: var(--primary-text-color);
`;

const PostItem = styled.div`
  margin-bottom: 15px;
`;

const PostTitle = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #0077cc;
    text-decoration: underline;
  }
`;

const PostSummary = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

export default function FeaturedPostsSidebar({ posts, isDarkMode }) {


  const featuredPosts = posts.slice(0, 7);

  return (
    <SidebarContainer
      style={{
        backgroundColor: isDarkMode ? ' #c2edda' : '#fff',// màu nền khi dark/light
        color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
      }}
    >
      <SidebarTitle>Bài viết nổi bật</SidebarTitle>
      {featuredPosts.map((post) => (
        <PostItem key={post.id}>
          <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
          <PostSummary>{post.summary}</PostSummary>
        </PostItem>
      ))}
    </SidebarContainer>
  );
}
