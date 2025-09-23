import React from 'react';
import DOMPurify from 'dompurify'; // Thư viện lọc HTML
import styled from 'styled-components'; // Để tạo style cho nội dung

// Styled-component giúp bạn định dạng nội dung HTML được render
const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.8;
  color: #333;
  
  /* Thêm các style khác cho h1, p, img, table, v.v. tại đây */
  h1 {
    font-size: 2.5em;
    color: #1a202c;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

function RichTextDisplay({ rawHtmlContent }) {
  // Dòng quan trọng: Lọc HTML để loại bỏ các script độc hại


  return (
    // Sử dụng dangerouslySetInnerHTML để chèn HTML đã lọc vào DOM
    <ContentWrapper dangerouslySetInnerHTML={{ __html: rawHtmlContent }} />
  );
}

export default RichTextDisplay;