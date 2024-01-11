'use client';
import { useState } from 'react';
import {
  Box,
  Stack,
  Text,
  Badge,
  IconButton,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Header } from '@repo/ui';
import { StarIcon } from '@chakra-ui/icons';
import { useAuth } from '../hooks/useAuth';

type Post = {
  id: number;
  username: string;
  likeCount: number;
};

const TimelinePage: React.FC = () => {
  // Dummy data for initial posts
  const initialPosts: Post[] = [
    { id: 1, username: 'User1', likeCount: 5 },
    { id: 2, username: 'User2', likeCount: 10 },
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState({ username: '', description: '' });
  const { logout } = useAuth();

  const handleLike = (postId: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddPost = () => {
    if (newPost.username && newPost.description) {
      const postId = posts.length + 1;
      const newPostData: Post = {
        id: postId,
        username: newPost.username,
        likeCount: 0,
      };
      setPosts([...posts, newPostData]);
      setNewPost({ username: '', description: '' });
    }
  };

  return (
    <VStack w='100%'>
      <Header handleLogout={logout} />
      <Button size='md' mb={2} colorScheme='orange' variant='outline'>
        Bro
      </Button>
      <Stack spacing={4}>
        {posts.map((post) => (
          <VStack key={post.id} alignItems='flex-start'>
            <VStack
              p={4}
              borderWidth='1px'
              borderRadius='md'
              boxShadow='md'
              w='md'
              alignItems='flex-start'
              spacing={2}
            >
              <Badge variant='solid' colorScheme='teal'>
                {post.username}
              </Badge>
              <Text>Bro!</Text>
              <HStack spacing={0.5}>
                <IconButton
                  aria-label='Brow'
                  variant='shadow'
                  size='xs'
                  icon={<StarIcon />}
                  onClick={() => handleLike(post.id)}
                />
                <Box>{post.likeCount} Bro likes</Box>
              </HStack>
            </VStack>
          </VStack>
        ))}
      </Stack>
    </VStack>
  );
};

export default TimelinePage;
