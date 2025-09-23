// src/components/PostDetail.jsx

import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import posts from "../posts.json";
import StaticHtmlPage from "./StaticHtmlPage";

const Container = styled.div`
  
  margin: 2rem auto;
  padding: 0 1rem;
  display: block;
  text-align: center;
  
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #4f46e5;
  text-align: center;
  margin: 2rem auto;
  
`;

const Description = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  color: #333;
  line-height: 3.6;
  text-align: center;
  color:var(--primary-text-color)
`;
// eslint-disable-next-line no-unused-vars
const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  background-color:#ffffff;
`;

const Iframe1 = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = posts.find((p) => String(p.id) === id);
    setPost(foundPost);
  }, [id]);

  if (!post) {
    return <Container>Bài viết không tồn tại!</Container>;
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      {post.description && <Description>{post.description}</Description>}
      {post.content &&
        <IframeWrapper>
          <Iframe1 src="/x/x.htm" />
        </IframeWrapper>
      }
    </Container >
  );
}