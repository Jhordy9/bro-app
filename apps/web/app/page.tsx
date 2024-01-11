'use client';
import { Box, Container, VStack, useDisclosure } from '@chakra-ui/react';
import { Header } from '@repo/ui';
import { LoginForm } from './components/LoginForm';
import RegisterModal from './components/RegisterModal';

const LoginPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Header />
      <Container centerContent>
        <Box w='100%' maxW='md' p={4} mt={8}>
          <VStack spacing={8} align='stretch'>
            <LoginForm onOpen={onOpen} />
            <RegisterModal onClose={onClose} isOpen={isOpen} />
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
