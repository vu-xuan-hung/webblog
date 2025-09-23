// src/components/StaticHtmlPage.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HtmlContainer = styled.div`

  all: unset;
  display: block;
  font-family: Arial, sans-serif;
  text-align: left;
  
  
  h1, h2, h3, h4, h5, h6 {
    text-align: center;
    font-weight: bold;
    color: #000;
    margin: 1.5rem 0;
  }

  p {
    text-align: justify;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #000;
  }
  
  img {
    display: block;
    margin: 2rem auto; /* Để căn giữa ảnh */
    max-width: 100%;
    height: auto;
  }
`;

const StaticHtmlPage = ({ url }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.text();
            })
            .then(data => {
                setHtmlContent(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [url]);

    if (loading) return <div>Đang tải nội dung...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    // Sử dụng dangerouslySetInnerHTML để chèn HTML
    return <HtmlContainer dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default StaticHtmlPage;