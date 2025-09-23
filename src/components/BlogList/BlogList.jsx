/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import BlogPostCard from "../BlogPostCard/BlogPostCard";
import styles from "./BlogList.module.css";


export default function BlogList() {

    const [allPosts, setAllPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);
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


    useEffect(() => {
        setAllPosts(posts.slice(0, 7));
        setVisiblePosts(posts.slice(0, 6));
    }, []);

    // Mỗi khi page thay đổi thì load thêm bài
    useEffect(() => {
        if (page > 1) {
            const nextPosts = allPosts.slice((page - 1) * 6, page * 6);
            setVisiblePosts(prev => [...prev, ...nextPosts]);
        }
    }, [page, allPosts]);

    // Infinite scroll với IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) observer.observe(loader.current);

        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.xd}>
                {visiblePosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />//cac bai viet
                ))}
            </div>
            <div ref={loader} className={styles.loader}>
                Đang tải thêm...
            </div>
        </div>
    );
}
