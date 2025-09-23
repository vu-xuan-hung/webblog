import React from 'react';
import styles from './FeaturedPosts.module.css';
import { Link } from "react-router-dom";


const FeaturedPosts = ({ posts }) => {
    return (

        <div className={styles.container}>
            <h3 className={styles.title}>Lastest</h3>
            <div className={styles.postList}>
                {posts.map(post => (
                    <Link key={post.id} to={`/post/${post.id}`}>
                        <div className={styles.postItem}>
                            <div className={styles.postImageWrapper}>
                                <img src={post.image} alt={post.title} className={styles.postImage} />
                            </div>
                            <div className={styles.postContent}>
                                <p className={styles.postDate}>{post.releaseDate}</p>
                                <h4 className={styles.postTitle}>{post.title}</h4>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>

    );
};

export default FeaturedPosts;