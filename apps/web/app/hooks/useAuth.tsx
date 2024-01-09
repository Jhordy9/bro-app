import { useEffect, useMemo, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useAuthLoginMutation } from '../__generated__/useAuthLoginMutation.graphql';
import { useToast } from '@chakra-ui/react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [commit] = useMutation<useAuthLoginMutation>(graphql`
    mutation useAuthLoginMutation($input: UserLoginInput!) {
      UserLogin(input: $input) {
        token
      }
    }
  `);

  const firetoast = useToast();

  const login = (email: string, password: string) => {
    commit({
      variables: {
        input: {
          email,
          password,
        },
      },
      onCompleted: (response) => {
        setToken(response.UserLogin?.token ?? null);
        localStorage.setItem('bro-token', response.UserLogin?.token ?? '');
        firetoast({
          title: 'Logado com sucesso!',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      },
      onError(error) {
        firetoast({
          title: 'Erro ao logar!',
          description: error.message,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      },
    });
  };

  useEffect(() => {
    const getStorageToken = localStorage.getItem('bro-token');
    setToken(getStorageToken);
  }, []);

  const tokenMemo = useMemo(() => token, [token]);

  return {
    login,
    token: tokenMemo,
  };
};
