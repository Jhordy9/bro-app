import { Button, HStack, Heading } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

type Props = {
  handleLogout?: () => void;
};

export const Header: React.FC<Props> = ({ handleLogout }) => {
  const pathname = usePathname();

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
        <Button onClick={handleLogout} colorScheme='red'>
          Logout
        </Button>
      )}
    </HStack>
  );
};
