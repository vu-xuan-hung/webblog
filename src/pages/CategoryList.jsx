import React from 'react';
import { Box, Typography, List, ListItem, Link } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import posts from "../posts.json";

export default function CategoryList() {
    const { id } = useParams();

    // lọc post có tag = id
    const filteredPosts = posts.filter(post => post.tag === id);

    return (
        <Box p={3}>
            <Typography variant="h4" component="h2" mb={2} fontWeight="bold">
                Category: {id}
            </Typography>
            <List>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <ListItem key={post.id} disableGutters>
                            <Link
                                component={RouterLink}
                                to={`/post/${post.id}`}
                                underline="hover"
                                sx={{ fontSize: '1.1rem', color: 'primary.main' }}
                            >
                                {post.title}
                            </Link>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>Không có bài viết nào trong category này.</ListItem>
                )}
            </List>
        </Box>
    );
}
