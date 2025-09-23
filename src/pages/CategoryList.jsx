import { Box, Heading, List, ListItem, Link } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import posts from "../posts.json";

export default function CategoryList() {
    const { id } = useParams();

    // lọc post có tag = id
    const filteredPosts = posts.filter(post => post.tag === id);

    return (
        <Box p={6}>
            <Heading mb={4}>Category: {id}</Heading>
            <List spacing={3}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <ListItem key={post.id}>
                            <Link as={RouterLink} to={`/post/${post.id}`}>
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
