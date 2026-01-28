import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material";

const BlogPostCard = ({ post }) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                },
                textDecoration: 'none',
                overflow: 'hidden'
            }}
            component={Link}
            to={`/post/${post.id}`}
        >
            <CardMedia
                component="img"
                height="200"
                image={post.imageTitle || "https://via.placeholder.com/300x200"}
                alt={post.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Chip
                    label={post.releaseDate}
                    size="small"
                    sx={{
                        mb: 1.5,
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        fontWeight: 500,
                        fontSize: '0.75rem'
                    }}
                />
                <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 700,
                        lineHeight: 1.3,
                        fontSize: '1.1rem',
                        mb: 0,
                        color: 'text.primary',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {post.title}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BlogPostCard;
