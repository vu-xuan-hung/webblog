import React from "react";
import { useLocation } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard";
import posts from "../posts.json";

const SearchResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("q")?.toLowerCase() || "";

    const filteredPosts = posts.filter(posts =>
        posts.title.toLowerCase().includes(keyword)
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Search results for "<span className="text-blue-600">{keyword}</span>"
            </h2>

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => <BlogPostCard key={post.id} post={post} />)}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-600 dark:text-gray-400">No posts found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default SearchResult;
