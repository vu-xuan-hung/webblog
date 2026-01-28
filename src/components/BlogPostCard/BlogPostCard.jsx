import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import PostContentPage from "../../pages/StaticHtmlPage";

const BlogPostCard = ({ post }) => {
    return (
        <Link
            to={`/post/${post.id}`}
            className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-zinc-800 transform hover:-translate-y-1 h-full flex flex-col"
        >
            <div className="relative overflow-hidden h-56 w-full">
                <img
                    src={post.imageTitle}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
                        {post.releaseDate}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 leading-tight">
                        {post.title}
                    </h3>
                </div>

                {/* Optional description or extra metadata could go here */}
            </div>
        </Link>
    );
};

export default BlogPostCard;
