// src/components/PostDetail.jsx

import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
  const [allPosts, setAllPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_WEB;

  useEffect(() => {
    //khai báo một hàm bất đồng bộ
    //Khi một hàm có async, nó sẽ luôn trả về một Promise.
    //Promise là một đối tượng trong JavaScript dùng để xử lý bất đồng bộ, Promise = đối tượng đại diện cho giá trị chưa có ngay (giống "phiếu hẹn").
    async function fetchPosts() {
      //Dùng await để đợi kết quả từ fetch và res.json().
      //await chỉ dùng được trong hàm async, Nó sẽ dừng tạm thời việc chạy code trong hàm, cho đến khi Promise trả về kết quả (resolve hoặc reject).

      try {
        const res = await fetch(apiUrl);//res là đối tượng Response.
        const data = await res.json();//Chuyển dữ liệu JSON từ API thành JavaScript object/array.
        const mapped = data.map((x) => ({
          id: x.id ?? "unk",
          title: x.title ?? "unk",
          image: `${apiUrl}/FileImage/${x.id}.png`,
          description: x.description ?? "unk",
          releaseDate: x.releaseDate ?? "unk",
          content: `${apiUrl}/FileHtml/${x.id}.html`,
        }));

        setAllPosts(mapped); // lưu vào state
      } catch (err) {
        console.error("Lỗi fetch API:", err);
      }
    }

    fetchPosts();
  }, [apiUrl]); // chạy 1 lần khi component mount
  useEffect(() => {
    const foundPost = allPosts.find((p) => String(p.id) === id);
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