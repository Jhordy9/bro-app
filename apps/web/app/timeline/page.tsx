'use client';
import { useState } from 'react';
import {
  Box,
  ChakraProvider,
  Stack,
  Flex,
  Text,
  Badge,
  IconButton,
  Spacer,
  Heading,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui';
import { TriangleUpIcon } from '@chakra-ui/icons';

// Define Post type
type Post = {
  id: number;
  username: string;
  description: string;
  likeCount: number;
};

const TimelinePage: React.FC = () => {
  // Dummy data for initial posts
  const initialPosts: Post[] = [
    { id: 1, username: 'User1', description: 'First post!', likeCount: 5 },
    { id: 2, username: 'User2', description: 'Another post!', likeCount: 10 },
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState({ username: '', description: '' });

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
        description: newPost.description,
        likeCount: 0,
      };
      setPosts([...posts, newPostData]);
      setNewPost({ username: '', description: '' });
    }
  };

  return (
    <ChakraProvider>
      <VStack maxW='100%'>
        <Heading mb={4}>Timeline</Heading>
        <Flex direction='column' align='center' w='30%'>
          <HStack mt={4} mb={5} w='100%'>
            <Button
              size='md'
              mb={2}
              text='Bro'
              colorScheme='orange'
              variant='outline'
            />
          </HStack>
          <Stack spacing={4} w='100%'>
            {posts.map((post) => (
              <VStack key={post.id} maxW='100%'>
                <Box p={4} borderWidth='1px' borderRadius='md' boxShadow='md'>
                  <Badge variant='solid' colorScheme='teal' mb={2}>
                    {post.username}
                  </Badge>
                  <Text>Bro!</Text>
                  <Flex align='center' mt={2}>
                    <Spacer />
                    <Box>{post.likeCount} Bro&apos;s</Box>
                  </Flex>
                </Box>
                <IconButton
                  aria-label='Brow'
                  variant='shadow'
                  icon={<TriangleUpIcon />}
                  onClick={() => handleLike(post.id)}
                />
              </VStack>
            ))}
          </Stack>
        </Flex>
      </VStack>
    </ChakraProvider>
  );
};

export default TimelinePage;
