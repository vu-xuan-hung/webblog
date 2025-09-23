import React from "react";
import { useLocation } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard";
import posts from "../posts.json";
import styled from "styled-components";
const X = styled.div`
   display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 0fr));
  gap: 1rem;
  padding: 1rem;

`
const SearchResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("q")?.toLowerCase() || "";

    const filteredPosts = posts.filter(posts =>
        posts.title.toLowerCase().includes(keyword)
    );

    return (
        <div>
            <h2>Search results for "{keyword}"</h2>
            <X  >
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(posts => <BlogPostCard key={posts.id} post={posts} />)
                ) : (
                    <p>No posts found.</p>
                )}
            </X>
        </div>
    );
};

export default SearchResult;
