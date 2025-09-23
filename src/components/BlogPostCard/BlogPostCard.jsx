import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import styles from "./BlogPostCard.module.css";
import PostContentPage from "../../pages/StaticHtmlPage";
const BlogPostCard = ({ post }) => {
    return (
        <Link to={`/post/${post.id}`} className={styles.card}>
            <img src={post.image} alt={post.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
                <span className={styles.tag}>{post.releaseDate}</span>
                <h3 className={styles.title}>{post.title}</h3>

            </div>
        </Link>
    );
};

export default BlogPostCard;
