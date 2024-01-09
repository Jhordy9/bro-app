'use client';
import { Box, Container, VStack } from '@chakra-ui/react';
import { Header } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { LoginForm } from './components/LoginForm';
import { useAuth } from './hooks/useAuth';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  if (!token) {
    router.push('/');
  } else {
    router.push('/timeline');
  }

  return (
    <Box>
      <Header />
      <Container centerContent>
        <Box w='100%' maxW='md' p={4} mt={8}>
          <VStack spacing={8} align='stretch'>
            <LoginForm />
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
