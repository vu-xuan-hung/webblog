import styled from "styled-components";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";

const Card = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #4f46e5;
`;

const CardSummary = styled.p`
  font-size: 0.95rem;
  margin-top: 0.5rem;
  color: #374151;
`;

export default function PostCardList() {
  const apiUrl = import.meta.env.VITE_API_WEB;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const mapped = data.map((x) => ({
          id: x.id ?? "unk",
          title: x.title ?? "unk",
          tag: x.tag ?? "unk",
          image: `${apiUrl}/FileImage/${x.id}.png`,
          description: x.description ?? "unk",
          releaseDate: x.releaseDate ?? "unk",
          content: `${apiUrl}/FileHtml/${x.id}.html`,
        }));

        setPosts(mapped); // lưu vào state
      } catch (err) {
        console.error("Lỗi fetch API:", err);
      }
    }

    fetchPosts();
  }, [apiUrl]); // chạy 1 lần khi component mount


  return (
    <>
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/post/${post.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card>
            <CardImage src={post.image} alt={post.title} />
            <CardContent>
              <CardTitle>{post.title}</CardTitle>
              <CardSummary>{post.description}</CardSummary>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
