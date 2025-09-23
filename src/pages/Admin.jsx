import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard/StatsCard';
import posts from '../posts.json'; // Import dữ liệu JSON

const App = () => {
    const [totalViews, setTotalViews] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        // Tính tổng số bài viết
        const postsCount = posts.length;
        setTotalPosts(postsCount);

        // Tính tổng số lượt xem
        const viewsSum = posts.reduce((sum, post) => sum + post.view, 0);
        setTotalViews(viewsSum);
    }, []); // useEffect chỉ chạy một lần khi component được mount

    return (
        <div style={{
            backgroundColor: '#0F172A',
            minHeight: '100vh',
            padding: '50px',
            fontFamily: 'sans-serif',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <StatsCard title="Tổng số bài viết" value={totalPosts} />
            <StatsCard title="Tổng số lượt xem" value={totalViews} />
        </div>
    );
};

export default App;