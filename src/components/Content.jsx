import React from 'react'
import styles from "./FeaturedPosts/FeaturedPosts.module.css"
import { Link } from "react-router-dom";
const Content = ({ post }) => {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
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
    </div>
  )
}

export default Content
