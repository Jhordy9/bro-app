import { HStack, Heading } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './Button';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {};

  return (
    <HStack
      as='header'
      w='full'
      align='center'
      justifyContent='space-evenly'
      p={4}
      bg='blue.900'
    >
      <Heading as='h1' size='lg' color='white' textAlign='center'>
        Bro App
      </Heading>
      {pathname === '/timeline' && (
        <Button onClick={handleLogout} colorScheme='red' text='Logout' />
      )}
    </HStack>
  );
};
